/**
 * WM-02 Normalcy & Baselines — Integration Contract
 * Provides contextual baseline deltas.
 */

export interface BaselineQuery {
  metric: string;            // e.g. "dex_liquidity_depth"
  subject: {
    kind: "asset" | "protocol";
    id: string;
  };
  window_ms?: number;        // optional override
}

export interface BaselineResult {
  baseline_value: number;
  current_value: number;
  deviation_pct: number;     // signed
  z_score?: number;
  updated_at_ms: number;
}

export interface BaselinesAdapter {
  query(q: BaselineQuery): Promise<BaselineResult>;
}
