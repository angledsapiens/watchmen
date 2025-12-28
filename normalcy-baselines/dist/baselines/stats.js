"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeStats = computeStats;
function computeStats(values) {
    const count = values.length;
    if (count === 0)
        return null;
    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((a, b) => a + b, 0) / count;
    const median = count % 2 === 0
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[Math.floor(count / 2)];
    const min = sorted[0];
    const max = sorted[count - 1];
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);
    const mad = sorted
        .map(v => Math.abs(v - median))
        .sort((a, b) => a - b)[Math.floor(count / 2)];
    const q1 = sorted[Math.floor(count * 0.25)];
    const q3 = sorted[Math.floor(count * 0.75)];
    const iqr = q3 - q1;
    return {
        count,
        mean,
        median,
        min,
        max,
        variance,
        stdDev,
        mad,
        iqr
    };
}
