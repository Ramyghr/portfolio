// Single source of truth for who this site is about. Used by the Welcome,
// Skills and Awards apps, the plain CV page, and the SEO metadata.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const profile = {
  name: "Ramy Gharbi",
  headline: "FinTech & AI Engineer",
  location: "Tunis, Tunisia",
  status: "Open to opportunities",
  honors: "Software Engineering graduate, ESPRIT · Highest Honors (Mention Excellent), November 2026",
  pitch:
    "I build trading systems, forecasting pipelines and the full-stack platforms around them — from the model to production.",
  description:
    "Ramy Gharbi — FinTech & AI Engineer. Software Engineering graduate (ESPRIT, Highest Honors). Multi-agent trading systems, forecasting, computer vision and full-stack platforms.",
};

export type SkillGroup = { group: string; items: string[] };

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["Python", "TypeScript", "Java", "SQL", "C/C++", "R"] },
  {
    group: "ML / AI frameworks",
    items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face", "LangGraph", "Stable-Baselines3", "MLflow", "FastAPI"],
  },
  {
    group: "ML specialties",
    items: [
      "Computer Vision",
      "NLP / LLMs",
      "Reinforcement Learning",
      "Multi-Agent / Agentic AI",
      "Forecasting",
      "Graph Neural Networks",
    ],
  },
  {
    group: "FinTech",
    items: [
      "Algorithmic Trading & Backtesting",
      "Risk Metrics (VaR, CVaR)",
      "Regime Detection (HMM)",
      "Volatility Modeling (GARCH)",
      "Time Series Analysis",
      "Live Execution (Alpaca)",
    ],
  },
  { group: "Cloud & data", items: ["AWS (S3, Lambda, SageMaker)", "Docker", "PostgreSQL", "MongoDB", "Redis"] },
  { group: "Full-stack & DevOps", items: ["Next.js", "React", "Node.js", "Git", "CI/CD", "Agile"] },
];

export const spokenLanguages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "B2" },
  { name: "French", level: "B2" },
];

export type Award = {
  place: string;
  title: string;
  detail: string;
  /** slug of a project to open, when the award came from one */
  project?: string;
};

export const awards: Award[] = [
  {
    place: "Highest Honors",
    title: "Software Engineering Degree, ESPRIT",
    detail: "Finance specialization. Graduated 11 November 2026 with Mention Excellent.",
  },
  {
    place: "1st Place",
    title: "Code2Cure Hackathon — IEEE ESPRIT SB",
    detail: "RenalNet: renal-failure risk from kidney ultrasound images. March 2025.",
    project: "renalnet",
  },
  {
    place: "1st Place",
    title: "Code it up Hackathon",
    detail: "A computer-vision game that reads real ninjutsu hand seals from your webcam.",
    project: "naruto-gesture-game",
  },
  {
    place: "4th Place",
    title: "AI 4 the Blue Horizon",
    detail: "Ideathon.",
  },
  {
    place: "1st · 2nd",
    title: "Powerlifting",
    detail: "1st in Bizerte, 2nd nationally. Not on the résumé, still counts.",
  },
];
