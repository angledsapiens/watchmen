import type {
  ClaimsAdapter,
  ClaimInput,
  ClaimEvaluation,
} from "@contracts/index";

import { evaluateClaim } from "@watchmen/claims-beliefs";

function severityFromProbability(p: number): ClaimEvaluation["severity"] {
  if (p >= 0.9) return "critical";
  if (p >= 0.75) return "high";
  if (p >= 0.5) return "medium";
  return "low";
}

export const WM03ClaimsAdapter: ClaimsAdapter = {
  async evaluate(input: ClaimInput): Promise<ClaimEvaluation | null> {
    const deviation = input.baseline?.deviation_pct ?? 0;

    const claimId = `${input.metric}:${Date.now()}`;

    const belief = await evaluateClaim({
      claimId,
      evidence: {
        source: "baseline_engine",                 // ✅ REQUIRED
        observationId: claimId,           // ✅ REQUIRED
        weight: Math.min(Math.abs(deviation) / 100, 1), // ✅ REQUIRED
      },
      supports: deviation < 0,
    });

    const probability = belief.confidence;

    // Normalize raw_signal into allowed Claim.value
    const value =
      typeof input.raw_signal === "number"
        ? input.raw_signal
        : typeof input.raw_signal === "object" && input.raw_signal !== null
        ? (input.raw_signal as Record<string, unknown>)
        : { raw_signal: input.raw_signal };

    return {
      claim: {
        type:
          input.metric === "dex_liquidity_depth"
            ? "liquidity_stress"
            : "systemic_risk",
        value,
        rationale: `Baseline deviation ${deviation}%`,
      },
      confidence: {
        probability,
      },
      severity: severityFromProbability(probability),
    };
  },
};
