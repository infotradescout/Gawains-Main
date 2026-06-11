# Gawain-Main Workflow

Gawain-Main is the command layer for Thomas/Gawain repos. It stores workflow doctrine, registry metadata, lane packets, review packets, and Gemini exports.

It is not a product source mirror. Product repos stay separate and are referenced through `registry/repos.json`.

## Operating Loop

1. Select a repo by `--repo-key`.
2. Confirm the local repo path from `registry/repos.json`.
3. Create a lane packet in `lane-packets/`.
4. Run Codex in the target product repo only.
5. Create a review packet in `review-packets/`.
6. Create a Gemini handoff in `exports/gemini/`.
7. Close only after Codex PASS, Gawain PASS, Gemini PASS, and a clean target worktree.

## Non-Negotiables

- Do not copy product source into Gawain-Main.
- Do not place live product repos inside Gawain-Main.
- Scripts must resolve product paths from `registry/repos.json`.
- No lane may close with modified, deleted, or untracked files.
- No raw/full diffs go to Gemini by default.
