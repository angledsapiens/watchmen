"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestEpisodic = ingestEpisodic;
const sqlite_1 = require("../storage/sqlite");
function ingestEpisodic(obs) {
    sqlite_1.storage.run(`
    INSERT INTO episodic (
      id,
      ts,
      block_ref,
      kind,
      subject,
      payload,
      units,
      source,
      provenance,
      confidence,
      refs,
      hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        obs.id,
        obs.ts,
        JSON.stringify(obs.block_ref),
        obs.kind,
        JSON.stringify(obs.subject),
        JSON.stringify(obs.payload),
        JSON.stringify(obs.units ?? null),
        JSON.stringify(obs.source),
        JSON.stringify(obs.provenance),
        obs.confidence,
        JSON.stringify(obs.refs),
        obs.hash ?? null,
    ]);
}
//# sourceMappingURL=ingest.js.map