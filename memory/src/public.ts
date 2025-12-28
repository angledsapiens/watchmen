import { storage } from "./storage/sqlite";

export function insertEpisodic(entry: {
  id: string;
  ts: number;
  subject: unknown;
  payload: unknown;
  source: string;
}) {
  storage.run(
    `
    INSERT INTO episodic (id, ts, subject, payload, source)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      entry.id,
      entry.ts,
      JSON.stringify(entry.subject),
      JSON.stringify(entry.payload),
      entry.source,
    ]
  );
}
