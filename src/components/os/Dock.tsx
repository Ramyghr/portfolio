"use client";

import { useOS } from "@/lib/store";
import { sfx } from "@/lib/sound";

export default function Dock() {
  const windows = useOS((s) => s.windows);
  const restoreWindow = useOS((s) => s.restoreWindow);
  const focusWindow = useOS((s) => s.focusWindow);

  if (windows.length === 0) return null;

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] flex items-end gap-2 win-chrome px-2 py-1.5">
      {windows.map((w) => (
        <button
          key={w.id}
          onClick={() => {
            sfx.click();
            if (w.minimized) restoreWindow(w.id);
            else focusWindow(w.id);
          }}
          className={`pixel-btn flex flex-col items-center px-2 py-1 ${
            w.minimized ? "opacity-50" : ""
          }`}
          title={w.title}
        >
          <span className="text-lg leading-none">{w.icon}</span>
        </button>
      ))}
    </div>
  );
}
