# Clean Worktree Rule

No lane may close with untracked or uncommitted files.

Every file must be:

- committed
- deleted
- moved to an approved artifact location
- blocked with named next action and owner

A repo with unresolved files is not merge-ready.

Clean worktree enforcement applies to the target repo for the lane being merged. A dirty repo can block one lane without automatically blocking unrelated lanes in other repos. No lane may close with unresolved files.

`node scripts/check-lane-clean.mjs --repo-key <key>` exits 0 only when the target repo has a clean `git status --porcelain`.
