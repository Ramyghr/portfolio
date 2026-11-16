import { skills, spokenLanguages } from "@/lib/profile";

export default function SkillsApp() {
  return (
    <div className="p-5 text-sm leading-relaxed">
      <h2 className="font-pixel text-xs mb-4 text-(--color-accent)">SYSTEM PROFILE</h2>
      <dl className="space-y-4">
        {skills.map((g) => (
          <div key={g.group} className="sm:grid sm:grid-cols-[150px_1fr] sm:gap-3">
            <dt className="text-[12.5px] font-semibold mb-1.5 sm:mb-0 sm:pt-0.5">{g.group}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="text-[12px] rounded-md border border-(--color-chrome-border) bg-white px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <h2 className="font-pixel text-xs mt-7 mb-3 text-(--color-accent)">SPOKEN LANGUAGES</h2>
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
        {spokenLanguages.map((l) => (
          <span key={l.name}>
            <span className="font-semibold">{l.name}</span>
            <span className="text-(--color-ink-soft)"> — {l.level}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
