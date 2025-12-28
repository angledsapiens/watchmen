export type ClaimType = "anomaly" | "trend" | "threshold_breach" | "correlation" | "regime_shift" | "behavioral";
export interface EvidenceRef {
    source: "baseline_engine" | "oracle" | "dex" | "lending" | "manual";
    observationId: string;
    weight: number;
}
export interface Claim {
    id: string;
    type: ClaimType;
    subject: string;
    predicate: string;
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
export interface Belief {
    claimId: string;
    confidence: number;
    prior: number;
    decayRate: number;
    lastUpdated: number;
    supportingEvidence: EvidenceRef[];
    opposingEvidence: EvidenceRef[];
    state: "tentative" | "strong" | "weak" | "revoked";
}
//# sourceMappingURL=types.d.ts.map