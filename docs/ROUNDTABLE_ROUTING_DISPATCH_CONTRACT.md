# RoundTable Routing Dispatch Contract

RoundTable owns routing dispatch records. Product repos and Merlin own execution.

This contract defines what must be true before RoundTable may dispatch an approved lane to a target executor after Gemini PASS. It is not runtime code, does not move product code into RoundTable, and does not authorize RoundTable to merge, deploy, send, apply, mutate Drive, call Discord, or mutate product state.

## Ownership Boundary

RoundTable owns:

- Routing dispatch doctrine.
- Dispatch packet shape.
- Preconditions for dispatch after Gemini PASS.
- Evidence references required before dispatch.
- Terminal records that say what was dispatched and why.

Target repos own:

- Source code changes.
- Repo-local branch, commit, merge, and validation work.
- Product behavior and deployment implementation.

Merlin owns:

- Runtime transport and external dispatch integrations when a lane explicitly routes to Merlin.
- Any Discord webhook dispatch or interaction verification under the Discord authority contract.

RoundTable must not contain:

- Product source code.
- Runtime dispatch code.
- Webhook secrets or API tokens.
- Auto-merge, auto-deploy, auto-send, auto-apply, Drive mutation, product mutation, or Discord send behavior.

## Dispatch Eligibility

A RoundTable routing dispatch packet is eligible only when all are true:

- A repo-work packet exists and names the repo explicitly.
- Existing-state/context has been recorded.
- The target repo and branch are explicit.
- The requested action is explicit and bounded.
- Gemini preflight PASS is recorded when `gemini_required` is true.
- For post-implementation dispatch, Gemini execution audit PASS or PASS WITH CONDITIONS is recorded, with conditions resolved.
- Review evidence exists for any implementation claim.
- Production/user-visible verification exists when production behavior is involved.
- Dispatch does not grant RoundTable runtime authority.
- Dispatch does not rely on text fields such as `approvalStatus`, `approvedBy`, or summaries as authority.

## Required Dispatch Packet Shape

A canonical RoundTable routing dispatch packet MUST include:

```text
dispatch_id
packet_id
repo
target_branch
baseline_sha
dispatch_type
requested_action
gemini_status
gemini_result_ref
gawain_decision_ref
review_packet_ref
production_verification_ref
authority_state
execution_owner
no_runtime_execution_by_roundtable
status
created_at
updated_at
```

Allowed `dispatch_type` values:

```text
repo_work
gemini_review
merge_instruction
deployment_instruction
closure_record
merlin_transport
```

Allowed `status` values:

```text
draft
blocked
dispatch_ready
dispatched
closed
```

## Gemini PASS Rule

Gemini PASS is required before RoundTable may dispatch merge, deployment, or closure for any lane marked `gemini_required: true`.

Allowed `gemini_status` values:

```text
not_required
preflight_pending
preflight_passed
execution_audit_pending
execution_audit_passed
pass_with_conditions_resolved
blocked
held_pending_gemini
```

Dispatch is blocked when `gemini_status` is:

```text
preflight_pending
execution_audit_pending
blocked
held_pending_gemini
```

## Authority State

The `authority_state` object must say:

- who authorized the dispatch,
- whether human authority is required,
- whether Gemini is required,
- whether merge is authorized,
- whether deployment is authorized,
- whether production claim is allowed.

RoundTable may record authority state. It must not invent it.

## Terminal Evidence

After a dispatch is acted on by the execution owner, RoundTable must receive or record terminal evidence before closing the dispatch.

Terminal evidence should include:

- dispatch id,
- packet id,
- repo,
- execution owner,
- action attempted,
- action result,
- final SHA when repo state changed,
- validation result,
- production verification result when applicable,
- final git status when applicable.

## Prohibited Outcomes

This contract does not authorize:

- RoundTable runtime dispatch.
- RoundTable product repo mutation.
- RoundTable Discord send.
- Auto-merge.
- Auto-deploy.
- Auto-send.
- Auto-apply.
- Approval by text fields.
- Production claims without production/user-visible verification.
