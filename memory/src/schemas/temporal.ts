import { SourceMeta } from "./common.js"

export type TemporalSummary = {
  id: string
  window: {
    start_ts: number
    end_ts: number
    granularity: "block" | "minute" | "hour" | "day"
  }

  subject: {
    domain: string
    identifier: string
  }

  metrics: {
    name: string
    aggregation: "mean" | "median" | "min" | "max" | "std" | "count"
    value: number
  }[]

  descriptors: {
    trend?: "increasing" | "decreasing" | "flat" | "volatile"
    continuity?: "continuous" | "bursty" | "sparse"
  }

  refs: string[]
  source: SourceMeta
  confidence: number
  hash?: string
}
