# Gemini Handoff Standard

Gemini gets compact packets only by default. No full/raw diff is included by default.

Gemini reviews one compact packet per lane. No lane receives raw/full diff by default.

Gemini can request targeted file content or a targeted diff only if needed to resolve a specific blocker.

Every Gemini request must include:

- repo
- branch
- lane
- baseline SHA
- commit SHA
- files changed
- validation summary
- behavior summary
- scope boundaries
- risks checked
- file disposition
- worktree status
- review question

Raw diffs are exception-only when Thomas explicitly asks, Gemini specifically requests it, or line-level review is required to resolve a blocker.
