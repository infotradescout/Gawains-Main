# Review Rules

## Non-Negotiable Arbitrator Rule

Gemini is the arbitrator and adversarial objector for workflow safety.

Gawain must never send Codex an implementation prompt for a repo lane until Gemini has reviewed the proposed lane plan and returned Pass or objections.

This rule applies across all workflows and all repos.

```text
No Gemini objector pass = no Codex execution.
No review evidence = no Gemini implementation review.
No Gemini implementation pass = no merge instruction.
```

## Full Workflow Loop

```text
1. Gawain drafts lane scope and Codex prompt.
2. Gawain sends Gemini a pre-flight objector packet.
3. Gemini returns Pass or Object.
4. Gawain reconciles objections and revises the Codex prompt.
5. Codex executes only the approved lane in the correct repo.
6. Codex returns checkpoint.
7. Gawain obtains bounded review evidence.
8. Gawain sends Gemini implementation review packet with evidence.
9. Gemini returns Pass or Fail.
10. Gawain reconciles.
11. Codex performs the repo-local merge only after Gawain gives the merge instruction.
```

Skipping Gemini at either stage is a workflow violation.

## Pre-Flight Objector Packet Requirements

Every pre-Codex Gemini packet must include:

1. Repo
2. Current main or baseline SHA
3. Completed relevant lanes
4. Proposed lane name
5. Proposed branch name
6. Proposed commit message
7. Goal
8. Doctrine constraints
9. Allowed files
10. Banned files
11. Required implementation steps
12. Validation plan
13. Explicit objector questions
14. Required Gemini output format

## Gemini Evidence Rule

Gemini cannot see GitHub, the repo, PRs, files, commits, or branches unless Gawain supplies the content.

Every implementation review packet must include:

1. Repo
2. PR / branch / commit
3. Baseline SHA
4. Lane name
5. Files changed
6. Validation reported
7. File disposition, worktree status, validation log, and targeted evidence
8. Doctrine checklist
9. Specific review questions
10. Required Pass/Fail output

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

## Default Evidence Packet

By default, Gemini receives:

- file disposition
- worktree status
- validation log
- lane scope
- targeted notes or excerpts needed to judge the lane

Raw/full diffs are omitted by default. Gawain may explicitly authorize a raw evidence packet for a specific review.

## Merge Rule

Gawain gives the merge instruction only after Gemini implementation review returns Pass.

Codex performs repo-local merge actions. Codex does not grant itself merge authority.
