// belief-conditioning/binder.ts

import { CompiledBelief } from "./compiler";

export interface WatchmanContext {
  id: string;
  beliefs: CompiledBelief[];
  spawnedAt: number;
}

export function bindBeliefs(
  watchmanId: string,
  compiledBeliefs: CompiledBelief[]
): WatchmanContext {
  return {
    id: watchmanId,
    beliefs: compiledBeliefs,
    spawnedAt: Date.now(),
  };
}
