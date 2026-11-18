// Default wallpaper: soft drifting colour blobs over a deep indigo base,
// blurred into an aurora-style mesh gradient, with a faint grain on top.
const BLOBS = [
  { color: "#6366f1", size: 60, x: 8, y: 6, dur: 22, delay: 0 },
  { color: "#ec4899", size: 52, x: 58, y: 2, dur: 26, delay: -6 },
  { color: "#06b6d4", size: 56, x: 62, y: 52, dur: 24, delay: -12 },
  { color: "#8b5cf6", size: 48, x: 4, y: 54, dur: 28, delay: -3 },
  { color: "#f59e0b", size: 30, x: 38, y: 34, dur: 30, delay: -16 },
];

export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0b1026" }}>
      <div className="absolute inset-0" style={{ filter: "blur(80px) saturate(140%)" }}>
        {BLOBS.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}vmax`,
              height: `${b.size}vmax`,
              background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, transparent 65%)`,
              opacity: 0.85,
              animation: `aurora-drift ${b.dur}s ease-in-out ${b.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* light sheen from the top + vignette, keeps icons/text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(ellipse at 50% 120%, rgba(5,8,25,0.55), transparent 60%)",
        }}
      />

      {/* film grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-overlay pointer-events-none">
        <filter id="aurora-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#aurora-grain)" />
      </svg>

      <style>{`
        @keyframes aurora-drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(6vw, 4vh) scale(1.12); }
          100% { transform: translate(-5vw, 7vh) scale(0.94); }
        }
      `}</style>
    </div>
  );
}
