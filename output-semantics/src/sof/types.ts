export type SeverityBand =
  | "informational"
  | "low"
  | "elevated"
  | "high"
  | "critical";

export interface ConfidenceVector {
  probability: number;
  model_agreement: number;
  data_freshness: number;
  historical_recurrence: number;
}

export interface PersistenceHint {
  expected_half_life_ms: number;
  decay_model: "exponential" | "step" | "event_reset";
}

export type SemanticSubject =
  | { kind: "asset"; asset: string }
  | { kind: "protocol"; name: string }
  | { kind: "market"; venue: string };

export type SemanticClaim =
  | { type: "deviation"; metric: string; magnitude: number }
  | { type: "regime_shift"; from: string; to: string }
  | { type: "liquidity_stress"; depth_change_pct: number };

export interface OutputIntegrity {
  content_hash: string;
  signed_by: string;
  signature: string;
}

export interface SemanticOutputFrame {
  sof_id: string;
  schema_version: "5.0";
  ts_emitted: number;
  source_watchman: string;

  subject: SemanticSubject;
  claim: SemanticClaim;
  confidence: ConfidenceVector;

  severity: SeverityBand;
  persistence: PersistenceHint;

  integrity: OutputIntegrity;
}
