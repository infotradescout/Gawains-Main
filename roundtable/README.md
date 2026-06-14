# Round Table Repo-Work Control

Round Table is the required control layer for repo changes across Thomas-owned repos.

Product code stays in its product repo. Round Table stores the control record: work packet, review packet, decision record, production verification, and repo status ledger.

Required folders:

- `inbox/` - incoming repo-work requests before a packet is active
- `active/` - active repo-scoped work packets
- `review/` - completed work evidence returned from target repos
- `approved/` - decision records that authorize merge or deployment
- `blocked/` - records held by missing evidence, failed review, or missing Gemini/human authorization
- `closed/` - completed records after final state and production/user-visible verification are recorded
- `ledgers/` - repo status ledgers
- `schemas/` - JSON schemas for the control records

Hard rules:

- No repo work without a Round Table packet first.
- No PASS without evidence.
- No DONE without production/user-visible verification when production behavior is involved.
- No fake production claims.
- Repo name must always be explicit.
