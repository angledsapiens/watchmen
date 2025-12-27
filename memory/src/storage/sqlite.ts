import Database from "better-sqlite3"

// Single SQLite database file for WM-01 memory
export const db = new Database("watchmen-memory.db")

// Safer concurrent behavior (even locally)
db.pragma("journal_mode = WAL")
