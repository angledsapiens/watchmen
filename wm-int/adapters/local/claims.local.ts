import type { ClaimsAdapter, ClaimEvaluation } from "@contracts/index";

export const LocalClaimsAdapter: ClaimsAdapter = {
  async evaluate(): Promise<ClaimEvaluation> {
    return {
      claim: {
        type: "liquidity_stress",
        value: { depth_change_pct: -35 },
      },
      confidence: {
        probability: 0.91,
        model_agreement: 0.88,
        data_freshness: 0.96,
      },
      severity: "high",
    };
  },
};
