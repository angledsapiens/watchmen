/**
 * WM-04 Real Agent (Sepolia-safe)
 * Collects raw signals for Watchmen pipeline.
 */

export type WM04AgentInput = {
  metric: string;
  signal?: {
    depth_change_pct?: number;
    venue?: string;
  };
};

export type WM04AgentOutput = {
  metric: string;
  raw_signal: Record<string, unknown>;
};

export async function collectWM04Signal(
  input: WM04AgentInput
): Promise<WM04AgentOutput> {
  return {
    metric: input.metric,
    raw_signal: {
      depth_change_pct: input.signal?.depth_change_pct ?? 0,
      venue: input.signal?.venue ?? "sepolia",
      ts: Date.now(),
    },
  };
}
