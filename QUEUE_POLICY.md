# Queue Policy

Gawain's Main must be fool-proof for multi-person, multi-agent work.

Any work that is large, ambiguous, cross-repo, doctrine-sensitive, production-sensitive, or submitted by anyone other than Thomas must become a queued issue before Codex execution.

## Non-Negotiable Queue Rule

```text
If the work is too big, unclear, risky, cross-repo, partner-submitted, or requires Gemini arbitration, it goes into the queue first.
```

No direct Codex implementation prompt may be issued until the work is routed, scoped, and arbitrated.

## Changes That Must Become Issues

Create a Gawain's Main issue before execution when any of these are true:

- The request comes from anyone other than Thomas.
- The request affects more than one repo.
- The request changes production behavior.
- The request changes auth, sessions, payments, safety, governance, database schema, contact gates, or deployment flow.
- The request changes product doctrine or public positioning.
- The request is too large to fit in one narrow lane.
- The request needs Gemini pre-flight arbitration.
- The request requires raw diff review before merge.
- The requester is unsure which repo owns the work.
- The change was already made by someone else and needs review before acceptance.
- A partner or teammate reports a desired change without a lane boundary.

## Thomas Exception

Thomas may give direct emergency direction, but Gawain must still route it through:

```text
Gawain scope
→ Gemini objector if implementation is needed
→ Codex lane
→ Gemini implementation review
→ Gawain merge instruction
```

The exception allows urgency. It does not remove review.

## Anyone-But-Thomas Rule

For changes proposed or made by anyone other than Thomas:

```text
No direct merge.
No silent adoption.
No Codex execution without issue.
No Gemini skip.
```

The work must be captured as an issue in Gawain's Main or, if already in a product repo PR, linked from a Gawain's Main issue.

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

If work is larger than one lane, split it into a parent issue and child lane issues.

Parent issue stores the outcome and sequence.

Child issues store executable lanes.

Do not give Codex a parent issue as an implementation prompt.

## Already-Made Changes Rule

If a partner or another ChatGPT/Codex session already made changes:

1. Create or update a Gawain's Main issue.
2. Capture repo, branch, commit, and author/session if known.
3. Require raw diff:
   ```bash
   git diff main...<branch>
   ```
4. Send Gemini implementation review packet.
5. Gawain decides accept, correct, split, or reject.

## Source of Truth

Product repos remain source of truth for code.

Gawain's Main is source of truth for routing, queue state, arbitration status, and cross-repo work memory.
