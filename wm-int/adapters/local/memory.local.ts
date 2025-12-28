import type { MemoryAdapter, MemoryEntry, MemoryWriteResult } from "@contracts/index";

const inMemoryStore: MemoryEntry[] = [];

export const LocalMemoryAdapter: MemoryAdapter = {
  async write(entry: MemoryEntry): Promise<MemoryWriteResult> {
    inMemoryStore.push(entry);
    return { stored: true };
  },
};
