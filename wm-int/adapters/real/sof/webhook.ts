import type { SOFEmitter, SOFEvent } from "@contracts/index";

export function WebhookSOFEmitter(url: string): SOFEmitter {
  return {
    async emit(event: SOFEvent): Promise<void> {
      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(event),
        });
      } catch (err) {
        // Non-fatal by design
        console.warn("SOF webhook failed:", err);
      }
    },
  };
}
