# Lane Intake

Created: 2026-06-11T23:20:39.912Z
Lane ID: mealscout-clean-affiliate-runtime-20260611
Repo: MealScout (mealscout)
Local path: D:\AAATraderCorner\TradeScout\MealScout
Remote: https://github.com/infotradescout/MealScout.git
Branch: runtime/clean-affiliate-runtime
Baseline SHA: sample-mealscout-base
Lane: clean affiliate runtime
State: needs_gemini_review

Multiple active lanes per repo are allowed unless a repo-specific policy blocks it. This lane has its own independent finite state.

## Goal
Sample MealScout clean affiliate runtime review lane

## Allowed Files
- src/**
- app/**
- client/**
- server/**
- tests/**
- docs/**

## Banned Files
- registry/**
- lane-packets/**
- review-packets/**
- exports/**

## Validation Commands
- npm run check

## Repo Doctrine And Brand Rules
- Restaurants/trucks.
- Menus, schedules, profiles, onboarding, affiliate tracking.
- Clean affiliate/referral URLs.
- Food truck addresses are business/admin evidence unless owner-confirmed as public location.

## Banned Cross-Contamination
- Do not import TradeScout Direct Connect positioning.
- Do not import Sway venue queue terminology unless explicitly approved.

## Clean Worktree Rule
No lane may close with untracked or uncommitted files. Every file must be committed, deleted, moved to an approved artifact location, or blocked with a named next action and owner.

## Gemini Evidence Rule
Gemini receives compact review packets only by default. Raw/full diffs are exception-only.
