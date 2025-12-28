import type {
  BaselinesAdapter,
  ClaimsAdapter,
  MemoryAdapter,
  SOFEmitter,
} from "@contracts/index";

/**
 * All adapters required to run the Watchmen pipeline.
 * No defaults. No globals.
 */
export interface WatchmenAdapters {
  baselines: BaselinesAdapter;
  claims: ClaimsAdapter;
  memory: MemoryAdapter;
  sof: SOFEmitter;
}

/**
 * Minimal execution context propagated through the pipeline.
 */
export interface PipelineContext {
  trace_id: string;
  source_watchman: string;
  started_at_ms: number;
}
