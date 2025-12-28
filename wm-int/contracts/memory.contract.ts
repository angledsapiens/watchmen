/**
 * WM-01 Memory — Integration Contract
 * Authoritative for all writes into Watchmen memory.
 */

export type MemorySubject =
  | { kind: "asset"; asset: string }
  | { kind: "protocol"; protocol: string }
  | { kind: "address"; address: string }
  | { kind: "system"; name: string };

export interface MemoryEntry {
  id: string;                // deterministic or content-hash
  ts_ms: number;             // epoch millis
  subject: MemorySubject;
  payload: unknown;          // opaque to WM-INT
  source: string;            // watchman / adapter id
}

export interface MemoryWriteResult {
  stored: boolean;
  deduped?: boolean;
}

export interface MemoryAdapter {
  write(entry: MemoryEntry): Promise<MemoryWriteResult>;
}
