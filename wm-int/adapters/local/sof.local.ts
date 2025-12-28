import type { SOFEmitter, SOFEvent } from "@contracts/index";

export const LocalSOFEmitter: SOFEmitter = {
  async emit(event: SOFEvent): Promise<void> {
    console.log("\n--- SOF EVENT ---");
    console.dir(event, { depth: null });
  },
};
