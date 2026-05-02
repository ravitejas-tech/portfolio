import { useState, useEffect } from "react";

const API = "/api/admin";
const TOKEN_KEY = "admin_token";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Lead {
  id: number;
  name: string | null;
  email: string | null;
  profession: string | null;
  created_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(ts: string) {
  return new Date(ts).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function authHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// ── Login ─────────────────────────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      sessionStorage.setItem(TOKEN_KEY, data.token);
      onSuccess(data.token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          padding: "40px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#E8001A",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {">"} admin.login()
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 32,
          }}
        >
          Admin Panel
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                padding: "10px 12px",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                padding: "10px 12px",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          {error && (
            <p style={{ color: "#E8001A", fontSize: 13, margin: 0 }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#E8001A",
              color: "#fff",
              border: "none",
              padding: "12px",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: 8,
            }}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Data Table ────────────────────────────────────────────────────────────────
function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Record<string, string | number | null>[];
}) {
  if (rows.length === 0) {
    return (
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 14,
          padding: "20px 0",
        }}
      >
        No records yet.
      </p>
    );
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 13,
          color: "rgba(255,255,255,0.75)",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  whiteSpace: "nowrap",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                background:
                  i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              }}
            >
              {columns.map((col) => {
                const key = col.toLowerCase().replace(/ /g, "_");
                const val = row[key];
                return (
                  <td
                    key={col}
                    style={{
                      padding: "12px 16px",
                      maxWidth: col === "Message" ? 360 : undefined,
                      whiteSpace: col === "Message" ? "pre-wrap" : "nowrap",
                      wordBreak: col === "Message" ? "break-word" : undefined,
                      color:
                        col === "ID"
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(255,255,255,0.75)",
                    }}
                  >
                    {val ?? (
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [cRes, lRes] = await Promise.all([
          fetch(`${API}/contacts`, { headers: authHeader(token) }),
          fetch(`${API}/leads`, { headers: authHeader(token) }),
        ]);
        if (cRes.status === 401 || lRes.status === 401) {
          onLogout();
          return;
        }
        setContacts(await cRes.json());
        setLeads(await lRes.json());
      } catch {
        setError("Failed to load data. Is the server running?");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, onLogout]);

  const sectionStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "28px 32px",
    marginBottom: 24,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        padding: "40px clamp(16px, 4vw, 60px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              color: "#E8001A",
              letterSpacing: "0.2em",
              marginBottom: 4,
            }}
          >
            {">"} admin.dashboard()
          </div>
          <h1
            style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}
          >
            Portfolio Admin
          </h1>
        </div>
        <button
          onClick={onLogout}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
            padding: "8px 16px",
            fontSize: 12,
            letterSpacing: "0.1em",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Sign Out
        </button>
      </div>

      {loading && (
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Loading…</p>
      )}
      {error && <p style={{ color: "#E8001A", fontSize: 14 }}>{error}</p>}

      {!loading && !error && (
        <>
          {/* Contact Messages */}
          <div style={sectionStyle}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "#E8001A",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Contact Form
              </div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Messages
                <span
                  style={{
                    marginLeft: 12,
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  {contacts.length} total
                </span>
              </h2>
            </div>
            <DataTable
              columns={["ID", "Name", "Email", "Message", "Created At"]}
              rows={contacts.map((c) => ({
                id: c.id,
                name: c.name,
                email: c.email,
                message: c.message,
                created_at: formatDate(c.created_at),
              }))}
            />
          </div>

          {/* Stay Connected Leads */}
          <div style={sectionStyle}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "#E8001A",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Exit Popup
              </div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Stay Connected Leads
                <span
                  style={{
                    marginLeft: 12,
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  {leads.length} total
                </span>
              </h2>
            </div>
            <DataTable
              columns={["ID", "Name", "Email", "Profession", "Created At"]}
              rows={leads.map((l) => ({
                id: l.id,
                name: l.name,
                email: l.email,
                profession: l.profession,
                created_at: formatDate(l.created_at),
              }))}
            />
          </div>
        </>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null,
  );

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  if (!token) {
    return <LoginForm onSuccess={setToken} />;
  }
  return <Dashboard token={token} onLogout={handleLogout} />;
}
