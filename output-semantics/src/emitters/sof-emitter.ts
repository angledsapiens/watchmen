import { SemanticOutputFrame } from "../sof/types";
import { hashSemanticContent } from "../sof/hash";
import { validateSOF } from "../sof/validators";

type EmitterInput = Omit<
  SemanticOutputFrame,
  "sof_id" | "integrity"
>;

/**
 * Assembles and validates a Semantic Output Frame (SOF).
 * Throws if schema validation fails.
 */
export function emitSOF(input: EmitterInput): SemanticOutputFrame {
  const {
    schema_version,
    ts_emitted,
    source_watchman,
    subject,
    claim,
    confidence,
    severity,
    persistence
  } = input;

  // 1. Compute deterministic semantic hash
  const content_hash = hashSemanticContent({
    schema_version,
    ts_emitted,
    source_watchman,
    subject,
    claim,
    confidence,
    severity,
    persistence
  });

  // 2. Assemble SOF
  const sof: SemanticOutputFrame = {
    ...input,
    sof_id: content_hash,
    integrity: {
      content_hash,
      signed_by: "watchman-local",
      signature: "stub-signature"
    }
  };

  // 3. Validate against schema
  const valid = validateSOF(sof);
  if (!valid) {
    throw new Error(
      `SOF schema validation failed:\n${JSON.stringify(
        validateSOF.errors,
        null,
        2
      )}`
    );
  }

  return sof;
}
