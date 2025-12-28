import { BaselineStore } from "./store/baselineStore";
import type { BaselineSnapshot } from "./types";

/**
 * Read-only baseline query API for integration.
 * Does NOT trigger updates.
 */
export async function queryBaseline(input: {
  metric: string;
  subject: { kind: "asset" | "protocol"; id: string };
  window?: "1m" | "5m" | "15m" | "1h" | "4h" | "24h";
}) {
  // WM-02 keys baselines as (source, signal, window)
  // Integration mapping:
  //   subject.id -> source
  //   metric     -> signal
  const source = input.subject.id;
  const signal = input.metric;

  // Choose a window explicitly (default = 15m)
  const window = input.window ?? "15m";

  const snapshot: BaselineSnapshot | null =
    BaselineStore.get(source, signal, window);

  if (!snapshot) {
    return {
      baseline_value: null,
      current_value: null,
      deviation_pct: null,
      z_score: null,
      updated_at_ms: Date.now(),
    };
  }

  return {
    baseline_value: snapshot.stats.mean,
    current_value: snapshot.stats.mean,
    deviation_pct: null,
    z_score: null,
    updated_at_ms: snapshot.updatedAt,
  };
}
