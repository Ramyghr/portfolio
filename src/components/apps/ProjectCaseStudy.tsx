"use client";

import { getProject } from "@/lib/projects";
import ArchitectureDiagram from "./diagrams/ArchitectureDiagram";
import PipelineDiagram from "./diagrams/PipelineDiagram";

export default function ProjectCaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return <div className="p-5 text-sm">Project not found.</div>;

  return (
    <div className="p-5 text-sm leading-relaxed">
      <h2 className="font-pixel text-sm mb-1">{project.title}</h2>
      <p className="text-[11px] text-(--color-ink-soft) italic">{project.kicker}</p>
      <div className="flex flex-wrap items-center gap-2 mt-2 mb-4">
        <span className="font-mono text-[10px] text-(--color-ink-soft)">{project.period}</span>
        <span className="text-(--color-ink-soft)">·</span>
        <span className="text-[11px] text-(--color-ink-soft)">{project.org}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((t) => (
          <span key={t} className="title-chip font-pixel text-[8px] px-1.5 py-1">
            {t}
          </span>
        ))}
      </div>

      <p className="font-semibold mb-4">{project.summary}</p>

      {/* Visual slot */}
      <div className="pixel-btn mb-5 bg-(--color-paper-dark)/60 p-4">
        {project.visual.kind === "diagram" && slug === "hm-rentacar" && <ArchitectureDiagram />}
        {project.visual.kind === "diagram" && slug === "face-clustering" && <PipelineDiagram />}
        {project.visual.kind === "placeholder" && (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <span className="text-3xl">🖼</span>
            <span className="font-pixel text-[9px] text-(--color-ink-soft)">{project.visual.caption}</span>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-5">
        {project.description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <h3 className="font-pixel text-[10px] mb-2 text-(--color-accent)">STACK</h3>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((s) => (
          <span key={s} className="font-mono text-[10px] border border-(--color-ink)/30 px-1.5 py-0.5">
            {s}
          </span>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn font-pixel text-[9px] px-3 py-1.5 inline-block"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      {project.unclear && (
        <div className="mt-5 border border-(--color-accent) bg-(--color-accent)/10 p-3 text-[11px]">
          <span className="font-pixel text-[8px] text-(--color-accent)">FLAG FOR REVIEW — </span>
          {project.unclear}
        </div>
      )}
    </div>
  );
}
