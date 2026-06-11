#!/usr/bin/env node
import path from 'node:path';
import {
  ROOT,
  formatStatus,
  getRepoByKey,
  getRepoSnapshot,
  nowIso,
  parseArgs,
  requireLane,
  renderTemplate,
  writeTextFile
} from './repo-registry.mjs';

const args = parseArgs();
const repo = getRepoByKey(args['repo-key']);
const lane = requireLane(args);
const snapshot = getRepoSnapshot(repo);
const outputRoot = args['output-root'] || path.join(ROOT, 'lane-packets', repo.key);
const outputDir = path.join(outputRoot, lane);

const prompt = renderTemplate(`# Codex Prompt

Created: {{CREATED_AT}}
Repo key: {{REPO_KEY}}
Repo name: {{REPO_NAME}}
Local repo path: {{REPO_PATH}}
Lane: {{LANE_NAME}}
Current branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}
Worktree status: {{WORKTREE_STATUS}}

You are working inside the product repo listed above, not inside Gawain-Main.

Rules:
- Use only the target product repo path.
- Do not copy product source into Gawain-Main.
- Do not close the lane with untracked, modified, or deleted files.
- Return files inspected, files changed, validation output, commit SHA, push status, and final git status.
- Do not send raw git diff output to Gemini by default.

Goal:
TBD
`, {
  CREATED_AT: nowIso(),
  REPO_KEY: repo.key,
  REPO_NAME: repo.name,
  REPO_PATH: repo.localPath,
  LANE_NAME: lane,
  BRANCH: snapshot.branch,
  BASELINE_SHA: snapshot.head,
  WORKTREE_STATUS: formatStatus(snapshot)
});

await writeTextFile(path.join(outputDir, 'CODEX_PROMPT.md'), prompt);
console.log(path.join(outputDir, 'CODEX_PROMPT.md'));
