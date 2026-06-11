# Codex Handoff Standard

Codex executes inside one target repo and one lane at a time.

Codex handoff must include:

- Target repo key and absolute local path
- Lane name
- Branch and baseline SHA
- Allowed and banned files
- Validation command
- Required return checkpoint

Codex must not close a lane until the target repo worktree is clean.
