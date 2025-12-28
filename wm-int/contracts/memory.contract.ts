/**
 * WM-01 Memory Contract
 *
 * Defines the integration-facing interface only.
 * No implementation assumptions allowed.
 */

export interface MemoryWriteRequest {
  id: string;
  ts: number;
  subject: string;
  payload: unknown;
  source: string;
}

export interface MemoryAdapter {
  write(entry: MemoryWriteRequest): Promise<void>;
}
