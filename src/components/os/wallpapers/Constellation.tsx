"use client";

import CanvasWallpaper, { type SceneFactory } from "./CanvasWallpaper";
import { mulberry32, gaussian } from "@/lib/random";

const HUES = ["129,140,248", "45,212,191", "251,191,36", "251,113,133", "56,189,248", "192,132,252", "163,230,53"];

type Pt = { x: number; y: number; z: number; c: number; near: number[] };

/**
 * An embedding space: every dot is one item (a face, in the clustering
 * pipeline), dots that belong together sit together, and lines join nearest
 * neighbours. The whole cloud turns slowly; now and then one point lights up
 * and finds its cluster.
 */
const make: SceneFactory = (ctx, w, h) => {
  const rand = mulberry32(5);
  const pts: Pt[] = [];
  const centers: { x: number; y: number; z: number }[] = [];

  HUES.forEach((_, c) => {
    // spread cluster centres over a sphere
    const phi = Math.acos(1 - (2 * (c + 0.5)) / HUES.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * c;
    const R = 0.72;
    const center = { x: R * Math.sin(phi) * Math.cos(theta), y: R * Math.cos(phi) * 0.75, z: R * Math.sin(phi) * Math.sin(theta) };
    centers.push(center);
    const count = 26 + Math.floor(rand() * 16);
    const spread = 0.09 + rand() * 0.05;
    for (let i = 0; i < count; i++) {
      pts.push({
        x: center.x + gaussian(rand) * spread,
        y: center.y + gaussian(rand) * spread,
        z: center.z + gaussian(rand) * spread,
        c,
        near: [],
      });
    }
  });

  // two nearest neighbours inside the same cluster
  pts.forEach((p, i) => {
    const d = pts
      .map((q, j) => (j !== i && q.c === p.c ? [(p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2, j] : null))
      .filter((v): v is number[] => v !== null)
      .sort((a, b) => a[0] - b[0]);
    p.near = d.slice(0, 2).map((v) => v[1]);
  });

  const bg = ctx.createRadialGradient(w * 0.6, h * 0.45, 0, w * 0.6, h * 0.45, Math.max(w, h) * 0.75);
  bg.addColorStop(0, "#10143a");
  bg.addColorStop(0.6, "#080b22");
  bg.addColorStop(1, "#04050f");

  const cx = w < 768 ? w * 0.5 : w * 0.56;
  const cy = h * 0.52;
  const scale = Math.min(w, h) * (w < 768 ? 0.62 : 0.5);
  const sx = new Float32Array(pts.length);
  const sy = new Float32Array(pts.length);
  const sz = new Float32Array(pts.length);

  let pulse = 0; // index of the point currently "being matched"
  let pulseAge = 99;

  return (t, dt) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const a = t * 0.07;
    const tilt = 0.32 + Math.sin(t * 0.05) * 0.08;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    const project = (x: number, y: number, z: number) => {
      const X = x * ca + z * sa;
      const Z0 = -x * sa + z * ca;
      const Y = y * ct - Z0 * st;
      const Z = y * st + Z0 * ct;
      const k = 1 / (1.9 - Z); // perspective: nearer is bigger
      return [cx + X * k * scale * 1.6, cy + Y * k * scale * 1.6, Z];
    };

    for (let i = 0; i < pts.length; i++) {
      const [X, Y, Z] = project(pts[i].x, pts[i].y, pts[i].z);
      sx[i] = X;
      sy[i] = Y;
      sz[i] = Z;
    }

    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = 0.7;
    for (let i = 0; i < pts.length; i++) {
      const depth = 0.25 + 0.75 * ((sz[i] + 1) / 2);
      ctx.strokeStyle = `rgba(${HUES[pts[i].c]},${0.16 * depth})`;
      for (const j of pts[i].near) {
        ctx.beginPath();
        ctx.moveTo(sx[i], sy[i]);
        ctx.lineTo(sx[j], sy[j]);
        ctx.stroke();
      }
    }
    for (let i = 0; i < pts.length; i++) {
      const depth = 0.25 + 0.75 * ((sz[i] + 1) / 2);
      const r = 0.7 + depth * 1.7;
      ctx.fillStyle = `rgba(${HUES[pts[i].c]},${0.1 * depth})`;
      ctx.beginPath();
      ctx.arc(sx[i], sy[i], r * 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(${HUES[pts[i].c]},${0.35 + 0.6 * depth})`;
      ctx.beginPath();
      ctx.arc(sx[i], sy[i], r, 0, Math.PI * 2);
      ctx.fill();
    }

    // a query point lights up and links to its cluster centre
    pulseAge += dt;
    if (pulseAge > 3.6) {
      pulse = Math.floor(rand() * pts.length);
      pulseAge = 0;
    }
    const life = pulseAge / 2.2;
    if (life < 1) {
      const p = pts[pulse];
      const c = centers[p.c];
      const [CX, CY] = project(c.x, c.y, c.z);
      const fade = 1 - life;
      ctx.strokeStyle = `rgba(255,255,255,${0.55 * fade})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx[pulse], sy[pulse]);
      ctx.lineTo(sx[pulse] + (CX - sx[pulse]) * Math.min(1, life * 2.2), sy[pulse] + (CY - sy[pulse]) * Math.min(1, life * 2.2));
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx[pulse], sy[pulse], 3 + life * 22, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  };
};

export default function Constellation() {
  return <CanvasWallpaper make={make} base="#080b22" />;
}
