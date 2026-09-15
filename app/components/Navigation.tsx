import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "~/data/portfolio";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-bg)]/90 backdrop-blur-md border-fine-b"
            : "bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            className="text-mono text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors whitespace-nowrap shrink-0 mr-6"
          >
            {PERSONAL.name}
            <span className="text-[var(--color-accent)]">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PERSONAL.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 inline-flex items-center gap-1 border-fine px-3 py-1.5 rounded"
            >
              <span>Resume</span>
              <ArrowUpRight size={13} className="text-[var(--color-accent)]" />
            </a>
            <a
              href="#contact"
              className="text-mono text-[var(--color-bg)] bg-[var(--color-accent)] px-4 py-2 hover:bg-[var(--color-accent-dim)] transition-colors duration-300 rounded font-medium whitespace-nowrap"
            >
              Let&apos;s talk
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[var(--color-text)] p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                className="text-heading text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={PERSONAL.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
              className="text-heading text-[var(--color-accent)] flex items-center gap-2"
            >
              <span>Resume</span>
              <ArrowUpRight size={20} />
            </motion.a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="text-mono text-[var(--color-bg)] bg-[var(--color-accent)] px-6 py-3 mt-4 rounded"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
