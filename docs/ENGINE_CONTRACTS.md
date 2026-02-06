# WhyMBA360 — Engine Contracts

This document defines the **formal interaction rules** between apps and engines.
It is binding. Violations are architectural defects.

---

## 1. Definition of an Engine

An engine is a **domain-owned, isolated computation unit** that:
- Encapsulates business logic
- Owns its data models
- Exposes functionality only via explicit contracts

Engines live under:
/engines/<engine-name>

---

## 2. Allowed Communication

Apps MAY:
- Call engines via HTTP / RPC APIs
- Publish events consumed by engines
- Consume engine outputs via responses or queues

Apps MUST NOT:
- Import engine source code
- Access engine databases directly
- Depend on engine internal models

---

## 3. Contract Surface

Every engine must expose:
- Input DTOs (validated)
- Output DTOs (versioned)
- Error contracts (explicit failure modes)

---

## 4. Sync vs Async Rules

Synchronous:
- User-facing, latency-sensitive requests

Asynchronous:
- Scoring
- Optimization
- Long-running workflows

---

## 5. Versioning

- Non-breaking changes → same version
- Breaking changes → new versioned endpoint
- Old versions are deprecated, not removed

---

## 6. Ownership

- Each engine has a single owner
- Only the owner can approve contract changes
- Apps cannot force engine changes

---

## 7. Enforcement

- No cross-engine imports
- No shared internal models
- CI failure blocks merge
