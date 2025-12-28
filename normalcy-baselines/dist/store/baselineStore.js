"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaselineStore = void 0;
const store = new Map();
function keyOf(source, signal, window) {
    return `${source}::${signal}::${window}`;
}
exports.BaselineStore = {
    set(snapshot) {
        store.set(keyOf(snapshot.source, snapshot.signal, snapshot.window), snapshot);
    },
    get(source, signal, window) {
        return store.get(keyOf(source, signal, window)) ?? null;
    },
    list() {
        return Array.from(store.values());
    }
};
