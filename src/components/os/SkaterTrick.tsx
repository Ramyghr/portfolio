"use client";

/**
 * Decorative pixel-art loop, lives on the desktop (not inside a window):
 * rolls in at ground level, pops an ollie + kickflip mid-path (board
 * squashed edge-on + rotated independently of the rider, rider's legs
 * tuck up, then they reunite), lands, rolls out. Pure SVG + CSS
 * keyframes — no sprite sheet/image asset needed. Caller controls size
 * via className.
 */
export default function SkaterTrick({ className = "" }: { className?: string }) {
  return (
    <div className={`select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 160 46"
        className="w-full h-full overflow-visible"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/*
          Every shape gets a light fill + dark outline, "sticker" style —
          this wallpaper rotates between near-black and near-white scenes,
          so nothing here can rely on one end of that range to show up.
        */}
        <g stroke="var(--color-ink)" strokeWidth="1.4" strokeLinejoin="round" paintOrder="stroke">
          <g className="skater-mover">
            {/* board: flips independently of the rider during the kickflip window */}
            <g className="skater-board">
              <rect x="-9" y="8" width="26" height="3" rx="1.5" fill="var(--color-accent)" />
              <circle cx="-6" cy="12" r="2" fill="var(--color-chrome)" />
              <circle cx="14" cy="12" r="2" fill="var(--color-chrome)" />
            </g>

            {/* rider: legs tuck up during the pop, independent of the board flip */}
            <g className="skater-rider">
              <rect x="-2" y="-10" width="5" height="10" fill="var(--color-chrome)" />
              <rect x="6" y="-10" width="5" height="10" fill="var(--color-chrome)" />
              <rect x="-3" y="-20" width="14" height="11" fill="var(--color-chrome)" />
              <rect x="9" y="-23" width="9" height="4" fill="var(--color-chrome)" />
              <circle cx="3" cy="-25" r="5" fill="var(--color-chrome)" />
            </g>
          </g>
        </g>
      </svg>

      <style>{`
        .skater-mover {
          animation: skate-move 3.2s linear infinite;
        }
        .skater-board {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: skate-kickflip 3.2s linear infinite;
        }
        .skater-rider {
          animation: skate-tuck 3.2s linear infinite;
        }

        @keyframes skate-move {
          0%   { transform: translate(-24px, 14px); }
          15%  { transform: translate(10px, 14px); }
          26%  { transform: translate(30px, 14px); }
          32%  { transform: translate(40px, 2px); }
          48%  { transform: translate(56px, 2px); }
          60%  { transform: translate(72px, 12px); }
          64%  { transform: translate(80px, 14px); }
          88%  { transform: translate(124px, 14px); }
          100% { transform: translate(184px, 14px); }
        }

        /* board does one full flip around its long axis: squash to
           edge-on (scaleY -> ~0) and back, twice, netting a 360 turn */
        @keyframes skate-kickflip {
          0%, 30%   { transform: scaleY(1) rotate(0deg); }
          36%       { transform: scaleY(0.12) rotate(90deg); }
          40%       { transform: scaleY(1) rotate(180deg); }
          44%       { transform: scaleY(0.12) rotate(270deg); }
          48%, 100% { transform: scaleY(1) rotate(360deg); }
        }

        /* rider hops and tucks legs up while the board spins beneath them */
        @keyframes skate-tuck {
          0%, 30%   { transform: translateY(0px); }
          34%       { transform: translateY(-3px); }
          40%       { transform: translateY(-7px); }
          46%       { transform: translateY(-3px); }
          50%, 100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
