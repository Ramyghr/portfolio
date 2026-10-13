export type ExperienceEntry = {
  role: string;
  org: string;
  context?: string;
  period: string;
  bullet: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Software Engineer",
    org: "Independent Contractor, Remote",
    period: "September 2026",
    bullet:
      "Built and shipped a luxury e-commerce platform (Next.js 15, TypeScript, Sanity CMS) for a boutique client — server-rendered catalogue with a custom facet-matching & quiz-based product-matching engine, a Tailwind design-token theme, and Framer Motion micro-interactions.",
  },
  {
    role: "Machine Learning Intern",
    org: "Coral-io Software, Tunisia",
    context: "MARTA — Final Year Project (PFE)",
    period: "March – September 2026",
    bullet:
      "Designed a three-layer algorithmic trading system (Gaussian HMM regime encoder, 5-agent LangGraph deliberation layer, PPO execution agent with CVaR-normalized reward) validated on a 5-asset crypto panel; built a rigorous evaluation framework, delivered and root-caused a methodologically sound negative result, then shipped the fix and a live paper-trading dashboard.",
  },
  {
    role: "Freelance Software Engineer",
    org: "Independent Contractor, Bizerte, Tunisia",
    period: "November 2025 – April 2026",
    bullet:
      "Built and deployed a Dockerized full-stack rental platform (FastAPI, Next.js 14, PostgreSQL 16; 22+ tables, 80+ REST endpoints) with JWT auth, Redis token blacklisting, RBAC, and server-side PDF generation; implemented fleet workflows and deployed via docker-compose to DigitalOcean — sold to the client.",
  },
  {
    role: "Machine Learning Intern",
    org: "Coral-io Software, Tunisia",
    period: "July – August 2025",
    bullet:
      "Built an end-to-end face clustering pipeline (YOLOv11n-face + FaceNet) and deployed a low-latency FastAPI inference API (ONNX Runtime, Docker) with scalable embedding storage/retrieval (MongoDB + S3-compatible storage).",
  },
  {
    role: "Machine Learning Intern",
    org: "Société Tunisienne de Banque, Tunisia",
    period: "July – August 2024",
    bullet:
      "Built an end-to-end stock forecasting pipeline on 13 years of STB data (2010–2022) — feature engineering and model training across ARIMA, LSTM, and ensemble ML models — validated with a leakage-safe walk-forward backtesting framework.",
  },
];

export const education = [
  {
    degree: "Software Engineering Degree, Finance Specialization",
    school: "Private Higher School of Engineering and Technology (ESPRIT)",
    period: "2022 – 2026",
  },
  {
    degree: "Mathematics and Physics Pre-engineering Studies",
    school: "Université Centrale",
    period: "2021 – 2022",
  },
];
