import type {
  BaselineQuery,
  ClaimInput,
  SOFEvent,
  SOFSubject,
  MemorySubject,
} from "@contracts/index";

import type {
  WatchmenAdapters,
  PipelineContext,
} from "./types";

/* ----------------------------- */
/* Utilities                     */
/* ----------------------------- */

function now(): number {
  return Date.now();
}

function newTraceId(): string {
  return `wm-${now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Explicit semantic adapter:
 * SOFSubject (external, normalized)
 * → MemorySubject (internal, structured)
 */
function sofSubjectToMemorySubject(subject: SOFSubject): MemorySubject {
  switch (subject.kind) {
    case "asset":
      return { kind: "asset", asset: subject.id };

    case "protocol":
      return { kind: "protocol", protocol: subject.id };

    case "address":
      return { kind: "address", address: subject.id };

    case "system":
      return { kind: "system", name: subject.id };

    default: {
      const _exhaustive: never = subject.kind;
      throw new Error(`Unknown SOF subject kind: ${_exhaustive}`);
    }
  }
}


/* ----------------------------- */
/* Orchestrator Pipeline         */
/* ----------------------------- */

/**
 * Core Watchmen orchestration pipeline.
 *
 * Guarantees:
 * - No business logic
 * - Deterministic execution order
 * - Failure isolation
 * - Contract-only interactions
 */
export async function runPipeline(
  adapters: WatchmenAdapters,
  input: {
    baseline_query: BaselineQuery;
    raw_signal: unknown;
  },
  ctx?: Partial<PipelineContext>
): Promise<SOFEvent | null> {
  const context: PipelineContext = {
    trace_id: ctx?.trace_id ?? newTraceId(),
    source_watchman: ctx?.source_watchman ?? "wm-int",
    started_at_ms: ctx?.started_at_ms ?? now(),
  };

  /* ----------------------------- */
  /* Step 1: Baselines (WM-02)     */
  /* ----------------------------- */

  let baseline;
  try {
    baseline = await adapters.baselines.query(input.baseline_query);
  } catch {
    return null;
  }

  /* ----------------------------- */
  /* Step 2: Claims (WM-03)        */
  /* ----------------------------- */

  let evaluation;
  try {
    const claimInput: ClaimInput = {
      metric: input.baseline_query.metric,
      baseline,
      raw_signal: input.raw_signal,
    };

    evaluation = await adapters.claims.evaluate(claimInput);
    if (!evaluation) return null;
  } catch {
    return null;
  }

  /* ----------------------------- */
  /* Step 3: SOF Construction     */
  /* ----------------------------- */

  const sofEvent: SOFEvent = {
    schema_version: "5.0",
    ts_emitted: now(),
    source_watchman: context.source_watchman,

    subject: {
      kind: input.baseline_query.subject.kind,
      id: input.baseline_query.subject.id,
    },

    claim: {
      type: evaluation.claim.type,
      data: evaluation.claim.value,
    },

    confidence: evaluation.confidence,
    severity: evaluation.severity,

    sof_id: `sof-${context.trace_id}`,
  };

  /* ----------------------------- */
  /* Step 4: Emit SOF (WM-05)      */
  /* ----------------------------- */

  try {
    await adapters.sof.emit(sofEvent);
  } catch {
    // Emission failure does not block persistence
  }

  /* ----------------------------- */
  /* Step 5: Persist Memory (WM-01)*/
  /* ----------------------------- */

  try {
    await adapters.memory.write({
      id: sofEvent.sof_id,
      ts_ms: sofEvent.ts_emitted,
      subject: sofSubjectToMemorySubject(sofEvent.subject),
      payload: sofEvent,
      source: context.source_watchman,
    });
  } catch {
    // Memory failure is non-fatal
  }

  return sofEvent;
}
