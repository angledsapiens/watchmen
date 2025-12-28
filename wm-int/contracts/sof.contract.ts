/**
 * WM-05 Output Semantics — SOF v5.x Integration Contract
 * Canonical outward-facing artifact.
 */

export interface SOFSubject {
  kind: "asset" | "protocol" | "address" | "system";
  id: string;
}

export interface SOFEvent {
  schema_version: "5.0";
  ts_emitted: number;
  source_watchman: string;

  subject: SOFSubject;

  claim: {
    type: string;
    data: unknown;
  };

  confidence: {
    probability: number;
    model_agreement?: number;
    data_freshness?: number;
    historical_recurrence?: number;
  };

  severity: "low" | "medium" | "high" | "critical";

  persistence?: {
    expected_half_life_ms: number;
    decay_model: "exponential" | "linear";
  };

  sof_id: string; // deterministic hash
}

export interface SOFEmitter {
  emit(event: SOFEvent): Promise<void>;
}
