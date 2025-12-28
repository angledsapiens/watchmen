# Watchmen

Watchmen — Agentic Low-Latency Financial Awareness System

---

## Overview

Watchmen is an agentic system for detecting structural incoherence across financial legos before traditional risk signals appear.

It prioritizes early awareness of relationship breakdowns rather than prediction, scoring, or prescriptive action.

Traditional systems wait for thresholds or extreme events.

Watchmen observes relationships between subsystems and marks when those relationships become historically inconsistent.

Version 1.0 is modular, deterministic, testnet-verified.

---

## What Watchmen Is

- Low latency awareness system
- Relationship based observer
- Produces structured observations
- Designed for independent interpretation

---

## What Watchmen Is Not

- Risk scoring system
- Prediction engine
- Alerting system
- Governance or execution layer

---

## Modules

WM-01 Memory
WM-02 Normalcy and baselines
WM-03 Claims and beliefs
WM-04 User spawned Watchmen
WM-05 Output semantics
WM-INT Integration

---

## Output Format

Watchmen emits Structured Observation Format events.

The format describes what is structurally unusual.
It does not imply urgency or action.

## Prerequisites

Node.js version 16 or higher
npx
ts-node

## Canonical entrypoint

```console
npx ts-node ./env/run-sepolia.ts
```

If this command runs successfully, the system is healthy.

## Example output:

```json
{
  "timestamp": "2025-10-01T12:34:56Z",
  "observation": "incoherent_state",
  "description": "Stable oracle prices concurrent with declining liquidity and rising utilization",
  "historical_precedence": "none",
  "confidence": "structural"
}
The schema is frozen for version 1.0.
```
