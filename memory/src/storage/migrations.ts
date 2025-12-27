import { db } from "./sqlite"

db.exec(`
CREATE TABLE IF NOT EXISTS episodic (
  id TEXT PRIMARY KEY,
  ts INTEGER,
  block_ref TEXT,
  kind TEXT,
  subject TEXT,
  payload TEXT,
  units TEXT,
  source TEXT,
  provenance TEXT,
  confidence REAL,
  refs TEXT,
  hash TEXT
);

CREATE TABLE IF NOT EXISTS temporal (
  id TEXT PRIMARY KEY,
  window TEXT,
  subject TEXT,
  metrics TEXT,
  descriptors TEXT,
  refs TEXT,
  source TEXT,
  confidence REAL,
  hash TEXT
);

CREATE TABLE IF NOT EXISTS semantic (
  id TEXT PRIMARY KEY,
  label TEXT,
  description TEXT,
  scope TEXT,
  evidence TEXT,
  structure TEXT,
  created_ts INTEGER,
  updated_ts INTEGER,
  confidence REAL,
  source TEXT,
  hash TEXT
);

CREATE TABLE IF NOT EXISTS narrative (
  id TEXT PRIMARY KEY,
  title TEXT,
  period TEXT,
  summary TEXT,
  factors TEXT,
  observations TEXT,
  learnings TEXT,
  confidence REAL,
  source TEXT,
  created_ts INTEGER,
  hash TEXT
);
`)
