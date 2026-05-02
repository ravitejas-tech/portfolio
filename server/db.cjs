// server/db.cjs — Turso (libsql) database setup
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const { createClient } = require("@libsql/client");

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function initDb() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL,
      message    TEXT    NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS leads (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT,
      email       TEXT,
      profession  TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

async function insertContact(name, email, message) {
  await db.execute({
    sql: "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    args: [name, email, message],
  });
}

async function insertLead(name, email, profession) {
  await db.execute({
    sql: "INSERT INTO leads (name, email, profession) VALUES (?, ?, ?)",
    args: [name, email, profession],
  });
}

async function getAllContacts() {
  const result = await db.execute("SELECT * FROM contacts ORDER BY id DESC");
  return result.rows;
}

async function getAllLeads() {
  const result = await db.execute("SELECT * FROM leads ORDER BY id DESC");
  return result.rows;
}

module.exports = {
  db,
  initDb,
  insertContact,
  insertLead,
  getAllContacts,
  getAllLeads,
};
