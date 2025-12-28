import { updateBaselines } from "./baselines/baselineEngine";

export * from "./public";

async function main() {
  await updateBaselines("example_source", "example_signal");
  console.log("WM-02 baseline update complete");
}

main();
