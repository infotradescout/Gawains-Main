# Queue Policy

RoundTable must be fool-proof for multi-person, multi-agent work.

The queue exists for work not directly initiated by Thomas, work already changed by someone else, partner/team requests, unclear requests, large work that Thomas chooses to park, and changes that need later routing.

Thomas works the queue. The queue does not block Thomas from giving direct instructions.

## Project Revisit Rule

When a project is revisited, Gawain must check that project's queue before starting a new lane.

Queued work for that project becomes the next work considered by default.

Thomas can change the order at any time with an explicit direction.

```text
Project revisited
→ check project queue
→ surface queued items
→ Thomas chooses continue queue / override / close / split
→ Gawain routes the chosen lane
```

## Thomas Override Clause

Direct IRL instructions from Thomas bypass all queue ordering.

Gawain must check the queue first, but an explicit human override dictates immediate execution.

The queue is the default fallback execution order, not a blocker for Thomas directives.

## Thomas Direct-Action Rule

When Thomas gives a direct instruction, Gawain should route it immediately instead of creating a queue issue by default.

```text
Thomas direct instruction
→ Gawain route decision
→ Gemini objector if implementation is needed
→ Codex lane prompt
→ Codex checkpoint
→ Gemini implementation review
→ Gawain merge instruction
```

Thomas may choose to put something in the queue, but the queue is not mandatory for Thomas-originated work.

## Non-Thomas Queue Rule

```text
If the request or change is not from Thomas, it goes into the queue first.
```

This includes:

- partner requests
- teammate requests
- another ChatGPT session's proposal
- another Codex session's change
- already-made changes by anyone other than Thomas
- unclear ownership requests
- requests with no lane boundary

## Changes That Must Become Issues

Create a RoundTable issue before execution when any of these are true:

- The request comes from anyone other than Thomas.
- The change was already made by anyone other than Thomas.
- A partner or teammate reports a desired change without a lane boundary.
- The requester is unsure which repo owns the work.
- Thomas explicitly says to put the work in the queue.
- The work is too large and Thomas wants it split or parked.

## Protected Work Still Requires Review

Direct Thomas instructions do not require a queue issue, but protected implementation still follows the review loop:

```text
Gawain scope
→ Gemini objector if implementation is needed
→ Codex lane
→ raw diff/full payload
→ Gemini implementation review
→ Gawain merge instruction
```

Protected areas include:

- auth
- sessions
- payments
- safety
- governance
- database schema
- contact gates
- deployment flow
- public product positioning

## Anyone-But-Thomas Rule

For changes proposed or made by anyone other than Thomas:

```text
No direct merge.
No silent adoption.
No Codex execution without issue.
No Gemini skip.
```

The work must be captured as an issue in RoundTable or, if already in a product repo PR, linked from a RoundTable issue.

## Queue States

Use these states in issue titles or labels:

- `intake` — request received, not routed
- `needs-route` — product/repo not decided
- `needs-gemini-objector` — lane prompt needs pre-flight review
- `ready-for-codex` — Gemini objector passed and prompt is ready
- `codex-running` — implementation underway
- `needs-raw-diff` — checkpoint returned, evidence needed
- `needs-gemini-review` — implementation payload ready for Gemini
- `needs-correction` — Gemini failed or objected
- `ready-to-merge` — Gemini passed and Gawain authorized merge
- `merged` — complete
- `blocked` — cannot proceed
- `stale` — needs re-evaluation before execution
- `closed` — intentionally removed from active queue

## Required Issue Fields

Every queued work item must include:

```text
Requester:
Requester role:
Product/system:
Suspected repo:
Goal:
Why it matters:
Affected surfaces:
Risk level:
Does this touch auth/session/payment/safety/governance/schema/contact/deploy?
Known files, if any:
Do-not-touch areas:
Evidence/links/screenshots:
Success criteria:
Needed by:
Gawain route decision:
Gemini objector status:
Codex branch:
Implementation review status:
Merge status:
```

## Large Work Rule

If work is larger than one lane and Thomas chooses to queue it, split it into a parent issue and child lane issues.

Parent issue stores the outcome and sequence.

Child issues store executable lanes.

Do not give Codex a parent issue as an implementation prompt.

## Stale Queue Rule

Stale or repeatedly bypassed queue items must be re-evaluated, closed, split, or reaffirmed.

Do not let stale work linger indefinitely as fake priority.

## Already-Made Changes Rule

If a partner, teammate, or another ChatGPT/Codex session already made changes:

1. Create or update a RoundTable issue.
2. Capture repo, branch, commit, and author/session if known.
3. Require raw diff:
   ```bash
   git diff main...<branch>
   ```
4. Send Gemini implementation review packet.
5. Gawain decides accept, correct, split, or reject.

## Source of Truth

Product repos remain source of truth for code.

RoundTable is source of truth for routing, queue state, arbitration status, and cross-repo work memory.
