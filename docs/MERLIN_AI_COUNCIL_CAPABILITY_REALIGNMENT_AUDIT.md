# Merlin <-> AI Council Capability Realignment Audit

Status timestamp: 2026-06-12 local audit lane
Source of truth checked: local RoundTable docs, local Merlin repo docs/reports, local Albion/AI Council docs
Last-known vs current: current for local files inspected at audit time; remote PR/GitHub and production state not checked
Freshness risk: re-check all three repos before child-lane implementation, approval, merge, deploy, send, apply, close, or completion claims
Re-check required before: Merlin runtime edits, Albion governance edits, product repo edits, Discord runtime work, approval claims, merge instructions, or production status claims

## Purpose

Merlin and the AI Council capabilities must be compared and realigned because authority and execution boundaries can drift over time.

The suspected drift is:

- Merlin language can start sounding like governance authority.
- AI Council language can start sounding like execution/runtime authority.

That drift risks unauthorized execution, fake approval, confused repo ownership, and status claims without evidence.

This audit is a RoundTable routing record only. It does not implement Merlin runtime changes, Albion governance changes, Discord runtime, product behavior, or GitHub/local repo rename work.

## Source-Of-Truth Hierarchy

- Albion governs authority.
- RoundTable routes and records.
- Merlin executes approved actions and reports results.
- AI Council reviews, objects, advises, challenges assumptions, and prepares route options.
- Product repos implement product behavior.
- Human Knights retain required final authority.

## Current-State Inventory

### RoundTable Capability Claims Found

- RoundTable owns parent routing packets, terminal Git state records, markdown/frontmatter packet schema expectations, repository boundary records, mechanical safety doctrine, Existing-State Law, parent/child routing doctrine, and time-freshness law.
- RoundTable owns zero execution runtime.
- RoundTable must not add SQLite schemas, Discord bot/API code, runtime execution, ephemeral workflow transition storage, Drive or Apps Script adapters, Merlin runtime or transport implementation, product repo behavior, or Albion governance math unless routed to the owning repo.
- RoundTable routes requests through Gawain, Gemini, Codex, Merlin, AI Council, and product repos with existing-state and freshness evidence.
- RoundTable records authority state but does not alter Albion governance math.

### Merlin Capabilities Currently Described

From RoundTable docs:

- Merlin is listed as a workflow repo.
- Merlin owns intake plus search, action routing, and execution workflow.
- Merlin workflow stays in Merlin.
- Merlin executes only approved complete routes.
- Merlin runtime or transport implementation is forbidden in RoundTable.

From Merlin local docs/reports:

- Merlin is a controlled action layer for Google Drive, Gmail, Calendar, Stripe, Canva, MealScout, TradeScout, and LISA.
- Merlin turns trusted business intent into safe, auditable actions.
- Merlin action-loop spine is Capture -> Compress -> Remember -> Verify -> Decide -> Execute -> Prove.
- Merlin receives intent, identifies brand lane and KPI, checks source-of-truth context, validates data, selects action type, applies permission/fail-safe rules, executes through connector/tool, writes results back to source of truth, and reports status.
- Merlin permission levels range from read/inspect through destructive or financial-risk action.
- Merlin lanes include intake/action-layer runtime, operator/admin UI, MealScout, TradeScout, tests/contracts, and governance docs.
- Merlin docs define intake upload contracts, Drive folder ingestion, evidence vault structure, action card generation, dry-run/apply approved gates, MealScout batch intake adapter, and TradeScout intake adapter.
- Merlin Drive docs include review queue, Drive file routing, Drive sync/storage, and review-only decision surfaces.
- Merlin report evidence shows upload intent packets require preview and approval, preserve `implementationAllowed: false`, and avoid publish execution in that slice.
- Merlin reports show action cards, batch intake, screenshot processing, OCR/extraction, manual review, dry-run outcomes, profile draft creation, and apply/runtime gates.
- Merlin Discord layer docs say Merlin supplies execution, intake, search, storage, and approved action context; Discord dispatch is approval-gated and not authority by itself.

### AI Council / Albion Capabilities Currently Described

From RoundTable docs:

- AI Council may advise, object, route, and record.
- AI Council advice cannot silently substitute for human Knight approval.
- Gawain, Lancelot, and Percival unanimous 3/3 is required where Albion governance requires Knight approval.
- Human Knights hold absolute authority over AI Knights.

From Albion / AI Council local docs:

