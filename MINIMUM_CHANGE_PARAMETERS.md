# Minimum Change Parameters

No repo change should proceed without the minimum parameters needed to reduce AI drift, hallucinations, branch confusion, and governance mistakes.

This checklist applies to every product repo and to Gawain's Main itself.

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

## Branch Requirement

```text
one lane = one branch
```

Do not stack unrelated work.

## Gemini Objector Requirement

Before Codex execution, Gawain sends Gemini a pre-flight objector packet when implementation is needed.

The packet must include:

- repo
- baseline SHA
- lane name
- branch name
- goal
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
file disposition
worktree status
validation log
lane scope
```

Raw/full diffs are omitted by default and require explicit Gawain authorization.

## Merge Requirement

Codex performs repo-local merge work only after:

1. Gemini implementation review returns Pass.
2. Gawain gives the merge instruction.
3. The expected head SHA is confirmed.

## Minimum Return Checkpoint

Every Codex lane must return:

```text
Repo:
Lane chosen:
Branch:
Baseline SHA:
Files inspected:
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
