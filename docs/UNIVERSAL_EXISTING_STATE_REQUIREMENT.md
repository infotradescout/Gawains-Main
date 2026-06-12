# Universal Existing-State Requirement

This is RoundTable foundation doctrine for routed work packets, review packets, terminal state records, and parent/child lane dispatch.

It applies when RoundTable dispatches, records, reviews, or closes work. It does not give RoundTable execution runtime.

## PR #2 Scope Cap

PR #2 is capped as the RoundTable foundation lane only.

RoundTable is the dispatcher and ledger. It owns:

- parent routing packets
- terminal Git state records
- markdown/frontmatter packet schema expectations
- repository boundary matrix
- mechanical safety doctrine
- time-freshness laws
- Existing-State Law
- parent/child routing doctrine

RoundTable does not own:

- SQLite schemas
- Discord bot or API code
- runtime execution
- ephemeral workflow transition storage
- Drive or Apps Script adapters
- Merlin runtime or transport implementation
- MealScout, TradeScout, Sway, AutoBott, or other product repo behavior
- Albion governance math unless explicitly routed through Albion

Runtime, storage, Discord bridge, approval verification, and adapter implementation must be routed into child lanes outside PR #2.

## Core Rule

```text
No request should be executed from assumption alone.
Read reality first. Preserve what works. Act only from evidence. Label assumptions. Make the smallest aligned move. Never fake status.
```

Before RoundTable produces a routing recommendation, prompt, review packet, document packet, workflow packet, lane intake, terminal state record, or parent routing packet, the agent must understand the existing state relevant to the request.

## Applies To

This requirement applies to RoundTable records for:

- Gawain's Main / RoundTable
- parent routing packets
- terminal Git state records
- lane intake packets
- review packets
- Codex lanes
- Gemini reviews
- repo boundary decisions
- documents, contracts, business workflows, screenshot/image intake, product strategy, UI/UX, research, reviews, and operations routed through RoundTable

Product, Merlin, storage, and Albion work remains owned by the target repo. RoundTable may record current state and route child lanes; it must not implement those systems in PR #2.

## Mandatory Phase 0 — Existing-State + Context Check

Before taking action, the agent must identify:

- the project, brand, repo, or workflow this request belongs to
- what is already known
- what already exists
- what has already been built, decided, approved, uploaded, reviewed, rejected, or deferred
- existing artifacts, files, docs, screenshots, packets, commits, validation logs, or decisions reviewed
- existing behavior or working capability that must be preserved
- conflicts with the current request
- gaps, risks, stale assumptions, or unknowns
- what can be safely acted on now
- what must be deferred, quarantined, or sent for review

## Preservation Rule

The agent must preserve working capability by default.

Do not rewrite, rename, delete, abstract, replace, or reroute existing work until the existing state has been inspected and classified.

Preferred order:

```text
1. Read current state
2. Inventory relevant surfaces/artifacts
3. Classify what exists
4. Preserve working capability
5. Identify conflicts and gaps
6. Make the smallest aligned change
7. Return evidence and next action
```

## Evidence Rule

The agent must separate confirmed facts from assumptions.

The agent must not invent:

- files
- commits
- branches
- diffs
- validation output
- test results
- production status
- metrics
- sources
- legal certainty
- user approvals
- human consent
- completed work
- screenshots or image findings not actually inspected

If context is incomplete, the agent should make the best reasonable assumption, label it clearly, and continue unless the missing detail would make the action unsafe, misleading, or useless.

## Time Passage And Status Freshness Law

All status claims are time-sensitive.

Before saying something is done, ready, merged, deployed, validated, accessible, fixed, current, blocked, complete, or still true, the agent must either:

1. Re-check the relevant source of truth and include the check timestamp.
2. Label the statement as last-known status and avoid making an action decision from it.

This applies to repo state, branch state, PR state, validation, deployment, Drive access, Discord packet state, approval state, production status, and agent completion as recorded or routed by RoundTable.

Time passage, new user reports, possible agent activity, possible GitHub/Drive/Discord changes, or any approval/merge/apply/send decision makes freshness relevant.

Required freshness fields:

```text
Status timestamp:
Source of truth checked:
Last-known vs current:
Freshness risk:
Re-check required before:
```

A stale status claim must not support approve, merge, deploy, send, apply, close, or mark-complete decisions.

## Human / GPT / Gemini / Codex Routing

Default RoundTable routed workflow:

```text
Human request
→ RoundTable / Gawain existing-state + context check
→ Gemini objector review when implementation/governance risk exists
→ Gawain reconciles objections
→ Codex executes bounded lane in the target repo only after approval
→ Codex returns evidence packet
→ Gawain reviews evidence
→ Gemini implementation review when required
→ Gawain reconciles
→ human / Knight approval where governance requires it
→ merge/apply/send only after explicit authority
```

Gemini review packets must include enough evidence to review. A summary-only packet is not reviewable.

Codex must not self-authorize scope expansion, merge authority, production changes, human consent, or governance approval.

AI Council advice cannot silently substitute for human Knight approval.

## Review Consequence

Any packet or response missing the required existing-state/context check defaults to:

```text
FAIL — missing existing-state/context check
```

or, for harmless low-risk work:

```text
PASS WITH CONDITIONS — existing-state/context check required before apply/send/merge
```

## Universal Output Standard

Execution-ready outputs should include, when relevant:

- confirmed facts
- assumptions
- existing state reviewed
- working capability preserved
- conflicts or risks found
- minimal aligned action
- validation or review evidence
- status timestamp and source-of-truth freshness when making status claims
- exact next prompt, packet, checklist, draft, or action

The standard is not more process for its own sake. The standard is to prevent AI from acting without reading what is already there.
