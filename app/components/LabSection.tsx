import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Terminal,
  Sparkles,
  GitBranch,
  Package,
  Code2,
  Cpu,
  Globe,
  FileJson,
  Shield,
  BarChart3,
  Plane,
  Calculator,
  Upload,
  Braces,
} from "lucide-react";
import { LAB_PROJECTS } from "~/data/portfolio";
import type { LabProject } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";
import { useReducedMotion } from "~/hooks/useReducedMotion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Visual config per project - icon, accent color,
   and abstract pattern for the card header
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PROJECT_VISUALS: Record<
  string,
  { icon: React.ElementType; accent: string; secondaryAccent: string }
> = {
  Gitmomos: {
    icon: Terminal,
    accent: "#a78bfa",
    secondaryAccent: "#6366f1",
  },
  QueryFish: {
    icon: Code2,
    accent: "#34d399",
    secondaryAccent: "#059669",
  },
  Travix: {
    icon: Plane,
    accent: "#f59e0b",
    secondaryAccent: "#d97706",
  },
  "Loan Mate": {
    icon: Calculator,
    accent: "#60a5fa",
    secondaryAccent: "#3b82f6",
  },
  "File Sharing API": {
    icon: Upload,
    accent: "#f472b6",
    secondaryAccent: "#ec4899",
  },
  "Questions Schema Generator": {
    icon: Braces,
    accent: "#a3e635",
    secondaryAccent: "#84cc16",
  },
};

const DEFAULT_VISUAL = {
  icon: Package,
  accent: "var(--color-accent)",
  secondaryAccent: "#a3c935",
};

