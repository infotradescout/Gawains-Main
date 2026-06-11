# Gawains-Main Workflow

Gawains-Main is the cross-repo command layer for Thomas/Gawain repos. It coordinates all repos by `registry/repos.json`; it does not replace product repos and does not contain product source code.

Gawains-Main creates:

- lane packets in `lane-packets/`
- Codex prompts in lane packet folders
- compact review packets in `review-packets/`
- Gemini handoff files in `exports/gemini/`

## Operating Rules

- Product repos remain isolated.
- Product paths come from `registry/repos.json`.
- No live product repo belongs inside Gawains-Main.
- Gemini receives compact review packets only by default.
- Raw/full diffs are exception-only when Thomas explicitly asks, Gemini specifically requests it, or line-level review is required to resolve a blocker.
- No lane may close with untracked or uncommitted files.
- Every file must be committed, deleted, moved to an approved artifact location, or blocked with named next action and owner.

## Merge Readiness

Merge readiness requires Codex validation PASS, Gawain review PASS, Gemini review PASS, a clean target repo worktree, resolved file disposition, no scope violations, and no brand contamination.
