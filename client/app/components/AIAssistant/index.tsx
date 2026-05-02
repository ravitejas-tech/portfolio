import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "model";
  text: string;
}

const QUICK_CHIPS = [
  "What has he built?",
  "What's his stack?",
  "Is he available?",
  "Tell me about KO Mark",
];

const SYSTEM_CONTEXT = `You are an AI assistant embedded in Raviteja Salva's portfolio website. Your sole purpose is to answer questions about Ravi — his work, projects, stack, experience, and availability. Be concise, direct, and confident. Match the energy of a senior dev talking about their craft.

---

## WHO IS RAVI

Raviteja Salva — Full-Stack Developer based in Pune, India. 1.9+ years of professional experience building production systems at scale. He specializes in backend architecture, real-time systems, and mobile-first applications. Not just a feature developer — he's led modules end-to-end, from schema design to production deployment.

---

## EXPERIENCE

**BOP Consultancy and Services** (Dec 2023 – Present) — Senior Full Stack Developer Executive
- Progressed: Junior Frontend → Full Stack → Senior within one company
- Works directly with enterprise clients (Coca-Cola, Altcoin Buzz, Synergy, Yugo Rides)
- Core stack: React, Remix, React Native, NestJS, TypeORM, MySQL, Redis, Docker

**Aptitude Guru Hem** (Jul 2024 – Nov 2024) — Full Stack Intern
- Stack: Node.js, Express, MongoDB, React

---

## PROJECTS (with depth)

### KO Mark — Live | Coca-Cola Global Marketing OS
- Enterprise platform serving Coca-Cola's global bottler network across 119 countries
- Ravi owned the Missions and Leaderboard modules end-to-end
- Built event-driven architecture with Inngest for async mission processing
- Redis Sorted Sets power a real-time ranking engine with sub-millisecond retrievals
- Handles i18n, RTL, and localized logic for global markets
- Stack: React Native, NestJS, TypeORM, MySQL, Redis, Inngest, TypeScript
- Links: App Store + Play Store (search "KO Mark")

### Surge — Live | Telegram Mini App for Crypto Predictions
- Gamified Web3 app within Telegram, integrated with TON ecosystem
- Handles 300K+ daily API requests at peak
- Ravi built backend infrastructure, real-time market sync, and DevOps pipelines
- Real-time chat via Pusher; market data via CoinGecko + Inngest crons
- Tiered reward system: Diamond, Platinum, Gold, Surge currencies
- Docker Swarm orchestration on Digital Ocean with automated CI/CD
- Stack: React JS, NestJS, Inngest, Pusher, Docker Swarm, Digital Ocean, Redis, MySQL, S3
- Link: t.me/wesurgenowbot

### Synergy Medical Yoga — Live | Clinical Management Platform
- Multi-phase (3 releases) clinical OS for medical yoga therapy
- Ravi was Lead Developer for Phases 1–3
- Built RBAC isolating patient data across Admin, Therapist, and Patient roles
- Cashfree payment gateway with automated webhook reconciliation
- OTA (Over-the-Air) update pipeline for fast production fixes
- Versioned clinical case file system for long-term patient progress tracking
- Stack: React Native, NestJS, TypeORM, MySQL, Redis, Cashfree SDK, EAS/OTA, Docker
- Links: App Store + Play Store (search "Synergy MYT")

### Yugo Rides — Ongoing | EV Bike Rental Platform
- Ravi is Architect and Lead Developer — designed entire system from scratch
- Real-time IoT telemetry sync for battery data and vehicle health
- Monorepo setup for shared mobile + backend codebase
- Geofencing and proximity-based station discovery via Radar.io + Google Maps SDK
- KYC compliance pipeline with automated verification and document handling
- Payment layer via Razorpay with complex rental pricing models
- Stack: React Native, NestJS, TypeORM, MySQL, Redis, Radar.io, Google Maps SDK, Razorpay

### Lucky Luxury PG — Live | PG Management App (Freelance)
- Replaced WhatsApp group chaos and Excel sheets for a PG owner
- Features: tenant onboarding, room/bed allocation, rent tracking, expense logging, push notifications for due reminders
- Stack: React JS, Supabase
- Fast to ship, zero maintenance overhead for the client

### GitMomos — In Progress | CLI Dev Productivity Tool
- Transforms raw git commit history into structured daily work summaries + activity dashboard
- Handles inconsistent commit styles; intelligent grouping filters noise (merge commits, typo fixes)
- Syncs data to Supabase-backed dashboard; built for npm publication
- Stack: Node.js, React JS, Supabase, Commander.js, Git API

---

## TECH STACK

**Frontend:** React, React Native, Remix, TypeScript
**Backend:** NestJS, Node.js, Express
**Databases:** MySQL, MongoDB, Supabase
**Caching/Queues:** Redis (Sorted Sets, Pub/Sub), Inngest
**DevOps:** Docker, Docker Swarm, Digital Ocean, EAS/OTA
**Real-time:** Pusher, WebSockets
**Payments:** Razorpay, Cashfree
**Maps/Geo:** Google Maps SDK, Radar.io
**Integrations:** Telegram Mini App SDK, TON, CoinGecko, S3, Supabase

---

## CONTACT & AVAILABILITY

- Email: ravitejastech@gmail.com
- Phone: +91 9381598559
- LinkedIn: linkedin.com/in/8a1464272
- GitHub: github.com/ravitejas-tech
- Open to: Full-time roles and freelance projects

---

## RESPONSE RULES

- Only answer questions about Ravi — his work, stack, projects, background, and availability
- Be direct and confident. Don't over-explain unless asked
- For off-topic questions, respond: "I only know things about Ravi — ask me about his work, stack, or availability."
- Never fabricate details not listed here
- If someone asks about a specific project, give depth — Ravi's actual role, the technical challenges he solved, and the stack used
- Keep responses short by default; expand only when the question is technical or detailed

## HANDLING "DOES HE KNOW X?" QUESTIONS

When someone asks if Ravi knows a specific technology, language, or tool:
1. Check the TECH STACK and PROJECTS sections above
2. If it's listed or clearly used in a project → confirm with context (e.g., "Yes, he's used Redis in production across 3+ projects for real-time leaderboards and caching")
3. If it's NOT listed anywhere → be honest: "Ravi hasn't worked with [X] professionally, but he picks up new technologies quickly — he's done it multiple times throughout his career going from frontend to full-stack to architect roles."
4. Never guess or fabricate experience. Honesty here builds trust.
5. If the technology is adjacent to something he does know, mention that too — e.g., if asked about PostgreSQL, note he has deep MySQL experience and the transition would be straightforward.`;

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const apiKey = (window as unknown as { __GEMINI_API_KEY__?: string })
        .__GEMINI_API_KEY__;
      if (!apiKey) throw new Error("API key not configured.");

      const body = {
        system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
        contents: newMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
        generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response.";
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch (e: unknown) {
      setError((e as Error).message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB button */}
      <button
        className="ai-fab"
        onClick={() => setOpen(true)}
        aria-label="Open AI chat"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              style={
                isMobile
                  ? {
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 999,
                      width: "100vw",
                      height: "75vh",
                      display: "flex",
                      flexDirection: "column",
                      background: "#080808",
                      borderRadius: "16px 16px 0 0",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderBottom: "none",
                      overflow: "hidden",
                    }
                  : {
                      position: "fixed",
                      bottom: "100px",
                      right: "32px",
                      zIndex: 999,
                      width: "380px",
                      height: "520px",
                      display: "flex",
                      flexDirection: "column",
                      background: "#080808",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }
              }
              initial={
                isMobile ? { y: "100%" } : { opacity: 0, y: 40, scale: 0.96 }
              }
              animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={
                isMobile ? { y: "100%" } : { opacity: 0, y: 40, scale: 0.96 }
              }
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  background: "#0d0d0d",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#E8001A",
                      display: "inline-block",
                    }}
                    className="pulse-red"
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#ffffff",
                    }}
                  >
                    Ask about Ravi
                  </span>
                  <span
                    style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}
                  >
                    — Gemini Flash
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "20px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {messages.length === 0 && (
                  <p
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: "13px",
                      textAlign: "center",
                      marginTop: "32px",
                    }}
                  >
                    Ask me anything about Ravi's work, stack, or availability.
                  </p>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent:
                        m.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "8px 12px",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        background:
                          m.role === "user"
                            ? "rgba(232,0,26,0.12)"
                            : "rgba(255,255,255,0.04)",
                        border: `1px solid ${m.role === "user" ? "rgba(232,0,26,0.2)" : "rgba(255,255,255,0.08)"}`,
                        color:
                          m.role === "user"
                            ? "#ffffff"
                            : "rgba(255,255,255,0.8)",
                      }}
                    >
                      {m.role === "model" && (
                        <span
                          style={{
                            color: "#E8001A",
                            fontFamily: "monospace",
                            fontSize: "11px",
                            marginRight: "4px",
                          }}
                        >
                          {">"}
                        </span>
                      )}
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        padding: "8px 12px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                        fontFamily: "monospace",
                      }}
                    >
                      <span className="cursor-blink">█</span>
                    </div>
                  </div>
                )}
                {error && (
                  <p
                    style={{
                      color: "#E8001A",
                      fontSize: "11px",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </p>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick chips */}
              {messages.length === 0 && (
                <div
                  style={{
                    padding: "0 16px 12px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      style={{
                        padding: "4px 10px",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.55)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "none",
                        cursor: "pointer",
                        fontFamily: "Poppins, sans-serif",
                        transition: "border-color 0.2s",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask anything about Ravi..."
                  style={{ flex: 1 }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="btn-primary"
                  style={{
                    padding: "10px 16px",
                    fontSize: "16px",
                    opacity: loading || !input.trim() ? 0.4 : 1,
                  }}
                >
                  →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
