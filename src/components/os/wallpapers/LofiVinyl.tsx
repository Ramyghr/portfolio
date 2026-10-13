const MOTES = Array.from({ length: 18 }).map((_, i) => ({
  x: (i * 43) % 100,
  size: (i % 3) + 2,
  dur: 14 + (i % 5) * 3,
  delay: (i * 1.7) % 12,
}));

export default function LofiVinyl() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #3a2a1f 0%, #5c4330 30%, #8a5a3a 60%, #c98a4a 100%)",
        }}
      />

      {/* desk lamp glow, top-left */}
      <div
        className="absolute rounded-full"
        style={{
          top: "-10%",
          left: "-8%",
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(255,214,140,0.45) 0%, rgba(255,214,140,0.12) 45%, transparent 70%)",
          animation: "lamp-pulse 6s ease-in-out infinite",
        }}
      />

      {/* vinyl record, bottom-right */}
      <div
        className="absolute"
        style={{ right: "6%", bottom: "6%", width: 220, height: 220 }}
      >
        <div
          className="w-full h-full rounded-full relative"
          style={{
            background:
              "repeating-radial-gradient(circle at 50% 50%, #140d08 0px, #140d08 3px, #2a1d12 4px, #2a1d12 7px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            animation: "spin 7s linear infinite",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              top: "50%",
              left: "50%",
              width: "32%",
              height: "32%",
              transform: "translate(-50%, -50%)",
              background: "#c9793f",
            }}
          />
          <div
            className="absolute rounded-full bg-[#140d08]"
            style={{
              top: "50%",
              left: "50%",
              width: "6%",
              height: "6%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        {/* tonearm */}
        <div
          className="absolute"
          style={{
            top: "-6%",
            right: "-10%",
            width: 90,
            height: 6,
            background: "#1a1a1a",
            borderRadius: 3,
            transformOrigin: "100% 50%",
            transform: "rotate(18deg)",
          }}
        />
      </div>

      {/* floating dust motes */}
      {MOTES.map((m, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-100/70"
          style={{
            left: `${m.x}%`,
            bottom: "-5%",
            width: m.size,
            height: m.size,
            animation: `float-up ${m.dur}s linear ${m.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes lamp-pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float-up {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
