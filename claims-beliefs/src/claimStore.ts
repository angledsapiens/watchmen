import Database from "better-sqlite3";
import { Claim } from "./types";

const db = new Database("watchmen.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL
  )
`).run();

export function saveClaim(claim: Claim) {
  db.prepare(
    `INSERT OR REPLACE INTO claims (id, payload) VALUES (?, ?)`
  ).run(claim.id, JSON.stringify(claim));
}

export function getClaim(id: string): Claim | null {
  const row = db
    .prepare(`SELECT payload FROM claims WHERE id = ?`)
    .get(id) as { payload: string } | undefined;

  return row ? JSON.parse(row.payload) : null;
}


export function listClaims(): Claim[] {
  return db.prepare(`SELECT payload FROM claims`)
    .all()
    .map((r: any) => JSON.parse(r.payload));
}
