import { SourceMeta } from "./common.js"

export type SemanticPattern = {
  id: string
  label: string
  description: string

  scope: {
    domains: string[]
    identifiers?: string[]
  }

  evidence: {
    supporting_refs: string[]
    occurrences: number
  }

  structure: {
    variables: string[]
    relationships: "correlated" | "co-occurring" | "sequential"
  }

  created_ts: number
  updated_ts: number

  confidence: number
  source: SourceMeta
  hash?: string
}
