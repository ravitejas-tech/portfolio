// server/routes/leads.cjs
const express = require("express");
const router = express.Router();
const { insertLead } = require("../db.cjs");

// POST /api/leads — all fields optional
router.post("/", (req, res) => {
  const { name = "", email = "", profession = "" } = req.body ?? {};

  // Sanitise lengths
  if (name.length > 200 || email.length > 320 || profession.length > 200) {
    return res.status(400).json({ error: "Input too long." });
  }

  // Basic email format check only if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }
  }

  try {
    insertLead.run(
      name.trim() || null,
      email.trim().toLowerCase() || null,
      profession.trim() || null,
    );
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("[leads] DB error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
