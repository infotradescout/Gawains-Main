# Review Rules

## RoundTable Foundation Boundary

RoundTable is the dispatcher and ledger. It owns parent routing packets, terminal Git state records, markdown/frontmatter packet schema expectations, mechanical safety doctrine, repository boundary records, and time-freshness laws.

RoundTable owns zero execution runtime.

PR #2 must not add SQLite schemas, Discord bot/API code, runtime execution, ephemeral workflow transition storage, Drive or Apps Script adapters, Merlin runtime or transport implementation, product repo behavior, or Albion governance math unless explicitly routed to the proper repo.

## Universal Existing-State Review Gate

Every request routed through RoundTable/Gawain into Codex, Gemini, Merlin, AI Council, or a product repo must begin with an existing-state + context check.

This applies to RoundTable packeting, routing, review, and terminal state recording for code and non-code work. The target repo still owns implementation behavior.

```text
No existing-state/context check = no trusted execution.
```

A packet missing the existing-state/context section defaults to:

```text
FAIL — missing existing-state/context check
```

or, for harmless low-risk work only:

```text
PASS WITH CONDITIONS — existing-state/context check required before apply/send/merge
```

## Time Passage And Status Freshness Review Gate

All status claims are time-bound.

Before a packet or review claims work is done, ready, merged, deployed, validated, accessible, fixed, current, blocked, complete, or still true, it must include:

```text
Status timestamp:
Source of truth checked:
Last-known vs current:
Freshness risk:
Re-check required before:
```

If status was not re-checked, the claim must be labeled as last-known status and must not support approve, merge, deploy, send, apply, close, or mark-complete decisions.

A review packet with stale or missing status freshness defaults to FAIL for authority-sensitive work, or PASS WITH CONDITIONS only when the missing freshness can be corrected before action.

## Non-Negotiable Arbitrator Rule

Gemini is the arbitrator and adversarial objector for workflow safety.

No Gemini status means no merge, no closeout, no "approved," and no "ready."

Gawain must never send Codex an implementation prompt for a repo lane until:

1. Gawain has completed the existing-state + context check.
2. Gemini has reviewed the proposed lane plan and returned Pass or objections when implementation/governance risk exists.

This rule applies to RoundTable-routed workflows and all repos that receive a RoundTable lane packet.

```text
No existing-state check = no Codex execution.
No Gemini objector pass = no Codex execution.
No review evidence = no Gemini implementation review.
No Gemini implementation pass = no merge instruction.
```

## Gemini Status Gate

Every lane or PR packet must include:

```text
geminiStatus:
geminiPreflightRequired:
geminiExecutionAuditRequired:
geminiPreflightResultRef:
geminiExecutionAuditResultRef:
mergeAuthorization:
```

Allowed `geminiStatus` values:

```text
not_required
preflight_pending
preflight_passed
execution_audit_pending
execution_audit_passed
blocked
held_pending_gemini
```

Allowed `mergeAuthorization` values:

```text
blocked
authorized
held_pending_gemini
```

For any lane involving doctrine, governance, workflow, authority, automation, core architecture, execution logic, cross-repo routing, merge authorization, deployment, money/legal commitments, storage/runtime, or product behavior changes:

1. Gemini pre-flight is required before Codex execution.
2. Gemini execution audit is required after Codex execution.
3. Gawain cannot authorize merge unless Gemini execution audit returned PASS or PASS WITH CONDITIONS with conditions explicitly resolved.
4. If Gemini is unavailable, the lane must be marked `held_pending_gemini`.
5. GitHub mergeability, tests passing, Codex confidence, or Gawain review cannot substitute for Gemini PASS.

Validation rule:

- Missing `geminiStatus` on a merge-ready packet defaults to FAIL.
- `preflight_pending`, `execution_audit_pending`, `blocked`, or `held_pending_gemini` on a merge-ready packet defaults to FAIL.
- "ready," "approved," or "merge authorized" language without `geminiStatus: execution_audit_passed` defaults to FAIL.
- If the Gemini channel/tool is unavailable, `geminiStatus` must be `held_pending_gemini`.
- `geminiStatus: not_required` is allowed only for explicitly standard, non-core, non-governance, non-runtime, non-product, non-deployment lanes.

## Full Workflow Loop

