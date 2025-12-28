"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe("claim-beliefs", () => {
    test("belief strengthens with evidence", () => {
        const claim = {
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
        (0, src_1.createClaim)(claim);
        (0, src_1.addEvidence)("claim-1", {
            source: "baseline_engine",
            observationId: "obs-1",
            weight: 0.3
        }, true);
        const belief = (0, src_1.getBelief)("claim-1");
        expect(belief).toBeDefined();
        expect(belief.confidence).toBeGreaterThan(0.5);
    });
});
