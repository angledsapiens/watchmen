import { Claim, EvidenceRef, Belief } from "./types";
import { saveClaim, getClaim } from "./claimStore";
import { initializeBelief, updateBelief } from "./beliefEngine";

const beliefMap = new Map<string, Belief>();

export function createClaim(claim: Claim) {
  saveClaim(claim);
  beliefMap.set(claim.id, initializeBelief(claim.id));
  return claim;
}

export function addEvidence(
  claimId: string,
  evidence: EvidenceRef,
  supports: boolean
): Belief {
  const belief = beliefMap.get(claimId);
  if (!belief) throw new Error("Belief not initialized");

  const updated = updateBelief(belief, evidence, supports);
  beliefMap.set(claimId, updated);
  return updated;
}

export function getBelief(claimId: string): Belief | undefined {
  return beliefMap.get(claimId);
}
