"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { mulberry32, gaussian } from "@/lib/random";

const S0 = 100;
const T = 1; // years
const STEPS = 120;
const SHOWN = 90; // paths drawn on screen

// Standard normal CDF (Abramowitz–Stegun 7.1.26 erf approximation, |error| < 1.5e-7)
function normCdf(x: number) {
  const t = 1 / (1 + 0.3275911 * Math.abs(x) / Math.SQRT2);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp((-x * x) / 2);
  return 0.5 * (1 + (x >= 0 ? y : -y));
}

function blackScholesCall(K: number, r: number, sigma: number) {
  const d1 = (Math.log(S0 / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return S0 * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
}

function simulate(sigma: number, r: number, K: number, n: number, seed: number) {
  const rand = mulberry32(seed);
  const dt = T / STEPS;
  const drift = (r - (sigma * sigma) / 2) * dt;
  const vol = sigma * Math.sqrt(dt);

  // full paths for the picture
  const paths: Float32Array[] = [];
  for (let p = 0; p < SHOWN; p++) {
    const path = new Float32Array(STEPS + 1);
    path[0] = S0;
    for (let i = 1; i <= STEPS; i++) path[i] = path[i - 1] * Math.exp(drift + vol * gaussian(rand));
    paths.push(path);
  }

  // terminal values only for the price (exact GBM solution, one draw per path)
  const mu = (r - (sigma * sigma) / 2) * T;
  const sd = sigma * Math.sqrt(T);
  const disc = Math.exp(-r * T);
  let sum = 0;
  let sumSq = 0;
  for (let p = 0; p < n; p++) {
    const sT = S0 * Math.exp(mu + sd * gaussian(rand));
    const payoff = disc * Math.max(sT - K, 0);
    sum += payoff;
    sumSq += payoff * payoff;
  }
  const price = sum / n;
  const stderr = Math.sqrt(Math.max(sumSq / n - price * price, 0) / n);
  return { paths, price, stderr };
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-[12px]">
      <span className="flex justify-between mb-0.5">
        <span className="text-(--color-ink-soft)">{label}</span>
        <span className="font-mono tabular-nums">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-(--color-accent)"
      />
    </label>
  );
}

/**
 * A live Monte Carlo pricer for a European call under geometric Brownian
 * motion, checked against the Black–Scholes closed form. Everything runs in
 * the visitor's browser.
 */
export default function MonteCarloApp() {
  const [sigma, setSigma] = useState(0.25);
  const [r, setR] = useState(0.04);
  const [K, setK] = useState(105);
  const [n, setN] = useState(10000);
  const [seed, setSeed] = useState(7);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const sim = useMemo(() => simulate(sigma, r, K, n, seed), [sigma, r, K, n, seed]);
  const bs = blackScholesCall(K, r, sigma);
  const diff = sim.price - bs;

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let start = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lo = Infinity;
    let hi = -Infinity;
    for (const p of sim.paths) {
      for (const v of p) {
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
      }
    }
    lo = Math.min(lo, K) * 0.97;
    hi = Math.max(hi, K) * 1.03;

    const draw = (progress: number) => {
      const dpr = window.devicePixelRatio || 1;
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0b1020";
      ctx.fillRect(0, 0, w, h);

      const padL = 34;
      const padR = 10;
      const padY = 12;
      const x = (i: number) => padL + (i / STEPS) * (w - padL - padR);
      const y = (v: number) => padY + (1 - (v - lo) / (hi - lo)) * (h - 2 * padY);

      // gridlines + price labels
      ctx.font = "10px ui-monospace, monospace";
      ctx.textBaseline = "middle";
      for (let g = 0; g <= 4; g++) {
        const v = lo + ((hi - lo) * g) / 4;
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.moveTo(padL, y(v));
        ctx.lineTo(w - padR, y(v));
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.fillText(v.toFixed(0), 6, y(v));
      }

      // paths: amber when they end in the money, teal when they don't
      const upto = Math.max(1, Math.floor(progress * STEPS));
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = "lighter";
      for (const p of sim.paths) {
        ctx.strokeStyle = p[STEPS] > K ? "rgba(251,191,36,0.34)" : "rgba(45,212,191,0.26)";
        ctx.beginPath();
        ctx.moveTo(x(0), y(p[0]));
        for (let i = 1; i <= upto; i++) ctx.lineTo(x(i), y(p[i]));
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      // strike
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.moveTo(padL, y(K));
      ctx.lineTo(w - padR, y(K));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.textAlign = "right";
      ctx.fillText(`strike ${K}`, w - padR - 4, y(K) - 8);
      ctx.textAlign = "left";
    };

    const frame = (t: number) => {
      if (!start) start = t;
      const progress = Math.min(1, (t - start) / 900);
      draw(progress);
      if (progress < 1) raf = requestAnimationFrame(frame);
    };

    if (reduce) draw(1);
    else raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => draw(1));
    ro.observe(box);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [sim, K]);

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="px-5 pt-4 pb-3">
        <h2 className="font-pixel text-xs text-(--color-accent)">MONTE CARLO — EUROPEAN CALL</h2>
        <p className="text-[12.5px] text-(--color-ink-soft) mt-1">
          Simulates a stock starting at {S0} over one year, prices a call option from the simulated payoffs, and checks
          the answer against the exact Black–Scholes formula. It runs live in your browser.
        </p>
      </div>

      <div ref={boxRef} className="relative flex-1 min-h-[180px] mx-5 rounded-xl overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-label="Simulated price paths" role="img" />
      </div>

      <div className="grid grid-cols-3 gap-2 px-5 mt-3">
        <div className="pixel-btn px-3 py-2 hover:transform-none!">
          <p className="text-[10.5px] text-(--color-ink-soft)">Monte Carlo price</p>
          <p className="font-mono text-[15px] tabular-nums">{sim.price.toFixed(3)}</p>
          <p className="text-[10.5px] text-(--color-ink-soft) font-mono">± {(1.96 * sim.stderr).toFixed(3)}</p>
        </div>
        <div className="pixel-btn px-3 py-2 hover:transform-none!">
          <p className="text-[10.5px] text-(--color-ink-soft)">Black–Scholes (exact)</p>
          <p className="font-mono text-[15px] tabular-nums">{bs.toFixed(3)}</p>
          <p className="text-[10.5px] text-(--color-ink-soft)">closed form</p>
        </div>
        <div className="pixel-btn px-3 py-2 hover:transform-none!">
          <p className="text-[10.5px] text-(--color-ink-soft)">Difference</p>
          <p className="font-mono text-[15px] tabular-nums">
            {diff >= 0 ? "+" : "−"}
            {Math.abs(diff).toFixed(3)}
          </p>
          <p className="text-[10.5px] text-(--color-ink-soft)">
            {Math.abs(diff) <= 1.96 * sim.stderr ? "inside the 95% band" : "outside the 95% band"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 px-5 mt-3">
        <Slider label="Volatility" value={sigma} display={`${(sigma * 100).toFixed(0)}%`} min={0.05} max={0.8} step={0.01} onChange={setSigma} />
        <Slider label="Risk-free rate" value={r} display={`${(r * 100).toFixed(1)}%`} min={0} max={0.1} step={0.005} onChange={setR} />
        <Slider label="Strike" value={K} display={`${K}`} min={60} max={140} step={1} onChange={setK} />
        <Slider label="Paths" value={n} display={n.toLocaleString("en-US")} min={500} max={50000} step={500} onChange={setN} />
      </div>

      <div className="px-5 py-3 flex items-center justify-between gap-3">
        <p className="text-[11px] text-(--color-ink-soft)">
          Amber paths finish above the strike, teal below. More paths shrink the ± band.
        </p>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="shrink-0 rounded-[10px] bg-(--color-ink) text-white px-3.5 py-1.5 text-[12.5px] font-medium hover:opacity-90 active:scale-[0.97] transition cursor-pointer"
        >
          Run again
        </button>
      </div>
    </div>
  );
}
