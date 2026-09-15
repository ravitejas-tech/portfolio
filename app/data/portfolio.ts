// Single source of truth for all portfolio content
// All data here is resume-backed - do not invent metrics or details

export const PERSONAL = {
  name: "Raviteja Salva",
  role: "Full Stack Developer",
  tagline: "I build the systems behind useful products.",
  subtitle:
    "Full Stack Developer working across React, React Native, NestJS, and TypeScript. From global production mobile apps to AI-powered developer tooling, I take ideas from problem statement to shipped software.",
  location: "Pune, India",
  email: "ravitejastech@gmail.com",
  phone: "+917995130674",
  phoneDisplay: "+91 79951 30674",
  linkedin: "https://www.linkedin.com/in/raviteja-salva-8a1464272/",
  github: "https://github.com/ravitejas-tech",
  resumeUrl: "https://drive.google.com/file/d/1A0Aiei_RY2pWFH2WimdJFzM4Nw676ecZ/view?usp=sharing",
  avatarUrl: "/images/avatar/profile.png",
} as const;

export interface FeaturedProject {
  number: string;
  name: string;
  category: string;
  client?: string;
  description: string;
  challenge: string;
  solution: string;
  tech: string[];
  metrics?: { value: string; label: string };
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  screenshots: string[];
  deviceType: "mobile" | "desktop";
  visualAccent: string;
  browserUrl: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    number: "01",
    name: "KO Mark",
    category: "Mobile App · Coca-Cola",
    client: "The Coca-Cola Company",
    description:
      "Global Coca-Cola mobile application powering Mark Missions and leaderboards for users across 119 countries. Built and maintained core features in a high-volume production React Native environment.",
    challenge:
      "Scaling a consumer mobile app to serve a global audience with reliable performance across varied network conditions and device capabilities.",
    solution:
      "Engineered offline-resilient mission states, localized asset caching, and fluid gesture-driven UI components with strict bundle budget enforcement.",
    tech: ["React Native", "TypeScript", "Redux", "REST APIs", "Mobile Performance"],
    metrics: { value: "119", label: "Countries live" },
    image: "/images/projects-screenshots/screenshots/komark/komark-1.jpg",
    screenshots: [
      "/images/projects-screenshots/screenshots/komark/komark-1.jpg",
      "/images/projects-screenshots/screenshots/komark/komark-2.jpg",
      "/images/projects-screenshots/screenshots/komark/komark-3.jpg",
      "/images/projects-screenshots/screenshots/komark/komark-4.jpg",
      "/images/projects-screenshots/screenshots/komark/komark-5.jpg",
    ],
    deviceType: "mobile",
    visualAccent: "#ef4444",
    browserUrl: "coca-cola.internal/mark-missions",
  },
  {
    number: "02",
    name: "Surge",
    category: "Web & Mobile App · Crypto Predictions",
    client: "BOP Production",
    description:
      "Tinder-style crypto prediction game with real-time CoinGecko market data, in-app chat, leaderboards, task systems, and Twitter OAuth. Owned deployment and production debugging at scale.",
    challenge:
      "Handling approximately 400K daily requests while maintaining real-time data accuracy, sub-100ms card swipe feedback, and high WebSocket connection durability.",
    solution:
      "Architected Redis-backed rate limiting, WebSocket pub/sub connection pooling, and optimized NestJS controller layers to comfortably digest high-concurrency traffic spikes.",
    tech: ["React", "NestJS", "TypeScript", "WebSocket", "Redis", "CoinGecko API"],
    metrics: { value: "~400K", label: "Daily requests" },
    image: "/images/projects-screenshots/screenshots/surge/surge-1.jpg",
    screenshots: [
      "/images/projects-screenshots/screenshots/surge/surge-1.jpg",
      "/images/projects-screenshots/screenshots/surge/surge-2.jpg",
      "/images/projects-screenshots/screenshots/surge/surge-3.jpg",
      "/images/projects-screenshots/screenshots/surge/surge-4.jpg",
      "/images/projects-screenshots/screenshots/surge/surge-5.jpg",
    ],
    deviceType: "mobile",
    visualAccent: "#f59e0b",
    browserUrl: "surge.bop.app/predict",
  },
  {
    number: "03",
    name: "Synergy",
    category: "Web Platform · Healthcare SaaS",
    client: "Healthcare Partner",
    description:
      "Patient appointment booking system with end-to-end frontend and backend ownership. Built core modules including granular role-based access control supporting 8+ distinct user roles.",
    challenge:
      "Designing a flexible RBAC system that accommodates complex healthcare workflows across multiple user types, from patients and nurses to physicians and administrators.",
    solution:
      "Created a declarative permission decorator system in NestJS with PostgreSQL row-level checks and dynamic React portal dashboards that morph based on role claims.",
    tech: ["React", "NestJS", "TypeORM", "PostgreSQL", "RBAC", "Docker"],
    metrics: { value: "8+", label: "User roles governed" },
    liveUrl: "https://play.google.com/store/apps/details?id=com.bop.synergy&hl=en",
    image: "/images/projects-screenshots/screenshots/synergy/synergy-1.jpg",
    screenshots: [
      "/images/projects-screenshots/screenshots/synergy/synergy-1.jpg",
      "/images/projects-screenshots/screenshots/synergy/synergy-2.jpg",
      "/images/projects-screenshots/screenshots/synergy/synergy-3.jpg",
    ],
    deviceType: "mobile",
    visualAccent: "#10b981",
    browserUrl: "synergy.bophealth.com/portal",
  },
  {
    number: "04",
    name: "LithioEV",
    category: "Mobile App · Smart EV Mobility",
    client: "Clean Mobility Initiative",
    description:
      "EV bike rental application built from core architecture through database schema to frontend/backend structure. Led a team of 3 engineers end-to-end through the entire product lifecycle.",
    challenge:
      "Architecting the complete system from scratch (data models, real-time GPS telemetry, and payment state machines) while guiding 3 engineers to deliver on a tight timeline.",
    solution:
      "Standardized OpenAPI contracts, designed relational schemas in PostgreSQL via TypeORM, and instituted daily sprint syncs to ensure flawless BLE unlock integration.",
    tech: ["React Native", "NestJS", "TypeORM", "PostgreSQL", "Docker", "Mapbox"],
    metrics: { value: "3", label: "Engineers mentored & led" },
    liveUrl: "https://play.google.com/store/apps/details?id=com.bop.lithioev&hl=en",
    image: "/images/projects-screenshots/screenshots/lithioev/lithioev-1.jpg",
    screenshots: [
      "/images/projects-screenshots/screenshots/lithioev/lithioev-1.jpg",
      "/images/projects-screenshots/screenshots/lithioev/lithioev-2.jpg",
      "/images/projects-screenshots/screenshots/lithioev/lithioev-3.jpg",
      "/images/projects-screenshots/screenshots/lithioev/lithioev-4.jpg",
    ],
    deviceType: "mobile",
    visualAccent: "#6366f1",
    browserUrl: "lithioev.bop.app/rent",
  },
  {
    number: "05",
    name: "Naturenna",
    category: "E-Commerce · Shopify Platform",
    client: "Naturenna Botanicals",
    description:
      "Shopify-based e-commerce platform for a natural botanical wellness brand. Configured the storefront, customized Liquid themes, and engineered product catalog, checkout, and payment flows.",
    challenge:
      "Delivering a bespoke high-conversion e-commerce storefront with custom product bundles while maintaining fast page load speeds and Shopify compliance.",
    solution:
      "Customized Shopify Liquid templates, integrated secure payment gateways, optimized image assets, and established structured collections for frictionless buyer checkout.",
    tech: ["Shopify", "Liquid", "JavaScript", "E-Commerce", "Payment Gateways"],
    liveUrl: "https://naturenna.in/",
    image: "/images/projects-screenshots/screenshots/naturenna/naturenna.png",
    screenshots: [
      "/images/projects-screenshots/screenshots/naturenna/naturenna.png",
    ],
    deviceType: "desktop",
    visualAccent: "#84cc16",
    browserUrl: "naturenna.in",
  },
];

