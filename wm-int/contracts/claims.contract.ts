/**
 * WM-03 Claims & Beliefs — Integration Contract
 * Converts signals + context into claims.
 */

import type { BaselineResult } from "./baselines.contract";

export type ClaimType =
  | "liquidity_stress"
  | "price_dislocation"
  | "oracle_deviation"
  | "volatility_spike"
  | "systemic_risk";

export interface ClaimInput {
  metric: string;
  baseline: BaselineResult;
  raw_signal: unknown;       // WM-04 output, opaque
}

export interface Claim {
  type: ClaimType;
  value: number | Record<string, unknown>;
  rationale?: string;
}

export interface ClaimConfidence {
  probability: number;       // 0–1
  model_agreement?: number;
  data_freshness?: number;
  historical_recurrence?: number;
}

export interface ClaimEvaluation {
  claim: Claim;
  confidence: ClaimConfidence;
  severity: "low" | "medium" | "high" | "critical";
}

export interface ClaimsAdapter {
  evaluate(input: ClaimInput): Promise<ClaimEvaluation | null>;
}
