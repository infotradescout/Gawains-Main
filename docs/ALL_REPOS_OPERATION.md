# All Repos Operation

## Step 1: Register Repo

Add or update the repo in `registry/repos.json`. Include local path, default branch, validation commands, packet roots, brand rules, contamination warnings, and default file scopes.

## Step 2: Check Repo

```bash
node scripts/check-repo.mjs --repo-key merlin
```

## Step 3: Create Lane Packet

```bash
node scripts/create-lane-packet.mjs --repo-key merlin --branch "governance/example" --lane "Example Lane" --baseline-sha "abc123" --goal "Example goal" --allowed-files "src/**,tests/**" --banned-files "public/**,server/**" --validation-commands "npm run check"
```

## Step 4: Give Prompt To Codex

Use `lane-packets/<repo-key>/<lane>/CODEX_PROMPT.md`.

## Step 5: Codex Returns Compact Evidence

Codex works in the target repo only and returns compact evidence, not raw/full diffs by default.

## Step 6: Check Clean

```bash
node scripts/check-lane-clean.mjs --repo-key merlin
```

## Step 7: Create Review Packet

```bash
node scripts/create-review-packet.mjs --repo-key merlin --branch "governance/example" --lane "Example Lane" --baseline-sha "abc123" --commit-sha "def456" --files-changed "src/example.ts,tests/example.test.ts" --validation-summary "npm run check PASS" --behavior-summary "Example behavior summary" --scope-boundaries "No runtime changes" --risks-checked "No raw diff, clean worktree" --file-disposition "clean" --worktree-status "clean" --review-question "Do you approve commit def456 for merge?"
```

## Step 8: Gemini Reviews

Gemini reviews `exports/gemini/<repo-key>/<lane>/GEMINI_REQUEST.md`.

## Step 9: Merge

Merge only after Codex PASS, Gawain PASS, Gemini PASS, clean target worktree, resolved file disposition, no scope violations, and no brand contamination.
