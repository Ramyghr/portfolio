"use client";

import AppIcon from "./AppIcon";
import { useOS } from "@/lib/store";
import { sfx } from "@/lib/sound";

export default function Dock() {
  const windows = useOS((s) => s.windows);
  const restoreWindow = useOS((s) => s.restoreWindow);
  const focusWindow = useOS((s) => s.focusWindow);

  if (windows.length === 0) return null;

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] flex items-end gap-1.5 win-chrome rounded-2xl! px-2 py-2">
      {windows.map((w) => (
        <button
          key={w.id}
          onClick={() => {
            sfx.click();
            if (w.minimized) restoreWindow(w.id);
            else focusWindow(w.id);
          }}
          className={`flex flex-col items-center rounded-xl px-2 py-1.5 hover:bg-white/70 hover:-translate-y-0.5 transition-all ${
            w.minimized ? "opacity-50" : ""
          }`}
          title={w.title}
        >
          <AppIcon name={w.icon} size={20} className="text-(--color-ink)" />
          <span className={`mt-1 h-1 w-1 rounded-full ${w.minimized ? "bg-transparent" : "bg-(--color-ink)/50"}`} />
        </button>
      ))}
    </div>
  );
}
