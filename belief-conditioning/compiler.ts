// belief-conditioning/compiler.ts

import { UserBelief, BeliefType } from "./schema";

export interface CompiledBelief {
  beliefId: string;
  type: BeliefType;
  weight: number;
  scope: string[];
  decayPolicy: "none" | "evidence_based";
  violationAction: "log" | "alert" | "escalate";
}

export class BeliefCompiler {
  compile(belief: UserBelief): CompiledBelief {
    return {
      beliefId: belief.id,
      type: belief.type,
      weight: this.computeWeight(belief),
      scope: belief.scope ?? [],
      decayPolicy: belief.type === "axiom" ? "none" : "evidence_based",
      violationAction: this.defaultViolationAction(belief.type),
    };
  }

  private computeWeight(b: UserBelief): number {
    switch (b.type) {
      case "axiom":
        return 1.0;

      case "prior":
        return b.confidence!;

      case "preference":
        return b.confidence! * 0.5;

      case "forbidden":
        return Number.POSITIVE_INFINITY;

      case "risk_bias":
        return b.confidence ?? 0.5;

      default:
        return 0;
    }
  }

  private defaultViolationAction(type: BeliefType) {
    switch (type) {
      case "axiom":
      case "forbidden":
        return "escalate";

      case "prior":
        return "alert";

      default:
        return "log";
    }
  }
}
