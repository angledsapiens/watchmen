import { storage } from "../storage/sqlite";

export function summarizeEpisodicToTemporal(
  subjectIdentifier: string,
  startTs: number,
  endTs: number
) {
  const rows = storage.getMany<any>(
    `
    SELECT * FROM episodic
    WHERE ts BETWEEN ? AND ?
      AND json_extract(subject, '$.identifier') = ?
    `,
    [startTs, endTs, subjectIdentifier]
  );

  if (rows.length === 0) return null;

  const values = rows
    .map((r: any) => JSON.parse(r.payload))
    .map((p: any) => Object.values(p)[0])
    .filter((v: any) => typeof v === "number");

  const mean =
    values.reduce((a: number, b: number) => a + b, 0) / values.length;

  const id = `temporal-${Date.now()}`;

  storage.run(
    `
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
    `,
    [
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
      JSON.stringify(rows.map((r: any) => r.id)),
      JSON.stringify({ system: "wm-01", version: "0.1" }),
      1.0,
      null,
    ]
  );

  return id;
}
