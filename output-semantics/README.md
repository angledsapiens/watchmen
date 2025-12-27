# WM-05 - Output Semantics

## Module Name

WM-04 — Output Semantics

## Purpose

WM-05 - Output Semantics defines the canonical way Watchmen expresses its internal beliefs
to the outside world. It converts internal cognitive state into structured, validated,
deterministic outputs that can be safely consumed by humans, machines, and downstream
systems.

This module does not perform detection, scoring, alerting, or action. It exists solely
to standardize _meaning_ and guarantee that Watchmen outputs are stable, interpretable,
and verifiable over time.

---

## Explicit Scope

### What this module DOES

- Defines the **Semantic Output Frame (SOF)** schema
- Enforces runtime validation via JSON Schema
- Produces deterministic, content-addressed outputs
- Guarantees immutability and semantic integrity
- Provides adapter boundaries (e.g. stdout)

### What this module DOES NOT do

- Detect anomalies or risks
- Decide severity thresholds or actions
- Route notifications or alerts
- Perform policy or execution logic
- Store, persist, or replay outputs

---

## Inputs & Outputs

### Inputs

- Semantic beliefs from upstream Watchmen agents
  (subject, claim, confidence, severity, persistence)

### Outputs

- A fully-formed **Semantic Output Frame (SOF v5.0)**:
  - Schema-validated
  - Deterministically hashed
  - Integrity-wrapped
  - Ready for downstream consumption

This module is transport-agnostic and consumer-agnostic.

---

## Current Status

- Schema version: `v5.0`
- JSON-Schema draft: `2020-12`
- Breaking changes require a new major schema version
- Implementation verified via end-to-end sample emission

No functional changes are planned (for now)
