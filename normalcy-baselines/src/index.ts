import { updateBaselines } from "./baselines/baselineEngine"

async function main() {
  await updateBaselines("example_source", "example_signal")
  console.log("WM-02 baseline update complete")
}

main()

