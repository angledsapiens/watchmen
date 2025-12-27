// ---------- CLAIMS ----------

export type ClaimType =
  | "anomaly"
  | "trend"
  | "threshold_breach"
  | "correlation"
  | "regime_shift"
  | "behavioral";

export interface EvidenceRef {
  source: "baseline_engine" | "oracle" | "dex" | "lending" | "manual";
  observationId: string;
  weight: number; // 0–1
}

export interface Claim {
  id: string;
  type: ClaimType;

  subject: string;        // e.g. "ETH-USD"
  predicate: string;      // e.g. "volatility_exceeds_baseline"
  value: any;

  timeWindow: {
    start: number;
    end: number;
  };

  evidence: EvidenceRef[];

  status: "proposed" | "validated" | "rejected";

  createdAt: number;
  expiresAt?: number;
}

// ---------- BELIEFS ----------

export interface Belief {
  claimId: string;

  confidence: number; // 0–1
  prior: number;

  decayRate: number;
  lastUpdated: number;

  supportingEvidence: EvidenceRef[];
  opposingEvidence: EvidenceRef[];

  state: "tentative" | "strong" | "weak" | "revoked";
}
