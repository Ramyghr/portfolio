"use client";

import { sfx } from "@/lib/sound";
import AppIcon from "./AppIcon";

/** A desktop launcher. One click or tap opens it — no double-click needed. */
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
      type="button"
      data-testid={testId}
      onClick={() => {
        sfx.open();
        onOpen();
      }}
      className="flex flex-col items-center gap-1 w-20 group cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-2"
    >
      <span className="grid place-items-center h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)] group-hover:bg-white/25 group-hover:border-white/40 group-active:scale-95 transition-all">
        <AppIcon name={icon} size={26} strokeWidth={1.4} />
      </span>
      <span className="rounded-md px-1.5 py-0.5 text-[11.5px] font-medium text-white text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] group-hover:bg-(--color-accent)">
        {label}
      </span>
    </button>
  );
}
