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

## Time Passage + Status Freshness

Status timestamp: {{CREATED_AT}}
Source of truth checked: local git snapshot from registry path
Last-known vs current: current as of status timestamp
Freshness risk: re-check required if time passes, another agent acts, user reports new activity, or approval/merge/apply/send/close is requested
Re-check required before: Gemini review, merge, apply, send, close, or completion claim

## Existing-State + Context Check

- Project / brand / workflow: TBD
- Existing artifacts reviewed: TBD
- Current behavior found: TBD
- Working capability preserved: TBD
- Prior decisions / constraints: TBD
- Conflicts found: TBD
- Gaps / risks / assumptions: TBD
- Smallest aligned action chosen: TBD

## Gemini Status Gate

- geminiStatus: execution_audit_pending
- geminiPreflightRequired: yes
- geminiExecutionAuditRequired: yes
- geminiPreflightResultRef: TBD
- geminiExecutionAuditResultRef: TBD
- mergeAuthorization: blocked

No Gemini status means no merge, no closeout, no "approved," and no "ready." Merge authorization remains blocked until geminiStatus: execution_audit_passed, or until not_required is explicitly justified for a standard non-core lane.

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

## Time Passage + Status Freshness

Status timestamp: {{CREATED_AT}}
Source of truth checked: local git snapshot from registry path
Last-known vs current: current as of status timestamp
Freshness risk: re-check required if time passes, another agent acts, user reports new activity, or approval/merge/apply/send/close is requested
Re-check required before: Gemini review, merge, apply, send, close, or completion claim

## Gemini Status Gate

geminiStatus: execution_audit_pending
geminiPreflightRequired: yes
geminiExecutionAuditRequired: yes
geminiPreflightResultRef: TBD
geminiExecutionAuditResultRef: TBD
mergeAuthorization: blocked

## Request
Review the lane packet, time/status freshness, Gemini status gate, existing-state/context findings, file disposition, validation log, and worktree status. Return PASS or FAIL with specific concerns.

## Evidence Included
- Existing-state/context findings
- Status timestamp and source of truth checked
- Last-known vs current freshness classification
- Freshness risk and re-check requirement
- Gemini status gate and merge authorization state
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
await writeTextFile(path.join(reviewDir, 'STATUS.txt'), `Status timestamp:\n${values.CREATED_AT}\nSource of truth checked:\nlocal git snapshot from registry path\nLast-known vs current:\ncurrent as of status timestamp\nFreshness risk:\nre-check required before action decisions\nRe-check required before:\nGemini review, merge, apply, send, close, or completion claim\nWorktree status:\n${values.WORKTREE_STATUS}\n`);
await writeTextFile(path.join(reviewDir, 'EXISTING_STATE_CONTEXT.txt'), 'Project / brand / workflow:\nExisting artifacts reviewed:\nCurrent behavior found:\nWorking capability preserved:\nPrior decisions / constraints:\nConflicts found:\nGaps / risks / assumptions:\nSmallest aligned action chosen:\n');
await writeTextFile(path.join(reviewDir, 'GEMINI_STATUS.txt'), 'geminiStatus: execution_audit_pending\ngeminiPreflightRequired: yes\ngeminiExecutionAuditRequired: yes\ngeminiPreflightResultRef: TBD\ngeminiExecutionAuditResultRef: TBD\nmergeAuthorization: blocked\n');
await writeTextFile(path.join(reviewDir, 'VALIDATION_LOG.txt'), 'No validation run yet.');
await writeTextFile(path.join(geminiDir, 'GEMINI_REQUEST.md'), gemini);

console.log(reviewDir);
console.log(geminiDir);
