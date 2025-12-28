import { storage } from "../storage/sqlite";

export function getEpisodicById(id: string) {
  return storage.getOne(
    "SELECT * FROM episodic WHERE id = ?",
    [id]
  );
}

export function listEpisodic(limit = 100) {
  return storage.getMany(
    "SELECT * FROM episodic ORDER BY ts DESC LIMIT ?",
    [limit]
  );
}

export function listTemporal(limit = 100) {
  return storage.getMany(
    "SELECT * FROM temporal ORDER BY window DESC LIMIT ?",
    [limit]
  );
}

export function listSemantic(limit = 100) {
  return storage.getMany(
    "SELECT * FROM semantic ORDER BY updated_ts DESC LIMIT ?",
    [limit]
  );
}

export function listNarrative(limit = 100) {
  return storage.getMany(
    "SELECT * FROM narrative ORDER BY created_ts DESC LIMIT ?",
    [limit]
  );
}
