# Repo Work Control

Round Table / Gawain's Main is the required control window for repo changes across:

- MealScout
- TradeScout
- Sway
- Albion
- Merlin
- AutoBott

Product code still changes inside the target repo. Round Table owns the control record before, during, and after that repo execution.

## Required Workflow

1. Thomas raises the issue in Round Table.
2. Round Table creates a repo-scoped work packet in `roundtable/active/`.
3. Work executes in the target repo on the packet's target branch.
4. The target repo returns a review packet with evidence into `roundtable/review/`.
5. Round Table reviews the evidence against the packet acceptance criteria.
6. Gemini audits when `gemini_required` is true.
7. Round Table records the decision in `roundtable/approved/` or `roundtable/blocked/`.
8. Round Table authorizes merge/deploy only when evidence, required Gemini audit, and required human decision state support it.
9. Round Table records production/user-visible verification when required.
10. Round Table closes the packet in `roundtable/closed/` and updates `roundtable/ledgers/repo-status-ledger.json`.

## Hard Rules

- No repo work without a Round Table packet first.
- No PASS without evidence.
- No DONE without production/user-visible verification when production behavior is involved.
- No fake production claims.
- Repo name must always be explicit.
- Product code does not move into Gawain's Main.
- Round Table cannot authorize merge/deploy from stale status.
- A packet with `gemini_required: true` cannot be merge-authorized without Gemini execution audit evidence.

## Required Work Packet Fields

Validated by `roundtable/schemas/work-packet.schema.json`:

- `packet_id`
- `repo`
- `target_branch`
- `baseline_sha`
- `issue_summary`
- `visible_goal`
- `user_problem`
- `acceptance_criteria`
- `files_or_areas_to_inspect`
- `forbidden_changes`
- `validation_required`
- `production_verification_required`
- `decision_owner`
- `gemini_required`
- `status`
- `created_at`
- `updated_at`

## Required Review Packet Fields

Validated by `roundtable/schemas/review-packet.schema.json`:

- `packet_id`
- `repo`
- `branch`
- `baseline_sha`
- `final_sha`
- `files_inspected`
- `files_changed`
- `root_cause`
- `behavior_before`
- `behavior_after`
- `validation_results`
- `production_verification`
- `remaining_risks`
- `final_git_status`

## Required Decision Record Fields

Validated by `roundtable/schemas/decision-record.schema.json`:

- `packet_id`
- `repo`
- `decision`
- `decided_by`
- `reason`
- `conditions`
- `merge_authorized`
- `deployment_authorized`
- `production_claim_allowed`

## Required Production Verification Fields

Validated by `roundtable/schemas/production-verification.schema.json`:

- `packet_id`
- `repo`
- `url_or_endpoint_checked`
- `deployed_sha_observed`
- `evidence`
- `pass_fail`
- `verified_by`
- `verified_at`

## Repo Status Ledger

The repo status ledger lives at `roundtable/ledgers/repo-status-ledger.json`.

It records, per repo:

- active packet ids
- last closed packet id
- last known branch
- last known sha
- last status
- production verification timestamp

The ledger is not a substitute for a work packet, review packet, decision record, or production verification record.
