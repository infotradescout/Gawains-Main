# All Repos Operation

Use `--repo-key` for all cross-repo operations.

Known keys:

- `tradescout`
- `mealscout`
- `sway`
- `merlin`
- `albion`
- `autobott`
- `codescout`

Commands:

```bash
node scripts/list-repos.mjs
node scripts/check-repo.mjs --repo-key tradescout
node scripts/check-lane-clean.mjs --repo-key tradescout
node scripts/create-lane-packet.mjs --repo-key tradescout --lane example-lane
node scripts/create-codex-prompt.mjs --repo-key tradescout --lane example-lane
node scripts/create-review-packet.mjs --repo-key tradescout --lane example-lane
```
