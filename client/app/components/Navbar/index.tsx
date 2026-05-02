import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "~/hooks/useScrollProgress";

const NAV_LINKS = [
  { label: "Work", anchor: "#about" },
  { label: "Experience", anchor: "#experience" },
  { label: "Stack", anchor: "#stack" },
  { label: "Projects", anchor: "#projects" },
  { label: "Contact", anchor: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "experience",
      "stack",
      "projects",
      "contact",
    ];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (anchor: string) => {
    setMenuOpen(false);
    const el = document.querySelector(anchor);
    if (el) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { duration: 1.6, offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      className={`navbar${scrolled ? " navbar-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* RS logotype */}
      <button
        onClick={() => scrollTo("#hero")}
        style={{
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "#ffffff",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        RS<span style={{ color: "#E8001A" }}>.</span>
      </button>

      {/* Desktop links */}
      <div
        className="hidden md:flex items-center"
        style={{ gap: "36px", marginLeft: "auto" }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = link.anchor === `#${activeSection}`;
          return (
            <button
              key={link.label}
              onClick={() => scrollTo(link.anchor)}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isActive ? "#E8001A" : "rgba(255,255,255,0.6)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                transition: "color 0.2s",
                fontFamily: "Poppins, sans-serif",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = isActive
                  ? "#E8001A"
                  : "rgba(255,255,255,0.6)";
              }}
            >
              {link.label}
              <motion.span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "#E8001A",
                  transformOrigin: "left",
                }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          );
        })}
        <button
          onClick={() => scrollTo("#contact")}
          className="btn-primary"
          style={{ padding: "8px 20px", fontSize: "12px" }}
        >
          Hire Me
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginLeft: "auto",
        }}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile menu — fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(24px)",
              zIndex: 49,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => scrollTo(link.anchor)}
                className="mobile-menu-link"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{
                duration: 0.35,
                delay: NAV_LINKS.length * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => scrollTo("#contact")}
              className="btn-primary"
              style={{ marginTop: "8px" }}
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
