import crypto from "crypto";

/**
 * Recursively sorts object keys to ensure deterministic JSON.
 * Arrays preserve order.
 */
function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value !== null && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = canonicalize((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }

  return value;
}

/**
 * Computes a deterministic SHA-256 hash over semantic content.
 */
export function hashSemanticContent(
  semanticContent: Record<string, unknown>
): string {
  const canonical = canonicalize(semanticContent);
  const json = JSON.stringify(canonical);

  return crypto.createHash("sha256").update(json).digest("hex");
}
