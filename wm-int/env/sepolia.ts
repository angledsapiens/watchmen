import type { WatchmenAdapters } from "../orchestrator/types";

import { WM01MemoryAdapter } from "../adapters/real/memory.wm01";
import { collectWM04Signal } from "../adapters/real/agent.wm04";
import { WM03ClaimsAdapter } from "../adapters/real/claims.wm03";

import {
  StdoutSOFEmitter,
  WebhookSOFEmitter,
} from "../adapters/real/sof";
import { composeSOFEmitters } from "../adapters/real/sof/composed";

import { LocalBaselinesAdapter } from "../adapters/local/baselines.local";
const sofEmitter = composeSOFEmitters([
  StdoutSOFEmitter,
  ...(process.env.SOF_WEBHOOK_URL
    ? [WebhookSOFEmitter(process.env.SOF_WEBHOOK_URL)]
    : []),
]);

export const SepoliaEnvAdapters: WatchmenAdapters = {
  baselines: LocalBaselinesAdapter,
  claims: WM03ClaimsAdapter,
  memory: WM01MemoryAdapter,
  sof: sofEmitter,
};