```text
1. Human request enters RoundTable/Gawain routing.
2. RoundTable/Gawain performs existing-state + context check.
3. Gawain drafts lane scope and Codex prompt.
4. Gawain sends Gemini a pre-flight objector packet when implementation/governance risk exists.
5. Gemini returns Pass or Object.
6. Gawain reconciles objections and revises the Codex prompt.
7. Codex executes only the approved lane in the correct repo.
8. Codex returns checkpoint.
9. Gawain obtains bounded review evidence.
10. Gawain sends Gemini implementation review packet with evidence when required.
11. Gemini returns Pass or Fail.
12. Gawain reconciles.
13. Required human / Knight approval is recorded when governance requires it.
14. Codex performs the repo-local merge only after Gawain gives the merge instruction.
```

Skipping the existing-state check or Gemini at either required stage is a workflow violation.

## Pre-Flight Objector Packet Requirements

Every pre-Codex Gemini packet must include:

1. Repo
2. Current main or baseline SHA
3. Completed relevant lanes
4. Existing-state/context findings
5. Working capability to preserve
6. Proposed lane name
7. Proposed branch name
8. Proposed commit message
9. Goal
10. Doctrine constraints
11. Allowed files
12. Banned files
13. Required implementation steps
14. Validation plan
15. Explicit objector questions
16. Required Gemini output format

## Gemini Evidence Rule

Gemini cannot see GitHub, the repo, PRs, files, commits, or branches unless Gawain supplies the content.

Every implementation review packet must include:

1. Repo
2. PR / branch / commit
3. Baseline SHA
4. Lane name
5. Status timestamp and source of truth checked
6. Last-known vs current classification
7. Freshness risk and re-check requirement
8. Existing-state/context findings
9. Working capability preserved
10. Conflicts found
11. Assumptions made
12. Files changed
13. Validation reported
14. File disposition, worktree status, validation log, and targeted evidence
15. Doctrine checklist
16. Specific review questions
17. Required Pass/Fail output

## No Summary-Only Reviews

Do not send Gemini only:

```text
PR link
commit SHA
summary
files changed list
test summary
```

That is not reviewable.

Gemini must receive enough existing-state, file disposition, validation, and targeted evidence to judge the lane.

## Default Evidence Packet

By default, Gemini receives:

- existing-state/context findings
- file disposition
- worktree status
- validation log
- lane scope
- working capability preserved
- conflicts found
- assumptions made
- targeted notes or excerpts needed to judge the lane

Raw/full diffs are omitted by default. Gawain may explicitly authorize a raw evidence packet for a specific review.

## Human / AI Authority Rule

AI agents may advise, object, route, draft, review, and preserve records.

AI agents must not fabricate or silently substitute:

- human approval
- Knight approval
- merge approval
- production approval
- legal approval
- Gemini review
- Codex completion
- validation output
- implementation evidence

Where Albion governance requires Knight approval, the 3/3 path remains Gawain + Lancelot + Percival, and human consent remains required when specified by doctrine.

RoundTable records and routes authority state. It does not alter Albion governance math in PR #2.

## KnightActionCard Review Rule

KnightActionCards route detected problems to the right Knight through RoundTable.

They must be evidence-backed, target exactly one Knight/Human pair or `all_three`, and preserve source artifact references for MealScout profile/update cards.

They must not claim execution, production mutation, Discord/bot delivery, GitHub Actions automation, approval, merge, deploy, send, or apply.

P0/P1 KnightActionCards require evidence.

If `doctrineConflict: true`, the card must route to `all_three`, set `requiresThreeKnightEscalation: true`, and remain blocked until 3/3 resolution is recorded.

## Merge Rule

Gawain gives the merge instruction only after Gemini implementation review returns Pass and any required human / Knight approval is recorded.

Codex performs repo-local merge actions. Codex does not grant itself merge authority.

## Repo-Work Packet Rule

No repo change is valid unless a Round Table work packet exists first in `roundtable/active/` or another explicit Round Table control folder.

Every repo-work packet must name the repo, target branch, baseline SHA, visible goal, user problem, acceptance criteria, files or areas to inspect, forbidden changes, validation required, production verification requirement, decision owner, Gemini requirement, status, and timestamps.

No PASS may be recorded without a review packet containing files inspected, files changed, root cause, before/after behavior, validation results, production verification state, remaining risks, and final git status.

No DONE may be recorded for production-facing work unless a production verification record exists and the decision record allows the production claim.
