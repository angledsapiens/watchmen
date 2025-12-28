"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeBelief = initializeBelief;
exports.updateBelief = updateBelief;
/**
 * Clamp confidence into [0, 1]
 */
function clamp(value) {
    if (value < 0)
        return 0;
    if (value > 1)
        return 1;
    return value;
}
/**
 * Initialize a belief for a newly created claim
 */
function initializeBelief(claimId, prior = 0.5, decayRate = 0.00001) {
    const now = Date.now();
    return {
        claimId,
        confidence: prior,
        prior,
        decayRate,
        lastUpdated: now,
        supportingEvidence: [],
        opposingEvidence: [],
        state: "tentative"
    };
}
/**
 * Update belief confidence using deterministic evidence accumulation
 */
function updateBelief(belief, evidence, supports) {
    const now = Date.now();
    // --- time decay ---
    const elapsedMs = now - belief.lastUpdated;
    const decay = belief.decayRate * elapsedMs;
    let confidence = belief.confidence - decay;
    // --- evidence application ---
    if (supports) {
        confidence += evidence.weight;
        belief.supportingEvidence.push(evidence);
    }
    else {
        confidence -= evidence.weight;
        belief.opposingEvidence.push(evidence);
    }
    confidence = clamp(confidence);
    // --- state transition ---
    let state = "tentative";
    if (confidence >= 0.75)
        state = "strong";
    else if (confidence <= 0.25)
        state = "weak";
    if (confidence === 0)
        state = "revoked";
    return {
        ...belief,
        confidence,
        lastUpdated: now,
        state
    };
}
