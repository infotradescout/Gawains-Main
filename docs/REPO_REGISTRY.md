# Repo Registry

`registry/repos.json` is the live local registry for Gawain-Main.

Each repo entry must include:

- `key`: stable script key such as `tradescout`
- `name`: display name
- `kind`: product, workflow, governance, or tooling
- `localPath`: absolute local path to the repo
- `remote`: Git remote URL when known
- `defaultBranch`: expected default branch
- `status`: `discovered` or `placeholder`
- `notes`: human context

Product repo source stays in the product repo. Gawain-Main stores references, packets, and review artifacts only.
