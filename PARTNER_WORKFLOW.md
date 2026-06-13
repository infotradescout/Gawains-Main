# Partner Workflow

RoundTable may be used by Thomas and approved business partners to route work across attached repos.

## Core Rule

Partners can request work. Partners do not directly redefine doctrine, bypass review, or merge implementation lanes.

```text
Partner asks
→ Gawain routes
→ Gemini objects/pre-flights
→ Codex executes in the correct repo
→ Gemini reviews actual payload
→ Gawain issues correction or merge instruction
```

## Partner Request Types

Partners may submit:

- feature requests
- copy requests
- bug reports
- launch blockers
- workflow improvements
- product strategy notes
- QA observations
- customer/user feedback
- repo-status questions

## Required Partner Request Format

```text
Requester:
Product/System:
Goal:
Why it matters:
Affected user/surface:
Known constraints:
Deadline/urgency:
Evidence/screenshots/links:
Suggested repo, if known:
Do-not-touch areas:
Success criteria:
```

## Gawain Responsibilities

For every partner request, Gawain must:

1. Identify the correct repo.
2. Confirm whether the request is product work, docs work, governance work, or support work.
3. Check repo doctrine.
4. Define a narrow lane.
5. Define allowed and banned files.
6. Build a Gemini pre-flight objector packet.
7. Reconcile Gemini objections.
8. Produce a Codex implementation prompt only after objector pass.
9. Require raw diff/full payload before Gemini implementation review.
10. Authorize merge only after Gemini implementation pass.

## Partner Boundaries

Partners must not:

- request cross-brand copy bleed
- request secrets or `.env` exposure
- request direct production mutation without an approved lane
- bypass contact gates, approval gates, or safety controls
- redefine Albion governance
- ask Codex to merge without Gawain authorization

## Repo Boundaries

```text
TradeScout work goes to TradeScout.
MealScout work goes to MealScout.
Sway work goes to Sway.
Albion work goes to Albion.
Merlin work goes to Merlin.
AutoBott work goes to AutoBott.
```

RoundTable stores the routing record only.
