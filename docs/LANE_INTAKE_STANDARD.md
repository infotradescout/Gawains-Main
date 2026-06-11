# Lane Intake Standard

Every lane starts with a lane packet under `lane-packets/<repo-key>/<lane>/`.

Required intake fields:

- Repo key and local path
- Current branch
- Baseline SHA
- Worktree status
- Goal
- Allowed files
- Banned files
- Validation plan
- Gemini objector status when applicable

Use `node scripts/create-lane-packet.mjs --repo-key <key> --lane <lane>`.
