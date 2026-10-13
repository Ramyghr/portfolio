export type ProjectLink = { label: string; href: string };

export type ProjectVisual = {
  kind: "placeholder" | "diagram";
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  kicker: string; // role / context line
  period: string;
  org: string;
  tags: string[];
  summary: string;
  description: string[]; // paragraphs
  stack: string[];
  links: ProjectLink[];
  visual: ProjectVisual;
  unclear?: string; // flagged for Ramy to confirm before this goes live
};

export const projects: Project[] = [
  {
    slug: "ws-mariage",
    title: "WS Mariage",
    kicker: "Freelance Software Engineer — Independent Contractor, Remote",
    period: "September 2026",
    org: "Boutique bridal client",
    tags: ["Next.js", "TypeScript", "Sanity CMS", "Freelance"],
    summary:
      "A server-rendered luxury e-commerce storefront for a bridal boutique, with a quiz-based product-matching engine and a full operations console behind it.",
    description: [
      "Built and shipped the full platform for a boutique bridal client: a server-rendered public catalogue plus a backoffice operations console sharing one domain layer and one database, deployed at wsmariage.fr.",
      "The standout feature is a facet-matching and quiz-based product-matching engine — visitors answer a few questions about style and occasion and get routed to the right pieces in the catalogue, instead of browsing a flat grid.",
      "Design system is a Tailwind design-token theme with Framer Motion micro-interactions, tuned to feel premium rather than templated — the brief was 'this cannot look like a Shopify theme.'",
      "This is freelance client work: repo stays private, but the type of work is representative of what I deliver as a contractor — full ownership from architecture to deployment, for a paying client, on a deadline.",
    ],
    stack: ["Next.js 15", "TypeScript", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    links: [{ label: "Live site", href: "https://wsmariage.fr/" }],
    visual: { kind: "placeholder", caption: "Screenshot of the storefront / dashboard — pending" },
    unclear:
      "The repo's own README mentions Prisma + Supabase as the data layer, which doesn't match the Sanity CMS stack on the resume bullet — worth confirming which is current before this goes live, in case the project migrated CMS mid-build.",
  },
  {
    slug: "marta",
    title: "MARTA",
    kicker: "Machine Learning Intern — Coral-io Software",
    period: "March – September 2026",
    org: "Final Year Project (PFE)",
    tags: ["HMM", "LangGraph", "PPO", "Reinforcement Learning", "Research"],
    summary:
      "Multi-Agent Regime-Aware Trading Architecture — a 5-layer research pipeline testing whether regime-conditioning improves risk-adjusted trading returns. It doesn't, and the project proves that rigorously instead of hiding it.",
    description: [
      "MARTA is a research pipeline, not a product: OHLCV data ingestion → a Gaussian HMM regime encoder clustering market states from engineered features → a 5-agent LangGraph deliberation layer (Macro, Technical, Risk, Sentiment, Contrarian agents feeding a Fund Manager consensus, running on Mistral 7B via Ollama) → a PPO execution agent (Stable-Baselines3) sizing positions conditioned on regime + consensus → a live FastAPI/Next.js dashboard with Alpaca paper execution and Telegram alerts.",
      "The hypothesis — that conditioning on latent regime embeddings beats a regime-agnostic baseline — was tested properly: walk-forward train/val/test splits, block-bootstrap significance testing, a 7-variant ablation study, and a 90-debate A/B harness, across multiple seeds and cadences on a 5-asset crypto panel.",
      "It didn't hold up. No configuration produced a statistically defensible edge out-of-sample. Rather than quietly dropping it, the negative result is documented and root-caused: regime labels correlated with price direction at chance level, and LLM position-sizing instructions weren't being mechanically enforced downstream.",
      "What shipped regardless: a complete, working end-to-end system, a defensible methodology, and a live paper-trading dashboard — plus several genuine engineering findings about how multi-stage ML pipelines fail silently (nondeterministic GPU eval, train/val leakage, stale-artifact drift).",
    ],
    stack: ["Python", "LangGraph", "Mistral 7B / Ollama", "Stable-Baselines3", "FastAPI", "Next.js", "Alpaca API"],
    links: [],
    visual: { kind: "placeholder", caption: "Live dashboard screenshot — pending (video optional, your call)" },
  },
  {
    slug: "hm-rentacar",
    title: "Agency Rent A Car",
    kicker: "Freelance Software Engineer — Independent Contractor, Bizerte, Tunisia",
    period: "November 2025 – April 2026",
    org: "Client project, sold",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Docker", "Freelance"],
    summary:
      "A Dockerized full-stack admin platform for a car rental business — fleet, reservations, leasing, invoicing, and subcontractor payments behind a role-based dashboard. Delivered and sold.",
    description: [
      "Full management platform for a car rental agency: fleet (vehicle CRUD, maintenance intervals, technical inspections), clients (individuals and companies), reservations-to-rental lifecycle with mid-rental vehicle swaps and excess-km billing, leasing (LLD) and subcontractor financial tracking, and server-side PDF invoice/contract generation.",
      "22+ tables, 80+ REST endpoints. Auth is JWT access/refresh in httpOnly cookies with CSRF protection and login rate limiting; file storage (contracts, invoices, client docs) is offloaded to Cloudflare R2.",
      "Background automation runs on Celery + Redis (contract-expiry alerts, maintenance-due notifications, scheduled financial reports), with an audit trail logging every create/update/delete across entities.",
      "Shipped via docker-compose behind an Nginx reverse proxy to DigitalOcean, and sold to the client.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Next.js 15", "TypeScript", "Docker Compose", "Nginx"],
    links: [],
    visual: { kind: "diagram", caption: "System architecture — generated from the project's own README" },
  },
  {
    slug: "face-clustering",
    title: "Face Recognition & Clustering",
    kicker: "Machine Learning Intern — Coral-io Software, Tunisia",
    period: "July – August 2025",
    org: "Internal pipeline (proprietary)",
    tags: ["Computer Vision", "YOLO", "FaceNet", "Clustering"],
    summary:
      "An end-to-end face clustering pipeline: detect faces, embed them, cluster at scale, and serve similarity search behind a low-latency inference API.",
    description: [
      "The internal pipeline and data are proprietary to Coral-io, so this is presented as an architecture diagram rather than a walkthrough — the shape of the system is representative, not a leak of client data.",
      "Pipeline: a face detector locates faces in incoming images, an embedding model converts each face into a vector representation, and a clustering step groups visually similar faces across a large batch — then clusters get matched/assigned to known user profiles.",
      "Served behind a FastAPI inference API optimized for low latency (ONNX Runtime, Docker), with storage split by concern: metadata in MongoDB, image bytes in S3-compatible object storage, and embeddings indexed for fast similarity search.",
    ],
    stack: ["Python", "FastAPI", "ONNX Runtime", "MongoDB", "S3-compatible storage", "scikit-learn"],
    links: [],
    visual: { kind: "diagram", caption: "Pipeline diagram: detect → embed → cluster → store → match" },
    unclear:
      "Resume bullet says YOLOv11n-face; the public demo repo's README describes YOLOv8 for detection and adds DBSCAN clustering + Qdrant for the embedding index — going with the resume version as authoritative since that's the internship work, but flag if the demo repo's stack should be reflected instead.",
  },
  {
    slug: "stb-forecasting",
    title: "STB Stock Price Prediction",
    kicker: "Machine Learning Intern — Société Tunisienne de Banque, Tunisia",
    period: "July – August 2024",
    org: "Bank internship",
    tags: ["Time Series", "LSTM", "ARIMA", "Forecasting"],
    summary:
      "A forecasting pipeline on 13 years of STB equity data, comparing classical econometrics against deep learning — and finding the classical model wins.",
    description: [
      "Built an end-to-end forecasting pipeline on 13 years of Société Tunisienne de Banque trading data (2010–2022): cleaning, feature engineering (48 technical indicators including RSI, MACD, Bollinger Bands), and parallel model training across ARIMA, LSTM, and Prophet.",
      "Evaluation used temporal cross-validation and a leakage-safe walk-forward backtesting framework — no peeking across the train/test boundary, which is where a lot of finance ML projects quietly cheat.",
      "Result: a tuned ARIMA(5,1,4) outperformed the LSTM (R² of 0.985 vs 0.77) on this dataset — a useful, slightly humbling finding that more model complexity isn't automatically better on a relatively small, non-stationary series.",
    ],
    stack: ["Python", "statsmodels", "TensorFlow/Keras", "Prophet", "scikit-learn"],
    links: [{ label: "GitHub", href: "https://github.com/Ramyghr/STB-Stock-Price-Prediction-System" }],
    visual: { kind: "placeholder", caption: "Notebook output / chart screenshot — pending" },
  },
  {
    slug: "trading-simulator",
    title: "Gamified Trading Simulator",
    kicker: "Academic Project — ESPRIT × Tunis Stock Exchange",
    period: "December 2025",
    org: "ESPRIT",
    tags: ["FastAPI", "WebSockets", "Gamification"],
    summary:
      "A trading-education platform: practice stocks, forex, and crypto with virtual money, live market data, XP, and leaderboards.",
    description: [
      "Backend for a simulated trading platform supporting market/limit/stop orders, portfolio tracking, and performance metrics (returns, drawdown, Sharpe ratio).",
      "A modular, event-driven backtesting engine pushes live price updates over WebSockets, backed by multiple market-data providers (Polygon, Alpha Vantage, Finnhub, Twelve Data) so the sim doesn't depend on a single feed.",
      "Gamification layer (XP, leaderboards) sits on top of JWT auth with Argon2id password hashing and role-based access, containerized with Docker Compose and optional Traefik for HTTPS.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Redis", "WebSockets", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/Ramyghr/Gamified-Trading-Simulator" }],
    visual: { kind: "placeholder", caption: "Screenshot — pending" },
  },
  {
    slug: "monte-carlo-lab",
    title: "Monte Carlo Simulation Lab",
    kicker: "Academic Project",
    period: "November 2025",
    org: "Independent",
    tags: ["Quant Finance", "Monte Carlo", "Options Pricing"],
    summary:
      "A quantitative finance platform for derivatives pricing and risk analysis, built around the Chen & Hong (2007) Monte Carlo framework.",
    description: [
      "Stochastic path generation across Euler, Milstein, and exact simulation schemes, with variance reduction techniques (antithetic variates, control variates, importance sampling) to make the simulations converge faster.",
      "European and American option pricing via Black-Scholes and Longstaff-Schwartz, plus portfolio-level risk metrics — VaR, CVaR, and the Greeks — across multi-asset portfolios.",
      "Exposed through a REST API with an interactive frontend for real-time parameter adjustment and visualization of the simulations.",
    ],
    stack: ["Python", "Flask", "NumPy"],
    links: [{ label: "GitHub", href: "https://github.com/Ramyghr/Monte-Carlo-Simulation-Lab" }],
    visual: { kind: "placeholder", caption: "Screenshot — pending" },
  },
  {
    slug: "naruto-gesture-game",
    title: "Naruto Hand-Seal Detector",
    kicker: "1st Place — Code it up Hackathon",
    period: "2025",
    org: "Hackathon",
    tags: ["Computer Vision", "PyTorch", "Flask", "Game"],
    summary:
      "A computer-vision game that reads your hand gestures and checks them against real ninjutsu hand seals — won 1st place.",
    description: [
      "A Flask web app running a custom-trained PyTorch gesture classifier that recognizes hand positions mapped to actual ninjutsu hand seals (the gestures real ninjutsu/hand-seal practice is based on, popularized by Naruto) — not a canned demo model.",
      "Includes a menu, a live play screen, and a stats page tracking accuracy/progress, with the gesture-to-seal mapping defined in a simple config rather than hardcoded.",
      "Won 1st place at the Code it up hackathon.",
    ],
    stack: ["Python", "PyTorch", "Flask", "OpenCV"],
    links: [{ label: "GitHub (flask-app branch)", href: "https://github.com/Ramyghr/Naruto-Hand-Gesture-Detection/tree/flask-app" }],
    visual: { kind: "placeholder", caption: "Gameplay screenshot / clip — pending" },
  },
  {
    slug: "renalnet",
    title: "RenalNet",
    kicker: "1st Place — Code2Cure Hackathon (IEEE ESPRIT SB)",
    period: "March 2025",
    org: "Team project · Zindi competition",
    tags: ["Medical Imaging", "PyTorch", "Deep Learning"],
    summary:
      "A renal failure risk classifier from kidney ultrasound images, built for resource-limited healthcare settings — won 1st place.",
    description: [
      "MobileNetV3 backbone with a custom attention head, built as a team for a clinical-AI hackathon targeting settings where specialist radiology review isn't always available.",
      "Robustness techniques: spectral normalization, dropout, Albumentations with Mixup/CutMix, Focal Loss for class imbalance, repeated stratified K-fold cross-validation with AUC-based scheduling, early stopping, and test-time augmentation with fold-level ensembling.",
      "Team project — repo is a teammate's; linked with credit.",
    ],
    stack: ["PyTorch", "timm", "Albumentations"],
    links: [{ label: "GitHub (team repo)", href: "https://github.com/garyhost2/kidney-ultrasound-renal-failure-detection" }],
    visual: { kind: "placeholder", caption: "Sample predictions / confusion matrix — pending" },
  },
];

export const forgottenAchievement = {
  title: "AI 4 the Blue Horizon",
  placement: "4th Place",
  note: "An ideathon — honestly don't remember the details anymore. Ask me about it and watch me improvise.",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
