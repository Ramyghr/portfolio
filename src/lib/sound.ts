"use client";

/**
 * All sound is synthesized with the Web Audio API — no binary audio assets to source
 * or license. Keeps the repo clean and the vintage-computer sound fully controllable.
 */

let ctx: AudioContext | null = null;
let ambientNodes: { stop: () => void } | null = null;
let unlocked = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  return ctx;
}

export function unlockAudio() {
  const c = getCtx();
  if (c && c.state === "suspended") c.resume();
  unlocked = true;
}

function envGain(c: AudioContext, start: number, attack: number, hold: number, release: number, peak: number) {
  const g = c.createGain();
  const t0 = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(Math.max(peak * 0.001, 0.0001), t0 + attack + hold + release);
  return g;
}

function blip(freq: number, duration = 0.06, type: OscillatorType = "square", peak = 0.05) {
  const c = getCtx();
  if (!c || !unlocked) return;
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  const g = envGain(c, 0, 0.004, duration * 0.4, duration * 0.6, peak);
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.05);
}

function sweep(from: number, to: number, duration = 0.12, peak = 0.045) {
  const c = getCtx();
  if (!c || !unlocked) return;
  const osc = c.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(from, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(to, c.currentTime + duration);
  const g = envGain(c, 0, 0.01, duration * 0.5, duration * 0.5, peak);
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.05);
}

export const sfx = {
  click: () => blip(1400, 0.035, "square", 0.035),
  toggle: () => blip(900, 0.05, "square", 0.04),
  open: () => sweep(260, 1100, 0.14, 0.05),
  close: () => sweep(900, 220, 0.12, 0.045),
  error: () => {
    blip(220, 0.08, "sawtooth", 0.05);
    setTimeout(() => blip(160, 0.1, "sawtooth", 0.05), 90);
  },
  key: () => blip(2200 + Math.random() * 400, 0.02, "square", 0.02),
  bootChime: () => {
    const c = getCtx();
    if (!c || !unlocked) return;
    const notes = [261.63, 329.63, 392.0, 523.25]; // C4 E4 G4 C5 — bright arpeggio
    notes.forEach((f, i) => {
      const osc = c.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = f;
      const g = envGain(c, i * 0.09, 0.02, 0.22, 0.35, 0.055);
      osc.connect(g).connect(c.destination);
      osc.start(c.currentTime + i * 0.09);
      osc.stop(c.currentTime + i * 0.09 + 0.6);
    });
  },
};

export function startAmbient(muted: boolean) {
  const c = getCtx();
  if (!c) return;
  stopAmbient();
  if (muted || !unlocked) return;

  const master = c.createGain();
  master.gain.value = 0.0;
  master.gain.setTargetAtTime(0.018, c.currentTime, 1.2);
  master.connect(c.destination);

  // low drone
  const drone = c.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 55;
  const droneGain = c.createGain();
  droneGain.gain.value = 0.6;
  drone.connect(droneGain).connect(master);
  drone.start();

  // soft detuned pad
  const pad = c.createOscillator();
  pad.type = "sine";
  pad.frequency.value = 55 * 1.5;
  const padGain = c.createGain();
  padGain.gain.value = 0.3;
  pad.connect(padGain).connect(master);
  pad.start();

  // slow LFO on master for a "breathing" hum, like an old CRT
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.08;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.01;
  lfo.connect(lfoGain).connect(master.gain);
  lfo.start();

  ambientNodes = {
    stop: () => {
      [drone, pad, lfo].forEach((n) => {
        try {
          n.stop();
        } catch {
          /* already stopped */
        }
      });
    },
  };
}

export function stopAmbient() {
  ambientNodes?.stop();
  ambientNodes = null;
}
