# Gemini Handoff Standard

Gemini handoff files live under `exports/gemini/<repo-key>/<lane>/`.

Gemini receives a bounded request with:

- Repo and lane identity
- Branch and baseline SHA
- File disposition
- Validation log
- Worktree status
- Specific PASS/FAIL questions

Raw/full diffs are omitted by default. Add them only when Gawain explicitly authorizes a raw evidence packet.
