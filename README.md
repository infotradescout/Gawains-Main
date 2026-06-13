# RoundTable

RoundTable is the lightweight operating index, command layer, and RoundTable for Thomas's product repos.

It is not a product repo. It is not a source-code mirror. It is the dispatcher and ledger for repo summaries, lane maps, active work, review rules, routing queues, minimum change parameters, parent routing packets, terminal Git state records, and Gawain/Codex/Gemini packet handoffs.

RoundTable owns zero execution runtime. It does not own Discord bot code, SQLite schemas, ephemeral workflow state, Drive or Apps Script adapters, Merlin transport, product repo behavior, or Albion governance math unless a future lane explicitly routes that doctrine work to the proper repo.

Use `registry/repos.json` as the live local repo registry. Scripts operate by `--repo-key` and resolve product paths from that registry.

## Core Operating Model

```text
1 VS Code window = 1 repo
1 Codex session = that repo only
Inside each repo = sequential lanes, one branch at a time
Across repos = parallel work
```

## RoundTable Foundation Boundary

PR #2 is capped as the RoundTable foundation lane only.

Allowed in this lane:

- Existing-State Law
- doctrine routing rules
- parent/child lane protocol
- repository boundary matrix
- markdown/frontmatter packet schema expectations
- mechanical safety doctrine
- time-freshness law
- terminal Git state record expectations

Forbidden in this lane:

- SQLite schemas
- Discord bot or API code
- runtime execution
- ephemeral workflow transition storage
- Drive or Apps Script adapters
- Merlin runtime or transport implementation
- MealScout, TradeScout, Sway, AutoBott, or other product repo behavior
- Albion governance math unless explicitly routed through Albion

## Universal Existing-State Law

All RoundTable-routed requests must begin by understanding the existing state before action is routed, packeted, reviewed, merged, sent, applied, or marked complete.

This is a dispatcher/ledger requirement. It records and routes evidence; it does not implement runtime behavior in this repo.

```text
Read reality first.
Preserve what works.
Act only from evidence.
Label assumptions.
Make the smallest aligned move.
Never fake status.
```

No implementation, recommendation, review, document, workflow, plan, intake action, or apply/send/merge decision may proceed from assumption alone when existing context can be inspected.

See `docs/UNIVERSAL_EXISTING_STATE_REQUIREMENT.md`.

## Round Table Model

RoundTable is the real-world Round Table for Albion.

```text
Thomas = human counterpart to Gawain
Levon = human counterpart to Lancelot
Dylan = human counterpart to Percival
```

Human Knights hold absolute authority over AI Knights. AI Personas orchestrate digital workflows and reviews; they do not replace the consent or authority of their Human Counterparts.

See `ROUND_TABLE.md`.

## Authority Model

```text
Gawain = doctrine, scope, routing, correction, merge order
Gemini = arbitrator / adversarial objector / implementation reviewer
Codex = implementation inside one repo/lane after Gemini objector pass
Thomas = final human authority
```

## Non-Negotiable Arbitrator Rule

Gemini must be included before and after Codex execution.

No Gemini status means no merge, no closeout, no "approved," and no "ready."

```text
Gawain performs existing-state + context check
→ Gawain drafts lane
→ Gemini objector reviews scope
→ Gawain reconciles objections
→ Codex executes
→ Codex returns checkpoint
→ Gawain supplies bounded review evidence
→ Gemini reviews implementation
→ Gawain reconciles
→ Codex merges only after Gawain instruction
```

Skipping the existing-state check or Gemini objector step is a workflow violation.

For any lane involving doctrine, governance, workflow, authority, automation, core architecture, execution logic, cross-repo routing, merge authorization, deployment, money/legal commitments, storage/runtime, or product behavior changes:

- Gemini pre-flight is required before Codex execution.
- Gemini execution audit is required after Codex execution.
- Gawain cannot authorize merge unless Gemini execution audit returned PASS or PASS WITH CONDITIONS with conditions explicitly resolved.
- If Gemini is unavailable, the lane is `HELD_PENDING_GEMINI`.
- GitHub mergeability, tests passing, Codex confidence, or Gawain review cannot substitute for Gemini PASS.

## Minimum Change Rule

No repo change proceeds without the minimum parameters needed to reduce drift, hallucinations, branch confusion, and governance mistakes.

See `MINIMUM_CHANGE_PARAMETERS.md`.

## Queue-First Safety Rule

The queue is for non-Thomas requests or changes, partner/team requests, already-made outside changes, unclear requests, and work Thomas chooses to park.

Thomas works the queue. The queue does not block Thomas from giving direct instructions.

```text
Non-Thomas / unclear / partner-submitted
→ queue issue
→ Gawain existing-state + context check
→ Gawain route decision
→ Gemini objector pass when implementation/governance risk exists
→ Codex lane prompt when approved
```

## Source of Truth Rule

Product repos remain the source of truth.

```text
TradeScout code stays in TradeScout
MealScout code stays in MealScout
Sway code stays in Sway
Albion governance stays in Albion
Merlin workflow stays in Merlin
AutoBott code stays in AutoBott
```

This repo stores summaries and operating context only.

## Repo-Work Control Rule

Every repo change must have a Round Table work packet before execution begins.

```text
Thomas raises issue in Round Table
→ Round Table creates repo-scoped work packet
→ work executes in target repo
→ target repo returns review evidence
→ Gemini audits when required
→ Round Table records decision
→ Round Table authorizes merge/deploy
→ Round Table records production/user-visible verification
→ Round Table closes the packet and updates the repo ledger
```

No PASS without evidence. No DONE without production/user-visible verification when production behavior is involved. No fake production claims.

See `docs/REPO_WORK_CONTROL.md` and `roundtable/`.

## Gemini Review Rule

Gemini has no repo, file, PR, or connector access.

Gemini review packets include worktree status, file disposition, validation logs, existing-state/context findings, and targeted evidence. Raw/full diffs are not included by default. Gawain may explicitly authorize a raw evidence packet when needed.

## Command Layer

```bash
npm run check:scripts
node scripts/list-repos.mjs
node scripts/check-repo.mjs --repo-key tradescout
node scripts/check-lane-clean.mjs --repo-key tradescout
node scripts/create-lane-packet.mjs --repo-key tradescout --lane example-lane
node scripts/create-review-packet.mjs --repo-key tradescout --lane example-lane
```

## Connector Rule

When GitHub connector state conflicts with local git, local git is source of truth.

Use local git and browser GitHub for branch/PR creation when connector routing is unreliable.
