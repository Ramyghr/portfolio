const STARS = Array.from({ length: 40 }).map((_, i) => ({
  x: (i * 29) % 100,
  y: (i * 41) % 42,
  delay: (i * 6) % 40 / 10,
  size: (i % 3) + 1,
}));

const MOUNTAIN_LAYERS = [
  {
    color: "#2a1245",
    opacity: 0.9,
    points: "0,40 0,22 12,10 24,20 34,6 46,18 58,8 70,22 82,12 92,24 100,16 100,40",
  },
  {
    color: "#190a30",
    opacity: 1,
    points: "0,40 0,30 10,22 22,30 32,18 44,28 56,20 68,30 80,20 90,28 100,24 100,40",
  },
];

const GRID_LINES_H = 10; // horizontal perspective lines
const GRID_LINES_V = 12; // vertical converging lines

export default function SynthwaveHorizon() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0b0420 0%, #241048 28%, #591c5e 52%, #c23a6b 72%, #ff7b4f 86%, #ffb04f 100%)",
        }}
      />

      {/* stars, upper sky only */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill="#fff"
            style={{ animation: `sw-twinkle 3.2s ease-in-out ${s.delay}s infinite` }}
          />
        ))}
      </svg>

      {/* sun, striped like classic retrowave */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          left: "50%",
          top: "34%",
          width: 220,
          height: 220,
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(to bottom, #ffe37a 0%, #ff9d5c 45%, #ff5f7e 75%, #e23a6e 100%)",
          boxShadow: "0 0 90px 20px rgba(255,120,110,0.45)",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              bottom: `${8 + i * 9}%`,
              height: `${3 + i}%`,
              background: "#190a30",
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      {/* mountain silhouettes */}
      <svg
        className="absolute bottom-[30%] left-0 w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        style={{ height: "22%" }}
      >
        {MOUNTAIN_LAYERS.map((m, i) => (
          <polygon key={i} points={m.points} fill={m.color} opacity={m.opacity} />
        ))}
      </svg>

      {/* perspective grid floor */}
      <div className="absolute left-0 right-0 bottom-0" style={{ height: "30%", background: "#0b0420" }}>
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
        >
          {Array.from({ length: GRID_LINES_V }).map((_, i) => {
            const t = i / (GRID_LINES_V - 1);
            const topX = 35 + t * 30; // converge near horizon
            const bottomX = t * 100 - 30; // spread wide at bottom
            return (
              <line
                key={`v${i}`}
                x1={topX}
                y1={0}
                x2={bottomX}
                y2={60}
                stroke="#ff5f9e"
                strokeWidth="0.4"
                opacity="0.55"
              />
            );
          })}
          {Array.from({ length: GRID_LINES_H }).map((_, i) => {
            const t = i / (GRID_LINES_H - 1);
            const y = (t * t) * 60; // denser near horizon, like perspective
            return (
              <line
                key={`h${i}`}
                x1={0}
                y1={y}
                x2={100}
                y2={y}
                stroke="#ff5f9e"
                strokeWidth="0.35"
                opacity="0.5"
                className="sw-grid-h"
              />
            );
          })}
        </svg>
        <div
          className="absolute left-0 right-0 top-0"
          style={{ height: "40%", background: "linear-gradient(to bottom, rgba(226,58,110,0.35), transparent)" }}
        />
      </div>

      <style>{`
        @keyframes sw-twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}
