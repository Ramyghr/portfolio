"use client";

/**
 * Decorative pixel-art loop, lives on the desktop (not inside a window):
 * rolls in, ollies onto the rail, grinds across with sparks, pops off with
 * a board kickflip (board squashed edge-on + rotated while the rider's legs
 * tuck up, then they reunite), lands, rolls out. Pure SVG + CSS keyframes —
 * no sprite sheet/image asset needed. Caller controls size via className.
 */
export default function SkaterTrick({ className = "" }: { className?: string }) {
  return (
    <div className={`select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 160 76"
        className="w-full h-full overflow-visible"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/*
          Every shape gets a light fill + dark outline, "sticker" style —
          this wallpaper rotates between near-black and near-white scenes,
          so nothing here can rely on one end of that range to show up.
        */}
        <g stroke="var(--color-ink)" strokeWidth="1.4" strokeLinejoin="round" paintOrder="stroke">
          {/* rail */}
          <rect x="14" y="52" width="110" height="3" fill="var(--color-chrome)" />
          <rect x="14" y="55" width="3" height="14" fill="var(--color-chrome)" />
          <rect x="121" y="55" width="3" height="14" fill="var(--color-chrome)" />

          <g className="skater-mover">
            {/* grind sparks — only visible while sliding the rail */}
            <g className="skater-sparks" stroke="none">
              <circle cx="-8" cy="12" r="1.1" fill="var(--color-accent-soft)" />
              <circle cx="-12" cy="10" r="0.8" fill="var(--color-accent-soft)" />
              <circle cx="16" cy="12" r="1.1" fill="var(--color-accent-soft)" />
              <circle cx="20" cy="9" r="0.8" fill="var(--color-accent-soft)" />
            </g>

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
          animation: skate-move 3.6s linear infinite;
        }
        .skater-board {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: skate-kickflip 3.6s linear infinite;
        }
        .skater-rider {
          animation: skate-tuck 3.6s linear infinite;
        }
        .skater-sparks {
          animation: skate-sparks 3.6s linear infinite;
        }

        @keyframes skate-move {
          0%   { transform: translate(-24px, 10px); }
          12%  { transform: translate(14px, 10px); }
          20%  { transform: translate(26px, 0px); }
          58%  { transform: translate(100px, 0px); }
          66%  { transform: translate(112px, -8px); }
          82%  { transform: translate(122px, -8px); }
          90%  { transform: translate(136px, 4px); }
          100% { transform: translate(184px, 10px); }
        }

        /* board does one full flip around its long axis: squash to
           edge-on (scaleY -> ~0) and back, twice, netting a 360 turn */
        @keyframes skate-kickflip {
          0%, 64%   { transform: scaleY(1) rotate(0deg); }
          70%       { transform: scaleY(0.12) rotate(90deg); }
          74%       { transform: scaleY(1) rotate(180deg); }
          78%       { transform: scaleY(0.12) rotate(270deg); }
          82%, 100% { transform: scaleY(1) rotate(360deg); }
        }

        /* rider hops and tucks legs up while the board spins beneath them */
        @keyframes skate-tuck {
          0%, 64%   { transform: translateY(0px); }
          68%       { transform: translateY(-3px); }
          74%       { transform: translateY(-7px); }
          80%       { transform: translateY(-3px); }
          84%, 100% { transform: translateY(0px); }
        }

        @keyframes skate-sparks {
          0%, 21%, 59%, 100% { opacity: 0; }
          25%, 55% { opacity: 1; }
          30%  { opacity: 0.3; }
          35%  { opacity: 1; }
          40%  { opacity: 0.3; }
          45%  { opacity: 1; }
          50%  { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
