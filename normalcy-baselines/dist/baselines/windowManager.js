"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowStart = getWindowStart;
const WINDOW_MS = {
    "1m": 60_000,
    "5m": 300_000,
    "15m": 900_000,
    "1h": 3_600_000,
    "4h": 14_400_000,
    "24h": 86_400_000
};
function getWindowStart(window, now = Date.now()) {
    return now - WINDOW_MS[window];
}
