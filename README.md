# Gawain's Main

Gawain's Main is the lightweight operating index, command layer, and Round Table for Thomas's product repos.

It is not a product repo. It is not a source-code mirror. It is the control plane for repo summaries, lane maps, active work, review rules, routing queues, minimum change parameters, and Gawain/Codex/Gemini execution packets.

Use `registry/repos.json` as the live local repo registry. Scripts operate by `--repo-key` and resolve product paths from that registry.

## Core Operating Model

```text
1 VS Code window = 1 repo
1 Codex session = that repo only
Inside each repo = sequential lanes, one branch at a time
Across repos = parallel work
```

## Round Table Model

Gawain's Main is the real-world Round Table for Albion.

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

```text
Gawain drafts lane
→ Gemini objector reviews scope
→ Gawain reconciles objections
→ Codex executes
→ Codex returns checkpoint
→ Gawain supplies bounded review evidence
→ Gemini reviews implementation
→ Gawain reconciles
→ Codex merges only after Gawain instruction
```

Skipping the Gemini objector step is a workflow violation.

## Minimum Change Rule

No repo change proceeds without the minimum parameters needed to reduce drift, hallucinations, branch confusion, and governance mistakes.

See `MINIMUM_CHANGE_PARAMETERS.md`.

## Queue-First Safety Rule

The queue is for non-Thomas requests or changes, partner/team requests, already-made outside changes, unclear requests, and work Thomas chooses to park.

Thomas works the queue. The queue does not block Thomas from giving direct instructions.

```text
Non-Thomas / unclear / partner-submitted
→ queue issue
→ Gawain route decision
→ Gemini objector pass
→ Codex lane prompt
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

## Gemini Review Rule

Gemini has no repo, file, PR, or connector access.

Gemini review packets include worktree status, file disposition, validation logs, and targeted evidence. Raw/full diffs are not included by default. Gawain may explicitly authorize a raw evidence packet when needed.

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
