"use client";

/**
 * Decorative pixel-art loop: skater rolls in, ollies onto the rail, grinds
 * across it, pops off with a full spin, and rolls back out. Pure SVG + CSS
 * keyframes — no sprite sheet/image asset needed.
 */
export default function SkaterTrick({ className = "" }: { className?: string }) {
  return (
    <div className={`w-32 h-16 select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 160 76"
        className="w-full h-full overflow-visible"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* rail */}
        <rect x="14" y="52" width="110" height="3" fill="var(--color-ink)" opacity="0.85" />
        <rect x="14" y="55" width="3" height="14" fill="var(--color-ink)" opacity="0.85" />
        <rect x="121" y="55" width="3" height="14" fill="var(--color-ink)" opacity="0.85" />

        <g className="skater-mover">
          <g className="skater-spin">
            {/* board */}
            <rect x="-9" y="8" width="26" height="3" rx="1.5" fill="var(--color-accent)" />
            <circle cx="-6" cy="12" r="2" fill="var(--color-ink)" />
            <circle cx="14" cy="12" r="2" fill="var(--color-ink)" />
            {/* legs */}
            <rect x="-2" y="-10" width="5" height="10" fill="var(--color-ink)" />
            <rect x="6" y="-10" width="5" height="10" fill="var(--color-ink)" />
            {/* torso */}
            <rect x="-3" y="-20" width="14" height="11" fill="var(--color-ink)" />
            {/* arm, thrown out for balance */}
            <rect x="9" y="-23" width="9" height="4" fill="var(--color-ink)" />
            {/* head */}
            <circle cx="3" cy="-25" r="5" fill="var(--color-ink)" />
          </g>
        </g>
      </svg>

      <style>{`
        .skater-mover {
          animation: skate-move 3.2s linear infinite;
        }
        .skater-spin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: skate-spin 3.2s linear infinite;
        }
        @keyframes skate-move {
          0%   { transform: translate(-24px, 10px); }
          12%  { transform: translate(14px, 10px); }
          20%  { transform: translate(26px, 0px); }
          58%  { transform: translate(100px, 0px); }
          68%  { transform: translate(112px, -6px); }
          80%  { transform: translate(128px, 6px); }
          92%  { transform: translate(148px, 10px); }
          100% { transform: translate(184px, 10px); }
        }
        @keyframes skate-spin {
          0%, 66% { transform: rotate(0deg); }
          84%  { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
