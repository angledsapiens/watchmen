import type { BaselinesAdapter, BaselineQuery, BaselineResult } from "@contracts/index";

export const LocalBaselinesAdapter: BaselinesAdapter = {
  async query(q: BaselineQuery): Promise<BaselineResult> {
    return {
      baseline_value: 100,
      current_value: 135,
      deviation_pct: 35,
      z_score: 2.1,
      updated_at_ms: Date.now(),
    };
  },
};
