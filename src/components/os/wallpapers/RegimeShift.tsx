"use client";

import CanvasWallpaper, { type SceneFactory } from "./CanvasWallpaper";
import { mulberry32, gaussian } from "@/lib/random";

const L = 720; // length of the looping series
const PTS = 130; // points across the screen per ridge
const BG = "#0d0b16";

/** Circular moving average. */
function smooth(src: Float32Array, radius: number) {
  const out = new Float32Array(src.length);
  for (let i = 0; i < src.length; i++) {
    let s = 0;
    for (let k = -radius; k <= radius; k++) s += src[(i + k + src.length) % src.length];
    out[i] = s / (2 * radius + 1);
  }
  return out;
}

/** Linear sample of a looping series at a fractional index. */
function sample(arr: Float32Array, k: number) {
  const i = Math.floor(k);
  const f = k - i;
  const a = arr[((i % L) + L) % L];
  const b = arr[(((i + 1) % L) + L) % L];
  return a + (b - a) * f;
}

/**
 * Stacked ridgelines of a market that flips between two hidden regimes:
 * calm (cool, flat) and turbulent (hot, jagged) — what a regime-switching
 * model like an HMM is trying to see. The storm fronts drift across the rows.
 */
const make: SceneFactory = (ctx, w, h) => {
  const rand = mulberry32(21);

  // two-state Markov chain -> smoothed turbulence level in [0, 1]
  const raw = new Float32Array(L);
  let state = 0;
  for (let i = 0; i < L; i++) {
    if (state === 0 && rand() < 0.022) state = 1;
    else if (state === 1 && rand() < 0.05) state = 0;
    raw[i] = state;
  }
  const vol = smooth(smooth(raw, 6), 6);

  const rows = Math.max(16, Math.min(34, Math.round(h / 27)));
  const noise: Float32Array[] = [];
  for (let j = 0; j < rows; j++) {
    const n = new Float32Array(L);
    for (let i = 0; i < L; i++) n[i] = gaussian(rand);
    const s = smooth(n, 1);
    for (let i = 0; i < L; i++) s[i] = Math.abs(s[i]);
    noise.push(s);
  }

  const top = h * 0.2;
  const bottom = h * 0.985;
  const amp = h * 0.13;
  const glow = ctx.createRadialGradient(w * 0.78, h * 0.12, 0, w * 0.78, h * 0.12, Math.max(w, h) * 0.7);
  glow.addColorStop(0, "#2a1a3f");
  glow.addColorStop(1, BG);

  const xs = new Float32Array(PTS + 1);
  const ys = new Float32Array(PTS + 1);
  const vs = new Float32Array(PTS + 1);

  return (t) => {
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    const scroll = t * 5;
    ctx.lineWidth = 1.25;
    ctx.lineJoin = "round";

    for (let j = 0; j < rows; j++) {
      const base = top + (j / (rows - 1)) * (bottom - top);
      for (let i = 0; i <= PTS; i++) {
        const u = i / PTS;
        const k = i * 1.6 + scroll + j * 5;
        const v = sample(vol, k);
        const env = 0.3 + 0.7 * Math.exp(-(((u - 0.56) / 0.36) ** 2));
        xs[i] = u * w;
        ys[i] = base - amp * sample(noise[j], k) * (0.07 + 0.93 * v) * env;
        vs[i] = v;
      }

      // hide the ridges behind this one
      ctx.beginPath();
      ctx.moveTo(xs[0], ys[0]);
      for (let i = 1; i <= PTS; i++) ctx.lineTo(xs[i], ys[i]);
      ctx.lineTo(w, base + 3);
      ctx.lineTo(0, base + 3);
      ctx.closePath();
      ctx.fillStyle = BG;
      ctx.fill();

      // the ridge itself: cool blue when calm, coral when turbulent
      const depth = 0.45 + 0.55 * (j / (rows - 1));
      for (let i = 1; i <= PTS; i++) {
        const v = (vs[i] + vs[i - 1]) / 2;
        const r = Math.round(96 + (251 - 96) * v);
        const g = Math.round(165 + (113 - 165) * v);
        const b = Math.round(250 + (133 - 250) * v);
        ctx.strokeStyle = `rgba(${r},${g},${b},${(0.4 + 0.6 * v) * depth})`;
        ctx.beginPath();
        ctx.moveTo(xs[i - 1], ys[i - 1]);
        ctx.lineTo(xs[i], ys[i]);
        ctx.stroke();
      }
    }
  };
};

export default function RegimeShift() {
  return <CanvasWallpaper make={make} base={BG} />;
}