- Albion is the full Kingdom operating system.
- AI Council is the doctrine, governance, packet, and local execution surface for Albion.
- AI Council organizes, challenges, and prepares routes.
- Knights approve or deny.
- High Court is advisory only.
- Guinevere is advisory/specialist review only and cannot approve merges, execute code, bypass Gemini review, or make governance decisions.
- RoundTable is the final authority when approval is required.
- RoundTable 3/3 is required for AI strategy, AI agent behavior, AI authority, AI execution, AI safety, AI-governance changes, production release, cross-Kingdom access, pricing/business model changes, security-sensitive changes, legal/commercial changes, irreversible data changes, public customer-facing promises, and core Albion law changes.
- Single sponsor is allowed for intake packet cleanup, Kingdom-local planning, documentation drafts, non-release research, constituent onboarding, and backlog organization.
- Single sponsor or 2/3 authority is never sufficient for AI-related decisions.
- Merlin is the OR / Operational Router inside Albion and executes approved routes only.
- Merlin cannot invent missing facts, approve final authority, or override Knights.
- Dispatch Tower classifies routes before Merlin execution.
- Albion run/queue implementation has approval action packet, run ledger, private command surface, evidence packet preview, export review contract, and Merlin handoff preview surfaces.

## Corrected Capability Matrix

| Capability | Current Merlin claim | Current AI Council claim | Correct owner | Allowed / forbidden / conditional | Risk | Required correction | Owning repo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Intake | Intake upload contracts, capture, file/event ingestion, batch intake | Dispatch categories include `intake_needed`; AI Council may gather information | Merlin for runtime intake; Albion for governance classification | Conditional | AI Council could appear to perform runtime intake | Keep AI Council to classification/evidence gathering; route runtime intake to Merlin | Merlin / Albion |
| Search | Merlin listed as Intake + Search and has search routes | AI Council gathers evidence and prepares options | Merlin | Allowed for Merlin after routing | Council may be treated as search runtime | Mark AI Council research as advisory evidence gathering, not runtime search service | Merlin / Albion |
| File/screenshot processing | Merlin screenshot/OCR, Drive file extraction, batch processing reports | AI Council has evidence law and route prep | Merlin | Allowed after evidence routing and safety gates | Screenshot processing could mutate product records without approval | Keep processing in Merlin; require preview/review/apply gates before mutation | Merlin |
| Evidence extraction | Merlin extraction, compressed context, proof artifacts, Drive evidence | AI Council requires evidence and consequence forecast | Merlin extracts; AI Council requires/reviews | Conditional | Evidence requirement may be confused with evidence runtime | Merlin creates evidence packets; AI Council reviews completeness | Merlin / Albion |
| Draft packet creation | Merlin action cards, upload intent packets, review packets | AI Council packet/route preparation | RoundTable routes; Merlin/Albion may draft within scope | Conditional | Packet authorship could imply authority | Label draft packets as non-approval artifacts until authority path passes | RoundTable / Merlin / Albion |
| Action card creation | Merlin action card generation, decision cards, approval routing | Albion has approval action packet queue | Merlin for operational action cards; Albion for governance approval packets | Conditional | Action cards could be mistaken for approval | Require explicit approval state and owner fields on action cards | Merlin / Albion |
| Runtime execution | Merlin execution layer, connector adapters, apply approved gates | Albion says Merlin executes approved routes only | Merlin | Conditional: only after approved complete route | Unauthorized execution if approval is inferred | Merlin must reject incomplete/unapproved routes and report block | Merlin |
| Drive/storage sync | Merlin Drive sync/storage/review/routing docs | Albion evidence packets may reference Drive previews | Merlin for Drive runtime; Albion for evidence law | Conditional | AI Council could mutate Drive/storage | Keep Drive mutation in Merlin lanes; AI Council may request/review evidence only | Merlin |
| Discord bridge runtime | Merlin RoundTable Discord layer docs define webhook dispatcher | Albion governs authority/approval state | Merlin runtime with Albion/RoundTable approval frame | Conditional | Discord delivery could be treated as approval | Discord carries approved packets only; it is not an authority source | Merlin / RoundTable / Albion |
| Status collection | Merlin reports status, outcomes, replay, audit bundles | Albion evidence law says no evidence, no claim | Merlin collects runtime status; RoundTable records routed status | Conditional | Stale status could drive approval/merge | Require status timestamp, source of truth, freshness classification | Merlin / RoundTable |
| Result reporting | Merlin produces execution receipts, outcome records, proof | AI Council reviews and records consequence/evidence | Merlin reports results; AI Council reviews implications | Conditional | Report may be treated as approval | Separate result receipt from approval decision | Merlin / Albion |
| Approval authority | Merlin approval gates and approval linkage appear in runtime | Knights approve/deny; RoundTable final authority | Albion/RoundTable/Human Knights | Forbidden for Merlin | Fake approval or self-authorization | Merlin can enforce approval gates but not grant approval | Albion / RoundTable |
| Knight consent replacement | Merlin cannot override Knights in Albion docs | AI Council advises/challenges; Knights decide | Human Knights / RoundTable | Forbidden for AI systems | Silent consent substitution | Require explicit Knight approval records | Albion / RoundTable |
| Gemini/Council override | Merlin routes/execution only | Gemini/Council object/review/advice | Gawain/RoundTable reconciliation path | Forbidden for Merlin | Runtime bypasses objections | Merlin receives only reconciled approved routes | RoundTable / Merlin |
| Governance doctrine creation | Merlin has governance docs lane and AI Council mission docs | Albion owns governance doctrine | Albion / RoundTable routing | Forbidden for Merlin runtime; conditional docs only | Merlin docs could author governance law | Route governance law to Albion; Merlin docs may document runtime safety only | Albion / Merlin |
| Merge instruction | Merlin has no merge authority; RoundTable/Gawain controls merge order | Albion docs say Gawain controls merge order | Gawain/RoundTable path | Forbidden for Merlin/AI Council alone | Unauthorized merge | Preserve Gawain merge instruction + Gemini review path | RoundTable |
| Product repo mutation | Merlin may execute through adapters/connectors | AI Council may prepare/review routes | Target product repo via Codex or Merlin adapter only when approved | Conditional | Cross-repo/product mutation without owning lane | Require target repo/adapter ownership and approval path | Product repo / Merlin |
| AI Council review/objection | Merlin docs mention AI Council mission/scoreboard | AI Council organizes, challenges, prepares routes | AI Council/Gemini/High Court according to scope | Allowed for AI Council | Council review may be skipped by runtime | Require review/objection packets before risky lanes | Albion / RoundTable |
| AI Council runtime execution | Merlin executes approved routes | Albion says agents execute inside routing law; private surface has local execution surface wording | Merlin or assigned agent/guild, not Council as authority body | Forbidden unless explicitly assigned as repo-local implementation | Council docs may imply execution authority | Clarify Council prepares/approves/reviews; code in Albion repo is implementation of governance tools, not product/runtime execution authority | Albion |
| Production status claims | Merlin reports status and proof | Albion evidence law: no deploy log, no deployment claim | Source system + RoundTable freshness record | Conditional | Fake production state | Require source-of-truth evidence and timestamp | All repos / RoundTable |

