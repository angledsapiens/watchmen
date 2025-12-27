// belief-conditioning/events.ts

export interface BeliefViolationEvent {
  watchmanId: string;
  beliefId: string;
  severity: "low" | "medium" | "high";
  evidenceRef: string;
  ts: number;
}

export function createBeliefViolationEvent(
  watchmanId: string,
  beliefId: string,
  severity: "low" | "medium" | "high",
  evidenceRef: string
): BeliefViolationEvent {
  return {
    watchmanId,
    beliefId,
    severity,
    evidenceRef,
    ts: Date.now(),
  };
}
