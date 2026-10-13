"use client";

import { sfx } from "@/lib/sound";

export default function DesktopIcon({
  icon,
  label,
  onOpen,
  testId,
}: {
  icon: string;
  label: string;
  onOpen: () => void;
  testId?: string;
}) {
  return (
    <button
      data-testid={testId}
      onDoubleClick={() => {
        sfx.open();
        onOpen();
      }}
      onClick={() => sfx.click()}
      className="flex flex-col items-center gap-1 w-20 group"
    >
      <span className="text-4xl drop-shadow-[2px_2px_0_rgba(20,16,8,0.3)] group-active:scale-95 transition-transform">
        {icon}
      </span>
      <span className="title-chip font-pixel text-[9px] px-1.5 py-0.5 text-center leading-tight group-hover:bg-(--color-accent) group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
