// server/index.cjs — Express backend for Raviteja Salva portfolio
// Handles contact form submissions and exit-intent leads
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");

const { initDb } = require("./db.cjs");
const contactRouter = require("./routes/contact.cjs");
const leadsRouter = require("./routes/leads.cjs");
const adminRouter = require("./routes/admin.cjs");

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "20kb" }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

app.use("/api/contact", contactRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/admin", adminRouter);

// 404 fallback
app.use((_, res) => {
  res.status(404).json({ error: "Not found." });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error("[server] Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// ── Start ─────────────────────────────────────────────────────────────────────
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] Running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[server] Failed to initialise database:", err);
    process.exit(1);
  });
