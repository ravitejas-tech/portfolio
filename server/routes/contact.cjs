// server/routes/contact.cjs
const express = require("express");
const router = express.Router();
const { insertContact } = require("../db.cjs");

// POST /api/contact
router.post("/", (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "name, email, and message are required." });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  // Sanitise lengths
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return res.status(400).json({ error: "Input too long." });
  }

  try {
    insertContact.run(name.trim(), email.trim().toLowerCase(), message.trim());
    return res.status(201).json({ ok: true, message: "Message received." });
  } catch (err) {
    console.error("[contact] DB error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
