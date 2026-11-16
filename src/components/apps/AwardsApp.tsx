"use client";

import { useOS } from "@/lib/store";
import { projectAppDef } from "@/lib/appRegistry";
import { getProject } from "@/lib/projects";
import { awards } from "@/lib/profile";
import { sfx } from "@/lib/sound";
import AppIcon from "@/components/os/AppIcon";

export default function AwardsApp() {
  const openWindow = useOS((s) => s.openWindow);

  return (
    <div className="p-5 text-sm leading-relaxed">
      <h2 className="font-pixel text-xs mb-4 text-(--color-accent)">TROPHY CABINET</h2>
      <ul className="space-y-2.5">
        {awards.map((a) => {
          const project = a.project ? getProject(a.project) : undefined;
          return (
            <li key={a.title} className="pixel-btn px-3.5 py-3 flex items-start gap-3 hover:transform-none!">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-amber-50 border border-amber-200 text-amber-600 shrink-0">
                <AppIcon name="medal" size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-wide uppercase text-amber-700">{a.place}</p>
                <p className="font-semibold text-[13.5px] leading-snug">{a.title}</p>
                <p className="text-[12.5px] text-(--color-ink-soft)">{a.detail}</p>
                {project && (
                  <button
                    type="button"
                    onClick={() => {
                      sfx.open();
                      openWindow(projectAppDef(project.slug, project.title), { title: project.title });
                    }}
                    className="mt-1 text-[12px] font-medium text-(--color-accent) hover:underline cursor-pointer"
                  >
                    Open the project →
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
