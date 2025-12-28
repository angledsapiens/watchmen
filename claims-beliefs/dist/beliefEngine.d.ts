import { Belief, EvidenceRef } from "./types";
/**
 * Initialize a belief for a newly created claim
 */
export declare function initializeBelief(claimId: string, prior?: number, decayRate?: number): Belief;
/**
 * Update belief confidence using deterministic evidence accumulation
 */
export declare function updateBelief(belief: Belief, evidence: EvidenceRef, supports: boolean): Belief;
//# sourceMappingURL=beliefEngine.d.ts.map