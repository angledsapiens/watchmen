import type {
  MemoryAdapter,
  MemoryEntry,
  MemoryWriteResult,
} from "@contracts/index";

// Side-effect import: initializes WM-01 (runs migrations)
import "@watchmen/memory";

import { insertEpisodic } from "@watchmen/memory";

/**
 * WM-01 Memory Adapter
 * Proper ES module export.
 */
export const WM01MemoryAdapter: MemoryAdapter = {
  async write(entry: MemoryEntry): Promise<MemoryWriteResult> {
    insertEpisodic({
      id: entry.id,
      ts: entry.ts_ms,
      subject: entry.subject,
      payload: entry.payload,
      source: entry.source,
    });

    return { stored: true };
  },
};
