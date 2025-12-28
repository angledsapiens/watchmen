import { runPipeline } from "../orchestrator/pipeline";
import { SepoliaEnvAdapters } from "./sepolia";
import { collectWM04Signal } from "../adapters/real/agent.wm04";

async function main() {
  // --- WM-04: collect raw signal (REAL agent) ---
  const agentOutput = await collectWM04Signal({
    metric: "dex_liquidity_depth",
    signal: {
      venue: "sepolia",
      depth_change_pct: -22,
    },
  });

  // --- WM-INT pipeline ---
  const result = await runPipeline(
    SepoliaEnvAdapters,
    {
      baseline_query: {
        metric: agentOutput.metric,
        subject: {
          kind: "asset",
          id: "ETH",
        },
      },
      raw_signal: agentOutput.raw_signal,
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
