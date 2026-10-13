export default function PipelineDiagram() {
  const steps = [
    { label: "INPUT", sub: "incoming images" },
    { label: "DETECT", sub: "face detector locates faces" },
    { label: "EMBED", sub: "face → vector representation" },
    { label: "CLUSTER", sub: "group similar faces at scale" },
    { label: "MATCH", sub: "clusters → known profiles" },
  ];
  const storage = [
    { label: "METADATA", sub: "MongoDB" },
    { label: "IMAGES", sub: "S3-compatible storage" },
    { label: "EMBEDDINGS", sub: "indexed for similarity search" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="pixel-btn px-3 py-2 text-center bg-(--color-chrome)">
              <div className="font-pixel text-[9px]">{s.label}</div>
              <div className="text-[9px] text-(--color-ink-soft) mt-0.5 max-w-[110px]">{s.sub}</div>
            </div>
            {i < steps.length - 1 && <span className="text-(--color-accent) font-mono">→</span>}
          </div>
        ))}
      </div>
      <span className="text-(--color-accent) font-mono">↓</span>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {storage.map((s) => (
          <div key={s.label} className="pixel-btn px-3 py-2 text-center bg-(--color-chrome)">
            <div className="font-pixel text-[9px]">{s.label}</div>
            <div className="text-[9px] text-(--color-ink-soft) mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-(--color-ink-soft) text-center max-w-sm">
        Served behind a FastAPI inference API (ONNX Runtime, Docker) tuned for low latency.
      </p>
    </div>
  );
}
