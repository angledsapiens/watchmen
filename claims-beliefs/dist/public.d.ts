import type { EvidenceRef } from "./types";
/**
 * Public belief update API for integration (WM-INT).
 * Pure, deterministic, side-effect free.
 */
export declare function evaluateClaim(input: {
    claimId: string;
    prior?: number;
    evidence: EvidenceRef;
    supports: boolean;
}): Promise<{
    confidence: number;
    state: "tentative" | "strong" | "weak" | "revoked";
}>;
//# sourceMappingURL=public.d.ts.map