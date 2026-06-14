# Knight Action Card Contract

RoundTable owns KnightActionCard doctrine, routing rules, packet records, and disposition records.

Merlin owns detector jobs, extraction, classification, normalization, and preparation of source-backed problem packets when a lane routes that runtime work to Merlin.

Product systems such as MealScout, TradeScout, Sway, Albion, and AutoBott execute only through their approved safe paths after RoundTable records the required disposition and authority.

This is a schema and routing contract. It is not runtime delivery, bot automation, GitHub Actions automation, Discord execution, or production mutation.

## Problem Delivery Model

```text
System/source detects issue
-> Merlin extracts/classifies
-> RoundTable routes to correct Knight
-> Knight ChatGPT receives/presents Action Card
-> Knight approves/fixes/blocks/escalates
-> RoundTable records disposition
-> Merlin/MealScout/etc. executes only if allowed
```

The system should bring exceptions to the right Knight. Knights should not need to search repos, chats, Drive, dashboards, or product systems to discover what needs attention.

## Authority Doctrine

Thomas/Gawain, Dylan/Percival, and Levon/Lancelot have equal operational authority for aligned owner-level direction.

Knight inputs are owner-level operational direction when aligned with existing law.

A single Knight cannot override existing law, doctrine, authority boundaries, safety rules, or locked workflow protocol.

If a Knight instruction contradicts existing law, RoundTable must stop execution, mark the conflict, escalate to all 3 Knights, and require 3/3 resolution before applying the conflicting instruction.

## Canonical Packet Shape

A canonical KnightActionCard MUST include:

```text
packetId
packetType
createdAt
sourceSystem
sourceAgent
targetSystem
targetKnight
targetHuman
priority
problemType
entityRef
summary
whyThisMatters
requestedAction
allowedResponses
evidence
blockedBy
productionApplied
requiresThreeKnightEscalation
doctrineConflict
routingReason
noExecutionClaim
```

The packet MAY include:

```text
responseDueBy
relatedPackets
doctrineRefs
sourceKnight
sourceHuman
updateIntent
```

Required field meanings:

- `packetId`: stable unique RoundTable packet identifier.
- `packetType`: must be `knight_action_card`.
- `createdAt`: ISO timestamp from the source packet or RoundTable creation step.
- `sourceSystem`: system where the issue was detected.
- `sourceAgent`: detector or preparing agent, usually Merlin.
- `targetSystem`: system that will receive any later safe-path execution.
- `targetKnight`: `Gawain`, `Lancelot`, `Percival`, or `all_three`.
- `targetHuman`: `Thomas`, `Levon`, `Dylan`, or `all_three`.
- `priority`: `P0`, `P1`, `P2`, or `P3`.
- `problemType`: stable classifier used for routing and reporting.
- `entityRef`: business, profile, repo, lane, packet, or artifact reference.
- `summary`: concise problem statement.
- `whyThisMatters`: user/public/operator impact.
- `requestedAction`: exact decision or response requested from the Knight.
- `allowedResponses`: bounded response options.
- `evidence`: source-backed facts, current values, candidate values, artifacts, or validation output.
- `blockedBy`: missing authority, missing evidence, doctrine conflict, or other blocker.
- `productionApplied`: must default to `false`; action cards do not claim production mutation.
- `requiresThreeKnightEscalation`: whether the card requires all-three review before action.
- `doctrineConflict`: whether the request contradicts existing law, doctrine, safety rules, authority boundaries, or locked workflow protocol.
- `routingReason`: why RoundTable routed the card to that Knight or all-three escalation.
- `noExecutionClaim`: must be `true`; KnightActionCards do not execute, apply, send, merge, deploy, or mutate.
- `sourceKnight`: for Knight-origin MealScout profile update routing, the originating AI Knight: `Gawain`, `Lancelot`, or `Percival`.
- `sourceHuman`: for Knight-origin MealScout profile update routing, the originating human Knight: `Thomas`, `Levon`, or `Dylan`.
- `updateIntent`: for MealScout truck profile update routing, the structured update class such as menu, schedule, logo, cover, social links, contact correction, or profile correction.

## MealScout Truck Profile Update Handoff

Merlin-generated `truck_profile_update` KnightActionCards are RoundTable routing packets for owner-style MealScout profile updates. They are not loose evidence cards, and they do not apply production changes.

Valid Knight-origin source pairs are:

- Thomas/Gawain
- Dylan/Percival
- Levon/Lancelot

A `truck_profile_update` card MUST preserve:

- source Knight and human pair
- target product, usually `MealScout`
- update intent
- source artifact references
- extracted or normalized candidate fields
- confidence and currentness evidence
- whether the source is owner-submitted-equivalent
- `productionApplied: false`
- verification requirements before any product safe-apply path

RoundTable routes the resulting card by what decision is needed:

- technical safe-apply, schema, geocode, or validation questions route to Gawain/Thomas
- owner confirmation, social links, contact changes, or currentness questions route to Lancelot/Levon
- logos, covers, visual profile polish, or asset quality questions route to Percival/Dylan
- doctrine conflicts, authority boundary conflicts, or mixed high-risk public trust questions route to `all_three`

## Routing Doctrine

RoundTable routes KnightActionCards by problem type and authority fit.

### Gawain / Thomas

Route to Gawain/Thomas for:

- technical failures
- repo or validation failures
- production apply safety
- database, schema, API, or profile behavior questions
- Packet Truth Reconciliation conflicts
- geocode/apply lanes that require technical execution review

### Lancelot / Levon

Route to Lancelot/Levon for:

- owner outreach
- owner confirmation requests
- partnership or business contact
- social/profile verification
- ambiguous public-source approval
- replacing non-blank owner-facing contact or social fields when doctrine requires confirmation

### Percival / Dylan

Route to Percival/Dylan for:

- logos
- covers
- public presentation
- profile polish
- merchandising or visual cleanup
- asset quality decisions

### All 3 Knights

Route to `all_three` for:

- conflict with existing law
- doctrine change
- authority boundary issue
- safety conflict
- one Knight contradicts locked system rules
- high-risk public trust decision
- any card where `doctrineConflict: true`

If `doctrineConflict` is true, `targetKnight` and `targetHuman` must both be `all_three`, and `requiresThreeKnightEscalation` must be true.

## Delivery Prompt Contract

When a Knight ChatGPT receives a KnightActionCard, it should present:

1. Decision needed
2. Evidence
3. Why it matters
4. Allowed responses
5. Whether the Knight can approve alone
6. Whether escalation is required

If the Knight responds naturally, the Knight ChatGPT should convert the answer into a structured RoundTable response packet.

If the answer contradicts locked doctrine, do not execute. Mark `doctrineConflict: true` and escalate to all 3 Knights.

If the card is not for that Knight role, route it back to RoundTable.

## Prohibited Outcomes

KnightActionCards do not authorize:

- runtime delivery implementation in RoundTable
- Discord/bot automation
- GitHub Actions automation
- production mutation
- product repo mutation
- auto-apply, auto-send, auto-merge, or auto-deploy
- execution claims
- approval by free-form text outside a structured response packet
