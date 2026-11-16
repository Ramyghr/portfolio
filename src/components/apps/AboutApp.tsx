"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { beyondTech, type BeyondTechItem } from "@/lib/about";

// Each tile gets its own soft tint so the grid reads as a set even without photos.
const tint = (index: number) => {
  const hue = (index * 47 + 232) % 360;
  return { background: `hsl(${hue} 70% 94%)`, color: `hsl(${hue} 45% 32%)` };
};

/** The photo if one exists; otherwise a designed card (number + title), never a "pending" box. */
function TileArt({
  item,
  index,
  sizes,
  big = false,
}: {
  item: BeyondTechItem;
  index: number;
  sizes: string;
  big?: boolean;
}) {
  if (item.photo) {
    return <Image src={`/about/${item.slug}.jpg`} alt={item.label} fill sizes={sizes} className="object-cover" />;
  }
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-3" style={tint(index)}>
      <span className={`font-mono ${big ? "text-sm" : "text-[10px]"} opacity-70`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      {big ? (
        <p className="text-[24px] sm:text-[28px] font-semibold leading-[1.18] tracking-tight pb-24">{item.caption}</p>
      ) : (
        <span className="text-[19px] font-semibold leading-none tracking-tight">{item.label.split(" ")[0]}</span>
      )}
    </div>
  );
}

function PolaroidSlot({ item, index, onOpen }: { item: BeyondTechItem; index: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${item.label}`}
      className="text-left cursor-pointer bg-white rounded-xl border border-black/5 p-2 pb-4 shadow-[0_8px_24px_-10px_rgba(15,23,42,0.3)] rotate-[var(--r)] hover:rotate-0 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(15,23,42,0.45)] focus-visible:outline-2 focus-visible:outline-(--color-accent) transition-all duration-200"
      style={{ ["--r" as string]: `${((item.slug.charCodeAt(0) % 5) - 2) * 1.1}deg` }}
    >
      <div className="relative w-full aspect-square rounded-lg bg-(--color-paper-dark) overflow-hidden">
        <TileArt item={item} index={index} sizes="200px" />
      </div>
      <p className="font-pixel text-[10px] text-center mt-2 leading-tight">{item.label}</p>
      {item.note && <p className="text-[10px] text-center text-(--color-accent) mt-0.5">{item.note}</p>}
    </button>
  );
}

function PhotoViewer({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const item = beyondTech[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fadeIn_160ms_ease-out]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[min(560px,92vw)] bg-white rounded-2xl p-3 pb-4 shadow-2xl"
      >
        <div className="relative w-full aspect-[4/5] max-h-[72vh] rounded-xl overflow-hidden bg-(--color-paper-dark)">
          <TileArt key={item.slug} item={item} index={index} sizes="(max-width: 600px) 92vw, 560px" big />
          {item.photo ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pt-14 pb-4 text-white">
              <p className="font-pixel text-[11px] tracking-wide mb-1.5">{item.label.toUpperCase()}</p>
              <p className="text-[13px] leading-snug text-white/90">{item.caption}</p>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3" style={{ color: tint(index).color }}>
              <p className="font-pixel text-[11px] tracking-wide">{item.label.toUpperCase()}</p>
              {item.note && <p className="text-[12px] mt-0.5 opacity-80">{item.note}</p>}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 px-1 text-xs text-(--color-ink-soft)">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="px-2 py-1 rounded-md hover:bg-black/5 cursor-pointer"
            aria-label="Previous photo"
          >
            ← prev
          </button>
          <span className="font-mono">
            {String(index + 1).padStart(2, "0")} / {String(beyondTech.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="px-2 py-1 rounded-md hover:bg-black/5 cursor-pointer"
            aria-label="Next photo"
          >
            next →
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg text-(--color-ink) hover:scale-105 transition-transform cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function AboutApp() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + beyondTech.length) % beyondTech.length)),
    [],
  );

  return (
    <div className="p-5 text-sm leading-relaxed">
      <h2 className="font-pixel text-xs mb-3 text-(--color-accent)">WHO IS RUNNING THIS MACHINE?</h2>
      <p className="mb-2">
        Hard to say for sure. The uptime logs point to one person — the process list reads more
        like thirteen.
      </p>
      <p className="mb-2">
        During office hours it compiles trading engines, forecasting models and platforms that move
        real money. After hours, the fans spin up for reasons that never make it into a commit.
      </p>
      <p className="mb-5 text-(--color-ink-soft)">
        Open a file. Each one is a process that never fully shuts down.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-2">
        {beyondTech.map((item, i) => (
          <PolaroidSlot key={item.slug} item={item} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>
      <p className="mt-5 text-[11px] text-(--color-ink-soft) italic">
        Process list incomplete. Some things only load in person.
      </p>
      {open !== null && <PhotoViewer index={open} onClose={close} onStep={step} />}
    </div>
  );
}
