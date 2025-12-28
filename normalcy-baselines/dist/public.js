"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBaseline = queryBaseline;
const baselineStore_1 = require("./store/baselineStore");
/**
 * Read-only baseline query API for integration.
 * Does NOT trigger updates.
 */
async function queryBaseline(input) {
    // WM-02 keys baselines as (source, signal, window)
    // Integration mapping:
    //   subject.id -> source
    //   metric     -> signal
    const source = input.subject.id;
    const signal = input.metric;
    // Choose a window explicitly (default = 15m)
    const window = input.window ?? "15m";
    const snapshot = baselineStore_1.BaselineStore.get(source, signal, window);
    if (!snapshot) {
        return {
            baseline_value: null,
            current_value: null,
            deviation_pct: null,
            z_score: null,
            updated_at_ms: Date.now(),
        };
    }
    return {
        baseline_value: snapshot.stats.mean,
        current_value: snapshot.stats.mean,
        deviation_pct: null,
        z_score: null,
        updated_at_ms: snapshot.updatedAt,
    };
}
