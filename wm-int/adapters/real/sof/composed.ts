import type { SOFEmitter, SOFEvent } from "@contracts/index";

export function composeSOFEmitters(
  emitters: SOFEmitter[]
): SOFEmitter {
  return {
    async emit(event: SOFEvent): Promise<void> {
      await Promise.allSettled(
        emitters.map((e) => e.emit(event))
      );
    },
  };
}
