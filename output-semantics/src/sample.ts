import { emitSOF } from "./emitters/sof-emitter";
import { emitToStdout } from "./adapters/stdout";

const sof = emitSOF({
  schema_version: "5.0",
  ts_emitted: Date.now(),
  source_watchman: "wm-04-liquidity-agent",

  subject: {
    kind: "asset",
    asset: "ETH"
  },

  claim: {
    type: "liquidity_stress",
    depth_change_pct: -37.5
  },

  confidence: {
    probability: 0.91,
    model_agreement: 0.88,
    data_freshness: 0.96,
    historical_recurrence: 0.72
  },

  severity: "high",

  persistence: {
    expected_half_life_ms: 900_000,
    decay_model: "exponential"
  }
});

emitToStdout(sof);
