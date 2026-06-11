# Connector Policy

## Default

Connect ChatGPT/Gawain to this lightweight repo by default, not every product repo.

## Reason

Connecting all product repos can cause:

- connector lag
- incorrect repo routing
- stale branch detection
- invalid PR head errors
- context bleed across repos

## Source of Truth

Local git is source of truth for:

- branch existence
- commit SHA
- remotes
- worktree status
- raw diff payload

GitHub connector is optional convenience only.

## When Connector Breaks

Use:

```bash
git status
git branch --show-current
git remote -v
git rev-parse HEAD
git log -1 --oneline
git ls-remote --heads origin <branch>
git diff main...<branch>
```

Then paste the raw diff into Gawain for Gemini packet creation.

## Product Repo Access

Only connect a product repo when there is a specific need to inspect it. Disconnect or ignore it after the review if connector lag returns.
