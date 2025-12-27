import { TimeWindow, BaselineSnapshot } from "../types"
import { computeStats } from "./stats"
import { getWindowStart } from "./windowManager"
import { readMemory } from "../adapters/memoryReader"
import { BaselineStore } from "../store/baselineStore"

const WINDOWS: TimeWindow[] = ["1m", "5m", "15m", "1h", "4h", "24h"]

export async function updateBaselines(source: string, signal: string) {
  const now = Date.now()

  for (const window of WINDOWS) {
    const since = getWindowStart(window, now)
    const events = await readMemory(source, signal, since)
    const values = events.map(e => e.value)

    const stats = computeStats(values)
    if (!stats) continue

    const snapshot: BaselineSnapshot = {
      source,
      signal,
      window,
      stats,
      updatedAt: now
    }

    BaselineStore.set(snapshot)
  }
}
