"use client";

import CanvasWallpaper, { type SceneFactory } from "./CanvasWallpaper";
import { mulberry32, gaussian } from "@/lib/random";

const STEPS = 240;
const PATHS = 80;
const COLORS = ["45,212,191", "167,139,250", "251,191,36"]; // finishes low / middle / high

/**
 * A fan of simulated price paths growing out of a single starting point —
 * the picture behind every Monte Carlo pricer. Each run draws itself, settles
 * into its end-of-year distribution, fades, and a new one starts.
 */
const make: SceneFactory = (ctx, w, h) => {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#060a1c");
  sky.addColorStop(0.55, "#151238");
  sky.addColorStop(1, "#2b1445");

  const x0 = w < 768 ? -4 : w * 0.11;
  const x1 = w * 1.01;
  const y0 = h * 0.56;
  const sd = (h * 0.21) / Math.sqrt(STEPS);
  const xAt = (i: number) => x0 + (i / STEPS) * (x1 - x0);

  let seed = 3;
  let paths: Float32Array[] = [];
  let tone: number[] = [];
  let head = 0; // how many steps are drawn so far (fractional)
  let phase: "draw" | "hold" | "fade" = "draw";
  let clock = 0;

  const paint = (alpha: number) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = alpha;
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  };

  const reset = () => {
    const rand = mulberry32(seed++);
    paths = [];
    for (let p = 0; p < PATHS; p++) {
      const path = new Float32Array(STEPS + 1);
      for (let i = 1; i <= STEPS; i++) path[i] = path[i - 1] + sd * gaussian(rand);
      paths.push(path);
    }
    // colour by where each path ends up: bottom third, middle, top third
    const order = paths.map((p, i) => [p[STEPS], i]).sort((a, b) => b[0] - a[0]);
    tone = new Array(PATHS);
    order.forEach(([, i], rank) => (tone[i] = Math.floor((rank / PATHS) * 3)));
    head = 0;
    phase = "draw";
    clock = 0;

    // starting level + glow at the origin
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.moveTo(Math.max(x0, 0), y0);
    ctx.lineTo(w, y0);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  paint(1);
  reset();

  return (_t, dt) => {
    if (phase === "draw") {
      const from = Math.floor(head);
      head = Math.min(STEPS, head + dt * 64);
      const to = Math.floor(head);
      if (to > from) {
        ctx.globalCompositeOperation = "lighter";
        ctx.lineWidth = 1.1;
        for (let p = 0; p < PATHS; p++) {
          const path = paths[p];
          ctx.strokeStyle = `rgba(${COLORS[tone[p]]},0.2)`;
          ctx.beginPath();
          ctx.moveTo(xAt(from), y0 + path[from]);
          for (let i = from + 1; i <= to; i++) ctx.lineTo(xAt(i), y0 + path[i]);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
      }
      if (head >= STEPS) {
        phase = "hold";
        clock = 0;
      }
    } else if (phase === "hold") {
      clock += dt;
      if (clock > 7) {
        phase = "fade";
        clock = 0;
      }
    } else {
      clock += dt;
      paint(0.07);
      if (clock > 1.4) {
        paint(1);
        reset();
      }
    }
  };
};

export default function MonteCarloSky() {
  return <CanvasWallpaper make={make} base="#0b0d24" />;
}
