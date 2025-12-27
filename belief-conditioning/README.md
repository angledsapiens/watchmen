# WM-04 — User-Spawned Watchmen (Belief Conditioning)

## Module Name

WM-04 — User-Spawned Watchmen (Belief Conditioning)

## Purpose

WM-04 enables users to spawn Watchmen instances with explicit, typed belief constraints applied at creation time. These beliefs act as bounded priors that influence downstream adjudication and monitoring without overriding evidence or inference logic.

The module provides a safe compilation layer that converts user-defined beliefs into canonical, machine-usable constraints, ensuring that all beliefs are validated, scoped, and enforced consistently across the Watchmen system.

## Explicit Scope

### What this module DOES

- Accepts user-defined belief definitions at Watchman spawn-time
- Validates beliefs for safety, structure, and correctness
- Compiles beliefs into canonical, typed constraints
- Binds beliefs immutably to a Watchman instance
- Emits structured belief-violation events when contradicted by evidence

### What this module DOES NOT

- Perform inference or decision-making
- Learn, update, or mutate beliefs autonomously
- Write to long-term or episodic memory
- Override WM-02 baselines or WM-03 adjudication
- Suppress alerts or ignore evidence

## Inputs & Outputs (Conceptual)

### Inputs

- Watchman spawn payload
- User-defined belief objects (axioms, priors, preferences, constraints)

### Outputs

- Compiled belief constraints bound to a Watchman context
- Structured belief-violation events for downstream consumers

## Current Status

Baseline implementation complete, type-checked, and verified.
