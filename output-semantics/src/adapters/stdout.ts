import { SemanticOutputFrame } from "../sof/types";

/**
 * Emits a Semantic Output Frame to stdout.
 * No mutation, no validation, no logic.
 */
export function emitToStdout(sof: SemanticOutputFrame): void {
  process.stdout.write(JSON.stringify(sof, null, 2) + "\n");
}
