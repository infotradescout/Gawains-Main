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

## Albion Authority Reference

The Gemini unconditional PASS routing accelerator is derived from Albion doctrine commit `0acafbd4f8f6c74b2262fc86d6d47de4c2ae686c` on branch `doctrine/gemini-pass-routing-accelerator`.

This is a routing accelerator only. It does not grant Gemini merge authority, policy authority, governance authority, Roundtable 3/3 authority, AI Council 3/3 authority, or Merlin execution authority.

## Gemini Unconditional PASS Routing Accelerator

A Gemini or High Court review packet may route directly to Roundtable Dispatch only when all clean PASS criteria are true:

- `verdict` is exactly `PASS`.
- `conditions`, `blockers`, and `warnings` are empty.
- No database/schema migration requirement is present.
- No legal/trust warning is present.
- No authority warning or authority ambiguity is present.
- No merge-risk annotation is present.
- No scope caveat is present.
- No validation uncertainty is present.
- No repo/branch uncertainty is present.
- No Squire, Village, Merlin, or AI Council routing ambiguity is present.
- The target Squire, Village, Merlin, or AI Council route is explicit when the packet needs one.

When every clean PASS criterion is satisfied, the packet may set:

```text
gemini_pass_accelerator.next_hop = roundtable_dispatch
gemini_pass_accelerator.gawain_manual_preflight_required = false
gemini_pass_accelerator.bypasses_gawain_manual_preflight_only = true
```

This bypasses only redundant Gawain manual pre-flight routing validation. It does not bypass Gawain merge instruction authority, required human/Knight approval, Roundtable 3/3, AI Council validation, or any Merlin execution packet requirement.

The accelerator is void and the packet MUST route back to Gawain manual review when any of the following is true:

- Gemini returns `PASS WITH CONDITIONS`, `BLOCK`, or `needs_revision`.
- Any condition, blocker, warning, non-trivial caveat, legal/trust warning, authority ambiguity, database/schema migration requirement, merge-risk annotation, validation uncertainty, repo/branch uncertainty, or routing ambiguity is present.
- The target Squire, Village, Merlin, or AI Council route is missing or unclear.

When the accelerator is void, the packet must set:

```text
gemini_pass_accelerator.next_hop = gawain_manual_review
gemini_pass_accelerator.gawain_manual_preflight_required = true
```

The authority boundary fields must remain false for Gemini PASS acceleration:

```text
gemini_pass_accelerator.merge_authority_created = false
gemini_pass_accelerator.policy_authority_created = false
gemini_pass_accelerator.roundtable_3_of_3_satisfied = false
gemini_pass_accelerator.ai_council_3_of_3_satisfied = false
gemini_pass_accelerator.merlin_execution_authorized = false
```

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
gemini_pass_accelerator
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
