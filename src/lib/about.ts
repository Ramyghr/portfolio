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
    slug: "graduation",
    label: "Graduated",
    note: "Highest Honors · Nov 2026",
    caption: "Four years at ESPRIT, done on 11 November 2026 with Mention Excellent. Took a while to sink in.",
  },
  {
    slug: "drums",
    label: "Drummer",
    caption: "Started as noise in my room. Still noise, just better timed.",
  },
  {
    slug: "guitar",
    label: "Guitarist",
    caption: "Learned the chords on YouTube. Still working on the rest.",
  },
  {
    slug: "skating",
    label: "Skater",
    caption: "Yes, the guy on the desktop is me. The real one falls more.",
  },
  {
    slug: "hiking",
    label: "Hiking",
    caption: "Long trails, no signal, good company. Best way I know to clear my head.",
  },
  {
    slug: "climbing",
    label: "Climbing (indoor/outdoor)",
    caption: "Indoor on weekdays, outdoor whenever I can. Sore hands, worth it.",
  },
  {
    slug: "powerlifting",
    label: "Powerlifting",
    note: "1st in Bizerte, 2nd nationally",
    caption: "1st in Bizerte, 2nd nationally. Ask me about the numbers.",
  },
  {
    slug: "bodybuilding",
    label: "Bodybuilding & Calisthenics",
    caption: "Gym most days. Calisthenics when there's no gym around.",
  },
  {
    slug: "modeling",
    label: "Modeling",
    caption: "Did a few shoots. That's all you're getting.",
  },
  {
    slug: "running",
    label: "Running",
    caption: "Early mornings, before the city wakes up.",
  },
  {
    slug: "camping",
    label: "Camping",
    caption: "No wifi, a fire, and the right people. That's the whole plan.",
  },
  {
    slug: "beaches",
    label: "Beaches",
    caption: "Summer means the sea. Sunset swims, paddle boards, sand everywhere.",
  },
  {
    slug: "exploring",
    label: "Exploring new places",
    caption: "I'd rather get lost somewhere new than go back to the same place.",
  },
  {
    slug: "traveling",
    label: "Traveling",
    caption: "Every trip ends with me planning the next one.",
  },
  {
    slug: "coding",
    label: "Coding (yes, also for fun)",
    caption: "Even after work, the laptop opens again. Some projects won't leave me alone.",
  },
];

export const contact = {
  email: "gharbi.ramy18@gmail.com",
  linkedin: "https://www.linkedin.com/in/ramy-gharbi-a301ab2ba/",
  github: "https://github.com/Ramyghr",
  kaggle: "https://www.kaggle.com/tretn3",
};
