"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClaim = createClaim;
exports.addEvidence = addEvidence;
exports.getBelief = getBelief;
const claimStore_1 = require("./claimStore");
const beliefEngine_1 = require("./beliefEngine");
const beliefMap = new Map();
function createClaim(claim) {
    (0, claimStore_1.saveClaim)(claim);
    beliefMap.set(claim.id, (0, beliefEngine_1.initializeBelief)(claim.id));
    return claim;
}
function addEvidence(claimId, evidence, supports) {
    const belief = beliefMap.get(claimId);
    if (!belief)
        throw new Error("Belief not initialized");
    const updated = (0, beliefEngine_1.updateBelief)(belief, evidence, supports);
    beliefMap.set(claimId, updated);
    return updated;
}
function getBelief(claimId) {
    return beliefMap.get(claimId);
}
