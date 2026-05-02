// server/db.cjs — SQLite database setup
// Uses better-sqlite3 for synchronous, lightweight storage
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "portfolio.db");

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma("journal_mode = WAL");

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT    NOT NULL,
    email     TEXT    NOT NULL,
    message   TEXT    NOT NULL,
    created_at TEXT   NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS leads (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT,
    email       TEXT,
    profession  TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Prepared statements
const insertContact = db.prepare(
  "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
);

const insertLead = db.prepare(
  "INSERT INTO leads (name, email, profession) VALUES (?, ?, ?)",
);

const getAllContacts = db.prepare("SELECT * FROM contacts ORDER BY id DESC");
const getAllLeads = db.prepare("SELECT * FROM leads ORDER BY id DESC");

module.exports = { db, insertContact, insertLead, getAllContacts, getAllLeads };
