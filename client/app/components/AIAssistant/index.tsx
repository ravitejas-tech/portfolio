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

const SYSTEM_CONTEXT = `You are Ravi's portfolio AI assistant. Answer ONLY questions about Raviteja Salva — his work, skills, availability, and projects. Keep answers concise and direct. Don't be cringe. Here's his context:

Raviteja Salva is a full-stack developer with experience shipping production products used globally.

Projects:
1. KO Mark (Coca-Cola) — Global marketing platform used in 119 countries. Built Missions + Leaderboard features. React Native, Node.js, PostgreSQL. Live on Play Store & App Store.
2. Surge (AltCoin Buzz) — Tinder-style crypto prediction Telegram Mini App. 300K daily requests. Built full stack: CoinGecko APIs, chat, leaderboards, TON Wallet, Twitter auth. Digital Ocean deployment. Live.
3. Synergy Medical Yoga — Appointment booking for therapists. Full-stack: booking flow, Cashfree payments, multi-role system, case files. Digital Ocean, Play Store & App Store.
4. Yugo Rides — EV bike rental platform. Architect + team lead. IoT battery APIs, Radar.io + Google Maps, booking lifecycle, KYC, Razorpay. Ongoing.
5. Lucky Luxury PG (Freelance) — PG management app. React JS + Supabase. Live.
6. Gitmomos (Personal) — CLI tool: git commits → human-readable daily reports + dashboard. React + Node.js + Supabase. Planned npm publish.

Stack: React, React Native, Node.js, Express, PostgreSQL, Supabase, TypeScript, NestJS, AWS, Digital Ocean, Razorpay, Cashfree, Google Maps SDK, Radar.io, Telegram Mini App SDK, TON Wallet.

Availability: Open to new opportunities and freelance projects. Contact via the form on this site.

If someone asks something unrelated to Ravi, say: "I only know things about Ravi. Ask me about his work, stack, or availability."`;

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
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      };

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
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
                    — Gemini 1.5 Flash
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
