import { runPipeline } from "../orchestrator/pipeline";
import { SepoliaEnvAdapters } from "./sepolia";

async function main() {
  const result = await runPipeline(
    SepoliaEnvAdapters,
    {
      baseline_query: {
        metric: "dex_liquidity_depth",
        subject: {
          kind: "asset",
          id: "ETH",
        },
      },
      raw_signal: {
        venue: "sepolia",
        depth_change_pct: -22,
      },
    },
    {
      source_watchman: "wm-04-sepolia-agent",
    }
  );

  console.log("\n--- PIPELINE RESULT (SEPOLIA) ---");
  console.dir(result, { depth: null });
}

main().catch((err) => {
  console.error("Sepolia run failed:", err);
  process.exit(1);
});
