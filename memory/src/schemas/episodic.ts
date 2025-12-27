import { BlockRef, SourceMeta, Provenance } from "./common.js"

export type EpisodicObservation = {
  id: string
  ts: number
  block_ref: BlockRef | null

  kind: "event" | "metric" | "state_change"

  subject: {
    domain: "oracle" | "liquidity" | "lending" | "governance" | "system"
    identifier: string
  }

  payload: Record<string, number | string | boolean | null>
  units?: Record<string, string>

  source: SourceMeta
  provenance: Provenance

  confidence: number
  refs: string[]
  hash?: string
}
