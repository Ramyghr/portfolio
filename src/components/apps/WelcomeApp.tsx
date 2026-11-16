"use client";

import { useOS } from "@/lib/store";
import { apps, projectAppDef, type AppId } from "@/lib/appRegistry";
import { getProject } from "@/lib/projects";
import { profile } from "@/lib/profile";
import { contact } from "@/lib/about";
import { sfx } from "@/lib/sound";
import AppIcon from "@/components/os/AppIcon";

const FEATURED = ["marta", "hm-rentacar", "renalnet"];

const SHORTCUTS: { id: AppId; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Awards" },
  { id: "montecarlo", label: "Run a simulation" },
  { id: "about", label: "Off-screen" },
];

/** The first window a visitor sees: who this is, proof, and where to go next. */
export default function WelcomeApp() {
  const openWindow = useOS((s) => s.openWindow);
  const open = (id: AppId) => {
    sfx.open();
    openWindow(apps[id]);
  };

  return (
    <div className="p-6 sm:p-7 text-sm leading-relaxed">
      <p className="inline-flex items-center gap-2 text-[11.5px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {profile.status}
      </p>

      <h1 className="mt-3 text-[30px] sm:text-[34px] font-semibold tracking-tight leading-[1.1]">{profile.name}</h1>
      <p className="mt-1 text-[17px] text-(--color-accent) font-medium">{profile.headline}</p>
      <p className="mt-3 text-[14.5px] max-w-[52ch]">{profile.pitch}</p>
      <p className="mt-2 text-[12.5px] text-(--color-ink-soft)">{profile.honors}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => open("contact")}
          className="rounded-[10px] bg-(--color-ink) text-white px-4 py-2 text-[13px] font-medium hover:opacity-90 active:scale-[0.97] transition cursor-pointer"
        >
          Get in touch
        </button>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pixel-btn px-4 py-2 text-[13px] font-medium">
          Résumé (PDF)
        </a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="pixel-btn px-4 py-2 text-[13px] font-medium">
          GitHub ↗
        </a>
      </div>

      <h2 className="font-pixel text-[11px] mt-7 mb-2.5 text-(--color-accent)">START HERE</h2>
      <div className="space-y-2">
        {FEATURED.map((slug) => {
          const p = getProject(slug);
          if (!p) return null;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => {
                sfx.open();
                openWindow(projectAppDef(p.slug, p.title), { title: p.title });
              }}
              className="pixel-btn w-full text-left px-3.5 py-2.5 flex items-start gap-3 cursor-pointer"
            >
              <AppIcon name="file" size={18} className="mt-0.5 shrink-0 text-(--color-accent)" />
              <span className="min-w-0">
                <span className="block font-semibold text-[13.5px]">{p.title}</span>
                <span className="block text-[12.5px] text-(--color-ink-soft) line-clamp-2">{p.summary}</span>
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => open("projects")}
          className="text-[12.5px] font-medium text-(--color-accent) hover:underline cursor-pointer"
        >
          All projects →
        </button>
      </div>

      <h2 className="font-pixel text-[11px] mt-6 mb-2.5 text-(--color-accent)">OR LOOK AROUND</h2>
      <div className="flex flex-wrap gap-1.5">
        {SHORTCUTS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => open(s.id)}
            className="title-chip px-3 py-1 text-[12px] font-medium hover:bg-white cursor-pointer"
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="mt-5 text-[11.5px] text-(--color-ink-soft)">
        This is a desktop — windows drag, resize and stack. Press <kbd className="font-mono">Ctrl K</kbd> to search
        everything.
      </p>
    </div>
  );
}
