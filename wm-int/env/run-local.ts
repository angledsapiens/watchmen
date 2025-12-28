import { runPipeline } from "../orchestrator/pipeline";
import { LocalEnvAdapters } from "./local";

async function main() {
  const result = await runPipeline(
    LocalEnvAdapters,
    {
      baseline_query: {
        metric: "dex_liquidity_depth",
        subject: {
          kind: "asset",
          id: "ETH",
        },
      },
      raw_signal: {
        venue: "uniswap_v3",
        depth_change_pct: -35,
      },
    },
    {
      source_watchman: "wm-04-local-agent",
    }
  );

  console.log("\n--- PIPELINE RESULT ---");
  console.dir(result, { depth: null });
}

main().catch(console.error);
