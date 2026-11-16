"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useOS } from "@/lib/store";
import { apps, DESKTOP_APPS, projectAppDef } from "@/lib/appRegistry";
import { projects } from "@/lib/projects";
import { contact } from "@/lib/about";
import { sfx } from "@/lib/sound";
import AppIcon from "./AppIcon";

type Item = {
  key: string;
  label: string;
  hint: string;
  icon: string;
  /** extra words to match on */
  words: string;
  run: () => void;
};

/** Ctrl/⌘+K search across every app, project and link on the machine. */
export default function Spotlight({ onClose }: { onClose: () => void }) {
  const openWindow = useOS((s) => s.openWindow);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo<Item[]>(() => {
    const link = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...DESKTOP_APPS.map((id) => ({
        key: `app:${id}`,
        label: apps[id].title,
        hint: "App",
        icon: apps[id].icon,
        words: id,
        run: () => openWindow(apps[id]),
      })),
      ...projects.map((p) => ({
        key: `project:${p.slug}`,
        label: p.title,
        hint: "Project",
        icon: "file",
        words: [p.summary, p.kicker, ...p.tags, ...p.stack].join(" "),
        run: () => openWindow(projectAppDef(p.slug, p.title), { title: p.title }),
      })),
      { key: "resume", label: "Résumé (PDF)", hint: "File", icon: "file", words: "cv resume download", run: link("/resume.pdf") },
      { key: "cv", label: "Plain CV page", hint: "Link", icon: "file", words: "recruiter one page simple", run: link("/cv") },
      { key: "github", label: "GitHub", hint: "Link", icon: "terminal", words: "code repos ramyghr", run: link(contact.github) },
      { key: "linkedin", label: "LinkedIn", hint: "Link", icon: "user", words: "profile hire", run: link(contact.linkedin) },
      { key: "kaggle", label: "Kaggle", hint: "Link", icon: "chart", words: "notebooks competitions", run: link(contact.kaggle) },
      { key: "email", label: "Email me", hint: "Link", icon: "mail", words: "contact hire message", run: link(`mailto:${contact.email}`) },
    ];
  }, [openWindow]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items.filter((it) => {
      const hay = `${it.label} ${it.hint} ${it.words}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [items, query]);

  const index = Math.min(active, Math.max(0, results.length - 1));

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const choose = (it: Item | undefined) => {
    if (!it) return;
    sfx.open();
    it.run();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-[2px] flex items-start justify-center pt-[14vh] px-4 animate-[fadeIn_120ms_ease-out]"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="win-chrome w-full max-w-lg overflow-hidden bg-white/90!"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 px-4 h-12 border-b border-(--color-chrome-border)">
          <AppIcon name="search" size={17} className="text-(--color-ink-soft) shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              else if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive(Math.min(index + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive(Math.max(index - 1, 0));
              } else if (e.key === "Enter") choose(results[index]);
            }}
            placeholder="Search apps, projects, skills…"
            aria-label="Search apps, projects and links"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-(--color-ink-soft)"
            spellCheck={false}
          />
          <kbd className="text-[10px] font-mono text-(--color-ink-soft) border border-(--color-chrome-border) rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>
        <ul ref={listRef} className="max-h-[46vh] overflow-y-auto thin-scrollbar p-1.5">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-(--color-ink-soft)">Nothing matches “{query}”.</li>
          )}
          {results.map((it, i) => (
            <li key={it.key}>
              <button
                type="button"
                data-idx={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(it)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm cursor-pointer ${
                  i === index ? "bg-(--color-accent) text-white" : "text-(--color-ink)"
                }`}
              >
                <AppIcon name={it.icon} size={17} className="shrink-0 opacity-80" />
                <span className="flex-1 truncate">{it.label}</span>
                <span className={`text-[11px] ${i === index ? "text-white/75" : "text-(--color-ink-soft)"}`}>{it.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
