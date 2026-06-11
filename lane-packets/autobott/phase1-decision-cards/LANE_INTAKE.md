# Lane Intake

Created: 2026-06-11T23:20:39.849Z
Lane ID: autobott-phase1-decision-cards-20260611
Repo: AutoBott (autobott)
Local path: D:\AAATraderCorner\TradeScout\AlpacaTradingbot
Remote: https://github.com/infotradescout/AutoBott.git
Branch: engine/phase1-decision-cards
Baseline SHA: sample-autobott-base
Lane: phase1 decision cards
State: blocked

Multiple active lanes per repo are allowed unless a repo-specific policy blocks it. This lane has its own independent finite state.

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

## Clean Worktree Rule
No lane may close with untracked or uncommitted files. Every file must be committed, deleted, moved to an approved artifact location, or blocked with a named next action and owner.

## Gemini Evidence Rule
Gemini receives compact review packets only by default. Raw/full diffs are exception-only.
