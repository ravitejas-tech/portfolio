import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Server,
  Database,
  Cloud,
  Sparkles,
  ShoppingBag,
  Cpu,
  Zap,
  ChevronRight,
  // Tech icon imports
  Atom,
  FileCode2,
  Palette,
  Move3d,
  Boxes,
  Cable,
  Lock,
  Shield,
  Cylinder,
  HardDrive,
  RefreshCw,
  Container,
  Ship,
  CloudCog,
  GitBranch,
  Bot,
  Braces,
  Workflow,
  Terminal,
  Code2,
  Store,
  CreditCard,
  CalendarClock,
  Network,
} from "lucide-react";
import { TECHNICAL_CAPABILITIES } from "~/data/portfolio";
import type { TechnicalCapability } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";
import { useReducedMotion } from "~/hooks/useReducedMotion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Per-category visual config
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CATEGORY_CONFIG: {
  icon: React.ElementType;
  accent: string;
  secondary: string;
}[] = [
  { icon: Smartphone, accent: "#60a5fa", secondary: "#3b82f6" },
  { icon: Server, accent: "#f59e0b", secondary: "#d97706" },
  { icon: Database, accent: "#34d399", secondary: "#059669" },
  { icon: Cloud, accent: "#a78bfa", secondary: "#7c3aed" },
  { icon: Sparkles, accent: "#f472b6", secondary: "#ec4899" },
  { icon: ShoppingBag, accent: "#fb923c", secondary: "#ea580c" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Technology symbol map - icon per tech
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const S = 18; // icon size
const TECH_SYMBOLS: Record<string, { letter: string; icon: React.ReactNode | null }> = {
  // Frontend & Mobile
  "React.js":          { letter: "Re", icon: <Atom size={S} /> },
  "React Native":      { letter: "RN", icon: <Smartphone size={S} /> },
  "Next.js & Remix":   { letter: "Nx", icon: <Boxes size={S} /> },
  "TypeScript":        { letter: "TS", icon: <FileCode2 size={S} /> },
  "Tailwind CSS":      { letter: "Tw", icon: <Palette size={S} /> },
  "Framer Motion":     { letter: "FM", icon: <Move3d size={S} /> },
  // Backend & Microservices
  "NestJS":            { letter: "Ns", icon: <Server size={S} /> },
  "Node.js & Express": { letter: "No", icon: <Cable size={S} /> },
  "TypeORM":           { letter: "TO", icon: <Database size={S} /> },
  "WebSockets":        { letter: "WS", icon: <Network size={S} /> },
  "RBAC Systems":      { letter: "RB", icon: <Lock size={S} /> },
  "Supabase & PocketBase": { letter: "Sb", icon: <Shield size={S} /> },
  // Data & Storage
  "PostgreSQL":        { letter: "Pg", icon: <Cylinder size={S} /> },
  "MySQL":             { letter: "My", icon: <Database size={S} /> },
  "Redis":             { letter: "Rd", icon: <Zap size={S} /> },
  "MongoDB":           { letter: "Mg", icon: <HardDrive size={S} /> },
  "Schema Migration":  { letter: "Sm", icon: <RefreshCw size={S} /> },
  // DevOps & Infra
  "Docker":            { letter: "Dk", icon: <Container size={S} /> },
  "Kubernetes":        { letter: "K8", icon: <Ship size={S} /> },
  "DigitalOcean":      { letter: "DO", icon: <CloudCog size={S} /> },
  "Drone CI":          { letter: "Dr", icon: <Workflow size={S} /> },
  "Git & Monorepos":   { letter: "Gt", icon: <GitBranch size={S} /> },
  // AI & Developer Tooling
  "Gemini AI & Claude Code": { letter: "AI", icon: <Bot size={S} /> },
  "OpenAPI AST Parsing": { letter: "OA", icon: <Braces size={S} /> },
  "n8n Automation":    { letter: "n8", icon: <Workflow size={S} /> },
  "CLI Development":   { letter: "CLI", icon: <Terminal size={S} /> },
  "GitHub Copilot":    { letter: "GC", icon: <Code2 size={S} /> },
  // Platforms & CMS
  "Shopify & Liquid":  { letter: "Sh", icon: <Store size={S} /> },
  "Payment Gateways":  { letter: "Pay", icon: <CreditCard size={S} /> },
  "Inngest":           { letter: "In", icon: <CalendarClock size={S} /> },
  "REST & GraphQL":    { letter: "API", icon: <Network size={S} /> },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Skill bar - animated proficiency indicator
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SkillRow({
  skill,
  accent,
  delay,
  isVisible,
}: {
  skill: { name: string; level: string };
  accent: string;
  delay: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group/skill relative flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 cursor-default"
      style={{
        background: isHovered ? `${accent}06` : "transparent",
        border: `1px solid ${isHovered ? `${accent}15` : "transparent"}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -10 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ delay, duration: 0.3 }}
    >
      {/* Accent dot */}
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300"
        style={{
          background: accent,
          transform: isHovered ? "scale(1.5)" : "scale(1)",
        }}
      />

      {/* Skill name */}
      <span
        className="text-mono text-xs font-medium flex-1 transition-colors duration-300"
        style={{
          color: isHovered ? accent : "var(--color-text)",
        }}
      >
        {skill.name}
      </span>

      {/* Level badge */}
      <span
        className="text-mono text-[10px] px-2 py-0.5 rounded transition-all duration-300"
        style={{
          color: isHovered ? accent : "var(--color-text-tertiary)",
          background: isHovered ? `${accent}10` : "transparent",
        }}
      >
        {skill.level}
      </span>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Category Tab Button
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CategoryTab({
  cap,
  index,
  isActive,
  onClick,
}: {
  cap: TechnicalCapability;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const config = CATEGORY_CONFIG[index] || CATEGORY_CONFIG[0];
  const Icon = config.icon;
  const reducedMotion = useReducedMotion();

  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-400 w-full group"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${config.accent}08, ${config.secondary}05)`
          : "transparent",
        border: `1px solid ${isActive ? `${config.accent}20` : "transparent"}`,
      }}
    >
      {/* Active indicator bar */}
      {isActive && !reducedMotion && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full"
          style={{ background: config.accent }}
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      {isActive && reducedMotion && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full"
          style={{ background: config.accent }}
        />
      )}

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: isActive ? `${config.accent}15` : "var(--color-bg)",
          border: `1px solid ${isActive ? `${config.accent}20` : "var(--color-border)"}`,
        }}
      >
        <Icon
          size={16}
          style={{
            color: isActive ? config.accent : "var(--color-text-tertiary)",
          }}
        />
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <span
          className="text-sm font-medium block truncate transition-colors duration-300"
          style={{
            color: isActive ? config.accent : "var(--color-text-secondary)",
          }}
        >
          {cap.category}
        </span>
        <span className="text-mono text-[10px] text-[var(--color-text-tertiary)] block truncate">
          {cap.skills.length} skills
        </span>
      </div>

      {/* Badge */}
      {isActive && (
        <span
          className="hidden lg:inline text-mono text-[9px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
          style={{
            background: `${config.accent}10`,
            color: config.accent,
            border: `1px solid ${config.accent}15`,
          }}
        >
          {cap.badge}
        </span>
      )}
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Category Detail Panel
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CategoryDetail({
  cap,
  index,
}: {
  cap: TechnicalCapability;
  index: number;
}) {
  const config = CATEGORY_CONFIG[index] || CATEGORY_CONFIG[0];
  const Icon = config.icon;
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={cap.category}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full flex flex-col"
    >
      {/* Detail header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${config.accent}15, ${config.secondary}10)`,
              border: `1px solid ${config.accent}20`,
            }}
          >
            <Icon size={20} style={{ color: config.accent }} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-text)]">
              {cap.category}
            </h3>
            <p className="text-mono text-xs text-[var(--color-text-tertiary)]">
              {cap.tagline}
            </p>
          </div>
        </div>

        {/* Badge + count row */}
        <div className="flex items-center gap-3 mt-4">
          <span
            className="text-mono text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider"
            style={{
              background: `${config.accent}10`,
              color: config.accent,
              border: `1px solid ${config.accent}15`,
            }}
          >
            {cap.badge}
          </span>
          <span className="text-mono text-[10px] text-[var(--color-text-tertiary)]">
            {cap.skills.length} technologies
          </span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
      </div>

      {/* Skills list */}
      <div className="flex-1 space-y-1">
        {cap.skills.map((skill, idx) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            accent={config.accent}
            delay={0.05 + idx * 0.05}
            isVisible={true}
          />
        ))}
      </div>

      {/* Production proof footer */}
      <div className="mt-8 pt-5" style={{ borderTop: `1px solid var(--color-border)` }}>
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: `${config.accent}08`,
              border: `1px solid ${config.accent}12`,
            }}
          >
            <Zap size={12} style={{ color: config.accent }} />
          </div>
          <div>
            <span
              className="text-mono text-[10px] font-bold uppercase tracking-wider block mb-1"
              style={{ color: config.accent }}
            >
              Production Proof
            </span>
            <p className="text-mono text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {cap.productionContext}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Section Export
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const TAB_AUTO_INTERVAL = 4000; // 4s per domain

export function TechCapabilities() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeCap = TECHNICAL_CAPABILITIES[activeIdx];
  const activeConfig = CATEGORY_CONFIG[activeIdx] || CATEGORY_CONFIG[0];
  const total = TECHNICAL_CAPABILITIES.length;

  // Auto-cycle through tabs
  useEffect(() => {
    if (isPaused || reducedMotion) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, TAB_AUTO_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, total]);

  // Pause on manual tab click, resume after a delay
  const handleTabClick = useCallback((idx: number) => {
    setActiveIdx(idx);
    setIsPaused(true);
    // Resume auto-cycle after 8s of inactivity
    setTimeout(() => setIsPaused(false), 8000);
  }, []);

  // Total skills count
  const totalSkills = TECHNICAL_CAPABILITIES.reduce(
    (acc, c) => acc + c.skills.length,
    0
  );

  return (
    <section
      id="stack"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg-elevated) 0%, var(--color-bg) 100%)",
      }}
    >
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${activeConfig.accent}06, transparent 70%)`,
          }}
          animate={{ opacity: 1 }}
          key={activeConfig.accent}
        />
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-text) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <SectionLabel label="Technical Arsenal" number="05" />

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-[900px] mb-6">
            <h2 className="text-display mb-6">
              Tools I{" "}
              <span className="relative inline-block">
                <span className="text-[var(--color-accent)]">think</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </span>{" "}
              and ship with.
            </h2>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-[700px]">
              A comprehensive overview of the modern web, mobile, backend, and
              infrastructure technologies I operate across daily in production.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-6 md:gap-10 mb-14">
            {[
              {
                value: TECHNICAL_CAPABILITIES.length.toString(),
                label: "Domains",
              },
              { value: `${totalSkills}+`, label: "Technologies" },
              { value: "6", label: "Production Proofs" },
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

        {/* Interactive Tab + Detail layout */}
        <ScrollReveal delay={0.15}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >

              {/* Left: Category tabs */}
              <div
                className="lg:col-span-4 xl:col-span-4 p-4 md:p-5 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible"
                style={{
                  borderRight: "1px solid var(--color-border)",
                  background: "rgba(10,10,11,0.3)",
                }}
              >
                {TECHNICAL_CAPABILITIES.map((cap, i) => (
                  <CategoryTab
                    key={cap.category}
                    cap={cap}
                    index={i}
                    isActive={activeIdx === i}
                    onClick={() => handleTabClick(i)}
                  />
                ))}
              </div>

              {/* Right: Detail panel */}
              <div className="lg:col-span-8 xl:col-span-8 p-6 md:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <CategoryDetail
                    key={activeCap.category}
                    cap={activeCap}
                    index={activeIdx}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom: All technologies icon grid */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex items-center gap-3 mb-8">
              <Cpu size={13} className="text-[var(--color-text-tertiary)]" />
              <span className="text-label text-[var(--color-text-tertiary)]">
                All Technologies at a Glance
              </span>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
              <span className="text-mono text-[10px] text-[var(--color-text-tertiary)]">
                {TECHNICAL_CAPABILITIES.reduce((a, c) => a + c.skills.length, 0)} tools
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-3">
              {TECHNICAL_CAPABILITIES.flatMap((cap, catIdx) =>
                cap.skills.map((skill) => {
                  const config = CATEGORY_CONFIG[catIdx] || CATEGORY_CONFIG[0];
                  const isHighlighted = activeIdx === catIdx;
                  const symbol = TECH_SYMBOLS[skill.name] || { letter: skill.name.charAt(0), icon: null };

                  return (
                    <button
                      key={`${cap.category}-${skill.name}`}
                      onClick={() => handleTabClick(catIdx)}
                      className="group/tech relative flex flex-col items-center gap-2 py-3 px-1 rounded-xl transition-all duration-400 cursor-pointer"
                      style={{
                        background: isHighlighted
                          ? `${config.accent}06`
                          : "transparent",
                        border: `1px solid ${isHighlighted ? `${config.accent}15` : "transparent"}`,
                      }}
                      title={`${skill.name} - ${skill.level}`}
                    >
                      {/* Icon container */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:shadow-lg"
                        style={{
                          background: isHighlighted
                            ? `${config.accent}12`
                            : "var(--color-bg-card)",
                          border: `1px solid ${isHighlighted ? `${config.accent}25` : "var(--color-border)"}`,
                          boxShadow: isHighlighted
                            ? `0 4px 15px ${config.accent}10`
                            : "none",
                        }}
                      >
                        {symbol.icon ? (
                          <span
                            className="transition-colors duration-300"
                            style={{
                              color: isHighlighted
                                ? config.accent
                                : "var(--color-text-secondary)",
                            }}
                          >
                            {symbol.icon}
                          </span>
                        ) : (
                          <span
                            className="text-sm font-bold transition-colors duration-300"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: isHighlighted
                                ? config.accent
                                : "var(--color-text-tertiary)",
                            }}
                          >
                            {symbol.letter}
                          </span>
                        )}
                      </div>

                      {/* Label */}
                      <span
                        className="text-mono text-[9px] text-center leading-tight transition-colors duration-300 max-w-full truncate px-0.5"
                        style={{
                          color: isHighlighted
                            ? config.accent
                            : "var(--color-text-tertiary)",
                        }}
                      >
                        {skill.name.length > 12 ? skill.name.split(/[\s&]/)[0] : skill.name}
                      </span>

                      {/* Hover glow ring */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: `inset 0 0 20px ${config.accent}08, 0 0 20px ${config.accent}05`,
                        }}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
