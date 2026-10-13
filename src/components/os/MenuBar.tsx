"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/lib/store";
import { sfx } from "@/lib/sound";

export default function MenuBar() {
  const [time, setTime] = useState<string>("");
  const muted = useOS((s) => s.muted);
  const toggleMuted = useOS((s) => s.toggleMuted);
  const windows = useOS((s) => s.windows);
  const topZ = windows.length ? Math.max(...windows.map((w) => w.zIndex)) : -1;
  const activeTitle = windows.find((w) => w.zIndex === topZ && !w.minimized)?.title;

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win-titlebar fixed top-0 left-0 right-0 h-7 z-[9999] flex items-center justify-between px-3 bg-(--color-chrome)">
      <div className="flex items-center gap-3 font-pixel text-[10px]">
        <span className="text-(--color-accent)">◆ SYSTEM 7</span>
        <span className="hidden sm:inline opacity-70">
          {activeTitle ? activeTitle : "Finder"}
        </span>
      </div>
      <div className="flex items-center gap-3 font-pixel text-[10px]">
        <button
          onClick={() => {
            toggleMuted();
            sfx.toggle();
          }}
          className="title-chip px-2 py-0.5"
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? "SOUND OFF" : "SOUND ON"}
        </button>
        <span className="title-chip px-2 py-0.5">{time}</span>
      </div>
    </div>
  );
}
