import type { WatchmenAdapters } from "../orchestrator/types";

import { WM01MemoryAdapter } from "../adapters/real/memory.wm01";

import {
  StdoutSOFEmitter,
  WebhookSOFEmitter,
} from "../adapters/real/sof";
import { composeSOFEmitters } from "../adapters/real/sof/composed";

import { LocalBaselinesAdapter } from "../adapters/local/baselines.local";
import { LocalClaimsAdapter } from "../adapters/local/claims.local";

const sofEmitter = composeSOFEmitters([
  StdoutSOFEmitter,
  ...(process.env.SOF_WEBHOOK_URL
    ? [WebhookSOFEmitter(process.env.SOF_WEBHOOK_URL)]
    : []),
]);

export const SepoliaEnvAdapters: WatchmenAdapters = {
  baselines: LocalBaselinesAdapter, // still stub
  claims: LocalClaimsAdapter,       // still stub
  memory: WM01MemoryAdapter,        // REAL
  sof: sofEmitter,                  // REAL
};
