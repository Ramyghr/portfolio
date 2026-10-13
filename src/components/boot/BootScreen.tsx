"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useOS } from "@/lib/store";
import { sfx, startAmbient, unlockAudio } from "@/lib/sound";

const BOOT_LINES = [
  "GHARBI INDUSTRIES — SYSTEM 7.0",
  "Checking memory................. 128K OK",
  "Loading FinTech kernel........... OK",
  "Loading AI kernel................ OK",
  "Mounting Projects volume......... OK",
  "Mounting Experience volume....... OK",
  "Starting Finder...",
];

export default function BootScreen() {
  const setBooted = useOS((s) => s.setBooted);
  const muted = useOS((s) => s.muted);
  const [lineIdx, setLineIdx] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (lineIdx >= BOOT_LINES.length) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setLineIdx((i) => i + 1), 260 + Math.random() * 180);
    return () => clearTimeout(t);
  }, [lineIdx]);

  const enter = () => {
    unlockAudio();
    sfx.bootChime();
    if (!muted) startAmbient(false);
    localStorage.setItem("gharbi-os-booted", "1");
    setBooted(true);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black text-(--color-crt-green) font-mono flex items-center justify-center scanlines boot-flicker">
      <div className="w-full max-w-md px-6">
        <div className="space-y-1 text-[13px] min-h-[180px]">
          {BOOT_LINES.slice(0, lineIdx).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>

        {ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <p className="text-[11px] opacity-80">Ready. Sound is on — turn your volume up.</p>
            <button
              onClick={enter}
              className="border border-(--color-crt-green) px-4 py-2 font-mono text-[12px] hover:bg-(--color-crt-green) hover:text-black transition-colors"
            >
              ENTER SYSTEM 7 →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
