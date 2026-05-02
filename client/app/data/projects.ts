export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: "live" | "ongoing" | "planned";
  role: string;
  company?: string;
  description: string;
  story: string;
  challenges: string[];
  highlights: string[];
  tech: string[];
  screenshots: string[];
  thumbnail: string;
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "ko-mark",
    name: "KO Mark",
    tagline:
      "A centralized enterprise marketing OS facilitating global operations for Coca-Cola’s bottler network.",
    status: "live",
    role: "Full-Stack Developer",
    company: "BOP Consultancy and Services (Client: Coca-Cola)",
    description:
      "A high-scale internal platform for marketing distribution, mission management, and real-time gamified leaderboards used by global bottling partners.",
    story:
      "As a core developer, I owned the end-to-end delivery of the Missions and Leaderboard modules. This required building a system that could handle global mission assignments and calculate real-time rankings without impacting core API performance. I architected the flow from database schema design to the implementation of event-driven background workers and high-speed caching layers, ensuring the platform remained responsive across diverse geographic regions.",
    challenges: [
      "Implementing an event-driven architecture using Inngest to handle background mission processing and ranking updates asynchronously.",
      "Designing a high-concurrency leaderboard system utilizing Redis Sorted Sets to ensure sub-millisecond ranking retrievals.",
      "Handling complex i18n and localization requirements, including RTL support and localized mission logic for global markets.",
      "Optimizing mobile feed performance for low-bandwidth regions through efficient data orchestration and lazy-loading strategies.",
    ],
    highlights: [
      "Successfully moved Missions + Leaderboard modules from architecture to global production.",
      "Reduced database load significantly by offloading mission completion events to Inngest background jobs.",
      "Engineered a real-time ranking engine using Redis that maintains data integrity across thousands of concurrent updates.",
      "Collaborated with cross-functional teams (Design, QA, and PMs) to ensure seamless feature integration and stability.",
    ],
    thumbnail: "/thumbnails/komark.jpg",
    tech: [
      "React Native",
      "NestJS",
      "TypeORM",
      "MySQL",
      "Redis",
      "Inngest",
      "TypeScript",
    ],
    screenshots: [
      "/screenshots/komark/komark-1.jpg",
      "/screenshots/komark/komark-2.jpg",
      "/screenshots/komark/komark-3.jpg",
      "/screenshots/komark/komark-4.jpg",
      "/screenshots/komark/komark-5.jpg",
      "/screenshots/komark/komark-6.jpg",
      "/screenshots/komark/komark-7.jpg",
      "/screenshots/komark/komark-8.jpg",
      "/screenshots/komark/komark-9.jpg",
      "/screenshots/komark/komark-10.jpg",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/ko-mark/id6741153521",
      },
      {
        label: "Play Store",
        url: "https://play.google.com/store/search?q=KO%20Mark&c=apps",
      },
    ],
  },
  {
    id: "surge",
    name: "Surge",
    tagline:
      "A high-concurrency Telegram Mini App for real-time crypto predictions and gamified Web3 engagement.",
    status: "live",
    role: "Full-Stack Developer (Core Contributor)",
    company: "BOP Consultancy and Services (Client: Altcoin Buzz)",
    description:
      "A gamified Telegram-native application integrated with the TON ecosystem, featuring real-time market data synchronization and high-velocity user interactions.",
    story:
      "As a core full-stack contributor, I was responsible for architecting the critical backend infrastructure and real-time features of the application. I focused on building a resilient system that could synchronize live market data with user prediction mechanics while managing a complex multi-currency reward ecosystem. Beyond feature development, I played a key role in containerizing the application and managing the deployment pipelines for a high-traffic production environment.",
    challenges: [
      "Orchestrating real-time market data synchronization by implementing Inngest crons to fetch and update CoinGecko price feeds within a high-traffic MySQL environment.",
      "Implementing a high-performance leaderboard and reward system (Daily, Weekly, Monthly) that processes game mechanics at scale without database contention.",
      "Designing a real-time communication layer using Pusher to facilitate in-app chat and live notifications within the Telegram Mini App framework.",
      "Managing DevOps workflows involving Docker Swarm orchestration, Digital Ocean Container Registries, and automated droplet image pipelines.",
    ],
    highlights: [
      "Integrated the Telegram Mini App (TMA) SDK and Twitter OAuth to create a seamless, cross-platform authentication and user experience.",
      "Engineered an asynchronous reward distribution engine for a tiered multi-currency system (Diamond, Platinum, Gold, Surge).",
      "Developed a secure 'Buy Swipes' transactional logic and integrated S3-compatible storage for optimized asset management via image upload APIs.",
      "Built a robust Telegram bot notification system to drive user retention through automated, event-driven alerts.",
      "Successfully maintained high-availability deployment pipelines for a product handling 300K+ daily API requests at peak.",
    ],
    thumbnail: "/thumbnails/surge.png",
    tech: [
      "React JS",
      "NestJS",
      "Inngest",
      "Pusher",
      "Docker Swarm",
      "Digital Ocean",
      "Redis",
      "MySQL",
      "S3",
    ],
    screenshots: [
      "/screenshots/surge/surge-1.jpg",
      "/screenshots/surge/surge-2.jpg",
      "/screenshots/surge/surge-3.jpg",
      "/screenshots/surge/surge-4.jpg",
      "/screenshots/surge/surge-5.jpg",
      "/screenshots/surge/surge-6.jpg",
    ],
    links: [{ label: "Open in Telegram", url: "https://t.me/wesurgenowbot" }],
  },
  {
    id: "synergy",
    name: "Synergy Medical Yoga",
    tagline:
      "A multi-phase clinical management ecosystem for specialized medical yoga therapy.",
    status: "live",
    role: "Lead Developer (Phases 1-3) & Full-Stack Engineer",
    company: "BOP Consultancy and Services (Client: Synergy Medical Yoga)",
    description:
      "A comprehensive clinical OS featuring multi-role management, automated booking workflows, clinical case file tracking, and integrated payment processing across multiple release cycles.",
    story:
      "As the Lead Developer for the first three phases of this project, I architected the core system and led the technical execution from concept to production. I worked closely with designers to ensure a therapy-first UX, collaborated with managers to define phase milestones, and partnered with testers to maintain a bug-free clinical environment. My focus was on building a stable, scalable foundation that could evolve through iterative versions while maintaining strict data integrity.",
    challenges: [
      "Leading the end-to-end development of three project phases, ensuring architectural consistency and smooth feature transitions.",
      "Implementing a secure Role-Based Access Control (RBAC) system to isolate sensitive patient clinical history across Admin, Therapist, and Patient roles.",
      "Designing a high-reliability payment infrastructure via Cashfree, featuring automated webhook reconciliation for bookings and refunds.",
      "Managing the full mobile lifecycle, including native App Store/Play Store deployments and setting up OTA (Over-the-Air) update pipelines for rapid iterations.",
    ],
    highlights: [
      "Successfully led cross-functional collaboration with designers, testers, and stakeholders to deliver a production-ready medical platform.",
      "Engineered a versioned clinical case file system allowing therapists to track long-term patient progress with secure file attachments.",
      "Automated the deployment and update workflow, significantly reducing the turnaround time for critical production fixes via OTA pipelines.",
      "Built and optimized the full-stack infrastructure on Digital Ocean, handling everything from containerization to production monitoring.",
    ],
    thumbnail: "/thumbnails/synergy.png",
    tech: [
      "React Native",
      "NestJS",
      "TypeORM",
      "MySQL",
      "Redis",
      "Cashfree SDK",
      "EAS/OTA Updates",
      "Docker",
    ],
    screenshots: [
      "/screenshots/synergy/synergy-1.jpg",
      "/screenshots/synergy/synergy-2.jpg",
      "/screenshots/synergy/synergy-3.jpg",
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/in/app/synergy-myt/id6742007565",
      },
      {
        label: "Play Store",
        url: "https://play.google.com/store/apps/details?id=com.bop.synergy",
      },
    ],
  },
  {
    id: "yugo-rides",
    name: "Yugo Rides",
    tagline:
      "An integrated EV rental ecosystem featuring IoT telemetry, geospatial mapping, and automated KYC pipelines.",
    status: "ongoing",
    role: "Architect & Lead Developer",
    company: "BOP Consultancy and Services (Client: Yugo Rides)",
    description:
      "A scalable EV bike rental platform orchestrating real-time IoT battery data, Radar.io geofencing, Google Maps routing, and automated regulatory compliance.",
    story:
      "As the lead architect, I designed the entire system from the ground up to handle the unique complexities of EV fleet management. This project required building a highly resilient backend to synchronize IoT telemetry from distributed bike hardware while maintaining a seamless user experience for booking and navigation. I lead a cross-functional team to integrate disparate services—including geospatial APIs, fintech payment gateways, and government KYC providers—into a unified, production-ready architecture.",
    challenges: [
      "Architecting a real-time state machine to manage the full rental lifecycle: reservation, hardware unlocking, live-trip tracking, and automated billing.",
      "Synchronizing distributed IoT battery telemetry and vehicle health data with the central database to ensure accurate station-level availability.",
      "Implementing high-precision geospatial logic using Radar.io and Google Maps for geofencing, proximity-based station discovery, and optimized route calculations.",
      "Engineering a robust KYC compliance pipeline with automated verification, secure document handling, and failure-contingency logic.",
    ],
    highlights: [
      "Designed and implemented the core system architecture using a Monorepo setup for streamlined development across mobile and backend services.",
      "Integrated multi-provider mapping services to provide sub-meter accuracy for vehicle tracking and geofencing triggers.",
      "Established a secure financial layer with Razorpay, handling complex rental pricing models and real-time payment reconciliation.",
      "Leading the development team through iterative release cycles, focusing on code quality, performance optimization, and scalable infrastructure.",
    ],
    thumbnail: "/thumbnails/yugo.png",
    tech: [
      "React Native",
      "NestJS",
      "TypeORM",
      "MySQL",
      "Redis",
      "Radar.io",
      "Google Maps SDK",
      "Razorpay",
    ],
    screenshots: [],
  },
  {
    id: "lucky-luxury-pg",
    name: "Lucky Luxury PG",
    tagline: "PG management, simplified. Rent tracking, beds, rooms, done.",
    status: "live",
    role: "Freelance Full-Stack Developer",
    company: "Lucky Luxury PG",
    description:
      "A PG (paying guest) management application built freelance. Handles rent collection, bed/room allocation, expense tracking, and push notifications. Built with React JS and Supabase.",
    story:
      "The client needed a replacement for WhatsApp group chaos and Excel sheets. I built a clean management app: tenant onboarding, room and bed allocation, monthly rent tracking with payment history, expense logging, and push notifications for due reminders. React + Supabase — fast to ship, zero maintenance overhead for the client.",
    challenges: [
      "Designing flexible room/bed allocation that handles partial occupancy",
      "Push notification timing logic for rent due reminders",
    ],
    highlights: [
      "Eliminated manual tracking entirely for the client",
      "Live and actively used",
      "Supabase made auth + DB management a breeze",
    ],
    thumbnail: "/thumbnails/luckyluxury.png",
    tech: ["React JS", "Supabase"],
    screenshots: [],
  },
  {
    id: "gitmomos",
    name: "GitMomos",
    tagline:
      "Automated work reports for developers who would rather write code than timesheets.",
    status: "ongoing",
    role: "Author & Lead Maintainer",
    company: "Personal Project",
    description:
      "A CLI-driven productivity tool that transforms raw git commit history into structured, human-readable daily work summaries and a visual activity dashboard.",
    story:
      "GitMomos was born out of a personal frustration: the Friday afternoon struggle of remembering what I actually did on Monday. I built this tool to automate the tedious process of report generation. It parses local and remote git logs, categorizes tasks, and syncs them to a personal dashboard. It’s designed for developers who want to prove their velocity without manually tracking every Jira ticket.",
    challenges: [
      "Developing a robust parser to handle inconsistent commit styles—from 'hotfix' to detailed technical documentation.",
      "Implementing an intelligent grouping logic that aggregates micro-commits into meaningful high-level work summaries.",
      "Building a lightweight CLI tool that securely syncs data to a Supabase-backed dashboard without interrupting the developer's workflow.",
      "Architecting the package for an upcoming NPM registry publication and open-source contribution.",
    ],
    highlights: [
      "Engineered a CLI tool that eliminates manual work tracking by leveraging existing git metadata.",
      "Developed a centralized dashboard using Supabase for real-time storage and React for data visualization.",
      "Implemented a logic layer to filter out 'noise' (e.g., merge commits, typo fixes) to focus on impactful changes.",
      "Preparing for public release with a focus on developer experience (DX) and easy installation via npm.",
    ],
    thumbnail: "/thumbnails/gitmomos.png",
    tech: ["Node.js", "React JS", "Supabase", "Commander.js", "Git API"],
    screenshots: [],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
