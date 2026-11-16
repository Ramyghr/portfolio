export type BeyondTechItem = {
  slug: string;
  label: string;
  note?: string;
  caption: string;
  /** set to true once /public/about/<slug>.jpg exists; until then the tile is a designed card */
  photo?: boolean;
};

export const beyondTech: BeyondTechItem[] = [
  {
    slug: "drums",
    label: "Drummer",
    caption: "Zero latency budget, no retries, and the downbeat is non-negotiable.",
  },
  {
    slug: "guitar",
    label: "Guitarist",
    caption: "Six strings, no linter. Out here, mistakes get renamed to improvisation.",
  },
  {
    slug: "skating",
    label: "Skater",
    caption: "Same as the little guy on the desktop — except the concrete is real and the bruises aren't rendered.",
  },
  {
    slug: "hiking",
    label: "Hiking",
    caption: "The only pipeline with no deadline. Signal drops somewhere near the top. That's the point.",
  },
  {
    slug: "climbing",
    label: "Climbing (indoor/outdoor)",
    caption: "Debugging, but the stack trace is a six-metre drop.",
  },
  {
    slug: "powerlifting",
    label: "Powerlifting",
    note: "1st in Bizerte, 2nd nationally",
    caption: "1st in Bizerte, 2nd in the country. The actual numbers stay off the CV — you'll have to ask.",
  },
  {
    slug: "bodybuilding",
    label: "Bodybuilding & Calisthenics",
    caption: "Progressive overload. Works on muscle, works on codebases.",
  },
  {
    slug: "modeling",
    label: "Modeling",
    caption: "Occasionally on the other side of the lens. Details on a need-to-know basis.",
  },
  {
    slug: "running",
    label: "Running",
    caption: "Kilometre twelve is where the good architecture decisions happen. Unpaid. Unlogged.",
  },
  {
    slug: "camping",
    label: "Camping",
    caption: "Offline mode: fire, stars, zero notifications. Recommended uptime: one night minimum.",
  },
  {
    slug: "coding",
    label: "Coding (yes, also for fun)",
    caption: "Yes — still. After all that. Some bugs you chase purely for sport.",
  },
];

export const contact = {
  email: "gharbi.ramy18@gmail.com",
  linkedin: "https://www.linkedin.com/in/ramy-gharbi-a301ab2ba/",
  github: "https://github.com/Ramyghr",
  kaggle: "https://www.kaggle.com/tretn3",
};
