"use client";

import { useOS } from "@/lib/store";
import { projects, forgottenAchievement } from "@/lib/projects";
import { projectAppDef } from "@/lib/appRegistry";
import { sfx } from "@/lib/sound";

export default function ProjectsFolder() {
  const openWindow = useOS((s) => s.openWindow);

  const open = (slug: string, title: string) => {
    sfx.click();
    openWindow(projectAppDef(slug, title), { title: `${title}.doc` });
  };

  return (
    <div className="p-5">
      <h2 className="font-pixel text-xs mb-4 text-(--color-accent)">PROJECTS — DOUBLE-CLICK TO OPEN</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {projects.map((p) => (
          <button
            key={p.slug}
            onDoubleClick={() => open(p.slug, p.title)}
            onClick={() => sfx.key()}
            className="flex flex-col items-center gap-1.5 p-3 border border-transparent hover:border-(--color-ink)/30 hover:bg-black/5 rounded-sm text-center"
          >
            <span className="text-3xl leading-none">📄</span>
            <span className="font-pixel text-[9px] leading-tight">{p.title}</span>
            <span className="text-[9px] text-(--color-ink-soft)">{p.period}</span>
          </button>
        ))}
        <div className="flex flex-col items-center gap-1.5 p-3 text-center opacity-60">
          <span className="text-3xl leading-none">🏅</span>
          <span className="font-pixel text-[9px] leading-tight">{forgottenAchievement.title}</span>
          <span className="text-[9px] text-(--color-ink-soft)">{forgottenAchievement.placement}</span>
        </div>
      </div>
      <p className="mt-5 text-[11px] text-(--color-ink-soft) italic">
        {forgottenAchievement.note}
      </p>
    </div>
  );
}