export interface LabProject {
  name: string;
  description: string;
  tech: string[];
  githubUrl: string;
  label: string;
  badge: string;
  isHighlighted?: boolean;
  image?: string;
}

export const LAB_PROJECTS: LabProject[] = [
  {
    name: "Gitmomos",
    description:
      "Developer productivity CLI tool that syncs local Git commit metadata, computes velocity metrics, and prompts Gemini Pro AI to synthesize structured engineering progress reports. Published to npm with a React analytics portal.",
    tech: ["Node.js CLI", "Supabase", "React", "Gemini AI", "npm"],
    githubUrl: "https://github.com/ravitejas-tech/gitmomos",
    label: "AI · Developer Tooling",
    badge: "Published on npm",
    isHighlighted: true,
    image: "/images/projects/gitmomos.jpg",
  },
  {
    name: "QueryFish",
    description:
      "CLI code generator that transforms OpenAPI/Swagger schemas into fully-typed React Query hooks powered by react-query-kit. Provides zero-runtime overhead, strict end-to-end type safety, and eliminates manual API boilerplate.",
    tech: ["TypeScript", "OpenAPI", "React Query", "Code Generation", "AST"],
    githubUrl: "https://github.com/ravitejas-tech/queryfish",
    label: "Open Source · DX Tooling",
    badge: "Open Source CLI",
    isHighlighted: true,
    image: "/images/projects/queryfish.jpg",
  },
  {
    name: "Travix",
    description:
      "AI-powered intelligent travel itinerary platform. Generates bespoke day-by-day travel schedules, budget estimators, hotel comparisons, and activity breakdowns through structured multi-step AI inference flows.",
    tech: ["React Router", "NestJS", "TypeORM", "MySQL", "Turborepo", "LLMs"],
    githubUrl: "https://github.com/ravitejas-tech/travix",
    label: "Full Stack · AI Platform",
    badge: "Monorepo App",
    isHighlighted: true,
    image: "/images/projects/travix.jpg",
  },
  {
    name: "Loan Mate",
    description:
      "Personal finance and amortization utility for visualizing multi-tier loan repayments, interest schedules, and prepayment payoffs with interactive charts.",
    tech: ["React", "TypeScript", "TailwindCSS"],
    githubUrl: "https://github.com/ravitejas-tech/loan-mate",
    label: "Finance · Utility",
    badge: "Web App",
  },
  {
    name: "File Sharing API",
    description:
      "Secure backend service with signed download tokens, file expiration mechanisms, MIME validation, and stream-based multipart uploading.",
    tech: ["Node.js", "Express", "REST API", "Multer"],
    githubUrl: "https://github.com/ravitejas-tech/file-sharing-api",
    label: "Backend · Microservice",
    badge: "REST Service",
  },
  {
    name: "Questions Schema Generator",
    description:
      "Developer utility to automatically generate, validate, and serialize structured JSON schemas from interactive questionnaire definitions.",
    tech: ["TypeScript", "JSON Schema", "Validation"],
    githubUrl: "https://github.com/ravitejas-tech/questions-json-schema-generator",
    label: "Utility · DX",
    badge: "Tooling",
  },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  progression?: string;
  summary: string;
  achievements: string[];
  techStack: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "BOP Consultancy and Services",
    role: "Full Stack Developer",
    period: "Dec 2024 - Present",
    location: "Pune, India",
    type: "Full-Time",
    progression: "Junior Frontend Developer → Full Stack Developer",
    summary:
      "Engineering high-concurrency web and mobile platforms across fintech, global brand engagement, smart mobility, and healthcare.",
    achievements: [
      "Engineered and shipped 8+ production applications across React, React Native, and NestJS environments.",
      "Built and maintained core features for KO Mark (Coca-Cola), supporting users across 119 countries with offline resilience.",
      "Optimized backend architecture for Surge crypto prediction platform to reliably digest ~400K daily requests via Redis caching and WebSocket pooling.",
      "Architected end-to-end systems for LithioEV mobility and led an agile engineering pod of 3 developers through database design, API implementation, and production deployment.",
      "Designed granular role-based access control (RBAC) supporting 8+ distinct user roles for Synergy healthcare appointment platform.",
    ],
    techStack: [
      "React",
      "React Native",
      "NestJS",
      "TypeScript",
      "TypeORM",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    company: "Aptitude Guru",
    role: "Full Stack Developer Intern",
    period: "Aug 2024 - Nov 2024",
    location: "Remote",
    type: "Internship",
    summary:
      "Contributed to full-stack MERN development for an institutional Recruiter Management System.",
    achievements: [
      "Developed end-to-end recruitment workflow interfaces including candidate evaluation boards and interview pipelines.",
      "Implemented modular admin and student portals with secure authentication and document management.",
      "Designed RESTful Express endpoints and MongoDB aggregation pipelines for candidate ranking.",
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
  },
];

export interface TechnicalCapability {
  category: string;
  tagline: string;
  badge: string;
  productionContext: string;
  skills: { name: string; level: string }[];
}

export const TECHNICAL_CAPABILITIES: TechnicalCapability[] = [
  {
    category: "Frontend & Mobile",
    tagline: "Fluid, responsive interfaces and native mobile apps.",
    badge: "Global Scale",
    productionContext: "Shipped React Native app for Coca-Cola live across 119 countries.",
    skills: [
      { name: "React.js", level: "Production Core" },
      { name: "React Native", level: "Mobile Lead" },
      { name: "Next.js & Remix", level: "SSR / Frameworks" },
      { name: "TypeScript", level: "Strict Type Safety" },
      { name: "Tailwind CSS", level: "Design Systems" },
      { name: "Framer Motion", level: "Micro-interactions" },
    ],
  },
  {
    category: "Backend & Microservices",
    tagline: "Scalable APIs, real-time gateways, and resilient business logic.",
    badge: "High Concurrency",
    productionContext: "Handled ~400K daily requests on Surge with Redis & NestJS.",
    skills: [
      { name: "NestJS", level: "Architecture Standard" },
      { name: "Node.js & Express", level: "API Runtimes" },
      { name: "TypeORM", level: "Relational ORM" },
      { name: "WebSockets", level: "Real-time Pub/Sub" },
      { name: "RBAC Systems", level: "Enterprise Security" },
      { name: "Supabase & PocketBase", level: "BaaS & Auth" },
    ],
  },
  {
    category: "Data & Storage",
    tagline: "Relational modeling, indexing strategies, and caching tiers.",
    badge: "Zero Data Loss",
    productionContext: "Designed transactional schemas for EV mobility and healthcare portals.",
    skills: [
      { name: "PostgreSQL", level: "Primary RDBMS" },
      { name: "MySQL", level: "Transactional Data" },
      { name: "Redis", level: "In-Memory Caching" },
      { name: "MongoDB", level: "Document Store" },
      { name: "Schema Migration", level: "Automated Deployments" },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    tagline: "Reproducible containerization, pipelines, and cloud deploys.",
    badge: "Production Ready",
    productionContext: "Orchestrated multi-service staging and production containers.",
    skills: [
      { name: "Docker", level: "Containerization" },
      { name: "Kubernetes", level: "Pod Orchestration" },
      { name: "DigitalOcean", level: "Cloud Hosting" },
      { name: "Drone CI", level: "Automated Pipelines" },
      { name: "Git & Monorepos", level: "Turborepo & Yarn" },
    ],
  },
  {
    category: "AI & Developer Tooling",
    tagline: "LLM synthesis, automated code generation, and developer CLI tools.",
    badge: "Modern Workflow",
    productionContext: "Created Gitmomos CLI (Gemini AI on npm) & QueryFish generator.",
    skills: [
      { name: "Gemini AI & Claude Code", level: "Agentic Engineering" },
      { name: "OpenAPI AST Parsing", level: "Code Generation" },
      { name: "n8n Automation", level: "Workflow Pipelines" },
      { name: "CLI Development", level: "Published Packages" },
      { name: "GitHub Copilot", level: "Pair Acceleration" },
    ],
  },
  {
    category: "Platforms & CMS",
    tagline: "Commercial commerce storefronts and headless integration.",
    badge: "Live Revenue",
    productionContext: "Delivered production storefront for Naturenna Botanicals.",
    skills: [
      { name: "Shopify & Liquid", level: "Storefront Architecture" },
      { name: "Payment Gateways", level: "Checkout Integration" },
      { name: "Inngest", level: "Event-Driven Queues" },
      { name: "REST & GraphQL", level: "API Consumption" },
    ],
  },
];

export interface EngineeringPhase {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

export const ENGINEERING_PHASES: EngineeringPhase[] = [
  {
    step: "01",
    title: "Problem Framing & System Contracts",
    subtitle: "Define specifications before writing code",
    description:
      "Every project starts by understanding the business constraint and user journey. I formalize OpenAPI schemas, data contracts, and failure scenarios before touching implementation.",
    deliverables: [
      "API request/response contract definitions",
      "User journey & edge case state mapping",
      "Permission & RBAC matrix specification",
    ],
    tags: ["OpenAPI", "Type Contracts", "User Flows"],
  },
  {
    step: "02",
    title: "Database Modeling & Architecture",
    subtitle: "Design for scale and relational integrity",
    description:
      "I architect normalized schemas in PostgreSQL/MySQL, index access paths, and design caching layers (Redis) to guarantee consistency under high concurrent load.",
    deliverables: [
      "Relational entity-relationship design",
      "Index & constraint optimization",
      "Redis caching & rate limiting layout",
    ],
    tags: ["PostgreSQL", "TypeORM", "Redis", "Schema Design"],
  },
  {
    step: "03",
    title: "Full-Stack Implementation",
    subtitle: "Type-safe frontends with robust backend modules",
    description:
      "I build modular NestJS controllers and service layers with dependency injection, paired with responsive React or React Native interfaces built on clean design systems.",
    deliverables: [
      "Modular NestJS services with validation pipes",
      "Component-driven React / React Native UI",
      "Real-time WebSocket event gateways",
    ],
    tags: ["React Native", "NestJS", "TypeScript", "WebSockets"],
  },
  {
    step: "04",
    title: "Hardening, Security & Debugging",
    subtitle: "Stress test edge cases and production anomalies",
    description:
      "I stress test high-volume routes, audit authentication pipelines, profile bundle sizes, and reproduce production anomalies to ensure resilience beyond the happy path.",
    deliverables: [
      "Role-based access control audit",
      "Network recovery & offline mobile state",
      "Memory leak & slow query optimization",
    ],
    tags: ["RBAC", "Load Testing", "Error Tracing", "Audit"],
  },
  {
    step: "05",
    title: "Ship, Observe & Iterate",
    subtitle: "Automated pipelines and production telemetry",
    description:
      "I containerize services with Docker, configure CI/CD deployments via Drone CI, and monitor application health to deliver zero-downtime rollouts and continuous enhancements.",
    deliverables: [
      "Multi-stage Docker build containers",
      "Automated CI/CD build & test verification",
      "Production telemetry & health logging",
    ],
    tags: ["Docker", "Kubernetes", "Drone CI", "Zero-Downtime"],
  },
];

export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Lab", href: "#lab" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
