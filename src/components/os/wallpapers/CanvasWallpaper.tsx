"use client";

import { useEffect, useId, useRef } from "react";

/** Draws one frame. `t` is seconds since the scene started, `dt` seconds since the last frame. */
export type Scene = (t: number, dt: number) => void;
/** Builds a scene for a canvas of w×h CSS pixels. Called again whenever the size changes. */
export type SceneFactory = (ctx: CanvasRenderingContext2D, w: number, h: number) => Scene;

const MAX_DPR = 1.5; // full-screen canvas: sharper than this costs more than it shows

/**
 * Full-screen animated canvas behind the desktop. Handles sizing, the frame
 * loop, pausing while the tab is hidden, and reduced-motion (which gets one
 * settled frame instead of an animation).
 */
export default function CanvasWallpaper({ make, base }: { make: SceneFactory; base: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const grainId = useId();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: Scene | null = null;
    let raf = 0;
    let t = 0;
    let last = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene = make(ctx, w, h);
      t = 0;
      last = 0;
      if (reduce) {
        // run the scene forward off-screen-time so the still frame is a finished picture
        for (let i = 0; i < 360; i++) scene((t += 1 / 60), 1 / 60);
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden || !scene) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      t += dt;
      scene(t, dt);
    };

    build();
    if (!reduce) raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, [make]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: base }} aria-hidden="true">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      {/* keeps the white desktop icons readable on the left edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.28), transparent 22%)" }}
      />
      {/* film grain so it reads as a surface, not a flat render */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.09] mix-blend-overlay pointer-events-none">
        <filter id={grainId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </div>
  );
}
