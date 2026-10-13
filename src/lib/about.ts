export type BeyondTechItem = {
  slug: string;
  label: string;
  note?: string;
};

// Photo placeholders by design — drop a file at /public/about/<slug>.jpg and it'll pick it up.
export const beyondTech: BeyondTechItem[] = [
  { slug: "drums", label: "Drummer" },
  { slug: "guitar", label: "Guitarist" },
  { slug: "skating", label: "Skater" },
  { slug: "hiking", label: "Hiking" },
  { slug: "climbing", label: "Climbing (indoor/outdoor)" },
  { slug: "powerlifting", label: "Powerlifting", note: "1st in Bizerte, 2nd nationally" },
  { slug: "bodybuilding", label: "Bodybuilding & Calisthenics" },
  { slug: "modeling", label: "Modeling" },
  { slug: "running", label: "Running" },
  { slug: "camping", label: "Camping" },
  { slug: "coding", label: "Coding (yes, also for fun)" },
];

export const contact = {
  email: "gharbi.ramy18@gmail.com",
  linkedin: "https://www.linkedin.com/in/ramy-gharbi-a301ab2ba/",
  github: "https://github.com/Ramyghr",
  kaggle: "https://www.kaggle.com/tretn3",
};
