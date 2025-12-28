# WM-INT — Watchmen Integration

## Module Name

WM-INT (Watchmen Integration)

## Purpose

WM-INT is the system-level integration layer that composes independently developed
Watchmen modules into a single, coherent runtime pipeline. It defines contracts,
adapters, orchestration boundaries, and lifecycle coordination without introducing
new analytical or decision-making logic.

This module exists to preserve strict modularity while enabling end-to-end execution,
observability, and deployment of the Watchmen system.

## Explicit Scope

### In Scope

- Cross-module TypeScript contracts
- Adapters between Watchmen modules
- Orchestration of execution flow
- Environment-specific wiring (local, testnet)

### Out of Scope

- Business logic or analytics
- Modification of locked modules
- Storage schemas or belief models
- UI, dashboards, or alerting logic

## Inputs & Outputs

**Inputs**

- Agent signals
- Baseline queries
- Claim evaluation results

**Outputs**

- Standardized SOF events
- Persisted memory entries
- Routed integration artifacts (stdout, webhook, etc.)

## Current Status

**Scaffold Only**
No functional logic implemented yet.
