"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveClaim = saveClaim;
exports.getClaim = getClaim;
exports.listClaims = listClaims;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default("watchmen.db");
db.prepare(`
  CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL
  )
`).run();
function saveClaim(claim) {
    db.prepare(`INSERT OR REPLACE INTO claims (id, payload) VALUES (?, ?)`).run(claim.id, JSON.stringify(claim));
}
function getClaim(id) {
    const row = db
        .prepare(`SELECT payload FROM claims WHERE id = ?`)
        .get(id);
    return row ? JSON.parse(row.payload) : null;
}
function listClaims() {
    return db.prepare(`SELECT payload FROM claims`)
        .all()
        .map((r) => JSON.parse(r.payload));
}
