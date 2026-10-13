const EMBERS = Array.from({ length: 16 }).map((_, i) => ({
  x: (i * 41 + 7) % 100,
  size: (i % 3) + 1.5,
  dur: 10 + (i % 5) * 2.5,
  delay: (i * 1.3) % 9,
  drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 6),
}));

const CASTLE_WINDOWS = [
  { x: 48, y: 30, delay: 0.4 },
  { x: 48, y: 25, delay: 2.1 },
  { x: 56, y: 22, delay: 1.1 },
  { x: 56, y: 17, delay: 3.4 },
  { x: 64, y: 28, delay: 0.8 },
  { x: 71, y: 24, delay: 2.6 },
];

const BATS = [
  { y: 16, dur: 13, delay: 0, scale: 1 },
  { y: 26, dur: 17, delay: -5, scale: 0.75 },
  { y: 10, dur: 21, delay: -11, scale: 0.6 },
];

export default function DarkFantasy() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #07040c 0%, #190a1f 30%, #3a1226 58%, #601a22 80%, #7a2a1f 100%)",
        }}
      />

      {/* blood moon */}
      <div
        className="absolute rounded-full"
        style={{
          top: "10%",
          right: "16%",
          width: 60,
          height: 60,
          background: "radial-gradient(circle at 35% 35%, #f2c08a 0%, #c9592f 70%, #8c2c1d 100%)",
          boxShadow: "0 0 55px 14px rgba(201,89,47,0.35)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "10%",
          right: "16%",
          width: 60,
          height: 60,
          background: "rgba(8,3,10,0.55)",
          clipPath: "ellipse(38% 50% at 30% 50%)",
        }}
      />

      {/* bats */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {BATS.map((b, i) => (
          <g
            key={i}
            style={{
              animation: `bat-fly ${b.dur}s linear ${b.delay}s infinite`,
              transformBox: "view-box",
            }}
          >
            <path
              d={`M 0 ${b.y} q -4 -3 -7 0 q 3 1 4 3 q 1 -2 3 -3 q 2 1 3 3 q 1 -2 4 -3 q -3 -3 -7 0 Z`}
              fill="#0c0509"
              opacity={0.75}
              style={{
                animation: `bat-flap 0.4s ease-in-out ${b.delay}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "50% 50%",
              }}
              transform={`scale(${b.scale})`}
            />
          </g>
        ))}
      </svg>

      {/* embers rising */}
      {EMBERS.map((e, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: "4%",
            width: e.size,
            height: e.size,
            background: "#ff9d52",
            boxShadow: "0 0 4px 1px rgba(255,140,60,0.8)",
            ["--drift" as string]: `${e.drift}px`,
            animation: `ember-rise ${e.dur}s ease-in ${e.delay}s infinite`,
          }}
        />
      ))}

      {/* mountain ridge */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        style={{ height: "34%" }}
      >
        <polygon
          points="0,40 0,24 10,16 18,26 28,10 38,22 47,14 55,24 63,18 72,28 82,13 90,23 100,17 100,40"
          fill="#0b0609"
        />
      </svg>

      {/* castle silhouette, sitting on the ridge */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        style={{ height: "34%", shapeRendering: "crispEdges" }}
      >
        <g fill="#050208">
          <rect x="44" y="18" width="6" height="18" />
          <polygon points="44,18 47,13 50,18" />
          <rect x="52" y="12" width="7" height="24" />
          <polygon points="52,12 55.5,6 59,12" />
          <rect x="61" y="20" width="5" height="16" />
          <polygon points="61,20 63.5,15 66,20" />
          <rect x="48" y="24" width="12" height="12" />
        </g>
        {CASTLE_WINDOWS.map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width="1.1"
            height="1.6"
            fill="#ffb15e"
            style={{ animation: `window-blink 4.5s ease-in-out ${w.delay}s infinite` }}
          />
        ))}
      </svg>

      {/* drifting fog */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: "2%", height: 40, background: "linear-gradient(to top, rgba(10,4,8,0.55), transparent)" }}
      />
      <div
        className="absolute rounded-full blur-xl"
        style={{
          bottom: "4%",
          width: "60%",
          height: 44,
          background: "rgba(60,30,40,0.35)",
          animation: "fog-drift 46s linear infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-xl"
        style={{
          bottom: "1%",
          width: "45%",
          height: 32,
          background: "rgba(40,18,28,0.4)",
          animation: "fog-drift 34s linear infinite",
          animationDelay: "-12s",
        }}
      />

      {/* rare distant lightning flicker */}
      <div className="absolute inset-0 bg-white pointer-events-none" style={{ animation: "lightning 19s linear infinite" }} />

      <style>{`
        @keyframes window-blink { 0%, 40%, 100% { opacity: 0.85; } 45%, 55% { opacity: 0.1; } 60% { opacity: 0.85; } }
        @keyframes ember-rise {
          0%   { transform: translate(0, 0); opacity: 0; }
          12%  { opacity: 0.9; }
          85%  { opacity: 0.5; }
          100% { transform: translate(var(--drift), -90vh); opacity: 0; }
        }
        @keyframes fog-drift {
          from { transform: translateX(-30%); }
          to   { transform: translateX(130%); }
        }
        @keyframes bat-fly {
          0%   { transform: translateX(-10%); }
          100% { transform: translateX(110%); }
        }
        @keyframes bat-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        @keyframes lightning {
          0%, 96%, 100% { opacity: 0; }
          97% { opacity: 0.18; }
          97.5% { opacity: 0; }
          98% { opacity: 0.1; }
          98.5% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
