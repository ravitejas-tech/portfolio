import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { EXPERIENCE } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";
import { useReducedMotion } from "~/hooks/useReducedMotion";

export function ExperienceSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-bg-elevated) 0%, var(--color-bg) 100%)" }}
    >
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <SectionLabel label="Career Trajectory" number="02" />

        {/* Header with animated accent */}
        <ScrollReveal>
          <div className="max-w-[900px] mb-20">
            <h2 className="text-display mb-6">
              Where I&apos;ve{" "}
              <span className="relative inline-block">
                <span className="text-[var(--color-accent)]">built</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </span>
              , led &amp; learned.
            </h2>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-[700px]">
              A track record of rapid ownership, evolving from frontend
              contributor to architecting backend systems, leading engineering
              pods, and shipping production apps for global audiences.
            </p>
          </div>
        </ScrollReveal>

        {/* Experience Cards - Staggered Layout */}
        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => {
            const isExpanded = expandedIdx === i;
            const isFirst = i === 0;

            return (
              <ScrollReveal key={exp.company} delay={i * 0.12}>
                <motion.div
                  className="relative group"
                  layout={!reducedMotion}
                >
                  {/* Connector line between cards */}
                  {i < EXPERIENCE.length - 1 && (
                    <div className="absolute left-12 md:left-16 top-full w-[2px] h-8 z-0">
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(to bottom, var(--color-accent), transparent)`,
                          opacity: 0.3,
                        }}
                      />
                    </div>
                  )}

                  {/* Main Card */}
                  <motion.div
                    onMouseEnter={() => setExpandedIdx(i)}
                    onMouseLeave={() => setExpandedIdx(null)}
                    className="relative rounded-2xl overflow-hidden transition-all duration-500"
                    style={{
                      background: isExpanded
                        ? "linear-gradient(135deg, rgba(22,22,24,0.95) 0%, rgba(30,30,35,0.95) 100%)"
                        : "var(--color-bg-card)",
                      border: `1px solid ${isExpanded ? "rgba(200, 245, 66, 0.15)" : "var(--color-border)"}`,
                    }}
                    whileHover={reducedMotion ? {} : {
                      borderColor: "rgba(200, 245, 66, 0.2)",
                    }}
                  >
                    {/* Shimmer glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg, rgba(200,245,66,0.03) 0%, transparent 40%, transparent 60%, rgba(99,102,241,0.02) 100%)",
                      }}
                    />

                    {/* Top accent line when expanded */}
                    <motion.div
                      className="absolute top-0 left-0 h-[2px]"
                      style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}
                      animate={{ width: isExpanded ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Header Row - Always visible */}
                    <div className="relative p-6 md:p-8 lg:p-10">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">

                        {/* Left: Index + Company Block */}
                        <div className="flex items-start gap-5 flex-1 min-w-0">
                          {/* Ordinal index circle */}
                          <div className="flex-shrink-0 relative">
                            <div
                              className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-mono text-sm md:text-base font-bold transition-all duration-500"
                              style={{
                                background: isExpanded
                                  ? "linear-gradient(135deg, var(--color-accent), #a3c935)"
                                  : "rgba(200, 245, 66, 0.08)",
                                color: isExpanded ? "var(--color-bg)" : "var(--color-accent)",
                                boxShadow: isExpanded ? "0 0 30px rgba(200,245,66,0.15)" : "none",
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            {/* Pulse ring for current role */}
                            {isFirst && (
                              <motion.div
                                className="absolute -inset-1 rounded-xl border border-[var(--color-accent)]/30"
                                animate={reducedMotion ? {} : { opacity: [0.3, 0.8, 0.3], scale: [1, 1.08, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                            )}
                          </div>

                          {/* Company + Role */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                              <h3 className="text-[var(--color-text)] font-semibold text-lg md:text-xl lg:text-2xl truncate">
                                {exp.company}
                              </h3>
                              {isFirst && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]" />
                                  </span>
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span
                                className="text-mono text-xs px-2.5 py-1 rounded-md font-medium"
                                style={{
                                  background: "rgba(200, 245, 66, 0.08)",
                                  color: "var(--color-accent)",
                                  border: "1px solid rgba(200, 245, 66, 0.12)",
                                }}
                              >
                                {exp.role}
                              </span>
                              <span className="text-mono text-[11px] text-[var(--color-text-tertiary)] px-2 py-0.5 rounded bg-[var(--color-bg)]/50">
                                {exp.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Meta info + Expand CTA */}
                        <div className="flex items-center gap-6 lg:gap-8">
                          {/* Period + Location */}
                          <div className="flex flex-col gap-1.5 text-right">
                            <span className="inline-flex items-center justify-end gap-1.5 text-mono text-xs text-[var(--color-text-secondary)] font-medium">
                              <Calendar size={12} className="text-[var(--color-accent)]" />
                              {exp.period}
                            </span>
                            <span className="inline-flex items-center justify-end gap-1.5 text-mono text-[11px] text-[var(--color-text-tertiary)]">
                              <MapPin size={11} />
                              {exp.location}
                            </span>
                          </div>

                          {/* Expand indicator */}
                          <motion.div
                            className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300"
                            style={{
                              borderColor: isExpanded ? "rgba(200, 245, 66, 0.3)" : "var(--color-border)",
                              background: isExpanded ? "rgba(200, 245, 66, 0.06)" : "transparent",
                            }}
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronRight
                              size={16}
                              className={isExpanded ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)]"}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 lg:px-10 pb-8 md:pb-10">
                            {/* Separator */}
                            <div className="h-px mb-8 overflow-hidden">
                              <motion.div
                                className="h-full"
                                style={{
                                  background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                                  opacity: 0.2,
                                }}
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                              />
                            </div>

                            {/* Content grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                              {/* Left Column: Context + Achievements */}
                              <div className="lg:col-span-8 space-y-8">

                                {/* Progression badge */}
                                {exp.progression && (
                                  <motion.div
                                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl"
                                    style={{
                                      background: "linear-gradient(135deg, rgba(200,245,66,0.06), rgba(99,102,241,0.04))",
                                      border: "1px solid rgba(200, 245, 66, 0.1)",
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-accent)]/10">
                                      <TrendingUp size={14} className="text-[var(--color-accent)]" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider">
                                        Growth
                                      </span>
                                      <span className="text-mono text-xs text-[var(--color-text)] font-semibold">
                                        {exp.progression}
                                      </span>
                                    </div>
                                  </motion.div>
                                )}

                                {/* Summary */}
                                <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
                                  {exp.summary}
                                </p>

                                {/* Key Achievements */}
                                <div>
                                  <div className="flex items-center gap-2 mb-5">
                                    <Sparkles size={14} className="text-[var(--color-accent)]" />
                                    <span className="text-label text-[var(--color-text-tertiary)]">
                                      Key Impact &amp; Engineering Contributions
                                    </span>
                                  </div>
                                  <div className="space-y-3">
                                    {exp.achievements.map((item, idx) => (
                                      <motion.div
                                        key={idx}
                                        className="flex items-start gap-3 group/item"
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 + idx * 0.08 }}
                                      >
                                        <div
                                          className="flex items-center justify-center w-5 h-5 rounded-md mt-0.5 flex-shrink-0 transition-colors duration-300"
                                          style={{
                                            background: "rgba(200,245,66,0.08)",
                                            border: "1px solid rgba(200,245,66,0.15)",
                                          }}
                                        >
                                          <CheckCircle2
                                            size={11}
                                            className="text-[var(--color-accent)]"
                                          />
                                        </div>
                                        <p className="text-mono text-sm text-[var(--color-text-secondary)] leading-relaxed group-hover/item:text-[var(--color-text)] transition-colors duration-300">
                                          {item}
                                        </p>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Right Column: Tech Stack */}
                              <div className="lg:col-span-4">
                                <div
                                  className="rounded-xl p-5 md:p-6 sticky top-8"
                                  style={{
                                    background: "rgba(10,10,11,0.6)",
                                    border: "1px solid var(--color-border)",
                                    backdropFilter: "blur(8px)",
                                  }}
                                >
                                  <div className="flex items-center gap-2 mb-5">
                                    <Layers size={14} className="text-[var(--color-accent)]" />
                                    <span className="text-label text-[var(--color-text-tertiary)]">
                                      Tech Stack
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {exp.techStack.map((tech, idx) => (
                                      <motion.span
                                        key={tech}
                                        className="text-mono text-xs px-3 py-1.5 rounded-lg cursor-default transition-all duration-300 hover:text-[var(--color-text)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5"
                                        style={{
                                          background: "var(--color-bg-card)",
                                          border: "1px solid var(--color-border)",
                                          color: "var(--color-text-secondary)",
                                        }}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + idx * 0.05 }}
                                      >
                                        {tech}
                                      </motion.span>
                                    ))}
                                  </div>

                                  {/* Stats mini-card */}
                                  <div
                                    className="mt-5 pt-5"
                                    style={{ borderTop: "1px solid var(--color-border)" }}
                                  >
                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="text-center p-3 rounded-lg" style={{ background: "var(--color-bg-card)" }}>
                                        <div className="text-mono text-lg font-bold text-[var(--color-accent)]">
                                          {exp.techStack.length}
                                        </div>
                                        <div className="text-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mt-0.5">
                                          Technologies
                                        </div>
                                      </div>
                                      <div className="text-center p-3 rounded-lg" style={{ background: "var(--color-bg-card)" }}>
                                        <div className="text-mono text-lg font-bold text-[var(--color-text)]">
                                          {exp.achievements.length}
                                        </div>
                                        <div className="text-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mt-0.5">
                                          Key Wins
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom visual cue - Total experience summary */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 pt-10" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex flex-wrap items-center justify-between gap-6">
              {/* Summary stats row */}
              <div className="flex items-center gap-8 md:gap-12">
                {[
                  { value: `${EXPERIENCE.length}`, label: "Roles" },
                  {
                    value: `${EXPERIENCE.reduce((acc, e) => acc + e.achievements.length, 0)}+`,
                    label: "Key Contributions",
                  },
                  {
                    value: `${new Set(EXPERIENCE.flatMap((e) => e.techStack)).size}+`,
                    label: "Technologies",
                  },
                ].map((stat, idx) => (
                  <div key={stat.label} className="flex items-baseline gap-2">
                    <motion.span
                      className="text-2xl md:text-3xl font-bold text-[var(--color-accent)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-mono text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Visual accent */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 rounded-full bg-[var(--color-accent)]"
                      style={{ height: `${12 + i * 6}px` }}
                      initial={{ opacity: 0.2, scaleY: 0 }}
                      whileInView={{ opacity: 0.15 + i * 0.15, scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                    />
                  ))}
                </div>
                <span className="text-mono text-[11px] text-[var(--color-text-tertiary)]">
                  Growing trajectory
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
