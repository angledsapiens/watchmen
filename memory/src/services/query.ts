import { db } from "../storage/sqlite"

export function getEpisodicById(id: string) {
  return db
    .prepare("SELECT * FROM episodic WHERE id = ?")
    .get(id)
}

export function listEpisodic(limit = 100) {
  return db
    .prepare("SELECT * FROM episodic ORDER BY ts DESC LIMIT ?")
    .all(limit)
}

export function listTemporal(limit = 100) {
  return db
    .prepare("SELECT * FROM temporal ORDER BY window DESC LIMIT ?")
    .all(limit)
}

export function listSemantic(limit = 100) {
  return db
    .prepare("SELECT * FROM semantic ORDER BY updated_ts DESC LIMIT ?")
    .all(limit)
}

export function listNarrative(limit = 100) {
  return db
    .prepare("SELECT * FROM narrative ORDER BY created_ts DESC LIMIT ?")
    .all(limit)
}
