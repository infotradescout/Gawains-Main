# RoundTable Workflow

RoundTable is the dispatcher and ledger for Thomas/Gawain repos. It stores workflow doctrine, registry metadata, lane packets, review packets, parent routing packets, terminal Git state records, and Gemini exports.

It is not a product source mirror. Product repos stay separate and are referenced through `registry/repos.json`.

## Foundation Lane Cap

PR #2 is capped as the RoundTable foundation lane only.

RoundTable owns parent/child routing doctrine, repository boundary records, markdown/frontmatter packet expectations, mechanical safety doctrine, time-freshness laws, and terminal Git state record expectations.

RoundTable owns zero execution runtime. This workflow must not add SQLite schemas, Discord bot/API code, runtime execution, ephemeral workflow transition storage, Drive or Apps Script adapters, Merlin transport, product repo behavior, MealScout storage implementation, or Albion governance math.

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

## Gemini Status Gate

No Gemini status means no merge, no closeout, no "approved," and no "ready."

Required packet fields:

```text
geminiStatus:
geminiPreflightRequired:
geminiExecutionAuditRequired:
geminiPreflightResultRef:
geminiExecutionAuditResultRef:
mergeAuthorization:
```

Merge authorization remains blocked until `geminiStatus: execution_audit_passed`, except for explicitly standard, non-core, non-governance, non-runtime, non-product, non-deployment lanes marked `geminiStatus: not_required`.

## Non-Negotiables

- Do not act from assumption alone when current state can be inspected.
- Do not copy product source into RoundTable.
- Do not place live product repos inside RoundTable.
- Scripts must resolve product paths from `registry/repos.json`.
- No lane may close with modified, deleted, or untracked files.
- No raw/full diffs go to Gemini by default.
- No agent may invent files, commits, validation logs, metrics, production status, review status, or completed work.
- No stale status claim may support approve, merge, deploy, send, apply, close, or mark-complete decisions.
