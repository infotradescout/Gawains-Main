# Universal Existing-State Requirement

This is a global Merlin / Gawain / AI Council operating law.

It applies to every request made through Merlin or otherwise, not only code-building.

## Core Rule

```text
No request should be executed from assumption alone.
Read reality first. Preserve what works. Act only from evidence. Label assumptions. Make the smallest aligned move. Never fake status.
```

Before producing a recommendation, prompt, review, document, workflow, plan, intake action, code change, business decision, image/screenshot processing step, contract draft, or AI Council packet, the agent must understand the existing state relevant to the request.

## Applies To

This requirement applies across:

- Merlin
- Gawain's Main
- AI Council workflows
- Albion-adjacent governance workflows
- Codex lanes
- Gemini reviews
- TradeScout
- MealScout
- Sway
- AutoBott / Trader's Corner
- CodeScout
- documents, contracts, business workflows, screenshot/image intake, product strategy, UI/UX, research, reviews, and operations

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

## Human / GPT / Gemini / Codex Routing

Default routed workflow:

```text
Human request
→ Gawain existing-state + context check
→ Gemini objector review when implementation/governance risk exists
→ Gawain reconciles objections
→ Codex executes bounded lane only after approval
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
- exact next prompt, packet, checklist, draft, or action

The standard is not more process for its own sake. The standard is to prevent AI from acting without reading what is already there.