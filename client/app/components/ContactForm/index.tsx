import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Email directly: ravitejasalva@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <p
          style={{
            color: "#E8001A",
            fontFamily: "monospace",
            fontSize: "13px",
            marginBottom: "12px",
          }}
        >
          {">"} message.sent()
        </p>
        <p
          style={{
            fontWeight: 600,
            fontSize: "22px",
            color: "#ffffff",
            marginBottom: "8px",
          }}
        >
          Received.
        </p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
          Ravi will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          style={{
            marginTop: "24px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "520px",
      }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What are you building? What do you need?"
        />
      </div>

      {error && <p style={{ color: "#E8001A", fontSize: "12px" }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
