// belief-conditioning/validator.ts

import { UserBelief } from "./schema";

export class BeliefValidator {
  validate(beliefs: UserBelief[]): void {
    if (!Array.isArray(beliefs)) {
      throw new Error("Beliefs must be an array");
    }

    this.ensureUniqueIds(beliefs);

    for (const belief of beliefs) {
      this.validateRequiredFields(belief);
      this.validateConfidence(belief);
      this.rejectUnsafeStatements(belief.statement);
    }
  }

  private ensureUniqueIds(beliefs: UserBelief[]) {
    const seen = new Set<string>();
    for (const b of beliefs) {
      if (seen.has(b.id)) {
        throw new Error(`Duplicate belief id detected: ${b.id}`);
      }
      seen.add(b.id);
    }
  }

  private validateRequiredFields(b: UserBelief) {
    if (!b.id || !b.type || !b.statement) {
      throw new Error("Belief missing required fields");
    }
  }

  private validateConfidence(b: UserBelief) {
    if (b.type !== "axiom") {
      if (typeof b.confidence !== "number") {
        throw new Error(`Belief ${b.id} requires confidence`);
      }
      if (b.confidence < 0 || b.confidence > 1) {
        throw new Error(`Belief ${b.id} confidence must be between 0 and 1`);
      }
    }
  }

  private rejectUnsafeStatements(statement: string) {
    const forbiddenPatterns = [
      /ignore\s+evidence/i,
      /always\s+believe/i,
      /never\s+alert/i,
      /override\s+wm-\d+/i,
      /disable\s+checks/i,
      /self\s*referential/i,
    ];

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(statement)) {
        throw new Error(`Unsafe belief statement rejected: ${statement}`);
      }
    }
  }
}
