# Lane Intake Standard

Every lane starts with a lane packet under `lane-packets/<repo-key>/<lane>/`.

Every lane must begin with Mandatory Phase 0 — Existing-State + Context Check before implementation or review.

Required intake fields:

- Repo key and local path
- Current branch
- Baseline SHA
- Worktree status
- Status timestamp
- Source of truth checked
- Last-known vs current
- Freshness risk
- Re-check required before
- Goal
- Existing-state/context findings
- Existing files, docs, packets, decisions, screenshots, or artifacts inspected
- Working capability to preserve
- Conflicts, gaps, risks, and assumptions
- Allowed files
- Banned files
- Validation plan
- geminiStatus
- geminiPreflightRequired
- geminiExecutionAuditRequired
- geminiPreflightResultRef
- geminiExecutionAuditResultRef
- mergeAuthorization

A lane packet missing the existing-state/context section or Gemini status fields is incomplete and should not be sent to Codex.

Use `geminiStatus: held_pending_gemini` when Gemini is unavailable. Use `geminiStatus: not_required` only for explicitly standard, non-core, non-governance, non-runtime, non-product, non-deployment lanes.

Use `node scripts/create-lane-packet.mjs --repo-key <key> --lane <lane>`.
