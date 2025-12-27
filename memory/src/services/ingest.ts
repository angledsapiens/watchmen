import { db } from "../storage/sqlite"

export type EpisodicInsert = {
  id: string
  ts: number
  block_ref: object | null
  kind: string
  subject: object
  payload: object
  units?: object
  source: object
  provenance: object
  confidence: number
  refs: string[]
  hash?: string
}

export function ingestEpisodic(obs: EpisodicInsert) {
  db.prepare(`
    INSERT INTO episodic (
      id,
      ts,
      block_ref,
      kind,
      subject,
      payload,
      units,
      source,
      provenance,
      confidence,
      refs,
      hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    obs.id,
    obs.ts,
    JSON.stringify(obs.block_ref),
    obs.kind,
    JSON.stringify(obs.subject),
    JSON.stringify(obs.payload),
    JSON.stringify(obs.units ?? null),
    JSON.stringify(obs.source),
    JSON.stringify(obs.provenance),
    obs.confidence,
    JSON.stringify(obs.refs),
    obs.hash ?? null
  )
}
