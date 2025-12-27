import Database from "better-sqlite3"
import { MemoryEvent } from "../types"
import path from "path"

type EpisodicRow = {
  id: string
  ts: number
  subject: string
  payload: string
  source: string
}

const DB_PATH =
  process.env.WATCHMEN_MEMORY_DB ??
  path.resolve(__dirname, "../../../memory/watchmen-memory.db")

let db: Database.Database | null = null

function getDB() {
  if (!db) {
    try {
      db = new Database(DB_PATH, { readonly: true, fileMustExist: true })
    } catch {
      return null
    }
  }
  return db
}

export async function readMemory(
  source: string,
  signal: string,
  since: number
): Promise<MemoryEvent[]> {
  const database = getDB()
  if (!database) return []

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
  `)

const rows = stmt.all(source, signal, since) as EpisodicRow[]

return rows
  .map((row: EpisodicRow): MemoryEvent | null => {
    const value = Number(row.payload)
    if (Number.isNaN(value)) return null

    return {
      id: row.id,
      source: row.source,
      signal: row.subject,
      timestamp: row.ts,
      value
    }
  })
  .filter((e): e is MemoryEvent => e !== null)
}
