"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeEpisodicToTemporal = summarizeEpisodicToTemporal;
const sqlite_1 = require("../storage/sqlite");
function summarizeEpisodicToTemporal(subjectIdentifier, startTs, endTs) {
    const rows = sqlite_1.storage.getMany(`
    SELECT * FROM episodic
    WHERE ts BETWEEN ? AND ?
      AND json_extract(subject, '$.identifier') = ?
    `, [startTs, endTs, subjectIdentifier]);
    if (rows.length === 0)
        return null;
    const values = rows
        .map((r) => JSON.parse(r.payload))
        .map((p) => Object.values(p)[0])
        .filter((v) => typeof v === "number");
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const id = `temporal-${Date.now()}`;
    sqlite_1.storage.run(`
    INSERT INTO temporal (
      id,
      window,
      subject,
      metrics,
      descriptors,
      refs,
      source,
      confidence,
      hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        id,
        JSON.stringify({
            start_ts: startTs,
            end_ts: endTs,
            granularity: "minute",
        }),
        JSON.stringify({ identifier: subjectIdentifier }),
        JSON.stringify([
            { name: "value", aggregation: "mean", value: mean },
        ]),
        JSON.stringify({}),
        JSON.stringify(rows.map((r) => r.id)),
        JSON.stringify({ system: "wm-01", version: "0.1" }),
        1.0,
        null,
    ]);
    return id;
}
//# sourceMappingURL=summarize.js.map