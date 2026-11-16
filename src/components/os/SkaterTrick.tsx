"use client";

/**
 * Decorative skater loop that lives on the desktop (not inside a window):
 * rolls in, crouches, pops an ollie into a kickflip (the board flips around
 * its long axis while the rider tucks their knees), lands with a small
 * absorb, rolls out. Pure SVG + CSS keyframes — no image assets. Caller
 * controls size via className.
 *
 * Coordinates: ground is y=0, the deck sits at y≈-9, rider faces right.
 */
const SKIN = "#e8b593";
const HOODIE = "#f97316";
const HOODIE_DARK = "#c2410c";
const JEANS = "#334155";
const JEANS_DARK = "#1e293b";
const SHOE = "#f8fafc";
const DECK = "#0f172a";

export default function SkaterTrick({ className = "" }: { className?: string }) {
  return (
    <div className={`select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 320 110" className="w-full h-full overflow-visible">
        <g transform="translate(0 100)">
          <g className="sk-x">
            {/* contact shadow stays on the ground and shrinks while airborne */}
            <ellipse className="sk-shadow" cx="0" cy="1" rx="22" ry="2.6" fill="rgba(0,0,0,0.35)" />

            <g className="sk-y sk-outline">
              {/* ---------- board ---------- */}
              <g className="sk-board">
                <g className="sk-board-flip">
                  {/* wheels + trucks */}
                  <path d="M-15,-6.5 h7 l-1.2,2.2 h-4.6 z" fill="#94a3b8" />
                  <path d="M8,-6.5 h7 l-1.2,2.2 h-4.6 z" fill="#94a3b8" />
                  <g className="sk-wheel" style={{ transformOrigin: "-11.5px -2.4px" }}>
                    <circle cx="-11.5" cy="-2.4" r="2.4" fill="#fde68a" />
                    <rect x="-11.9" y="-4.4" width="0.8" height="1.6" fill="#b45309" />
                  </g>
                  <g className="sk-wheel" style={{ transformOrigin: "11.5px -2.4px" }}>
                    <circle cx="11.5" cy="-2.4" r="2.4" fill="#fde68a" />
                    <rect x="11.1" y="-4.4" width="0.8" height="1.6" fill="#b45309" />
                  </g>
                  {/* deck with kicked-up nose and tail */}
                  <path
                    d="M-17,-8.6 H17 Q21.5,-8.6 24.5,-12.6 L25.6,-11.8 Q22.6,-6.6 17,-6.6 H-17 Q-22.6,-6.6 -25.6,-11.8 L-24.5,-12.6 Q-21.5,-8.6 -17,-8.6 Z"
                    fill={DECK}
                  />
                  <path d="M-17,-6.9 H17" stroke="#fb7185" strokeWidth="0.9" />
                </g>
              </g>

              {/* ---------- rider ---------- */}
              <g className="sk-rider">
                {/* back leg (further from viewer, a shade darker) */}
                <g className="sk-legs">
                  <path
                    d="M-3,-38 Q-7,-28 -12,-24 Q-13.5,-17 -11,-11"
                    fill="none"
                    stroke={JEANS_DARK}
                    strokeWidth="5.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M-15.5,-12.4 Q-15.5,-9 -12.5,-9 H-6 Q-4.6,-9.4 -5.6,-11.4 Q-8.5,-13.6 -11.5,-13.6 Z" fill={SHOE} />
                  {/* front leg */}
                  <path
                    d="M1,-38 Q8,-30 9.5,-23 Q8,-17 9,-11"
                    fill="none"
                    stroke={JEANS}
                    strokeWidth="5.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M5.5,-12.4 Q5.5,-9 8.5,-9 H15 Q16.4,-9.4 15.4,-11.4 Q12.5,-13.6 9.5,-13.6 Z" fill={SHOE} />
                </g>

                {/* back arm, swung back for balance */}
                <g className="sk-arm-back">
                  <path
                    d="M-1,-55 Q-8,-50 -12,-46 Q-16,-43 -19,-45"
                    fill="none"
                    stroke={HOODIE_DARK}
                    strokeWidth="4.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="-19.8" cy="-45.4" r="2" fill={SKIN} />
                </g>

                {/* torso: hoodie, leaning slightly forward */}
                <path
                  d="M-6,-37 Q-7.5,-48 -4,-57 Q1,-61 6,-57 Q8.5,-48 6,-37 Q0,-34.5 -6,-37 Z"
                  fill={HOODIE}
                />
                <path d="M-5.6,-38.5 Q0,-36.4 5.8,-38.5" stroke={HOODIE_DARK} strokeWidth="1.4" fill="none" />
                {/* hood bunched at the back of the neck */}
                <path d="M-5,-56 Q-8,-60 -4,-62 Q-1,-60 -1.5,-57 Z" fill={HOODIE_DARK} />

                {/* head */}
                <rect x="0" y="-62" width="3.6" height="4" fill={SKIN} />
                <ellipse cx="2.8" cy="-66.5" rx="5" ry="5.6" fill={SKIN} />
                <path d="M6.9,-66 Q8.6,-65 7.4,-63.6" fill={SKIN} />
                {/* beanie */}
                <path d="M-2.4,-66.4 Q-2.6,-73.4 3.2,-73.6 Q8.6,-73.4 8,-67.4 Q3,-68.6 -2.4,-66.4 Z" fill="#22d3ee" />
                <path d="M-2.6,-66.6 Q3,-69 8.2,-67.4" stroke="#0e7490" strokeWidth="1.3" fill="none" />
                <circle cx="5.6" cy="-65.6" r="0.75" fill="#1e293b" />

                {/* front arm, reaching forward */}
                <g className="sk-arm-front">
                  <path
                    d="M3,-55 Q9,-50 13,-49 Q18,-48 21,-51"
                    fill="none"
                    stroke={HOODIE}
                    strokeWidth="4.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="21.8" cy="-51.6" r="2" fill={SKIN} />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <style>{`
        /* white halo + soft drop shadow keeps the figure legible on any wallpaper */
        .sk-outline {
          filter:
            drop-shadow(0 0 0.6px rgba(255,255,255,0.95))
            drop-shadow(0 0 0.6px rgba(255,255,255,0.95))
            drop-shadow(0 3px 4px rgba(0,0,0,0.35));
        }

        .sk-x      { animation: sk-x 7s linear infinite; }
        .sk-y      { animation: sk-y 7s ease-in-out infinite; }
        .sk-shadow { transform-box: fill-box; transform-origin: 50% 50%; animation: sk-shadow 7s ease-in-out infinite; }
        .sk-board  { transform-box: fill-box; transform-origin: 50% 50%; animation: sk-board 7s ease-in-out infinite; }
        .sk-board-flip { transform-box: fill-box; transform-origin: 50% 50%; animation: sk-flip 7s linear infinite; }
        .sk-wheel  { animation: sk-wheel 0.45s linear infinite; }
        .sk-rider  { transform-box: fill-box; transform-origin: 50% 100%; animation: sk-rider 7s ease-in-out infinite; }
        .sk-arm-front { transform-box: fill-box; transform-origin: 0% 0%; animation: sk-arm-f 7s ease-in-out infinite; }
        .sk-arm-back  { transform-box: fill-box; transform-origin: 100% 0%; animation: sk-arm-b 7s ease-in-out infinite; }

        /* horizontal travel across the strip */
        @keyframes sk-x {
          0%   { transform: translateX(-40px); }
          100% { transform: translateX(360px); }
        }

        /* jump arc: crouch at 38%, pop at 42%, peak ~50%, land 58% */
        @keyframes sk-y {
          0%, 40%   { transform: translateY(0); }
          46%       { transform: translateY(-30px); }
          50%       { transform: translateY(-34px); }
          54%       { transform: translateY(-28px); }
          58%, 100% { transform: translateY(0); }
        }
        @keyframes sk-shadow {
          0%, 40%   { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(0.55); opacity: 0.45; }
          58%, 100% { transform: scale(1);    opacity: 1; }
        }

        /* tail snaps down on the pop, nose levels out at the peak */
        @keyframes sk-board {
          0%, 40% { transform: rotate(0deg); }
          43%     { transform: rotate(-16deg); }
          47%     { transform: rotate(-4deg); }
          53%     { transform: rotate(4deg); }
          58%, 100% { transform: rotate(0deg); }
        }

        /* kickflip: one turn around the long axis, read as scaleY 1 -> -1 -> 1 */
        @keyframes sk-flip {
          0%, 44%   { transform: scaleY(1); }
          47%       { transform: scaleY(0.05); }
          49.5%     { transform: scaleY(-1); }
          52%       { transform: scaleY(0.05); }
          55%, 100% { transform: scaleY(1); }
        }

        @keyframes sk-wheel { to { transform: rotate(360deg); } }

        /* crouch before the pop, tuck in the air, absorb the landing */
        @keyframes sk-rider {
          0%, 34%   { transform: translateY(0) scaleY(1); }
          40%       { transform: translateY(0) scaleY(0.86); }
          43%       { transform: translateY(-2px) scaleY(1.03); }
          48%       { transform: translateY(-6px) scaleY(0.84); }
          54%       { transform: translateY(-3px) scaleY(0.92); }
          58%       { transform: translateY(0) scaleY(0.84); }
          64%, 100% { transform: translateY(0) scaleY(1); }
        }

        /* arms rise for balance through the trick */
        @keyframes sk-arm-f {
          0%, 40%   { transform: rotate(0deg); }
          48%       { transform: rotate(-28deg); }
          58%, 100% { transform: rotate(0deg); }
        }
        @keyframes sk-arm-b {
          0%, 40%   { transform: rotate(0deg); }
          48%       { transform: rotate(26deg); }
          58%, 100% { transform: rotate(0deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sk-x, .sk-y, .sk-shadow, .sk-board, .sk-board-flip, .sk-wheel, .sk-rider, .sk-arm-front, .sk-arm-back {
            animation: none;
          }
          .sk-x { transform: translateX(260px); }
        }
      `}</style>
    </div>
  );
}
