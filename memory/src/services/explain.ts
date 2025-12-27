import { db } from "../storage/sqlite"

type EpisodicRow = {
  id: string
  ts: number
  block_ref: string | null
  kind: string
  subject: string
  payload: string
  units: string | null
  source: string
  provenance: string
  confidence: number
  refs: string
  hash: string | null
}

function getById(table: string, id: string): EpisodicRow | undefined {
  return db
    .prepare(`SELECT * FROM ${table} WHERE id = ?`)
    .get(id) as EpisodicRow | undefined
}

export function explainEpisodic(id: string) {
  const root = getById("episodic", id)
  if (!root) return null

  const refs: EpisodicRow[] = []

  const refIds: string[] = JSON.parse(root.refs || "[]")

  for (const refId of refIds) {
    const ref =
      getById("episodic", refId) ||
      getById("temporal", refId) ||
      getById("semantic", refId) ||
      getById("narrative", refId)

    if (ref) refs.push(ref)
  }

  return {
    root,
    refs
  }
}
