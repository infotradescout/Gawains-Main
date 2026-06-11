# Codex Prompt

Created: 2026-06-11T23:20:39.912Z
Lane ID: mealscout-clean-affiliate-runtime-20260611
Repo: MealScout (mealscout)
Repo path: D:\AAATraderCorner\TradeScout\MealScout
Branch: runtime/clean-affiliate-runtime
Baseline SHA: sample-mealscout-base
Lane: clean affiliate runtime
State: needs_gemini_review

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