function getVisual(name: string) {
  return PROJECT_VISUALS[name] || DEFAULT_VISUAL;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Abstract pattern header - replaces images
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AbstractHeader({
  visual,
  isHovered,
}: {
  visual: { icon: React.ElementType; accent: string; secondaryAccent: string };
  isHovered: boolean;
}) {
  const Icon = visual.icon;
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative h-40 md:h-48 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${visual.accent}08 0%, ${visual.secondaryAccent}05 100%)`,
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(${visual.accent} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, ${visual.accent}20, transparent 70%)`,
        }}
        animate={
          reducedMotion
            ? {}
            : { scale: isHovered ? 1.3 : 1, opacity: isHovered ? 0.8 : 0.4 }
        }
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-4 -left-4 w-20 h-20 rounded-full"
        style={{
          background: `radial-gradient(circle, ${visual.secondaryAccent}15, transparent 70%)`,
        }}
        animate={
          reducedMotion
            ? {}
            : { scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.6 : 0.3 }
        }
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      {/* Decorative diagonal lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isHovered ? 0.08 : 0.04 }}
      >
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          stroke={visual.accent}
          strokeWidth="1"
        />
        <line
          x1="20%"
          y1="100%"
          x2="100%"
          y2="20%"
          stroke={visual.accent}
          strokeWidth="0.5"
        />
      </svg>

      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${visual.accent}15, ${visual.secondaryAccent}10)`,
            border: `1px solid ${visual.accent}20`,
            backdropFilter: "blur(8px)",
          }}
          animate={
            reducedMotion
              ? {}
              : { scale: isHovered ? 1.1 : 1, rotate: isHovered ? 3 : 0 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Icon
            size={28}
            style={{ color: visual.accent }}
            strokeWidth={1.5}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg-card), transparent)",
        }}
      />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Featured Lab Card - highlighted projects
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FeaturedLabCard({ project }: { project: LabProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const visual = getVisual(project.name);

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        className="rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 group"
        style={{
          background: "var(--color-bg-card)",
          border: `1px solid ${isHovered ? `${visual.accent}30` : "var(--color-border)"}`,
          boxShadow: isHovered
            ? `0 20px 50px -15px ${visual.accent}12`
            : "none",
        }}
      >
        {/* Abstract visual header */}
        <AbstractHeader visual={visual} isHovered={isHovered} />

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1">
          {/* Label + Badge row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span
              className="text-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: visual.accent }}
            >
              {project.label}
            </span>
            <span
              className="text-mono text-[9px] px-2 py-0.5 rounded-full font-medium"
              style={{
                background: `${visual.accent}10`,
                color: visual.accent,
                border: `1px solid ${visual.accent}15`,
              }}
            >
              {project.badge}
            </span>
          </div>

          {/* Name */}
          <h3
            className="text-lg md:text-xl font-semibold mb-2.5 transition-colors duration-300"
            style={{
              color: isHovered ? visual.accent : "var(--color-text)",
            }}
          >
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-mono text-xs text-[var(--color-text-secondary)] leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-mono text-[10px] text-[var(--color-text-tertiary)] px-2 py-0.5 rounded-md transition-colors duration-300"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* GitHub link footer */}
          <div
            className="pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center gap-2 text-mono text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
              <GitBranch size={13} />
              <span>View Source</span>
            </div>
            <ArrowUpRight
              size={14}
              className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </article>
    </a>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Compact Lab Card - utility projects
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CompactLabCard({ project }: { project: LabProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const visual = getVisual(project.name);
  const Icon = visual.icon;

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="rounded-xl p-5 h-full flex flex-col justify-between transition-all duration-400 group"
        style={{
          background: "var(--color-bg-card)",
          border: `1px solid ${isHovered ? `${visual.accent}25` : "var(--color-border)"}`,
        }}
      >
        <div>
          {/* Icon + Label row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: `${visual.accent}10`,
                  border: `1px solid ${visual.accent}15`,
                }}
              >
                <Icon size={15} style={{ color: visual.accent }} />
              </div>
              <span
                className="text-mono text-[9px] font-bold uppercase tracking-wider"
                style={{ color: visual.accent }}
              >
                {project.label}
              </span>
            </div>
            <ArrowUpRight
              size={13}
              className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>

          {/* Name */}
          <h4
            className="text-base font-semibold mb-2 transition-colors duration-300"
            style={{
              color: isHovered ? visual.accent : "var(--color-text)",
            }}
          >
            {project.name}
          </h4>

          {/* Description */}
          <p className="text-mono text-[11px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-mono text-[10px] text-[var(--color-text-tertiary)]"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Section Export
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function LabSection() {
  const highlighted = LAB_PROJECTS.filter((p) => p.isHighlighted);
  const utilities = LAB_PROJECTS.filter((p) => !p.isHighlighted);

  return (
    <section
      id="lab"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-elevated) 50%, var(--color-bg) 100%)",
      }}
    >
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, #34d399 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <SectionLabel label="Open Source & Lab" number="04" />

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-[900px] mb-6">
            <h2 className="text-display mb-6">
              Open source &amp;{" "}
              <span className="relative inline-block">
                <span className="text-[var(--color-accent)]">
                  side projects
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </span>
              .
            </h2>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-[700px]">
              Developer tools, CLI automation, and AI workflows engineered and
              published. Built from scratch to solve real engineering
              bottlenecks.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats strip */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-6 md:gap-10 mb-14">
            {[
              { value: LAB_PROJECTS.length.toString(), label: "Projects" },
              {
                value: `${new Set(LAB_PROJECTS.flatMap((p) => p.tech)).size}+`,
                label: "Technologies",
              },
              {
                value: highlighted.length.toString(),
                label: "Highlighted",
              },
            ].map((stat, idx) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <motion.span
                  className="text-xl md:text-2xl font-bold text-[var(--color-accent)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>
        </ScrollReveal>

        {/* Featured projects - Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {highlighted.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.1}>
              <FeaturedLabCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        {/* Utility projects */}
        <ScrollReveal delay={0.15}>
          <div className="flex items-center gap-3 mb-5">
            <Package
              size={14}
              className="text-[var(--color-text-tertiary)]"
            />
            <span className="text-label text-[var(--color-text-tertiary)]">
              More Tools &amp; Utilities
            </span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {utilities.map((project, i) => (
            <ScrollReveal key={project.name} delay={0.1 + i * 0.08}>
              <CompactLabCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
