// server/routes/admin.cjs — Admin panel API
const express = require("express");
const crypto = require("crypto");
const { getAllContacts, getAllLeads } = require("../db.cjs");

const router = express.Router();

function computeToken() {
  return crypto
    .createHmac("sha256", process.env.ADMIN_TOKEN_SECRET || "fallback_secret")
    .update(`${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}`)
    .digest("hex");
}

// Constant-time string comparison to prevent timing attacks
function safeCompare(a, b) {
  if (a.length !== b.length) {
    crypto.timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32)); // keep timing uniform
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

// Middleware: verify Bearer token on protected routes
function requireAdmin(req, res, next) {
  const auth = req.headers["authorization"] || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || !safeCompare(token, computeToken())) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  next();
}

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email = "", password = "" } = req.body ?? {};

  const expectedEmail = process.env.ADMIN_EMAIL || "";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";

  const emailMatch = safeCompare(email, expectedEmail);
  const passwordMatch = safeCompare(password, expectedPassword);

  if (!emailMatch || !passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  return res.json({ token: computeToken() });
});

// GET /api/admin/contacts
router.get("/contacts", requireAdmin, async (req, res) => {
  try {
    const rows = await getAllContacts();
    return res.json(rows);
  } catch (err) {
    console.error("[admin] contacts error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/admin/leads
router.get("/leads", requireAdmin, async (req, res) => {
  try {
    const rows = await getAllLeads();
    return res.json(rows);
  } catch (err) {
    console.error("[admin] leads error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
