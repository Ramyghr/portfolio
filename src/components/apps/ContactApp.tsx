"use client";

import { contact } from "@/lib/about";
import { sfx } from "@/lib/sound";

export default function ContactApp() {
  return (
    <div className="p-5 text-sm leading-relaxed flex flex-col gap-4">
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

      <a
        href={`mailto:${contact.email}`}
        onClick={() => sfx.click()}
        className="pixel-btn flex items-center justify-between px-3 py-2"
      >
        <span className="font-pixel text-[10px]">EMAIL</span>
        <span className="text-[11px] text-(--color-ink-soft)">{contact.email}</span>
      </a>

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
    </div>
  );
}
