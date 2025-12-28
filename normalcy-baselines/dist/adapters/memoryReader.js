"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMemory = readMemory;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const DB_PATH = process.env.WATCHMEN_MEMORY_DB ??
    path_1.default.resolve(__dirname, "../../../memory/watchmen-memory.db");
let db = null;
function getDB() {
    if (!db) {
        try {
            db = new better_sqlite3_1.default(DB_PATH, { readonly: true, fileMustExist: true });
        }
        catch {
            return null;
        }
    }
    return db;
}
async function readMemory(source, signal, since) {
    const database = getDB();
    if (!database)
        return [];
    const stmt = database.prepare(`
    SELECT
      id,
      ts,
      subject,
      payload,
      source
    FROM episodic
    WHERE source = ?
      AND subject = ?
      AND ts >= ?
    ORDER BY ts ASC
  `);
    const rows = stmt.all(source, signal, since);
    return rows
        .map((row) => {
        const value = Number(row.payload);
        if (Number.isNaN(value))
            return null;
        return {
            id: row.id,
            source: row.source,
            signal: row.subject,
            timestamp: row.ts,
            value
        };
    })
        .filter((e) => e !== null);
}
