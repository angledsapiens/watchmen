import Database from "better-sqlite3";

const db = new Database("watchmen-memory.db");

/* ----------------------------- */
/* Internal helpers              */
/* ----------------------------- */

function getOne<T>(sql: string, params: any[] = []): T | undefined {
  return db.prepare(sql).get(...params) as T | undefined;
}

function getMany<T>(sql: string, params: any[] = []): T[] {
  return db.prepare(sql).all(...params) as T[];
}

function run(sql: string, params: any[] = []) {
  db.prepare(sql).run(...params);
}

function exec(sql: string) {
  db.exec(sql);
}

/* ----------------------------- */
/* Public storage API            */
/* ----------------------------- */

export const storage = {
  getOne,
  getMany,
  run,
  exec,
};
