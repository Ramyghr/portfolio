export default function ClassicPattern() {
  return (
    <div className="absolute inset-0 desktop-bg-classic">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.25), transparent 60%)",
        }}
      />
    </div>
  );
}
