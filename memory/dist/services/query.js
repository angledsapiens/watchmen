"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEpisodicById = getEpisodicById;
exports.listEpisodic = listEpisodic;
exports.listTemporal = listTemporal;
exports.listSemantic = listSemantic;
exports.listNarrative = listNarrative;
const sqlite_1 = require("../storage/sqlite");
function getEpisodicById(id) {
    return sqlite_1.storage.getOne("SELECT * FROM episodic WHERE id = ?", [id]);
}
function listEpisodic(limit = 100) {
    return sqlite_1.storage.getMany("SELECT * FROM episodic ORDER BY ts DESC LIMIT ?", [limit]);
}
function listTemporal(limit = 100) {
    return sqlite_1.storage.getMany("SELECT * FROM temporal ORDER BY window DESC LIMIT ?", [limit]);
}
function listSemantic(limit = 100) {
    return sqlite_1.storage.getMany("SELECT * FROM semantic ORDER BY updated_ts DESC LIMIT ?", [limit]);
}
function listNarrative(limit = 100) {
    return sqlite_1.storage.getMany("SELECT * FROM narrative ORDER BY created_ts DESC LIMIT ?", [limit]);
}
//# sourceMappingURL=query.js.map