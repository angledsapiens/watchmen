"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateClaim = evaluateClaim;
const beliefEngine_1 = require("./beliefEngine");
/**
 * Public belief update API for integration (WM-INT).
 * Pure, deterministic, side-effect free.
 */
async function evaluateClaim(input) {
    // Initialize belief (stateless for now)
    const belief = (0, beliefEngine_1.initializeBelief)(input.claimId, input.prior ?? 0.5);
    const updated = (0, beliefEngine_1.updateBelief)(belief, input.evidence, input.supports);
    return {
        confidence: updated.confidence,
        state: updated.state,
    };
}
