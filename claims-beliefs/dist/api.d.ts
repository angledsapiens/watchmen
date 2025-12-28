import { Claim, EvidenceRef, Belief } from "./types";
export declare function createClaim(claim: Claim): Claim;
export declare function addEvidence(claimId: string, evidence: EvidenceRef, supports: boolean): Belief;
export declare function getBelief(claimId: string): Belief | undefined;
//# sourceMappingURL=api.d.ts.map