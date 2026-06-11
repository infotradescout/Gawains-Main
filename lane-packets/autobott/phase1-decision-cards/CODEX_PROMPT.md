# Codex Prompt

Created: 2026-06-11T23:20:39.849Z
Lane ID: autobott-phase1-decision-cards-20260611
Repo: AutoBott (autobott)
Repo path: D:\AAATraderCorner\TradeScout\AlpacaTradingbot
Branch: engine/phase1-decision-cards
Baseline SHA: sample-autobott-base
Lane: phase1 decision cards
State: blocked

## Goal
Sample AutoBott phase1 decision cards validation lane

## Allowed Files
- src/**
- docs/**
- tests/**
- scripts/**

## Banned Files
- registry/**
- lane-packets/**
- review-packets/**
- exports/**

## Validation Commands
- npm run check

## Repo Doctrine And Brand Rules
- Trading/sports only.
- Risk controls required.
- Real validation required.
- No fake backtest/runtime claims.

## Banned Cross-Contamination
- Do not import restaurant, municipal, or venue queue language.
- Do not expand risk claims without validation.

## Clean File Disposition Rule
No lane may close with untracked or uncommitted files. Every file must be committed, deleted, moved to an approved artifact location, or blocked with a named next action and owner.

## Evidence Return Rule
Return compact evidence only by default. Do not include raw/full git diff output unless Thomas explicitly asks, Gemini specifically requests it, or line-level review is required to resolve a blocker.

## Required Codex Return Format
Repo:
Lane:
Branch:
Baseline SHA:
Commit SHA:
Files inspected:
Files changed:
Validation commands:
Validation result:
Behavior summary:
Scope boundaries:
Risks checked:
File disposition:
Final worktree status:
Push status:
Open blockers with owner:
