export default function ArchitectureDiagram() {
  const Box = ({ label, sub }: { label: string; sub?: string }) => (
    <div className="pixel-btn px-3 py-2 text-center bg-(--color-chrome) shrink-0">
      <div className="font-pixel text-[9px]">{label}</div>
      {sub && <div className="text-[9px] text-(--color-ink-soft) mt-0.5">{sub}</div>}
    </div>
  );
  const Arrow = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={`flex items-center justify-center ${vertical ? "h-5" : "w-6"} text-(--color-accent) font-mono`}>
      {vertical ? "↓" : "→"}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2 py-2 text-(--color-ink)">
      <Box label="NGINX" sub=":80 reverse proxy + rate limit" />
      <Arrow vertical />
      <div className="flex items-center">
        <Box label="NEXT.JS" sub="frontend :3000" />
        <Arrow />
        <Box label="FASTAPI" sub="backend :8000" />
      </div>
      <Arrow vertical />
      <div className="flex items-center gap-3">
        <Box label="POSTGRES" sub="primary DB" />
        <Box label="REDIS" sub="broker / cache" />
        <Box label="CELERY" sub="worker + beat" />
      </div>
      <Arrow vertical />
      <Box label="FLOWER" sub=":5555 task monitor" />
      <div className="mt-2 text-[11px] text-(--color-ink-soft) text-center max-w-xs">
        File storage (contracts, invoices, client docs) offloaded to Cloudflare R2 (S3-compatible) via boto3.
      </div>
    </div>
  );
}
