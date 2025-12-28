import type { SOFEmitter, SOFEvent } from "@contracts/index";

export const StdoutSOFEmitter: SOFEmitter = {
  async emit(event: SOFEvent): Promise<void> {
    console.log("\n=== WATCHMEN SOF EVENT ===");
    console.log(JSON.stringify(event, null, 2));
  },
};
