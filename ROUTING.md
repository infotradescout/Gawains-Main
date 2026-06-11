# Gawain Routing Gateway

Gawain's Main is the routing gateway for work across attached Thomas-owned repos.

It is not a source-code mirror and it is not a replacement for product repos. It is the place where partners and operators can describe work once, route it to the correct repo, define the lane, preserve doctrine, and produce Codex/Gemini/Gawain packets.

## Routing Rule

```text
Request enters Gawain's Main
→ Gawain identifies the correct product repo
→ Gawain defines the lane and file boundaries
→ Gemini arbitrator reviews the lane before Codex runs
→ Codex executes inside the actual product repo only
→ Codex returns checkpoint
→ Gawain supplies raw diff/full payload to Gemini
→ Gemini reviews implementation
→ Gawain reconciles
→ Codex performs repo-local merge only after Gawain instruction
```

## What Gawain's Main Can Do

Gawain's Main can hold:

- repo summaries
- doctrine summaries
- lane maps
- active-work status
- partner work requests
- Codex prompts
- Gemini objector packets
- Gemini implementation review packets
- merge/correction decisions
- links to PRs, commits, and raw-diff payload locations

## What Gawain's Main Must Not Do

Gawain's Main must not:

- contain product source code
- replace product repos as source of truth
- centralize secrets or `.env` values
- merge product changes directly
- weaken repo-specific doctrine
- bypass Gemini arbitration
- let partners modify attached product repos without route approval

## Partner Routing Model

Partners may use Gawain's Main to submit work requests, but every request must be routed through the same doctrine:

```text
Partner request
→ Gawain route decision
→ Gemini pre-flight objector pass
→ Codex implementation in correct repo
→ Gemini implementation review
→ Gawain merge instruction
```

Partner requests do not bypass Gawain, Gemini, Codex, or repo boundaries.

## Required Routing Fields

Every routed request should identify:

- requester
- target product/system, if known
- desired outcome
- business reason
- urgency
- affected surfaces
- suspected repo, if known
- blocked files or areas
- validation expectation
- whether production behavior could change

## Source-of-Truth Rule

The target product repo remains source of truth for code, tests, runtime behavior, and product-specific doctrine.

Gawain's Main stores route context and review memory only.
