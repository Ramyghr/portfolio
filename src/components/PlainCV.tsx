import { profile, skills, spokenLanguages, awards } from "@/lib/profile";
import { experience, education } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { contact } from "@/lib/about";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="text-[11.5px] font-semibold tracking-[0.12em] uppercase text-(--color-accent) border-b border-(--color-chrome-border) pb-1.5 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

const link = "underline underline-offset-2";

/**
 * The whole portfolio as one plain, server-rendered document: readable by
 * search engines, screen readers, printers and anyone who would rather not
 * use a desktop.
 */
export default function PlainCV() {
  return (
    <article className="text-[14.5px] leading-relaxed text-(--color-ink)">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-lg text-(--color-accent) font-medium">{profile.headline}</p>
        <p className="mt-3 max-w-[62ch]">{profile.pitch}</p>
        <p className="mt-1.5 text-[13px] text-(--color-ink-soft)">
          {profile.honors} · {profile.location} · {profile.status}
        </p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] font-medium">
          <a className={link} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a className={link} href={contact.linkedin}>
            LinkedIn
          </a>
          <a className={link} href={contact.github}>
            GitHub
          </a>
          <a className={link} href={contact.kaggle}>
            Kaggle
          </a>
          <a className={link} href="/resume.pdf">
            Résumé (PDF)
          </a>
        </p>
      </header>

      <Section title="Experience">
        <div className="space-y-5">
          {experience.map((e) => (
            <div key={`${e.org}-${e.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">
                  {e.role} <span className="font-normal text-(--color-ink-soft)">— {e.org}</span>
                </h3>
                <span className="font-mono text-[12px] text-(--color-ink-soft)">{e.period}</span>
              </div>
              {e.context && <p className="text-[13px] italic text-(--color-ink-soft)">{e.context}</p>}
              <p className="mt-1">{e.bullet}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="font-mono text-[12px] text-(--color-ink-soft)">{p.period}</span>
              </div>
              <p className="text-[13px] italic text-(--color-ink-soft)">{p.kicker}</p>
              <p className="mt-1">{p.summary}</p>
              <p className="mt-1 text-[13px] text-(--color-ink-soft)">
                {p.stack.join(" · ")}
                {p.links.map((l) => (
                  <span key={l.href}>
                    {" · "}
                    <a className={link} href={l.href}>
                      {l.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-1.5">
          {skills.map((g) => (
            <div key={g.group} className="sm:grid sm:grid-cols-[170px_1fr] sm:gap-3">
              <dt className="font-semibold">{g.group}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
          <div className="sm:grid sm:grid-cols-[170px_1fr] sm:gap-3">
            <dt className="font-semibold">Spoken languages</dt>
            <dd>{spokenLanguages.map((l) => `${l.name} (${l.level})`).join(", ")}</dd>
          </div>
        </dl>
      </Section>

      <Section title="Education">
        <div className="space-y-2.5">
          {education.map((ed) => (
            <div key={ed.degree}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">
                  {ed.degree} <span className="font-normal text-(--color-ink-soft)">— {ed.school}</span>
                </h3>
                <span className="font-mono text-[12px] text-(--color-ink-soft)">{ed.period}</span>
              </div>
              {ed.honors && <p className="text-[13.5px] text-(--color-accent) font-medium">{ed.honors}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Awards">
        <ul className="space-y-1.5">
          {awards.map((a) => (
            <li key={a.title}>
              <span className="font-semibold">{a.place}</span> — {a.title}.{" "}
              <span className="text-(--color-ink-soft)">{a.detail}</span>
            </li>
          ))}
        </ul>
      </Section>
    </article>
  );
}
