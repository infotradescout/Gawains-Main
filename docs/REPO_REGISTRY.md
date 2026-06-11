# Repo Registry

`registry/repos.json` is the live local repo registry.

Each entry must include:

- `key`
- `name`
- `localPath`
- `defaultBranch`
- `validationCommands`
- `reviewPacketRoot`
- `lanePacketRoot`
- `brandRules`
- `bannedCrossContamination`
- `defaultAllowedFiles`
- `defaultBannedFiles`

Scripts resolve product repos by `--repo-key`. Missing local paths must be marked clearly and should not make `list-repos` fail.
