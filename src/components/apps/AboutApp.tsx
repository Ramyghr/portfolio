"use client";

import Image from "next/image";
import { useState } from "react";
import { beyondTech } from "@/lib/about";
import SkaterTrick from "@/components/os/SkaterTrick";

function PolaroidSlot({ slug, label, note }: { slug: string; label: string; note?: string }) {
  const [errored, setErrored] = useState(false);
  const src = `/about/${slug}.jpg`;
  const isSkating = slug === "skating";

  return (
    <div className="bg-white border border-(--color-ink)/70 p-2 pb-4 shadow-[3px_3px_0_rgba(20,16,8,0.25)] rotate-[var(--r)] hover:rotate-0 transition-transform duration-200"
      style={{ ["--r" as string]: `${((slug.charCodeAt(0) % 5) - 2) * 1.1}deg` }}
    >
      <div className="relative w-full aspect-square bg-(--color-paper-dark) overflow-hidden flex items-center justify-center">
        {isSkating ? (
          <SkaterTrick className="w-full h-full scale-125" />
        ) : !errored ? (
          <Image
            src={src}
            alt={label}
            fill
            sizes="200px"
            className="object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-(--color-ink-soft) p-3 text-center">
            <span className="font-pixel text-[9px]">PHOTO PENDING</span>
            <span className="text-[10px] opacity-60">drop a file at</span>
            <span className="text-[9px] font-mono opacity-70">/about/{slug}.jpg</span>
          </div>
        )}
      </div>
      <p className="font-pixel text-[10px] text-center mt-2 leading-tight">{label}</p>
      {note && <p className="text-[10px] text-center text-(--color-accent) mt-0.5">{note}</p>}
    </div>
  );
}

export default function AboutApp() {
  return (
    <div className="p-5 text-sm leading-relaxed">
      <h2 className="font-pixel text-xs mb-3 text-(--color-accent)">WHO IS RUNNING THIS MACHINE</h2>
      <p className="mb-2">
        I build FinTech and AI systems — trading architectures, forecasting pipelines, full-stack
        platforms people actually pay for. That's the day job. This window is the rest of it.
      </p>
      <p className="mb-5 text-(--color-ink-soft)">
        Off-screen, in no particular order:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-2">
        {beyondTech.map((item) => (
          <PolaroidSlot key={item.slug} slug={item.slug} label={item.label} note={item.note} />
        ))}
      </div>
      <p className="mt-5 text-[11px] text-(--color-ink-soft) italic">
        Photos are placeholders — ping me and I&apos;ll drop real ones in.
      </p>
    </div>
  );
}
