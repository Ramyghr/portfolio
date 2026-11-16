"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/lib/store";
import { sfx } from "@/lib/sound";
import AppIcon from "./AppIcon";

export default function MenuBar({
  wallpaperLabel,
  onCycleWallpaper,
  onSearch,
}: {
  wallpaperLabel: string;
  onCycleWallpaper: () => void;
  onSearch: () => void;
}) {
  const [time, setTime] = useState<string>("");
  const muted = useOS((s) => s.muted);
  const toggleMuted = useOS((s) => s.toggleMuted);
  const windows = useOS((s) => s.windows);
  const topZ = windows.length ? Math.max(...windows.map((w) => w.zIndex)) : -1;
  const activeTitle = windows.find((w) => w.zIndex === topZ && !w.minimized)?.title;

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  const chip = "title-chip flex items-center gap-1.5 px-2.5 py-0.5 hover:bg-white cursor-pointer";

  return (
    <div className="menu-bar fixed top-0 left-0 right-0 h-7 z-[9999] flex items-center justify-between px-3 text-(--color-ink)">
      <div className="flex items-center gap-3 text-[12.5px] min-w-0">
        <span className="font-semibold tracking-tight whitespace-nowrap">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500 align-middle" title="Open to opportunities" />
          ramy.gharbi
        </span>
        <span className="hidden md:inline opacity-60 truncate">{activeTitle ? activeTitle : "Desktop"}</span>
      </div>
      <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
        <a href="/cv" className={`${chip} hidden sm:flex`} title="A plain one-page version of this site">
          Plain CV
        </a>
        <button type="button" onClick={onSearch} className={chip} title="Search (Ctrl+K)" aria-label="Search">
          <AppIcon name="search" size={13} strokeWidth={1.8} />
          <span className="hidden md:inline">Search</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onCycleWallpaper();
            sfx.toggle();
          }}
          className={chip}
          title="Change wallpaper"
          aria-label={`Change wallpaper (current: ${wallpaperLabel})`}
        >
          <AppIcon name="palette" size={13} strokeWidth={1.8} />
          <span className="hidden md:inline">{wallpaperLabel}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            toggleMuted();
            sfx.toggle();
          }}
          className={chip}
          title={muted ? "Turn sound on" : "Turn sound off"}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
        >
          <AppIcon name={muted ? "mute" : "sound"} size={13} strokeWidth={1.8} />
          <span className="hidden md:inline">{muted ? "Sound off" : "Sound on"}</span>
        </button>
        <span className="px-1.5 py-0.5 tabular-nums">{time}</span>
      </div>
    </div>
  );
}
