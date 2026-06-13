# Lane Intake

Created: 2026-06-13
Repo: RoundTable (roundtable)
Local path: D:\AAATraderCorner\TradeScout\RoundTable
Lane: canonical-discord-packet-authority-contract
Current branch: roundtable/canonical-discord-contract
Baseline SHA: 99037f04f6f0bd86350a6fe38c69c2b7100b6f02
Worktree status: one pre-existing untracked REVIEW_RULES.old.md; left untouched

## Time Passage + Status Freshness

Status timestamp: 2026-06-13
Source of truth checked: local git status, RoundTable doctrine docs, lane templates, package scripts
Last-known vs current: current as of status timestamp
Freshness risk: re-check required before merge, send, apply, or live Discord activation
Re-check required before: merge, approval claim, live Discord env configuration, live Discord send, or Merlin activation

## Mandatory Phase 0 - Existing-State + Context Check

Project / brand / workflow: RoundTable doctrine and packet contract for Merlin Discord runtime bridge.
Existing artifacts reviewed: ROUND_TABLE.md, docs/REVIEW_PACKET_STANDARD.md, docs/LANE_INTAKE_STANDARD.md, docs/CODEX_HANDOFF_STANDARD.md, docs/MERGE_READINESS_STANDARD.md, lane-packets/roundtable/parent-routing-packet-runtime-storage-split/PARENT_ROUTING_PACKET.md, package.json.
Current behavior found: RoundTable already defines itself as routing, doctrine, and operating record. Parent routing packet already forbids runtime, Discord bot/API code, storage, and product behavior in RoundTable.
Working capability to preserve: RoundTable remains dispatcher, doctrine, packet, and ledger layer only.
Prior approvals / rejections / constraints: Merlin runtime bridge was approved after being kept in Merlin. Discord must not be activated yet.
Conflicts found: RoundTable is not currently listed as a repo key in registry/repos.json; this lane records RoundTable directly under lane-packets/roundtable without modifying registry.
Gaps / risks / assumptions: Gemini preflight remains required because this is authority doctrine. No live Discord env or send is authorized.
Smallest aligned next action: define canonical packet and authority contract only.

## Gemini Status Gate

geminiStatus: preflight_pending
geminiPreflightRequired: yes
geminiExecutionAuditRequired: yes
geminiPreflightResultRef: TBD
geminiExecutionAuditResultRef: TBD
mergeAuthorization: blocked

## Goal

Define the canonical Discord packet shape and authority contract that Merlin's Discord runtime must obey.

## Allowed Files

- docs/ROUNDTABLE_DISCORD_PACKET_AUTHORITY_CONTRACT.md
- templates/ROUNDTABLE_DISCORD_PACKET.template.json
- scripts/check-discord-contract.mjs
- package.json
- lane-packets/roundtable/canonical-discord-packet-authority-contract/*

## Banned Files

- Product repositories
- Merlin runtime files
- Discord webhook secrets
- Discord bot runtime code
- Live Discord send configuration

## Validation Plan

- npm run check:scripts
- npm run check:discord-contract
- git diff --check
