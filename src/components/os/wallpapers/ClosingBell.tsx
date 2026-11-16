"use client";

import CanvasWallpaper, { type SceneFactory } from "./CanvasWallpaper";
import { mulberry32, gaussian } from "@/lib/random";

type Candle = { o: number; c: number; hi: number; lo: number };

const PERIOD = 2.4; // seconds per new candle

/**
 * A candlestick chart at dusk, standing on the horizon and mirrored in the
 * water. The price series is simulated; the right-most candle is still
 * trading, and a new one forms every few seconds as the chart drifts left.
 */
const make: SceneFactory = (ctx, w, h) => {
  const rand = mulberry32(17);
  const count = Math.max(22, Math.min(74, Math.round(w / 22)));
  const cw = w / count;
  const horizon = h * 0.64;

  const next = (prev: number): Candle => {
    const o = prev;
    const c = o + gaussian(rand) * 1.25 - (o - 50) * 0.03; // random walk, gently pulled back to 50
    return { o, c, hi: Math.max(o, c) + Math.abs(gaussian(rand)) * 0.7, lo: Math.min(o, c) - Math.abs(gaussian(rand)) * 0.7 };
  };

  const candles: Candle[] = [];
  let price = 50;
  for (let i = 0; i < count + 2; i++) {
    const cd = next(price);
    candles.push(cd);
    price = cd.c;
  }

  let lo = Math.min(...candles.map((c) => c.lo));
  let hi = Math.max(...candles.map((c) => c.hi));
  let clock = 0;

  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#120e30");
  sky.addColorStop(0.45, "#3d1d5c");
  sky.addColorStop(0.8, "#b8446c");
  sky.addColorStop(1, "#f6a25c");
  const water = ctx.createLinearGradient(0, horizon, 0, h);
  water.addColorStop(0, "#5a2a5e");
  water.addColorStop(0.35, "#22133f");
  water.addColorStop(1, "#090716");

  const sunX = w * 0.72;
  const sunR = Math.min(w, h) * 0.085;
  const sunGlow = ctx.createRadialGradient(sunX, horizon, 0, sunX, horizon, sunR * 5.5);
  sunGlow.addColorStop(0, "rgba(255,214,150,0.55)");
  sunGlow.addColorStop(1, "rgba(255,170,110,0)");

  return (t, dt) => {
    // the live candle keeps trading
    const live = candles[candles.length - 1];
    live.c += gaussian(rand) * Math.sqrt(dt) * 1.1;
    live.hi = Math.max(live.hi, live.c);
    live.lo = Math.min(live.lo, live.c);

    clock += dt;
    if (clock >= PERIOD) {
      clock -= PERIOD;
      candles.shift();
      candles.push(next(live.c));
    }
    const offset = (clock / PERIOD) * cw;

    // ease the vertical scale towards the visible range so it never jumps
    let tLo = Infinity;
    let tHi = -Infinity;
    for (const c of candles) {
      tLo = Math.min(tLo, c.lo);
      tHi = Math.max(tHi, c.hi);
    }
    lo += (tLo - lo) * Math.min(1, dt * 1.5);
    hi += (tHi - hi) * Math.min(1, dt * 1.5);
    const lift = h * 0.05;
    const span = h * 0.33;
    const yOf = (p: number) => horizon - lift - ((p - lo) / (hi - lo || 1)) * span;
    const xOf = (i: number) => (i - 1) * cw - offset + cw / 2;

    // sky + sun
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizon);
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, w, horizon);
    ctx.fillStyle = "#ffe1a8";
    ctx.beginPath();
    ctx.arc(sunX, horizon, sunR, Math.PI, 0);
    ctx.fill();

    // water
    ctx.fillStyle = water;
    ctx.fillRect(0, horizon, w, h - horizon);

    const bodyW = Math.max(3, cw * 0.56);
    const drawCandles = (mirror: boolean) => {
      for (let i = 0; i < candles.length; i++) {
        const cd = candles[i];
        const up = cd.c >= cd.o;
        let x = xOf(i);
        let yHi = yOf(cd.hi);
        let yLo = yOf(cd.lo);
        let yTop = yOf(Math.max(cd.o, cd.c));
        let yBot = yOf(Math.min(cd.o, cd.c));
        if (mirror) {
          // reflect across the horizon, squashed, with a slow ripple
          const flip = (y: number) => horizon + (horizon - y) * 0.8;
          [yHi, yLo, yTop, yBot] = [flip(yLo), flip(yHi), flip(yBot), flip(yTop)];
          x += Math.sin(t * 1.3 + i * 0.9) * 1.6;
        }
        const body = Math.max(2, yBot - yTop);
        ctx.fillStyle = up ? "#ffd89c" : "#150d2a";
        ctx.fillRect(x - 0.6, yHi, 1.2, yLo - yHi);
        ctx.fillRect(x - bodyW / 2, yTop, bodyW, body);
        if (!up && !mirror) {
          // thin sunlit rim so dark candles still read against the dusk
          ctx.fillStyle = "rgba(255,190,140,0.45)";
          ctx.fillRect(x - bodyW / 2, yTop, bodyW, 1);
        }
      }
    };

    // dark land under the chart, following the lows down to the waterline
    ctx.fillStyle = "#120b24";
    ctx.beginPath();
    ctx.moveTo(-cw, horizon);
    for (let i = 0; i < candles.length; i++) ctx.lineTo(xOf(i), yOf(candles[i].lo) + h * 0.03);
    ctx.lineTo(w + cw, horizon);
    ctx.closePath();
    ctx.fill();

    drawCandles(false);
    ctx.globalAlpha = 0.26;
    drawCandles(true);
    ctx.globalAlpha = 1;

    // sun's path on the water: short flickering strokes
    for (let k = 0; k < 26; k++) {
      const y = horizon + 4 + (k / 26) ** 1.5 * (h - horizon) * 0.9;
      const half = sunR * (0.25 + (k / 26) * 0.9) * (0.6 + 0.4 * Math.sin(t * 1.7 + k * 1.9));
      ctx.fillStyle = `rgba(255,205,140,${0.3 * (1 - k / 26)})`;
      ctx.fillRect(sunX - half, y, half * 2, 1.4);
    }
    // waterline
    ctx.fillStyle = "rgba(255,200,150,0.35)";
    ctx.fillRect(0, horizon - 0.5, w, 1);
  };
};

export default function ClosingBell() {
  return <CanvasWallpaper make={make} base="#120e30" />;
}
