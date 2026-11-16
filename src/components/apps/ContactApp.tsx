"use client";

import { useState } from "react";
import { contact } from "@/lib/about";
import { sfx } from "@/lib/sound";

export default function ContactApp() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };
  return (
    <div className="p-5 text-sm leading-relaxed flex flex-col gap-3">
      <h2 className="font-pixel text-xs text-(--color-accent)">GET IN TOUCH</h2>
      <p>Best reached here, in this order:</p>

      <a
        href={contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sfx.click()}
        className="pixel-btn flex items-center justify-between px-3 py-2"
      >
        <span className="font-pixel text-[10px]">LINKEDIN</span>
        <span className="text-[11px] text-(--color-ink-soft)">ramy-gharbi ↗</span>
      </a>

      <div className="pixel-btn flex items-center justify-between gap-2 px-3 py-2 hover:transform-none!">
        <a href={`mailto:${contact.email}`} onClick={() => sfx.click()} className="flex-1 min-w-0 flex items-center justify-between gap-2">
          <span className="font-pixel text-[10px]">EMAIL</span>
          <span className="text-[11px] text-(--color-ink-soft) truncate">{contact.email}</span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="shrink-0 title-chip px-2 py-0.5 text-[10.5px] font-medium hover:bg-(--color-paper-dark) cursor-pointer"
          aria-live="polite"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sfx.click()}
        className="pixel-btn flex items-center justify-between px-3 py-2"
      >
        <span className="font-pixel text-[10px]">RESUME.PDF</span>
        <span className="text-[11px] text-(--color-ink-soft)">download ↗</span>
      </a>

      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sfx.click()}
        className="pixel-btn flex items-center justify-between px-3 py-2"
      >
        <span className="font-pixel text-[10px]">GITHUB</span>
        <span className="text-[11px] text-(--color-ink-soft)">Ramyghr ↗</span>
      </a>

      <a
        href={contact.kaggle}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sfx.click()}
        className="pixel-btn flex items-center justify-between px-3 py-2"
      >
        <span className="font-pixel text-[10px]">KAGGLE</span>
        <span className="text-[11px] text-(--color-ink-soft)">tretn3 ↗</span>
      </a>
    </div>
  );
}
