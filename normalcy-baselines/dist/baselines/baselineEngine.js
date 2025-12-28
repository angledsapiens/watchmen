"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBaselines = updateBaselines;
const stats_1 = require("./stats");
const windowManager_1 = require("./windowManager");
const memoryReader_1 = require("../adapters/memoryReader");
const baselineStore_1 = require("../store/baselineStore");
const WINDOWS = ["1m", "5m", "15m", "1h", "4h", "24h"];
async function updateBaselines(source, signal) {
    const now = Date.now();
    for (const window of WINDOWS) {
        const since = (0, windowManager_1.getWindowStart)(window, now);
        const events = await (0, memoryReader_1.readMemory)(source, signal, since);
        const values = events.map(e => e.value);
        const stats = (0, stats_1.computeStats)(values);
        if (!stats)
            continue;
        const snapshot = {
            source,
            signal,
            window,
            stats,
            updatedAt: now
        };
        baselineStore_1.BaselineStore.set(snapshot);
    }
}
