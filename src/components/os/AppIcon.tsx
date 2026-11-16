// Minimal line-icon set. Every icon is drawn on a 24×24 grid with a single
// stroke weight and inherits `currentColor`, so it adapts to wherever it sits.

const PATHS: Record<string, React.ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="11.5" rx="2" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" />
      <path d="M3.5 12.5h17" />
    </>
  ),
  folder: (
    <path d="M3.5 7a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5Z" />
  ),
  terminal: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m7.5 10 2.5 2-2.5 2" />
      <path d="M12.5 14.5h4" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h6.5l4 4V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M13.5 3.5V7.5h4" />
      <path d="M8.5 12.5h6M8.5 15.5h4" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="15" r="4.5" />
      <path d="M9 11 6.5 3.5h3.5L12 8.5 14 3.5h3.5L15 11" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="m4 17 5-4.5 3.5 3 3-2.5 4.5 4" />
    </>
  ),
  home: (
    <>
      <path d="m4 11 8-6.5 8 6.5" />
      <path d="M6 9.5V19h12V9.5" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4.5V19.5H20" />
      <path d="m7 15 3.5-4 3 2.5L19 7" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m19.5 19.5-4.2-4.2" />
    </>
  ),
  sound: (
    <>
      <path d="M4.5 9.5v5h3l4 3.5v-12l-4 3.5Z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" />
    </>
  ),
  mute: (
    <>
      <path d="M4.5 9.5v5h3l4 3.5v-12l-4 3.5Z" />
      <path d="m15.5 9.5 5 5M20.5 9.5l-5 5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.9 2-1.8 0-1.6-1.2-1.7-1.2-3 0-1 .8-1.7 2-1.7h1.7a4 4 0 0 0 4-4c0-3.7-3.8-6.5-8.5-6.5Z" />
      <circle cx="8" cy="11" r="0.9" />
      <circle cx="11" cy="7.5" r="0.9" />
      <circle cx="15.5" cy="8.5" r="0.9" />
    </>
  ),
};

export default function AppIcon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const path = PATHS[name];
  // Unknown names (e.g. an emoji left over in a saved session) render as text.
  if (!path) return <span className={className}>{name}</span>;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {path}
    </svg>
  );
}
