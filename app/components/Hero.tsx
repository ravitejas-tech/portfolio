import { motion } from "framer-motion";
import { ArrowDown, Send, MapPin, ArrowUpRight } from "lucide-react";
import { PERSONAL } from "~/data/portfolio";
import { useReducedMotion } from "~/hooks/useReducedMotion";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const headlineWords = PERSONAL.tagline.split(" ");

  const containerVariants = reducedMotion
    ? undefined
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
      };

  const wordVariants = reducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" as const },
        },
      };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning */}
          <div className="lg:col-span-7">
            {/* Status badge */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border-fine bg-[var(--color-bg-elevated)]/80 backdrop-blur-sm mb-6 md:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
              </span>
              <span className="text-mono text-[0.7rem] text-[var(--color-text-secondary)]">
                {PERSONAL.role}
              </span>
              <span className="text-mono text-[0.7rem] text-[var(--color-text-tertiary)]">
                · {PERSONAL.location}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-hero max-w-[620px] lg:max-w-none mb-6 tracking-tight text-[var(--color-text)]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`inline-block mr-[0.25em] ${
                    word.toLowerCase() === "useful" || word.toLowerCase() === "systems"
                      ? "text-[var(--color-accent)]"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-body-lg text-[var(--color-text-secondary)] max-w-[580px] mb-8 leading-relaxed"
            >
              {PERSONAL.subtitle}
            </motion.p>

            {/* Core Tech Stack Badges */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {[
                "React",
                "React Native",
                "NestJS",
                "TypeScript",
                "PostgreSQL",
                "Docker",
                "Redis",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-mono text-[0.75rem] text-[var(--color-text-secondary)] bg-[var(--color-bg-card)] border-fine px-3 py-1 rounded-md hover:border-[var(--color-accent)]/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#work"
                className="group flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-3 text-mono font-medium rounded-lg hover:bg-[var(--color-accent-dim)] transition-all shadow-lg shadow-[var(--color-accent)]/10"
              >
                <span>View Shipped Work</span>
                <ArrowDown
                  size={14}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 border-fine px-4 py-3 text-mono text-[var(--color-text)] rounded-lg hover:bg-[var(--color-bg-card)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-all"
              >
                <span>Resume</span>
                <ArrowUpRight
                  size={14}
                  className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors"
                />
              </a>
              <a
                href="#experience"
                className="flex items-center gap-2 border-fine px-4 py-3 text-mono text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-all"
              >
                <span>Experience</span>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 text-mono text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors px-3 py-3"
              >
                <span>Let&apos;s talk</span>
                <Send size={13} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Portrait */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px]">
              {/* Soft accent glow behind the portrait */}
              <div className="absolute -inset-6 rounded-[2rem] bg-[var(--color-accent)]/5 blur-2xl -z-10 pointer-events-none" />

              <div className="surface-card rounded-2xl overflow-hidden border border-[var(--color-border)]">
                {/* Portrait */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-elevated)]">
                  <img
                    src={PERSONAL.avatarUrl}
                    alt={`${PERSONAL.name}, ${PERSONAL.role}`}
                    width={1254}
                    height={1254}
                    loading="eager"
                    className="w-full h-full object-cover object-[60%_20%]"
                  />

                  {/* Gentle bottom fade into the caption bar */}
                  <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-[var(--color-bg-card)]/70 to-transparent" />
                </div>

                {/* Caption bar */}
                <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-t border-[var(--color-border)]">
                  <div className="min-w-0">
                    <div className="text-mono text-xs font-semibold text-[var(--color-text)] truncate">
                      {PERSONAL.name}
                    </div>
                    <div className="text-mono text-[0.68rem] text-[var(--color-text-secondary)] truncate">
                      {PERSONAL.role}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-mono text-[0.68rem] text-[var(--color-text-tertiary)] shrink-0">
                    <MapPin size={11} />
                    <span>{PERSONAL.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
