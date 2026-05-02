import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { useInView as useRIOInView } from "react-intersection-observer";
import { useScrollProgress } from "~/hooks/useScrollProgress";
import { projects } from "~/data/projects";
import { Navbar } from "~/components/Navbar";
import { ContactForm } from "~/components/ContactForm";
import { ExitPopup } from "~/components/ExitPopup";
import { AIAssistant } from "~/components/AIAssistant";
import { TextScramble } from "~/components/TextScramble";
import { DesktopModel } from "~/components/Globe";

const Scene3D = lazy(() =>
  import("~/components/Scene3D").then((m) => ({ default: m.Scene3D })),
);

export function meta() {
  return [
    { title: "Raviteja Salva — Full-Stack Developer" },
    {
      name: "description",
      content:
        "Full-stack developer. Translating business requirements into working code since 2024.",
    },
    { property: "og:title", content: "Raviteja Salva — Full-Stack Developer" },
    { property: "og:type", content: "website" },
  ];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TECH_CATEGORIES = [
  {
    label: "Frontend",
    items: ["React", "React Native", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "NestJS", "PostgreSQL", "Supabase"],
  },
  {
    label: "DevOps",
    items: ["AWS", "Digital Ocean", "Docker", "Nginx"],
  },
  {
    label: "Integrations",
    items: [
      "Razorpay",
      "Cashfree",
      "Google Maps SDK",
      "Radar.io",
      "Telegram Mini App SDK",
      "TON Wallet",
    ],
  },
];

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── LogoItem ──────────────────────────────────────────────────────────────────
function LogoItem({ name, slug }: { name: string; slug: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "16px 24px",
        border: `1px solid ${hovered ? "rgba(232,0,26,0.3)" : "rgba(255,255,255,0.06)"}`,
        background: hovered ? "rgba(232,0,26,0.05)" : "rgba(255,255,255,0.02)",
        minWidth: "100px",
        flexShrink: 0,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.2s",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt={name}
        style={{ width: "32px", height: "32px", opacity: 0.7 }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span
        style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  );
}

const TECH_ROW_1 = [
  { name: "React", slug: "react" },
  { name: "React Native", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Express", slug: "express" },
  { name: "NestJS", slug: "nestjs" },
  { name: "PostgreSQL", slug: "postgresql" },
];

const TECH_ROW_2 = [
  { name: "Supabase", slug: "supabase" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Docker", slug: "docker" },
  { name: "Nginx", slug: "nginx" },
  { name: "Digital Ocean", slug: "digitalocean" },
  { name: "Razorpay", slug: "razorpay" },
  { name: "Telegram", slug: "telegram" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
];

const EXPERIENCE = [
  {
    company: "BOP Consultancy and Services",
    role: "Senior Full Stack Developer Executive",
    period: "Dec 2024 – Now",
    status: "Ongoing",
    description:
      "Progressed through 3 roles — Junior Frontend Developer (Dec 2024 – June 2025), Full Stack Developer (July 2025 – Dec 2025), and Senior Full Stack Developer Executive (Jan 2026 – Now). Full ownership across React, Remix, React Native, NestJS, and TypeORM stacks.",
    tags: [
      "React JS",
      "Remix JS",
      "React Native",
      "Refine JS",
      "Nest JS",
      "TypeORM",
      "MySQL",
      "Redis",
    ],
  },
  {
    company: "Aptitude Guru Hem",
    role: "Full Stack Web Developer Intern",
    period: "Jul 2024 – Nov 2024",
    status: "Shipped",
    description:
      "Built and shipped full-stack web features end-to-end. Backend APIs with Node.js and Express, MongoDB for data persistence, React JS for the frontend. Internship with hands-on production ownership.",
    tags: ["Node JS", "Express JS", "MongoDB", "React JS"],
  },
];

const TERMINAL_LINES: Array<{
  prompt?: string;
  cmd?: string;
  output?: string;
  color?: string;
  blink?: boolean;
  delay: number;
}> = [
  { prompt: "~", cmd: "whoami", delay: 0 },
  { output: "raviteja-salva", color: "#E8001A", delay: 0.3 },
  { prompt: "~", cmd: "cat current-role.txt", delay: 0.8 },
  { output: "Lead Architect @ Yugo Rides", delay: 1.1 },
  { prompt: "~", cmd: "cat location.txt", delay: 1.6 },
  { output: "Pune, India 🇮🇳", delay: 1.9 },
  { prompt: "~", cmd: "cat status.txt", delay: 2.4 },
  { output: "Open to: Senior / Lead roles", color: "#00C850", delay: 2.7 },
  { prompt: "~", cmd: "ls skills/", delay: 3.2 },
  { output: "react/  node/  devops/  architecture/", delay: 3.5 },
  { prompt: "~", cmd: "_", blink: true, delay: 4.0 },
];

const CURRENTLY_BADGES = [
  { label: "Currently building", value: "Yugo Rides v2", icon: "⚡" },
  { label: "Currently learning", value: "System Design at scale", icon: "📖" },
  { label: "Open to", value: "Senior / Lead opportunities", icon: "🟢" },
];

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(24px,6vw,80px) 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: "clamp(40px,6vw,80px)",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Photo circle */}
        <div
          className="hero-photo-wrap"
          style={{
            flex: "0 0 45%",
            maxWidth: "45%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "360px",
          }}
        >
          {/* Outer red ring */}
          <div
            className="photo-circle-outer"
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: "1px solid rgba(232,0,26,0.25)",
              animation: "spin-slow 12s linear infinite",
            }}
          />
          {/* Middle dashed ring */}
          <div
            className="photo-circle-middle"
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: "1px dashed rgba(255,255,255,0.08)",
            }}
          />
          {/* Photo circle */}
          <div
            className="photo-circle-inner"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(232,0,26,0.5)",
              position: "relative",
              zIndex: 2,
              flexShrink: 0,
            }}
          >
            <img
              src="/ravi.webp"
              alt="Raviteja Salva"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Right: Hero text — 45% desktop */}
        <div style={{ flex: "1 1 280px" }}>
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "#E8001A",
              marginBottom: "24px",
              opacity: 0.7,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "16px",
                  background: "#E8001A",
                  marginRight: "8px",
                  animation: "blink 1s step-end infinite",
                  verticalAlign: "middle",
                }}
              />
              {">"} INIT()
            </span>
            <h1
              style={{
                fontWeight: 900,
                fontSize: "clamp(42px, 6vw, 80px)",
                color: "#ffffff",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              <TextScramble text="Raviteja" />
              <br />
              <span style={{ color: "#E8001A" }}>Salva</span>
            </h1>
            <p
              style={{
                fontWeight: 300,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: "36px",
                maxWidth: "360px",
              }}
            >
              Translating business requirements into working code since 2024.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#projects" className="btn-primary">
                See the work →
              </a>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee Strip ─────────────────────────────────────────────────────────────
function MarqueeStrip() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 0",
        background: "rgba(232,0,26,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 25s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.35)",
              paddingRight: "48px",
              fontWeight: 500,
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            git commit -m "Merged the PR, updated the dependencies, said a small
            prayer to the cloud provider, and I'm currently pretending that the
            'build failed' notification is just a glitch in the Matrix."
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px clamp(24px,6vw,80px)",
      }}
    >
      <div
        className="about-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(48px,6vw,96px)",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Left: text */}
        <div>
          <RevealBlock>
            <span className="section-label">{">"} whoami</span>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(36px,5vw,60px)",
                color: "#ffffff",
                lineHeight: 1.08,
                marginBottom: "32px",
              }}
            >
              Bridging the gap
              <br />
              <span style={{ color: "rgba(255,255,255,0.22)" }}>
                between <span style={{ color: "#E8001A" }}>"Idea"</span> and{" "}
                <span style={{ color: "#E8001A" }}>"Production."</span>
              </span>
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.15}>
            <p
              style={{
                fontWeight: 300,
                fontSize: "16px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: "20px",
              }}
            >
              My focus is on building systems that are stable, scalable, and
              actually solve the problem they were meant to. I've learned that
              the best products aren't built in isolation. I take pride in
              collaborating with designers, managers, and testers to ensure the
              final ship is something we're all proud of. I lead teams not by
              being the loudest in the room, but by being the one who makes sure
              the logic holds up and the edge cases are covered. Currently
              looking for my next big challenge—whether that's a
              mission-critical role within a company or a high-impact freelance
              project. If you have a complex problem that needs a stable
              solution, let's talk.
            </p>
          </RevealBlock>
          <RevealBlock delay={0.25}>
            <div
              style={{
                marginTop: "48px",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "20px",
              }}
            >
              {[
                { value: "10+", label: "Projects", sub: "Shipped" },
                { value: "1.9+", label: "Years Experience", sub: "Full-Stack" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderLeft: "2px solid #E8001A",
                    paddingLeft: "20px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: "36px",
                      color: "#ffffff",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "2px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontWeight: 300,
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.25)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>

        {/* Right: 3D Desktop Model */}
        <RevealBlock delay={0.2}>
          <div className="about-globe-col">
            <DesktopModel />
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
// ─── Experience ────────────────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0",
      }}
    >
      <div
        className="experience-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "45% 55%",
          gap: "80px",
          alignItems: "start",
          padding: "120px clamp(24px,6vw,80px)",
        }}
      >
        {/* Left column: heading + stats */}
        <div>
          <RevealBlock>
            <span className="section-label">{">"} WORK HISTORY</span>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(32px,4.5vw,52px)",
                color: "#ffffff",
                marginBottom: "4px",
              }}
            >
              Where I've Been
            </h2>
            <p
              style={{
                fontSize: "clamp(14px,1.5vw,18px)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              (And What I Shipped There)
            </p>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div
              style={{
                marginTop: "48px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {[
                {
                  number: "2500+",
                  label: "commits",
                },
                {
                  number: "800+",
                  label: "issues resolved",
                },
                {
                  number: "300+",
                  label: "PRs raised",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderLeft: "2px solid #E8001A",
                    paddingLeft: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 800,
                      color: "white",
                      lineHeight: 1,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "4px",
                      maxWidth: "180px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>

        {/* Right column: timeline */}
        <div
          style={{
            position: "relative",
            paddingLeft: "2px",
            borderLeft: "2px solid rgba(232,0,26,0.2)",
          }}
        >
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-80px" }}
              style={{
                position: "relative",
                paddingLeft: "40px",
                paddingBottom: index < EXPERIENCE.length - 1 ? "56px" : "0",
              }}
            >
              {/* Red dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "6px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#E8001A",
                  animation: "dot-pulse 2s ease infinite",
                }}
              />

              {/* Period + status badge */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {exp.period}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    border: `1px solid ${
                      exp.status === "Ongoing"
                        ? "rgba(232,162,0,0.4)"
                        : "rgba(0,200,80,0.4)"
                    }`,
                    color: exp.status === "Ongoing" ? "#E8A200" : "#00C850",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {exp.status}
                </span>
              </div>

              {/* Company */}
              <div
                style={{
                  fontSize: "11px",
                  color: "#E8001A",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {exp.company}
              </div>

              {/* Role */}
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                {exp.role}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: "480px",
                  marginBottom: "16px",
                }}
              >
                {exp.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "3px 10px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stack ─────────────────────────────────────────────────────────────────────
function StackSection() {
  return (
    <section
      id="stack"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px clamp(24px,6vw,80px)",
      }}
    >
      <RevealBlock>
        <span className="section-label">{">"} package.json</span>
        <h2
          style={{
            fontWeight: 700,
            fontSize: "clamp(32px,4.5vw,52px)",
            color: "#ffffff",
            marginBottom: "4px",
            textShadow: "0 0 40px rgba(0,0,0,0.9)",
          }}
        >
          What I Work With
        </h2>
        <p
          style={{
            fontWeight: 300,
            fontSize: "20px",
            color: "rgba(255,255,255,0.22)",
            marginBottom: "48px",
          }}
        >
          (And Don't Regret)
        </p>
      </RevealBlock>

      {/* Infinite-scroll logo rows */}
      <RevealBlock delay={0.1}>
        {/* Row 1 label */}
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          FRONTEND &amp; BACKEND
        </p>
        <div
          style={{
            overflow: "hidden",
            marginBottom: "32px",
            WebkitMask:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            mask: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
          className="logo-row-wrapper"
        >
          <div className="logo-scroll-left" style={{ display: "flex" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", flexShrink: 0 }}>
                {TECH_ROW_1.map((item) => (
                  <LogoItem key={item.slug + i} {...item} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 label */}
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          INFRA &amp; INTEGRATIONS
        </p>
        <div
          style={{
            overflow: "hidden",
            marginBottom: "48px",
            WebkitMask:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            mask: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
          className="logo-row-wrapper"
        >
          <div className="logo-scroll-right" style={{ display: "flex" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", flexShrink: 0 }}>
                {TECH_ROW_2.map((item) => (
                  <LogoItem key={item.slug + i} {...item} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* One-line summary */}
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "rgba(255,255,255,0.2)",
            marginTop: "0",
            letterSpacing: "0.05em",
          }}
        >
          React · React Native · Next.js · TypeScript · Node.js · Express ·
          NestJS · PostgreSQL · Supabase · AWS · Docker · Nginx · Digital Ocean
          · Razorpay · Radar.io · Telegram SDK · TON Wallet
        </p>
      </RevealBlock>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────
function BentoProjectCard({
  project,
  index,
  colSpan = 1,
  minHeight = 280,
  isWide = false,
}: {
  project: (typeof projects)[0];
  index: number;
  colSpan?: number;
  minHeight?: number;
  isWide?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  const statusColor =
    project.status === "live"
      ? "#00C850"
      : project.status === "ongoing"
        ? "#E8A200"
        : "rgba(255,255,255,0.4)";
  const statusBorder =
    project.status === "live"
      ? "rgba(0,200,80,0.4)"
      : project.status === "ongoing"
        ? "rgba(232,162,0,0.4)"
        : "rgba(255,255,255,0.15)";
  const statusLabel =
    project.status === "live"
      ? "LIVE"
      : project.status === "ongoing"
        ? "ONGOING"
        : "PLANNED";

  if (isWide) {
    // Gitmomos — full-width bottom card
    return (
      <div
        style={{
          gridColumn: "span 3",
          background: hovered ? "rgba(232,0,26,0.04)" : "#000",
          padding: "32px",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.3s",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "160px",
        }}
        className="bento-card bento-card-wide"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => (window.location.href = `/projects/${project.id}`)}
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              color: "#E8001A",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {project.company ?? project.role}
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "white",
              marginBottom: "6px",
            }}
          >
            {project.name}
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              marginBottom: "16px",
              maxWidth: "480px",
            }}
          >
            {project.tagline}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                style={{
                  padding: "3px 10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#E8001A",
            fontWeight: 600,
            whiteSpace: "nowrap",
            marginLeft: "32px",
            flexShrink: 0,
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.2s",
          }}
        >
          → View case study
        </div>
      </div>
    );
  }

  const isHero = colSpan === 2;

  return (
    <div
      style={{
        gridColumn: `span ${colSpan}`,
        background: hovered ? "rgba(232,0,26,0.04)" : "#000",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s",
        cursor: "pointer",
        minHeight: `${minHeight}px`,
        display: "flex",
        flexDirection: "column",
      }}
      className="bento-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (window.location.href = `/projects/${project.id}`)}
    >
      {/* Top row: number + status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.2em",
            fontFamily: "monospace",
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontSize: "10px",
            padding: "2px 8px",
            border: `1px solid ${statusBorder}`,
            color: statusColor,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Thumbnail image — shown on all cards */}
      <div
        style={{
          height: isHero ? "200px" : "140px",
          marginBottom: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: hovered ? "grayscale(0%)" : "grayscale(25%)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "all 0.4s ease",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: 900,
                color: "rgba(255,255,255,0.05)",
                letterSpacing: "-0.04em",
              }}
            >
              {project.name[0]}
            </span>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {project.company && (
          <div
            style={{
              fontSize: "10px",
              color: "#E8001A",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            {project.company}
          </div>
        )}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "white",
            marginBottom: "8px",
          }}
        >
          {project.name}
        </div>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            margin: "0 0 16px",
            lineHeight: 1.6,
          }}
        >
          {project.tagline}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              style={{
                padding: "3px 10px",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* KO Mark "119" watermark */}
      {isHero && (
        <div
          style={{
            position: "absolute",
            right: "24px",
            bottom: "24px",
            fontSize: "80px",
            fontWeight: 900,
            color: "rgba(255,255,255,0.03)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          119
        </div>
      )}
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px clamp(24px,6vw,80px)",
        position: "relative",
      }}
    >
      <RevealBlock>
        <span className="section-label">{">"} git log --oneline</span>
        <h2
          style={{
            fontWeight: 700,
            fontSize: "clamp(32px,4.5vw,52px)",
            color: "#ffffff",
            marginBottom: "8px",
            textShadow: "0 0 40px rgba(0,0,0,0.9)",
          }}
        >
          Things I've Actually Shipped
        </h2>
        <p
          style={{
            fontWeight: 300,
            color: "rgba(255,255,255,0.35)",
            fontSize: "15px",
            maxWidth: "480px",
            marginBottom: "48px",
          }}
        >
          No side projects that died in staging. These are in production, being
          used by real people.
        </p>
      </RevealBlock>

      {/* Bento grid */}
      <div
        className="bento-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        {/* Row 1: KO Mark (span 2) + Surge (span 1) */}
        <BentoProjectCard
          project={projects[0]}
          index={0}
          colSpan={2}
          minHeight={360}
          isWide={false}
        />
        <BentoProjectCard
          project={projects[1]}
          index={1}
          colSpan={1}
          minHeight={360}
        />

        {/* Row 2: Synergy + Yugo + Lucky PG */}
        <BentoProjectCard project={projects[2]} index={2} />
        <BentoProjectCard project={projects[3]} index={3} />
        <BentoProjectCard project={projects[4]} index={4} />

        {/* Row 3: Gitmomos full width */}
        <BentoProjectCard project={projects[5]} index={5} isWide={true} />
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px clamp(24px,6vw,80px)",
      }}
    >
      {/* Centered max-width wrapper */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left: heading + contact details */}
          <div>
            <RevealBlock>
              <span className="section-label">{">"} REACH_OUT()</span>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(36px,5vw,60px)",
                  color: "#ffffff",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                  textShadow: "0 0 40px rgba(0,0,0,0.9)",
                }}
              >
                End of Scroll.
                <br />
                <span style={{ color: "#E8001A" }}>Start of Conversation.</span>
              </h2>
              <p
                style={{
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "15px",
                  marginBottom: "48px",
                }}
              >
                Building something? Need a full-stack developer who doesn't need
                hand-holding? This is the form.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  {
                    icon: "✉",
                    label: "EMAIL",
                    value: "ravitejastech@gmail.com",
                    href: "mailto:ravitejastech@gmail.com",
                  },
                  {
                    icon: "💬",
                    label: "WHATSAPP",
                    value: "+91 9381598559",
                    href: "https://wa.me/919381598559",
                  },
                  {
                    icon: "💼",
                    label: "LINKEDIN",
                    value: "linkedin.com/in/raviteja-salva-8a1464272",
                    href: "https://www.linkedin.com/in/raviteja-salva-8a1464272/",
                  },
                  {
                    icon: "⌨",
                    label: "GITHUB",
                    value: "github.com/ravitejas-tech",
                    href: "https://github.com/ravitejas-tech",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      textDecoration: "none",
                      padding: "16px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget.querySelector(
                          ".contact-link-label",
                        ) as HTMLElement | null
                      )?.style &&
                        ((
                          e.currentTarget.querySelector(
                            ".contact-link-label",
                          ) as HTMLElement
                        ).style.color = "white");
                      (
                        e.currentTarget.querySelector(
                          ".contact-link-arrow",
                        ) as HTMLElement | null
                      )?.style &&
                        ((
                          e.currentTarget.querySelector(
                            ".contact-link-arrow",
                          ) as HTMLElement
                        ).style.opacity = "1");
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget.querySelector(
                          ".contact-link-label",
                        ) as HTMLElement | null
                      )?.style &&
                        ((
                          e.currentTarget.querySelector(
                            ".contact-link-label",
                          ) as HTMLElement
                        ).style.color = "white");
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.3)",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          marginBottom: "3px",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="contact-link-label"
                        style={{
                          fontSize: "14px",
                          color: "white",
                          fontWeight: 400,
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                    <span
                      className="contact-link-arrow"
                      style={{
                        color: "#E8001A",
                        fontSize: "16px",
                        opacity: 0.5,
                        transition: "opacity 0.2s",
                      }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Right: form */}
          <RevealBlock delay={0.15}>
            <ContactForm />
          </RevealBlock>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: "80px",
          paddingTop: "40px",
          background: "#000",
        }}
      >
        <div
          className="footer-inner"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Left: Logo + tagline */}
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "white",
                marginBottom: "4px",
              }}
            >
              RS<span style={{ color: "#E8001A" }}>.</span>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.05em",
              }}
            >
              Full-stack. All receipts. Zero fluff.
            </div>
          </div>

          {/* Center: nav links */}
          <div style={{ display: "flex", gap: "32px" }}>
            {["Work", "Stack", "Projects", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8001A")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                }
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right: social + copyright */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "flex-end",
                marginBottom: "8px",
              }}
            >
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/ravitejas",
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/raviteja-salva",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
                  }
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)" }}>
              © 2025 Raviteja Salva
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.1)",
              letterSpacing: "0.1em",
            }}
          >
            BUILT WITH REACT ROUTER · THREE.JS · FRAMER MOTION
          </span>
        </div>
      </footer>
    </section>
  );
}
export default function Home() {
  const progress = useScrollProgress();

  return (
    <>
      {/* Scroll progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
          height: "2px",
          background: "#E8001A",
          transformOrigin: "left",
          width: `${progress * 100}%`,
          pointerEvents: "none",
          transition: "width 0.1s linear",
        }}
      />

      {/* Fixed background 3D canvas */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Scrollable content layer */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </div>

      <ExitPopup />
      <AIAssistant />
    </>
  );
}
