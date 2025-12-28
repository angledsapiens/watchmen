import { initializeBelief, updateBelief } from "./beliefEngine";
import type { EvidenceRef } from "./types";

/**
 * Public belief update API for integration (WM-INT).
 * Pure, deterministic, side-effect free.
 */
export async function evaluateClaim(input: {
  claimId: string;
  prior?: number;
  evidence: EvidenceRef;
  supports: boolean;
}) {
  // Initialize belief (stateless for now)
  const belief = initializeBelief(
    input.claimId,
    input.prior ?? 0.5
  );

  const updated = updateBelief(
    belief,
    input.evidence,
    input.supports
  );

  return {
    confidence: updated.confidence,
    state: updated.state,
  };
}
