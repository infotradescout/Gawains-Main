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
const reviewRoot = args['review-root'] || path.join(ROOT, 'review-packets', repo.key);
const geminiRoot = args['gemini-root'] || path.join(ROOT, 'exports', 'gemini', repo.key);
const reviewDir = path.join(reviewRoot, lane);
const geminiDir = path.join(geminiRoot, lane);

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

const review = renderTemplate(`# Review Packet

Created: {{CREATED_AT}}
Repo: {{REPO_NAME}} ({{REPO_KEY}})
Local path: {{REPO_PATH}}
Remote: {{REPO_REMOTE}}
Lane: {{LANE_NAME}}
Branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}

## Existing-State + Context Check

- Project / brand / workflow: TBD
- Existing artifacts reviewed: TBD
- Current behavior found: TBD
- Working capability preserved: TBD
- Prior decisions / constraints: TBD
- Conflicts found: TBD
- Gaps / risks / assumptions: TBD
- Smallest aligned action chosen: TBD

## Worktree Status
{{WORKTREE_STATUS}}

## File Disposition
- Added: TBD
- Modified: TBD
- Deleted: TBD
- Untracked: TBD

## Validation
TBD

## Review Notes
No raw git diff is included by default. Attach targeted evidence only when Gawain authorizes it.
`, values);

const gemini = renderTemplate(`# Gemini Request

Created: {{CREATED_AT}}
Repo: {{REPO_NAME}} ({{REPO_KEY}})
Lane: {{LANE_NAME}}
Branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}

## Request
Review the lane packet, existing-state/context findings, file disposition, validation log, and worktree status. Return PASS or FAIL with specific concerns.

## Evidence Included
- Existing-state/context findings
- Working capability preserved
- Conflicts / risks / assumptions
- Worktree status
- File disposition
- Validation log

## Evidence Not Included By Default
Raw/full git diff output is omitted unless Gawain asks for it.

## Worktree Status
{{WORKTREE_STATUS}}
`, values);

await writeTextFile(path.join(reviewDir, 'REVIEW_PACKET.md'), review);
await writeTextFile(path.join(reviewDir, 'FILE_DISPOSITION.txt'), 'Added:\nModified:\nDeleted:\nUntracked:\n');
await writeTextFile(path.join(reviewDir, 'STATUS.txt'), `Worktree status:\n${values.WORKTREE_STATUS}\n`);
await writeTextFile(path.join(reviewDir, 'EXISTING_STATE_CONTEXT.txt'), 'Project / brand / workflow:\nExisting artifacts reviewed:\nCurrent behavior found:\nWorking capability preserved:\nPrior decisions / constraints:\nConflicts found:\nGaps / risks / assumptions:\nSmallest aligned action chosen:\n');
await writeTextFile(path.join(reviewDir, 'VALIDATION_LOG.txt'), 'No validation run yet.');
await writeTextFile(path.join(geminiDir, 'GEMINI_REQUEST.md'), gemini);

console.log(reviewDir);
console.log(geminiDir);
