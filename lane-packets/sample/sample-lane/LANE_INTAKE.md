# Lane Intake

Created: 2026-06-11T23:21:56.321Z
Lane ID: merlin-sample-lane-20260611
Repo: Merlin (merlin)
Local path: D:\AAATraderCorner\TradeScout\merlin-os-action-layer
Remote: https://github.com/infotradescout/merlin-os-action-layer.git
Branch: governance/example
Baseline SHA: abc123
Lane: sample-lane
State: scoped

Multiple active lanes per repo are allowed unless a repo-specific policy blocks it. This lane has its own independent finite state.

## Goal
Example control-layer lane

## Allowed Files
- src/**
- tests/**

## Banned Files
- public/**
- server/**

## Validation Commands
- npm run check

## Repo Doctrine And Brand Rules
- Intake + Search.
- Evidence-linked.
- No fake execution claims.
- Drafts and action cards require review/approval before apply.

## Banned Cross-Contamination
- Do not claim product repo changes were applied unless validated in that repo.
- Do not mix Albion approval doctrine into runtime claims.

## Clean Worktree Rule
No lane may close with untracked or uncommitted files. Every file must be committed, deleted, moved to an approved artifact location, or blocked with a named next action and owner.

## Gemini Evidence Rule
Gemini receives compact review packets only by default. Raw/full diffs are exception-only.