## Merlin Allowed Capabilities

Merlin may own these capabilities inside approved runtime lanes:

- intake
- search
- file/screenshot processing
- evidence extraction
- draft packet creation
- action card creation
- runtime execution after approval
- Drive/storage sync
- Discord bridge runtime later
- status collection
- result reporting

Merlin should execute approved complete routes, enforce approval gates, reject incomplete routes, preserve replay/audit evidence, and report results with source-of-truth freshness.

## Merlin Forbidden Capabilities

Merlin must not own:

- approval authority
- Knight consent replacement
- Gemini/Council override
- governance doctrine creation
- self-authorized execution
- merge/deploy/send without approval
- 3/3 outcome decisions

Merlin may enforce that approval exists. Merlin may not create the approval it needs.

## AI Council Allowed Capabilities

AI Council may own:

- review
- objection
- adversarial challenge
- recommendation
- approval/denial only within defined governance role
- evidence requirement
- unsafe lane block
- routing recommendation

AI Council prepares route options, consequence forecasts, authority concerns, and evidence requirements before RoundTable/Human Knight decisions.

## AI Council Forbidden Capabilities

AI Council must not own:

- runtime execution
- product code mutation
- screenshot processing runtime
- outreach sending
- Drive/storage mutation
- merge/deploy/apply
- production status claims without evidence
- silent approval for human Knights

Governance tooling implemented in the Albion repo must not be described as authority to execute product/runtime work outside the approved route.

## Conditional Capabilities

| Capability | Required context |
| --- | --- |
| Gemini implementation pass | Reviewable evidence packet, file disposition, validation log, existing-state/context findings, status freshness |
| AI Council 3/3 approval | Albion/RoundTable authority packet with Gawain, Lancelot, Percival states and explicit human/Knight path where required |
| Merlin apply action | Approved complete route, current source-of-truth state, consequence forecast, rollback/compensation path, replay/audit logging |
| Discord approval capture | Approval packet already approved; Discord cannot be the sole authority source |
| Codex implementation | Existing-state check, Gemini objector pass where required, allowed/banned files, target repo branch, validation plan |
| Gawain merge recommendation | Gemini implementation pass, required human/Knight approvals, expected head SHA, clean target worktree, fresh PR/branch status |

## Required Repo Routing

