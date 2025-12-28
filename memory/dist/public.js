"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertEpisodic = insertEpisodic;
const sqlite_1 = require("./storage/sqlite");
function insertEpisodic(entry) {
    sqlite_1.storage.run(`
    INSERT INTO episodic (id, ts, subject, payload, source)
    VALUES (?, ?, ?, ?, ?)
    `, [
        entry.id,
        entry.ts,
        JSON.stringify(entry.subject),
        JSON.stringify(entry.payload),
        entry.source,
    ]);
}
//# sourceMappingURL=public.js.map