# Clean Worktree Rule

No lane may close with target repo changes left untracked, modified, or deleted.

`node scripts/check-lane-clean.mjs --repo-key <key>` fails when `git status --porcelain` reports any output.

This rule applies to product repos and Gawain-Main itself.
