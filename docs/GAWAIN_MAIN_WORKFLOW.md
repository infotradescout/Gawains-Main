# Gawain-Main Workflow

Gawain-Main is the command layer for Thomas/Gawain repos. It stores workflow doctrine, registry metadata, lane packets, review packets, and Gemini exports.

It is not a product source mirror. Product repos stay separate and are referenced through `registry/repos.json`.

## Universal Operating Rule

Every request starts with an existing-state + context check before action.

This applies to code and non-code work, including documents, product strategy, screenshots, image intake, reviews, contracts, business workflows, operations, and governance packets.

Required check:

```text
What already exists?
What is already known?
When was status last checked?
Which source of truth was checked?
Is this current or last-known status?
What must be re-checked before approval, merge, apply, send, or close?
What prior decisions constrain this?
What working capability must be preserved?
What conflicts with the request?
What assumptions remain?
What is the smallest aligned next action?
```

## Operating Loop

1. Select a repo or workflow by `--repo-key` when repo work is involved.
2. Confirm the local repo path from `registry/repos.json` when repo work is involved.
3. Complete existing-state + context check.
4. Create a lane packet in `lane-packets/` when a lane is needed.
5. Send Gemini objector packet when implementation or governance risk exists.
6. Run Codex in the target product repo only after the approved prompt exists.
7. Create a review packet in `review-packets/`.
8. Create a Gemini handoff in `exports/gemini/` when implementation review is required.
9. Close only after Codex PASS, Gawain PASS, Gemini PASS when required, required human/Knight signoff when applicable, and a clean target worktree.

## Non-Negotiables

- Do not act from assumption alone when current state can be inspected.
- Do not copy product source into Gawain-Main.
- Do not place live product repos inside Gawain-Main.
- Scripts must resolve product paths from `registry/repos.json`.
- No lane may close with modified, deleted, or untracked files.
- No raw/full diffs go to Gemini by default.
- No agent may invent files, commits, validation logs, metrics, production status, review status, or completed work.
- No stale status claim may support approve, merge, deploy, send, apply, close, or mark-complete decisions.
