import { createClaim, addEvidence, getBelief } from "../src";
import { Claim } from "../src/types";

describe("claim-beliefs", () => {

  test("belief strengthens with evidence", () => {
    const claim: Claim = {
      id: "claim-1",
      type: "anomaly",
      subject: "ETH-USD",
      predicate: "volatility_spike",
      value: true,
      timeWindow: {
        start: Date.now() - 60_000,
        end: Date.now()
      },
      evidence: [],
      status: "proposed",
      createdAt: Date.now()
    };

    createClaim(claim);

    addEvidence(
      "claim-1",
      {
        source: "baseline_engine",
        observationId: "obs-1",
        weight: 0.3
      },
      true
    );

    const belief = getBelief("claim-1");
    expect(belief).toBeDefined();
    expect(belief!.confidence).toBeGreaterThan(0.5);
  });

});
