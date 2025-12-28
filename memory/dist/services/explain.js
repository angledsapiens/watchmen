"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explainEpisodic = explainEpisodic;
const sqlite_1 = require("../storage/sqlite");
function getById(table, id) {
    return sqlite_1.storage.getOne(`SELECT * FROM ${table} WHERE id = ?`, [id]);
}
function explainEpisodic(id) {
    const root = getById("episodic", id);
    if (!root)
        return null;
    const refs = [];
    const refIds = JSON.parse(root.refs || "[]");
    for (const refId of refIds) {
        const ref = getById("episodic", refId) ||
            getById("temporal", refId) ||
            getById("semantic", refId) ||
            getById("narrative", refId);
        if (ref)
            refs.push(ref);
    }
    return {
        root,
        refs,
    };
}
//# sourceMappingURL=explain.js.map