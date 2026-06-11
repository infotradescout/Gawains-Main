# Gawain's Main

Gawain's Main is the lightweight operating index for Thomas's product repos.

It is not a product repo. It is not a source-code mirror. It is the control plane for repo summaries, lane maps, active work, review rules, routing queues, and Gawain/Codex/Gemini execution packets.

## Core Operating Model

```text
1 VS Code window = 1 repo
1 Codex session = that repo only
Inside each repo = sequential lanes, one branch at a time
Across repos = parallel work
```

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
→ Gawain supplies raw diff/full payload
→ Gemini reviews implementation
→ Gawain reconciles
→ Codex merges only after Gawain instruction
```

Skipping the Gemini objector step is a workflow violation.

## Queue-First Safety Rule

If work is large, unclear, risky, cross-repo, Gemini-required, or submitted by anyone other than Thomas, it must become a queued Gawain's Main issue before Codex execution.

```text
Too big / unclear / risky / partner-submitted
→ queue issue
→ Gawain route decision
→ Gemini objector pass
→ Codex lane prompt
```

No direct Codex implementation prompt should be issued for queued work until the route and lane are approved.

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

Every Gemini review packet must include the actual payload:

```text
git show <commit>
```

or:

```text
git diff <base>..<head>
```

or full changed-file contents with enough context to verify doctrine and scope.

No summaries-only Gemini reviews.

## Connector Rule

When GitHub connector state conflicts with local git, local git is source of truth.

Use local git and browser GitHub for branch/PR creation when connector routing is unreliable.
