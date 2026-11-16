"use client";

import { useCallback, useEffect, useState } from "react";
import { useOS } from "@/lib/store";

const BOOT_LINES = [
  "GHARBI INDUSTRIES — ramy.os",
  "Checking memory................. 128K OK",
  "Loading FinTech kernel........... OK",
  "Loading AI kernel................ OK",
  "Mounting Projects volume......... OK",
  "Starting desktop...",
];

const LINE_MS = 110;
const HOLD_MS = 350;

/**
 * A short boot sequence (~1s). It finishes on its own, and any key, click or
 * tap skips it — nobody should have to wait or press a button to get in.
 */
export default function BootScreen() {
  const setBooted = useOS((s) => s.setBooted);
  const [lineIdx, setLineIdx] = useState(1);

  const enter = useCallback(() => {
    try {
      localStorage.setItem("gharbi-os-booted", "1");
    } catch {
      /* private mode: just don't remember */
    }
    setBooted(true);
  }, [setBooted]);

  useEffect(() => {
    const done = lineIdx >= BOOT_LINES.length;
    const t = setTimeout(() => (done ? enter() : setLineIdx((i) => i + 1)), done ? HOLD_MS : LINE_MS);
    return () => clearTimeout(t);
  }, [lineIdx, enter]);

  useEffect(() => {
    window.addEventListener("keydown", enter);
    window.addEventListener("pointerdown", enter);
    return () => {
      window.removeEventListener("keydown", enter);
      window.removeEventListener("pointerdown", enter);
    };
  }, [enter]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black text-(--color-crt-green) font-mono flex items-center justify-center scanlines">
      <div className="w-full max-w-md px-6">
        <div className="space-y-1 text-[13px] min-h-[150px]">
          {BOOT_LINES.slice(0, lineIdx).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
        <p className="mt-4 text-[11px] opacity-60">press any key to skip</p>
      </div>
    </div>
  );
}
