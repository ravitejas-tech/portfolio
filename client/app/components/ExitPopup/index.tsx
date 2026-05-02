import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("exit_popup_dismissed") === "1";
  });
  const [form, setForm] = useState({ name: "", email: "", profession: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: exit-intent on mouse leaving top
  useEffect(() => {
    if (dismissed || isMobile) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 20) setVisible(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed, isMobile]);

  // Mobile: show after 60 seconds
  useEffect(() => {
    if (dismissed || !isMobile) return;
    const t = setTimeout(() => setVisible(true), 60000);
    return () => clearTimeout(t);
  }, [dismissed, isMobile]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem("exit_popup_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      setTimeout(dismiss, 2200);
    } catch {
      setError("Failed to save. Email directly: ravitejasalva@gmail.com");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Card — desktop: centered modal, mobile: bottom slide-up */}
          <motion.div
            style={
              isMobile
                ? {
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 61,
                    width: "100%",
                    background: "#0A0A0A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderBottom: "none",
                    borderRadius: "16px 16px 0 0",
                    padding: "32px 24px 40px",
                  }
                : {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    zIndex: 61,
                    transform: "translate(-50%, -50%)",
                    width: "min(480px, 90vw)",
                    background: "#0A0A0A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "40px",
                  }
            }
            initial={
              isMobile ? { y: "100%" } : { opacity: 0, scale: 0.93, y: -16 }
            }
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={
              isMobile ? { y: "100%" } : { opacity: 0, scale: 0.93, y: -16 }
            }
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.3)",
                fontSize: "22px",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Terminal dots */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#E8001A",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  marginLeft: "12px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                connection.init()
              </span>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "20px",
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  Connected.
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                  Ravi will be in touch. Closing...
                </p>
              </div>
            ) : (
              <>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  Wait — let's stay connected
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "14px",
                    marginBottom: "24px",
                  }}
                >
                  Drop your details. No spam. Just future opportunities.
                </p>

                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Name (optional)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="What do you do? (optional)"
                    value={form.profession}
                    onChange={(e) =>
                      setForm({ ...form, profession: e.target.value })
                    }
                  />

                  {error && (
                    <p style={{ color: "#E8001A", fontSize: "12px" }}>
                      {error}
                    </p>
                  )}

                  <div
                    style={{ display: "flex", gap: "12px", marginTop: "8px" }}
                  >
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, padding: "12px" }}
                    >
                      Stay connected
                    </button>
                    <button
                      type="button"
                      onClick={dismiss}
                      className="btn-ghost"
                      style={{ padding: "12px 20px" }}
                    >
                      Nah
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
