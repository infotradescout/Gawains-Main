# Gawains-Main

Gawains-Main is the cross-repo command layer for Thomas/Gawain repos.

It is not a product repo and not a source-code mirror. Product repos stay isolated, and Gawains-Main references them through `registry/repos.json`.

## Register Repos

Edit `registry/repos.json`. Each repo entry carries its local path, validation commands, packet roots, brand rules, contamination warnings, and default allowed/banned file scopes.

```bash
npm run repos:list
npm run repo:check -- --repo-key merlin
```

## Create Lane Packets

```bash
npm run lane:create -- --repo-key merlin --branch "governance/example" --lane "Example Lane" --baseline-sha "abc123" --goal "Example goal" --allowed-files "src/**,tests/**" --banned-files "public/**" --validation-commands "npm run check"
```

This writes `LANE_INTAKE.md`, `CODEX_PROMPT.md`, and `STATUS.txt` under `lane-packets/<repo-key>/<lane>/`.

## Create Codex Prompts

```bash
npm run prompt:create -- --repo-key merlin --lane "Example Lane" --goal "Example goal"
```

Codex prompts tell Codex to work in the target repo only, obey repo-specific doctrine, return compact evidence, and close with a clean file disposition.

## Create Review Packets

```bash
npm run packet:create -- --repo-key merlin --branch "governance/example" --lane "Example Lane" --baseline-sha "abc123" --commit-sha "def456" --files-changed "src/example.ts,tests/example.test.ts" --validation-summary "npm run check PASS" --behavior-summary "Example behavior summary" --scope-boundaries "No runtime changes" --risks-checked "No raw diff, clean worktree" --file-disposition "clean" --worktree-status "clean" --review-question "Do you approve commit def456 for merge?"
```

Review packets write to `review-packets/` and create Gemini-ready copies in `exports/gemini/`.

## Gemini Handoff

Gemini receives compact packets only by default. Raw/full diffs are exception-only when Thomas explicitly asks, Gemini specifically requests it, or line-level review is required to resolve a blocker.

Use `exports/gemini/<repo-key>/<lane>/GEMINI_REQUEST.md` for the handoff.

## Drive Sync

Docs, templates, lane packets, review packets, and Gemini exports are safe to sync or copy to Drive. Product repos and live product `.git` folders should not be placed inside Gawains-Main.

## Why Product Repos Stay Out

Gawains-Main is an authority/workflow repo. It stores operating context and generated artifacts, not product implementation source. Keeping product repos separate prevents brand contamination, branch confusion, accidental source mirroring, and unsafe cross-repo edits.

## Merge Readiness

A lane is merge-ready only after:

- Codex validation PASS
- Gawain review PASS
- Gemini review PASS
- clean target repo worktree
- resolved file disposition
- no scope violations
- no brand contamination

No lane may close with untracked or uncommitted files.
