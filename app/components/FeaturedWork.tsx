import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,

  Target,
  Wrench,
  Globe,
  Layers,
} from "lucide-react";
import { FEATURED_PROJECTS } from "~/data/portfolio";
import type { FeaturedProject } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";
import { useReducedMotion } from "~/hooks/useReducedMotion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Mobile Device Showcase - Floating phone mockup
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PhoneShowcase({
  project,
  isActive,
}: {
  project: FeaturedProject;
  isActive: boolean;
}) {
  const [screenIdx, setScreenIdx] = useState(0);
  const reducedMotion = useReducedMotion();
  const screens =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.image];

  const SCREEN_INTERVAL = 3000; // 3s per screenshot

  // Auto-cycle screenshots
  useEffect(() => {
    if (screens.length <= 1 || reducedMotion) return;

    const timer = setInterval(() => {
      setScreenIdx((prev) => (prev + 1) % screens.length);
    }, SCREEN_INTERVAL);

    return () => clearInterval(timer);
  }, [screens.length, reducedMotion]);

  return (
    <div className="relative flex items-center justify-center h-full">
      {/* Ambient glow behind the phone */}
      <div
        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"
        style={{
          backgroundColor: project.visualAccent,
          opacity: isActive ? 0.2 : 0.08,
        }}
      />

      {/* Phone mockup */}
      <motion.div
        className="relative z-10"
        animate={
          reducedMotion
            ? {}
            : {
                y: isActive ? -8 : 0,
                rotateY: isActive ? -3 : 0,
                rotateX: isActive ? 2 : 0,
              }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ perspective: "1000px" }}
      >
        <div className="w-[230px] md:w-[280px] rounded-[2.4rem] p-2 bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-950 border border-neutral-600/60 shadow-2xl">
          <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-[9/20] border border-neutral-800">
            {/* Dynamic island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-neutral-950 rounded-full z-20 flex items-center justify-center border border-neutral-800/50">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 mr-1" />
              <div className="w-1 h-1 rounded-full bg-blue-900/60" />
            </div>

            {/* Screen */}
            <AnimatePresence mode="wait">
              <motion.img
                key={screens[screenIdx]}
                src={screens[screenIdx]}
                alt={`${project.name} screen ${screenIdx + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </AnimatePresence>

            {/* Bottom bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full z-20" />
          </div>
        </div>

        {/* Screen indicators with progress */}
        {screens.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setScreenIdx(i);
                }}
                className="relative overflow-hidden transition-all duration-300"
                style={{
                  width: screenIdx === i ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    screenIdx === i
                      ? `${project.visualAccent}40`
                      : "var(--color-border-hover)",
                }}
              >
                {/* Animated progress fill on active dot */}
                {screenIdx === i && !reducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: project.visualAccent }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: SCREEN_INTERVAL / 1000,
                      ease: "linear",
                    }}
                    key={`screen-progress-${i}-${screenIdx}`}
                  />
                )}
              </button>
            ))}
            <span className="text-mono text-[9px] text-[var(--color-text-tertiary)] ml-1.5">
              {String(screenIdx + 1).padStart(2, "0")}/{String(screens.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Desktop Browser Showcase
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BrowserShowcase({
  project,
  isActive,
}: {
  project: FeaturedProject;
  isActive: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center h-full">
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"
        style={{
          backgroundColor: project.visualAccent,
          opacity: isActive ? 0.15 : 0.05,
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-[480px]"
        animate={
          reducedMotion
            ? {}
            : { y: isActive ? -6 : 0, scale: isActive ? 1.02 : 1 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <div className="text-mono text-[0.65rem] text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-3 py-0.5 rounded border border-[var(--color-border)] truncate max-w-[220px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              https://{project.browserUrl}
            </div>
            <div className="w-6" />
          </div>

          {/* Screenshot */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
            <img
              src={project.image}
              alt={`${project.name} desktop`}
              className="w-full h-full object-cover object-top transition-transform duration-700"
              style={{ transform: isActive ? "scale(1.03)" : "scale(1)" }}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Individual Project Slide - Horizontal card
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProjectSlide({
  project,
  index,
  isActive,
}: {
  project: FeaturedProject;
  index: number;
  isActive: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const showActive = isActive || isHovered;

  return (
    <article
      className="relative group flex-shrink-0 w-[calc(100vw-3rem)] max-w-[1320px] min-h-[700px] md:min-h-[750px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full-width immersive card */}
      <div
        className="relative rounded-3xl overflow-hidden transition-all duration-500 h-full"
        style={{
          background: showActive
            ? "linear-gradient(135deg, rgba(22,22,24,0.98) 0%, rgba(28,28,31,0.98) 100%)"
            : "var(--color-bg-card)",
          border: `1px solid ${showActive ? `${project.visualAccent}25` : "var(--color-border)"}`,
          boxShadow: showActive
            ? `0 25px 60px -15px ${project.visualAccent}15, 0 0 0 1px ${project.visualAccent}10`
            : "none",
        }}
      >
        {/* Top accent gradient stripe */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.visualAccent}, transparent)`,
          }}
          animate={{ opacity: showActive ? 0.6 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Large watermark project number */}
        <div
          className="absolute top-6 right-8 text-[8rem] md:text-[12rem] font-bold leading-none pointer-events-none select-none transition-opacity duration-500"
          style={{
            fontFamily: "var(--font-mono)",
            color: project.visualAccent,
            opacity: showActive ? 0.06 : 0.025,
          }}
        >
          {project.number}
        </div>

        {/* Content area */}
        <div className="relative p-6 md:p-10 lg:p-12">
          {/* Top bar: category + metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <span
                className="text-mono text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider"
                style={{
                  background: `${project.visualAccent}12`,
                  color: project.visualAccent,
                  border: `1px solid ${project.visualAccent}20`,
                }}
              >
                {project.category}
              </span>
              {project.client && (
                <span className="hidden sm:inline text-mono text-xs text-[var(--color-text-tertiary)]">
                  for {project.client}
                </span>
              )}
            </div>
          </div>

          {/* Main layout - Device showcase + Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Device showcase */}
            <div className="lg:col-span-5">
              {project.deviceType === "mobile" ? (
                <PhoneShowcase project={project} isActive={showActive} />
              ) : (
                <BrowserShowcase project={project} isActive={showActive} />
              )}
            </div>

            {/* Project details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Project name */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4 tracking-tight leading-tight">
                {project.name}
              </h3>

              <p className="text-body-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-[560px]">
                {project.description}
              </p>

              {/* Challenge & Solution - compact inline cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <div
                  className="p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(10,10,11,0.5)",
                    border: "1px solid var(--color-border)",
                    borderLeft: `3px solid ${project.visualAccent}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Target
                      size={12}
                      style={{ color: project.visualAccent }}
                    />
                    <span
                      className="text-mono text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: project.visualAccent }}
                    >
                      Challenge
                    </span>
                  </div>
                  <p className="text-mono text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {project.solution && (
                  <div
                    className="p-4 rounded-xl transition-all duration-300"
                    style={{
                      background: "rgba(10,10,11,0.5)",
                      border: "1px solid var(--color-border)",
                      borderLeft: "3px solid var(--color-border-hover)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench
                        size={12}
                        className="text-[var(--color-text-tertiary)]"
                      />
                      <span className="text-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                        Solution
                      </span>
                    </div>
                    <p className="text-mono text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Tech stack + CTA row */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-mono text-[11px] px-2.5 py-1 rounded-md text-[var(--color-text-secondary)] transition-colors duration-300 hover:text-[var(--color-text)]"
                      style={{
                        background: "var(--color-bg)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-mono text-xs font-medium transition-all duration-300 group/btn flex-shrink-0"
                    style={{
                      background: `${project.visualAccent}10`,
                      border: `1px solid ${project.visualAccent}25`,
                      color: project.visualAccent,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${project.visualAccent}20`;
                      e.currentTarget.style.borderColor = `${project.visualAccent}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${project.visualAccent}10`;
                      e.currentTarget.style.borderColor = `${project.visualAccent}25`;
                    }}
                  >
                    <Globe size={13} />
                    <span>
                      {project.liveUrl.includes("play.google.com")
                        ? "Google Play"
                        : "Visit Live"}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Section Export - Horizontal Carousel
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const AUTO_SCROLL_INTERVAL = 6000; // 6s per slide

export function FeaturedWork() {
  const reducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = FEATURED_PROJECTS.length;

  // Scroll to a specific slide index
  const scrollToSlide = useCallback(
    (idx: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const slide = container.children[idx] as HTMLElement | undefined;
      if (!slide) return;
      // Calculate offset to center the slide with the section-container padding
      const containerRect = container.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const scrollLeft =
        slide.offsetLeft - (containerRect.width - slideRect.width) / 2;
      container.scrollTo({ left: scrollLeft, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion]
  );

  // Go to next/prev
  const goNext = useCallback(() => {
    setActiveIdx((prev) => {
      const next = (prev + 1) % total;
      // Defer scroll to next tick so state has updated
      requestAnimationFrame(() => scrollToSlide(next));
      return next;
    });
  }, [total, scrollToSlide]);

  const goPrev = useCallback(() => {
    setActiveIdx((prev) => {
      const next = (prev - 1 + total) % total;
      requestAnimationFrame(() => scrollToSlide(next));
      return next;
    });
  }, [total, scrollToSlide]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || reducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }

    timerRef.current = setInterval(() => {
      goNext();
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, reducedMotion, goNext]);

  // Sync activeIdx on manual scroll (scroll-snap detection)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        Array.from(container.children).forEach((child, idx) => {
          const childRect = child.getBoundingClientRect();
          const childCenter = childRect.left + childRect.width / 2;
          const dist = Math.abs(childCenter - centerX);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = idx;
          }
        });
        setActiveIdx(closestIdx);
      }, 80);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Scroll to first slide on mount
  useEffect(() => {
    requestAnimationFrame(() => scrollToSlide(0));
  }, [scrollToSlide]);

  return (
    <section
      id="work"
      className="relative section-padding overflow-hidden"
    >
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, #ef4444 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <SectionLabel label="Selected Work" number="03" />

        {/* Section header */}
        <ScrollReveal>
          <div className="max-w-[900px] mb-6">
            <h2 className="text-display mb-6">
              Production software,{" "}
              <span className="relative inline-block">
                <span className="text-[var(--color-accent)]">
                  shipped and scaled
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
              High-concurrency systems and mobile applications built for global
              brands and startups. Real screens, architecture decisions, and
              production challenges behind each product.
            </p>
          </div>
        </ScrollReveal>

        {/* Navigation controls row */}
        <ScrollReveal delay={0.15}>
          <div className="flex items-center justify-between mb-8">
            {/* Project indicator dots */}
            <div className="flex items-center gap-3">
              {FEATURED_PROJECTS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setActiveIdx(i);
                    scrollToSlide(i);
                  }}
                  className="group/dot flex items-center gap-2 transition-all duration-300"
                >
                  {/* Dot with progress fill */}
                  <div className="relative">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: activeIdx === i ? 32 : 8,
                        background:
                          activeIdx === i
                            ? p.visualAccent
                            : "var(--color-border-hover)",
                      }}
                    />
                    {/* Auto-scroll progress bar inside active dot */}
                    {activeIdx === i && !isPaused && !reducedMotion && (
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          background: `${p.visualAccent}60`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: AUTO_SCROLL_INTERVAL / 1000,
                          ease: "linear",
                        }}
                        key={`progress-${i}-${activeIdx}`}
                      />
                    )}
                  </div>
                  {/* Label visible only on active */}
                  <span
                    className="text-mono text-[10px] transition-all duration-300 hidden sm:inline"
                    style={{
                      color:
                        activeIdx === i
                          ? p.visualAccent
                          : "var(--color-text-tertiary)",
                      opacity: activeIdx === i ? 1 : 0,
                      width: activeIdx === i ? "auto" : 0,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Arrow controls */}
            <div className="flex items-center gap-2">
              <span className="text-mono text-[10px] text-[var(--color-text-tertiary)] mr-2">
                {String(activeIdx + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </span>
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Horizontal scroll carousel ─── */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 px-[max(1.25rem,calc((100vw-1320px)/2))]"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <div
              key={project.name}
              className="scroll-snap-center"
              style={{ scrollSnapAlign: "center" }}
            >
              <ProjectSlide
                project={project}
                index={i}
                isActive={activeIdx === i}
              />
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div
          className="absolute top-0 left-0 w-16 md:w-24 h-full pointer-events-none z-10"
          style={{
            background: "linear-gradient(to right, var(--color-bg), transparent)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-16 md:w-24 h-full pointer-events-none z-10"
          style={{
            background: "linear-gradient(to left, var(--color-bg), transparent)",
          }}
        />
      </div>

      {/* Bottom summary strip */}
      <div className="section-container relative z-10">
        <ScrollReveal delay={0.2}>
          <div
            className="mt-12 pt-8 flex flex-wrap items-center justify-between gap-6"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center gap-6 md:gap-10">
              {[
                {
                  value: FEATURED_PROJECTS.length.toString(),
                  label: "Shipped Products",
                },
                {
                  value: `${new Set(FEATURED_PROJECTS.flatMap((p) => p.tech)).size}+`,
                  label: "Technologies",
                },
                { value: "119", label: "Countries Reached" },
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
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Layers
                size={13}
                className="text-[var(--color-text-tertiary)]"
              />
              <span className="text-mono text-[11px] text-[var(--color-text-tertiary)]">
                Full-stack ownership
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
