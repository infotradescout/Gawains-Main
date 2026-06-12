# Minimum Change Parameters

No request or repo change should proceed without the minimum parameters needed to reduce AI drift, hallucinations, branch confusion, governance mistakes, and assumption-based execution.

This checklist applies to every product repo, to Gawain's Main itself, and to non-code work routed through Merlin/Gawain/AI Council workflows.

## Universal Phase 0 Requirement

Before any implementation, review, recommendation, document, contract, business workflow, screenshot/image intake action, product decision, or governance packet, the agent must complete an existing-state + context check.

Required Phase 0 fields:

```text
Project / brand / workflow:
Current known state:
Status timestamp:
Source of truth checked:
Last-known vs current:
Freshness risk:
Re-check required before:
Existing artifacts reviewed:
Existing files / docs / screenshots / packets / decisions inspected:
Working capability to preserve:
Prior approvals / rejections / constraints:
Conflicts found:
Gaps / unknowns / risks:
Assumptions being made:
Smallest aligned next action:
```

No implementation should begin from assumptions when existing context is available.

## Time Passage And Status Freshness Requirement

All status claims expire unless refreshed.

Before saying something is done, ready, merged, deployed, validated, accessible, fixed, current, blocked, complete, or still true, the agent must re-check the relevant source of truth or explicitly label the statement as last-known status.

Required wording:

```text
Current check:
Last checked:
Source of truth:
Status freshness:
Assumptions:
```

A stale status claim must not be used to approve, merge, deploy, send, apply, close, or mark work complete.

## Required Before Codex Execution

```text
Requester:
Project / repo:
Local folder:
Goal:
Why it matters:
Lane name:
Branch name:
Baseline SHA:
Current worktree state:
Stash status:
Status timestamp:
Source of truth checked:
Last-known vs current:
Freshness risk:
Re-check required before:
Existing-state + context check:
Working capability to preserve:
Allowed files:
Banned files:
Do-not-touch areas:
Doctrine constraints:
Protected areas touched:
Validation command:
Gemini objector status:
Codex checkpoint requirement:
Review evidence requirement:
Gemini implementation review requirement:
Merge instruction owner:
```

## Worktree State Requirement

Before a lane begins, Codex must report:

```text
git status
git branch --show-current
git stash list
```

Codex must not start a lane when unrelated work is dirty, untracked, or unstashed.

If unrelated work exists, Codex stops and reports it.

## Existing-State Deep Dive Requirement

Before changing files, Codex must inspect the current implementation and identify:

- relevant files, routes, components, tests, docs, schemas, configs, and runtime boundaries
- existing behavior that already satisfies the goal
- existing behavior that partially satisfies the goal
- conflicts with the requested doctrine or scope
- fragile areas that should not be touched
- dead, risky, deprecated, or quarantined surfaces
- tests that already protect the area
- missing tests

Codex must not replace working functionality with a new abstraction unless the existing implementation is proven incompatible.

Prefer minimal aligned changes over broad rewrites.

## Branch Requirement

```text
one lane = one branch
```

Do not stack unrelated work.

## Gemini Objector Requirement

Before Codex execution, Gawain sends Gemini a pre-flight objector packet when implementation is needed or when governance/product risk exists.

The packet must include:

- repo
- baseline SHA
- lane name
- branch name
- goal
- existing-state/context findings
- working capability to preserve
- doctrine constraints
- allowed files
- banned files
- protected areas
- validation plan
- specific objector questions

## Review Evidence Requirement

After Codex returns a checkpoint, Gawain must obtain review evidence before Gemini implementation review.

Default evidence:

```text
existing-state/context findings
file disposition
worktree status
validation log
lane scope
working capability preserved
conflicts found
assumptions made
```

Raw/full diffs are omitted by default and require explicit Gawain authorization.

## Merge Requirement

Codex performs repo-local merge work only after:

1. Gemini implementation review returns Pass.
2. Gawain gives the merge instruction.
3. The expected head SHA is confirmed.
4. Any required human / Knight approval has been explicitly recorded.

## Minimum Return Checkpoint

Every Codex lane must return:

```text
Repo:
Lane chosen:
Branch:
Baseline SHA:
Status timestamp:
Source of truth checked:
Last-known vs current:
Freshness risk:
Re-check required before:
Existing-state deep dive:
Files inspected:
Current behavior found:
Working capability preserved:
Conflicts found:
Gaps / risks / assumptions:
Files changed:
What changed:
Tests run:
Test results:
Commit SHA:
Push status:
PR link if opened:
Final git status:
Risks / follow-up needed:
```

Any checkpoint missing the existing-state deep dive defaults to FAIL or PASS WITH CONDITIONS until corrected.
