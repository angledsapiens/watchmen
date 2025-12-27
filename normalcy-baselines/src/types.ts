export interface MemoryEvent {
  id: string
  source: string
  signal: string
  timestamp: number
  value: number
}

export type TimeWindow = "1m" | "5m" | "15m" | "1h" | "4h" | "24h"

export interface BaselineStats {
  count: number
  mean: number
  median: number
  min: number
  max: number
  variance: number
  stdDev: number
  mad: number
  iqr: number
}

export interface BaselineSnapshot {
  source: string
  signal: string
  window: TimeWindow
  stats: BaselineStats
  updatedAt: number
  stale?: boolean
}
