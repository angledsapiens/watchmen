// belief-conditioning/schema.ts

export type BeliefType =
  | "axiom"
  | "prior"
  | "preference"
  | "forbidden"
  | "risk_bias";

export interface UserBelief {
  id: string;                // unique per Watchman
  type: BeliefType;          // belief category
  statement: string;         // human-readable belief
  confidence?: number;       // 0.0 – 1.0 (required unless axiom)
  scope?: string[];          // domains: price_oracle, lending, dex, etc
}

export interface WatchmanSpawnPayload {
  watchman_id: string;
  beliefs: UserBelief[];
}
