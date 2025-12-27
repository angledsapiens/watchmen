import { BaselineSnapshot } from "../types"

const store = new Map<string, BaselineSnapshot>()

function keyOf(source: string, signal: string, window: string) {
  return `${source}::${signal}::${window}`
}

export const BaselineStore = {
  set(snapshot: BaselineSnapshot) {
    store.set(keyOf(snapshot.source, snapshot.signal, snapshot.window), snapshot)
  },

  get(source: string, signal: string, window: string) {
    return store.get(keyOf(source, signal, window)) ?? null
  },

  list() {
    return Array.from(store.values())
  }
}
