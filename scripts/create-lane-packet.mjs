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

const values = {
  CREATED_AT: nowIso(),
  REPO_KEY: repo.key,
  REPO_NAME: repo.name,
  REPO_PATH: repo.localPath,
  REPO_REMOTE: snapshot.remote || repo.remote || '',
  LANE_NAME: lane,
  BRANCH: snapshot.branch,
  BASELINE_SHA: snapshot.head,
  WORKTREE_STATUS: formatStatus(snapshot)
};

const intake = renderTemplate(`# Lane Intake

Created: {{CREATED_AT}}
Repo: {{REPO_NAME}} ({{REPO_KEY}})
Local path: {{REPO_PATH}}
Remote: {{REPO_REMOTE}}
Lane: {{LANE_NAME}}
Current branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}
Worktree status: {{WORKTREE_STATUS}}

## Goal
TBD

## Allowed Files
TBD

## Banned Files
Product repos must remain isolated. Do not copy source into Gawain-Main.

## Validation Plan
TBD
`, values);

const status = renderTemplate(`Repo: {{REPO_KEY}}
Lane: {{LANE_NAME}}
Branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}
Worktree status:
{{WORKTREE_STATUS}}
`, values);

await writeTextFile(path.join(outputDir, 'LANE_INTAKE.md'), intake);
await writeTextFile(path.join(outputDir, 'STATUS.txt'), status);
await writeTextFile(path.join(outputDir, 'FILE_LIST.txt'), 'No files listed yet.');
await writeTextFile(path.join(outputDir, 'VALIDATION_LOG.txt'), 'No validation run yet.');

console.log(outputDir);