- Doctrine-only comparison and routing records are owned by RoundTable.
- Merlin runtime language/code corrections must route to `merlin-os-action-layer`.
- Albion governance doctrine corrections must route to `infotradescout/Albion` / local `AI Council`.
- Product behavior corrections must route to the owning product repo.
- Discord bridge runtime work must route to Merlin unless the change is only RoundTable packet language or Albion authority doctrine.

## Drift Findings

| Finding | Classification | Evidence | Required route |
| --- | --- | --- | --- |
| Merlin docs use "AI Council" mission/owner language around roadmap, thresholds, freezes, and release readiness. | ROUND_TABLE_AMBIGUITY | Merlin mission blueprint describes Council charter and authority-like roadmap/risk thresholds. | RoundTable decides whether this is Merlin product-management language or Albion governance language; likely child docs lane in Merlin and Albion. |
| Merlin has real apply/runtime, Drive routing, screenshot processing, action-card, Discord bridge, and connector surfaces. | MERLIN_RUNTIME_GAP | Merlin docs/reports show action layer, Drive routing, upload intents, screenshot/batch processing, and approved apply gates. | Merlin child lane should verify runtime gates consistently say "enforce approval, not grant approval." |
| Albion docs say AI Council is a "local execution surface" while also saying Merlin executes approved routes only. | AI_COUNCIL_OVERREACH | Albion `REPO_LANES.md` calls AI Council doctrine/governance/packet/local execution surface; Albion control docs limit execution to approved Merlin routes. | Albion child lane should clarify that local execution means governance-tool implementation only, not product/runtime execution authority. |
| Albion private command surface fixtures contain preview approval/export metadata. | ALBION_AUTHORITY_GAP | Albion source preview fields include approval/execution/export metadata and "preview-only approval metadata." | Albion child lane should ensure preview approval metadata cannot be mistaken for live approval. |
| RoundTable current docs already prohibit runtime and governance math changes in RoundTable. | TERMINOLOGY_ONLY | RoundTable foundation boundary and universal requirement are clear. | No RoundTable runtime correction; keep as routing record. |
| Discord layer depends on Merlin operational context and Albion authority frame. | ROUND_TABLE_AMBIGUITY | Merlin Discord doc says Discord carries messages; authority remains RoundTable/Albion/Human Knights. | Future Discord child lane should preserve "message transport, not authority source." |
| Product repo mutation is mentioned through Merlin connector/action loop language. | MERLIN_OVERREACH | Merlin README says execute through connector/tool and write result back to source of truth. | Merlin child lane should require target repo/adapter ownership and approval evidence for product-affecting mutations. |

## Corrected Boundary Summary

```text
Albion governs.
RoundTable routes and records.
AI Council reviews, objects, advises, challenges, and prepares route options.
Human Knights approve where authority requires.
Merlin executes approved complete routes and reports proof.
Product repos own product behavior.
Codex implements bounded repo lanes after approval.
Gemini reviews/objectively challenges with supplied evidence.
Discord transports approved messages only; it does not approve.
```

Merlin can be powerful without being sovereign. AI Council can be authoritative in governance review without being a runtime executor. RoundTable must keep those boundaries visible in parent packets and child-lane routing.

## Next Child Lanes

1. `merlin/docs-runtime-authority-language-audit`
   - Repo: `merlin-os-action-layer`
   - Goal: inspect Merlin docs/code comments for approval/governance wording and replace ambiguous authority claims with "enforce approval gates / execute approved routes only."
   - Banned: runtime behavior changes unless proven necessary.

2. `albion/council-execution-language-clarification`
   - Repo: `infotradescout/Albion`
   - Goal: clarify AI Council local execution surface as governance-tool implementation, not product/runtime authority.
   - Banned: changing 3/3 math or Knight authority.

3. `merlin/approval-gate-runtime-verification`
   - Repo: `merlin-os-action-layer`
   - Goal: verify that apply/send/Drive/Discord/product-affecting routes reject missing approval and produce proof instead of fake status.
   - Banned: adding new runtime surfaces.

4. `roundtable/parent-packet-capability-boundary-template`
   - Repo: RoundTable
   - Goal: add an optional parent-packet field for capability owner, authority owner, runtime owner, and approval source when cross-repo lanes involve Merlin or Albion.
   - Banned: Merlin runtime and Albion governance implementation.

5. `discord/approval-transport-boundary-later`
   - Repo: Merlin unless later routed otherwise.
   - Goal: future-only audit that Discord bridge transports approved packets and cannot create approval.
   - Banned: Discord runtime until explicitly approved.

## Non-Goals Preserved

- No Merlin runtime implementation in RoundTable.
- No Albion governance law change in RoundTable.
- No product repo changes.
- No Discord runtime changes.
- No RoundTable rename work.
- No approval authority created by this audit.
- No production, GitHub PR, deployment, or live Drive status claimed without a fresh source check.
