const BUILDINGS = [
  { x: 0, w: 9, h: 38 },
  { x: 9, w: 6, h: 55 },
  { x: 15, w: 10, h: 30 },
  { x: 25, w: 7, h: 62 },
  { x: 32, w: 11, h: 42 },
  { x: 43, w: 6, h: 70 },
  { x: 49, w: 9, h: 33 },
  { x: 58, w: 8, h: 50 },
  { x: 66, w: 12, h: 65 },
  { x: 78, w: 7, h: 36 },
  { x: 85, w: 9, h: 58 },
  { x: 94, w: 6, h: 44 },
];

// Deterministic "random" window lights per building (seeded by index, no Math.random to avoid hydration drift)
function windowsFor(bIdx: number, bw: number, bh: number) {
  const cols = Math.max(2, Math.floor(bw / 2.2));
  const rows = Math.max(3, Math.floor(bh / 7));
  const lights: { cx: number; cy: number; delay: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = (bIdx * 31 + r * 7 + c * 13) % 10;
      if (seed > 5) continue; // ~40% lit
      lights.push({
        cx: (c + 0.5) * (bw / cols),
        cy: bh - (r + 0.5) * (bh / rows),
        delay: ((bIdx * 13 + r * 5 + c * 3) % 50) / 10,
      });
    }
  }
  return lights;
}

const STARS = Array.from({ length: 28 }).map((_, i) => ({
  x: (i * 37) % 100,
  y: (i * 53) % 55,
  delay: (i * 7) % 40 / 10,
  size: (i % 3) + 1,
}));

export default function LofiNight() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #241433 0%, #4a2a52 35%, #8a4a5c 62%, #c97b5a 85%, #e3a564 100%)",
        }}
      />

      {/* stars */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill="#fff"
            style={{ animation: `twinkle 3.4s ease-in-out ${s.delay}s infinite` }}
          />
        ))}
      </svg>

      {/* moon */}
      <div
        className="absolute rounded-full"
        style={{
          top: "8%",
          right: "12%",
          width: 46,
          height: 46,
          background: "#f7e8c8",
          boxShadow: "0 0 30px 8px rgba(247,232,200,0.35)",
        }}
      />

      {/* drifting clouds */}
      <div className="absolute inset-0">
        <div
          className="absolute rounded-full opacity-20 bg-white blur-md"
          style={{ top: "18%", width: 160, height: 28, animation: "drift 60s linear infinite" }}
        />
        <div
          className="absolute rounded-full opacity-15 bg-white blur-md"
          style={{ top: "28%", width: 110, height: 20, animation: "drift 90s linear infinite", animationDelay: "-30s" }}
        />
      </div>

      {/* skyline */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 100 70"
        preserveAspectRatio="none"
        style={{ height: "42%", shapeRendering: "crispEdges" }}
      >
        {BUILDINGS.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={70 - b.h} width={b.w} height={b.h} fill="#1a1020" />
            {windowsFor(i, b.w, b.h).map((w, j) => (
              <rect
                key={j}
                x={b.x + w.cx - 0.5}
                y={70 - w.cy - 0.6}
                width={1}
                height={1.2}
                fill="#ffd27d"
                style={{ animation: `window-blink 5s ease-in-out ${w.delay}s infinite` }}
              />
            ))}
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
        @keyframes drift { from { transform: translateX(-20%); } to { transform: translateX(120%); } }
        @keyframes window-blink { 0%, 40%, 100% { opacity: 0.85; } 45%, 55% { opacity: 0.15; } 60% { opacity: 0.85; } }
      `}</style>
    </div>
  );
}
