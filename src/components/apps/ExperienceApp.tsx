"use client";

import { experience, education } from "@/lib/experience";

export default function ExperienceApp() {
  return (
    <div className="p-5 text-sm leading-relaxed">
      <h2 className="font-pixel text-xs mb-4 text-(--color-accent)">EXPERIENCE.LOG</h2>
      <div className="space-y-5">
        {experience.map((e, i) => (
          <div key={i} className="border-l-2 border-(--color-ink)/30 pl-3 relative">
            <div className="absolute -left-[5px] top-1 h-2 w-2 bg-(--color-accent) rounded-full" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="font-semibold">{e.role}</span>
              <span className="font-mono text-[11px] text-(--color-ink-soft)">{e.period}</span>
            </div>
            <div className="text-[12px] text-(--color-ink-soft) italic">
              {e.org}
              {e.context ? ` — ${e.context}` : ""}
            </div>
            <p className="mt-1 text-[13px]">{e.bullet}</p>
          </div>
        ))}
      </div>

      <h2 className="font-pixel text-xs mt-7 mb-3 text-(--color-accent)">EDUCATION</h2>
      <div className="space-y-2">
        {education.map((ed, i) => (
          <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-3 text-[13px]">
            <span>
              <span className="font-semibold">{ed.degree}</span>
              <span className="text-(--color-ink-soft)"> — {ed.school}</span>
            </span>
            <span className="font-mono text-[11px] text-(--color-ink-soft)">{ed.period}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
