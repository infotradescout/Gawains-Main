# Review Packet Standard

Review packets live under `review-packets/<repo-key>/<lane>/`.

Each packet must include:

- Repo and lane identity
- Branch and baseline SHA
- Status timestamp
- Source of truth checked
- Last-known vs current
- Freshness risk
- Re-check required before
- Existing-state/context findings
- Working capability preserved
- Conflicts, gaps, risks, and assumptions
- File disposition
- Worktree status
- Validation log
- Review notes

Review packets do not include raw/full git diffs by default.

A review packet missing existing-state/context findings or status freshness is incomplete. It should not be treated as review-ready until that section is supplied, except for harmless low-risk work where the missing context can be corrected before apply, send, or merge.
