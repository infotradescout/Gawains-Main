# Lane Intake Standard

Every lane starts with a lane packet under `lane-packets/<repo-key>/<lane>/`.

Every lane must begin with Mandatory Phase 0 — Existing-State + Context Check before implementation or review.

Required intake fields:

- Repo key and local path
- Current branch
- Baseline SHA
- Worktree status
- Goal
- Existing-state/context findings
- Existing files, docs, packets, decisions, screenshots, or artifacts inspected
- Working capability to preserve
- Conflicts, gaps, risks, and assumptions
- Allowed files
- Banned files
- Validation plan
- Gemini objector status when applicable

A lane packet missing the existing-state/context section is incomplete and should not be sent to Codex.

Use `node scripts/create-lane-packet.mjs --repo-key <key> --lane <lane>`.
