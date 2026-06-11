# Gawains-Main Workflow

Gawains-Main is the cross-repo command layer for Thomas/Gawain repos. It coordinates all repos by `registry/repos.json`; it does not replace product repos and does not contain product source code.

Gawains-Main is a multi-lane highway control center, not a linear queue. Multiple repo lanes can be active at once, and each lane moves independently through a finite state machine.

Gawains-Main creates:

- lane packets in `lane-packets/`
- Codex prompts in lane packet folders
- compact review packets in `review-packets/`
- Gemini handoff files in `exports/gemini/`

## Operating Rules

- Product repos remain isolated.
- Product paths come from `registry/repos.json`.
- No live product repo belongs inside Gawains-Main.
- Each repo can have zero, one, or multiple active lanes unless repo-specific policy blocks it.
- Blocked lanes do not block unrelated lanes.
- Completed lanes exit the active board as complete records.
- Thomas/Gawain applies authority where the decision board indicates it is needed, not at every mechanical step.
- Gemini receives compact review packets only by default.
- Raw/full diffs are exception-only when Thomas explicitly asks, Gemini specifically requests it, or line-level review is required to resolve a blocker.
- No lane may close with untracked or uncommitted files.
- Every file must be committed, deleted, moved to an approved artifact location, or blocked with named next action and owner.

## Merge Readiness

Merge readiness requires Codex validation PASS, Gawain review PASS, Gemini review PASS, a clean target repo worktree, resolved file disposition, no scope violations, and no brand contamination.
