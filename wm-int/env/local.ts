import type { WatchmenAdapters } from "../orchestrator/types";

import {
  LocalBaselinesAdapter,
  LocalClaimsAdapter,
  LocalMemoryAdapter,
  LocalSOFEmitter,
} from "../adapters/local";

export const LocalEnvAdapters: WatchmenAdapters = {
  baselines: LocalBaselinesAdapter,
  claims: LocalClaimsAdapter,
  memory: LocalMemoryAdapter,
  sof: LocalSOFEmitter,
};
