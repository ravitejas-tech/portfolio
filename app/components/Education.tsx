import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  School,
  Calendar,
  MapPin,
  Award,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { EDUCATION } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";
import { useReducedMotion } from "~/hooks/useReducedMotion";

const iconMap = {
  graduation: GraduationCap,
  book: BookOpen,
  school: School,
};

// Animated circular score gauge
function ScoreRing({
  score,
  label,
  isVisible,
}: {
  score: string;
  label: string;
  isVisible: boolean;
}) {
  const reducedMotion = useReducedMotion();

  // Compute fill percentage for the ring
  const numericScore = parseFloat(score);
  let percentage: number;
  if (score.includes("%")) {
    percentage = numericScore;
  } else {
    // CGPA out of 10
    percentage = (numericScore / 10) * 100;
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />
        {/* Animated fill arc */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: isVisible ? strokeDashoffset : circumference,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }
          }
        />
        <defs>
          <linearGradient
            id="scoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      {/* Score text in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-xl font-bold text-[var(--color-text)]"
          style={{ fontFamily: "var(--font-mono)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.5, delay: 0.8, type: "spring" }
          }
        >
          {score}
        </motion.span>
        <span
          className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function EducationSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="education-section"
      className="relative section-padding overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-elevated) 50%, var(--color-bg) 100%)",
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.035]"
          style={{
            background:
              "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />
        {/* Diagonal grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, var(--color-text) 1px, transparent 1px), linear-gradient(-45deg, var(--color-text) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <SectionLabel label="Academic Foundation" number="05" />

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-[900px] mb-20">
            <h2 className="text-display mb-6">
              The{" "}
              <span className="relative inline-block">
                <span className="text-[var(--color-accent)]">foundation</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                />
              </span>{" "}
              behind the code.
            </h2>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-[700px]">
              A strong academic journey from high school through university,
              building the analytical thinking and computer science fundamentals
              that power my engineering approach today.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline connector */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] hidden md:block">
            <motion.div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-accent), rgba(99,102,241,0.4), transparent)",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: "easeOut" }
              }
              style-origin="top"
            />
          </div>

          <div className="space-y-6 md:space-y-8">
            {EDUCATION.map((edu, i) => {
              const isExpanded = expandedIdx === i;
              const Icon = iconMap[edu.icon];

              return (
                <ScrollReveal key={edu.institution} delay={i * 0.15}>
                  <motion.div
                    className="relative group md:pl-20"
                    layout={!reducedMotion}
                  >
                    {/* Timeline node */}
                    <div className="absolute left-0 top-8 hidden md:flex items-center justify-center">
                      <motion.div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center z-10 transition-all duration-500"
                        style={{
                          background: isExpanded
                            ? "linear-gradient(135deg, var(--color-accent), #6366f1)"
                            : "var(--color-bg-card)",
                          border: `1px solid ${isExpanded ? "rgba(200,245,66,0.3)" : "var(--color-border)"}`,
                          boxShadow: isExpanded
                            ? "0 0 40px rgba(200,245,66,0.12), 0 0 80px rgba(99,102,241,0.06)"
                            : "none",
                        }}
                        animate={
                          isExpanded && !reducedMotion
                            ? { scale: [1, 1.05, 1] }
                            : {}
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Icon
                          size={isExpanded ? 24 : 20}
                          className={
                            isExpanded
                              ? "text-[var(--color-bg)]"
                              : "text-[var(--color-accent)]"
                          }
                        />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.div
                      onMouseEnter={() => setExpandedIdx(i)}
                      onMouseLeave={() => setExpandedIdx(null)}
                      className="relative rounded-2xl overflow-hidden transition-all duration-500"
                      style={{
                        background: isExpanded
                          ? "linear-gradient(135deg, rgba(22,22,24,0.98) 0%, rgba(30,30,38,0.95) 100%)"
                          : "var(--color-bg-card)",
                        border: `1px solid ${isExpanded ? "rgba(200,245,66,0.15)" : "var(--color-border)"}`,
                      }}
                      whileHover={
                        reducedMotion
                          ? {}
                          : {
                              borderColor: "rgba(200, 245, 66, 0.2)",
                              y: -2,
                            }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {/* Shimmer glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(200,245,66,0.03) 0%, transparent 40%, transparent 60%, rgba(99,102,241,0.03) 100%)",
                        }}
                      />

                      {/* Top accent bar */}
                      <motion.div
                        className="absolute top-0 left-0 h-[2px]"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--color-accent), #6366f1, transparent)",
                        }}
                        animate={{ width: isExpanded ? "100%" : "0%" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />

                      {/* Header */}
                      <div className="relative p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
                          {/* Mobile icon */}
                          <div className="flex md:hidden items-center gap-4 mb-2">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{
                                background: isExpanded
                                  ? "linear-gradient(135deg, var(--color-accent), #6366f1)"
                                  : "rgba(200, 245, 66, 0.08)",
                              }}
                            >
                              <Icon
                                size={18}
                                className={
                                  isExpanded
                                    ? "text-[var(--color-bg)]"
                                    : "text-[var(--color-accent)]"
                                }
                              />
                            </div>
                            <span
                              className="text-mono text-xs text-[var(--color-text-tertiary)]"
                            >
                              {edu.period}
                            </span>
                          </div>

                          {/* Left: Degree + Institution */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5 mb-2">
                              <h3 className="text-[var(--color-text)] font-semibold text-lg md:text-xl lg:text-2xl">
                                {edu.degree}
                              </h3>
                              <span
                                className="text-mono text-xs px-2.5 py-1 rounded-md font-medium"
                                style={{
                                  background: "rgba(99, 102, 241, 0.1)",
                                  color: "#818cf8",
                                  border: "1px solid rgba(99, 102, 241, 0.15)",
                                }}
                              >
                                {edu.field}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-1.5">
                              <span className="text-[var(--color-text-secondary)] text-sm md:text-base font-medium">
                                {edu.institution}
                              </span>
                              <span className="hidden md:inline-flex items-center gap-1.5 text-mono text-[11px] text-[var(--color-text-tertiary)]">
                                <MapPin size={11} />
                                {edu.location}
                              </span>
                            </div>
                          </div>

                          {/* Right: Period, Score Preview, & Expand */}
                          <div className="flex items-center gap-5 lg:gap-6">
                            {/* Period */}
                            <div className="hidden md:flex flex-col items-end gap-1">
                              <span className="inline-flex items-center gap-1.5 text-mono text-xs text-[var(--color-text-secondary)] font-medium">
                                <Calendar
                                  size={12}
                                  className="text-[var(--color-accent)]"
                                />
                                {edu.period}
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-mono text-[11px] text-[var(--color-text-tertiary)]">
                                <Award size={11} />
                                {edu.board}
                              </span>
                            </div>

                            {/* Quick score badge */}
                            <div
                              className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300"
                              style={{
                                background: isExpanded
                                  ? "rgba(200,245,66,0.08)"
                                  : "rgba(200,245,66,0.04)",
                                border: `1px solid ${isExpanded ? "rgba(200,245,66,0.2)" : "rgba(200,245,66,0.08)"}`,
                              }}
                            >
                              <span
                                className="text-lg font-bold text-[var(--color-accent)]"
                                style={{ fontFamily: "var(--font-mono)" }}
                              >
                                {edu.score}
                              </span>
                              <span
                                className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)]"
                                style={{ fontFamily: "var(--font-mono)" }}
                              >
                                {edu.scoreLabel}
                              </span>
                            </div>

                            {/* Expand button */}
                            <motion.div
                              className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300"
                              style={{
                                borderColor: isExpanded
                                  ? "rgba(200, 245, 66, 0.3)"
                                  : "var(--color-border)",
                                background: isExpanded
                                  ? "rgba(200, 245, 66, 0.06)"
                                  : "transparent",
                              }}
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown
                                size={16}
                                className={
                                  isExpanded
                                    ? "text-[var(--color-accent)]"
                                    : "text-[var(--color-text-tertiary)]"
                                }
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
                            transition={{
                              duration: 0.5,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-8 pb-8">
                              {/* Separator */}
                              <div className="h-px mb-8 overflow-hidden">
                                <motion.div
                                  className="h-full"
                                  style={{
                                    background:
                                      "linear-gradient(90deg, transparent, var(--color-accent), #6366f1, transparent)",
                                    opacity: 0.25,
                                  }}
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "0%" }}
                                  transition={{
                                    duration: 0.6,
                                    delay: 0.1,
                                  }}
                                />
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                                {/* Left: Details */}
                                <div className="lg:col-span-8 space-y-6">
                                  {/* Board / University info */}
                                  <motion.div
                                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(200,245,66,0.04))",
                                      border:
                                        "1px solid rgba(99, 102, 241, 0.12)",
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#6366f1]/10">
                                      <Award
                                        size={14}
                                        className="text-[#818cf8]"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-mono text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider">
                                        University / Board
                                      </span>
                                      <span className="text-mono text-xs text-[var(--color-text)] font-semibold">
                                        {edu.board}
                                      </span>
                                    </div>
                                  </motion.div>

                                  {/* Location on mobile */}
                                  <div className="flex md:hidden items-center gap-1.5 text-mono text-[11px] text-[var(--color-text-tertiary)]">
                                    <MapPin size={11} />
                                    {edu.location}
                                  </div>

                                  {/* Highlights */}
                                  {edu.highlights && (
                                    <div>
                                      <div className="flex items-center gap-2 mb-4">
                                        <Sparkles
                                          size={14}
                                          className="text-[var(--color-accent)]"
                                        />
                                        <span className="text-label text-[var(--color-text-tertiary)]">
                                          Academic Highlights
                                        </span>
                                      </div>
                                      <div className="space-y-3">
                                        {edu.highlights.map(
                                          (highlight, idx) => (
                                            <motion.div
                                              key={idx}
                                              className="flex items-start gap-3 group/item"
                                              initial={{
                                                opacity: 0,
                                                x: -15,
                                              }}
                                              animate={{
                                                opacity: 1,
                                                x: 0,
                                              }}
                                              transition={{
                                                delay: 0.2 + idx * 0.1,
                                              }}
                                            >
                                              <div
                                                className="flex items-center justify-center w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                style={{
                                                  background:
                                                    "var(--color-accent)",
                                                }}
                                              />
                                              <p className="text-mono text-sm text-[var(--color-text-secondary)] leading-relaxed group-hover/item:text-[var(--color-text)] transition-colors duration-300">
                                                {highlight}
                                              </p>
                                            </motion.div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Right: Score ring */}
                                <div className="lg:col-span-4 flex items-center justify-center">
                                  <div
                                    className="rounded-2xl p-6 flex flex-col items-center gap-4"
                                    style={{
                                      background: "rgba(10,10,11,0.6)",
                                      border:
                                        "1px solid var(--color-border)",
                                      backdropFilter: "blur(8px)",
                                    }}
                                  >
                                    <span className="text-label text-[var(--color-text-tertiary)]">
                                      Academic Score
                                    </span>
                                    <ScoreRing
                                      score={edu.score}
                                      label={edu.scoreLabel}
                                      isVisible={isExpanded}
                                    />
                                    <span
                                      className="text-mono text-[11px] text-[var(--color-text-tertiary)]"
                                    >
                                      {edu.period}
                                    </span>
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
        </div>

        {/* Bottom summary strip */}
        <ScrollReveal delay={0.3}>
          <div
            className="mt-16 pt-10"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-8 md:gap-12">
                {[
                  { value: "10", label: "Years of Academics" },
                  { value: "3", label: "Institutions" },
                  { value: "9.8", label: "Peak CGPA" },
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
                <div className="flex gap-1.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: `${8 + i * 4}px`,
                        height: `${8 + i * 4}px`,
                        background: `linear-gradient(135deg, var(--color-accent), #6366f1)`,
                        opacity: 0.2 + i * 0.25,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="text-mono text-[11px] text-[var(--color-text-tertiary)]">
                  Strong academic record
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
