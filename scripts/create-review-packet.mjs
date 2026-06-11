#!/usr/bin/env node
import path from 'node:path';
import {
  geminiRoot,
  getRepoByKey,
  getRepoSnapshot,
  packetValues,
  parseArgs,
  requireLane,
  renderTemplate,
  reviewRoot,
  writeTextFile
} from './repo-registry.mjs';

const args = parseArgs();
const repo = getRepoByKey(args['repo-key']);
const laneSlug = requireLane(args);
const snapshot = getRepoSnapshot(repo);
const values = packetValues(repo, args, snapshot, laneSlug);
const reviewDir = path.join(reviewRoot(repo, args['review-root']), laneSlug);
const geminiDir = path.join(geminiRoot(repo, args['gemini-root']), laneSlug);

const review = renderTemplate(`# Review Packet

Created: {{CREATED_AT}}
Repo: {{REPO_NAME}} ({{REPO_KEY}})
Local path: {{REPO_PATH}}
Remote: {{REPO_REMOTE}}
Branch: {{BRANCH}}
Lane: {{LANE_NAME}}
Baseline SHA: {{BASELINE_SHA}}
Commit SHA: {{COMMIT_SHA}}

## Files Changed
{{FILES_CHANGED}}

## Validation Summary
{{VALIDATION_SUMMARY}}

## Behavior Summary
{{BEHAVIOR_SUMMARY}}

## Scope Boundaries
{{SCOPE_BOUNDARIES}}

## Risks Checked
{{RISKS_CHECKED}}

## File Disposition
{{FILE_DISPOSITION}}

## Worktree Status
{{WORKTREE_STATUS}}

## Repo Doctrine And Brand Rules
{{BRAND_RULES}}

## Banned Cross-Contamination
{{CROSS_CONTAMINATION_RULES}}

## Review Question
{{REVIEW_QUESTION}}

## Raw Diff Policy
No raw/full git diff output is included by default. Raw diffs are exception-only when Thomas explicitly asks, Gemini specifically requests it, or line-level review is required to resolve a blocker.
`, values);

const gemini = renderTemplate(`# Gemini Request

Created: {{CREATED_AT}}
Repo: {{REPO_NAME}} ({{REPO_KEY}})
Branch: {{BRANCH}}
Lane: {{LANE_NAME}}
Baseline SHA: {{BASELINE_SHA}}
Commit SHA: {{COMMIT_SHA}}

## Files Changed
{{FILES_CHANGED}}

## Validation Summary
{{VALIDATION_SUMMARY}}

## Behavior Summary
{{BEHAVIOR_SUMMARY}}

## Scope Boundaries
{{SCOPE_BOUNDARIES}}

## Risks Checked
{{RISKS_CHECKED}}

## File Disposition
{{FILE_DISPOSITION}}

## Worktree Status
{{WORKTREE_STATUS}}

## Repo Doctrine And Brand Rules
{{BRAND_RULES}}

## Scope Warnings
{{CROSS_CONTAMINATION_RULES}}

## Review Question
{{REVIEW_QUESTION}}

## Evidence Policy
This is a compact review packet. No raw/full git diff output is included by default. Request targeted file content or a targeted diff only if needed.
`, values);

await writeTextFile(path.join(reviewDir, 'REVIEW_PACKET.md'), review);
await writeTextFile(path.join(reviewDir, 'VALIDATION_LOG.txt'), values.VALIDATION_SUMMARY);
await writeTextFile(path.join(reviewDir, 'FILE_LIST.txt'), values.FILES_CHANGED);
await writeTextFile(path.join(reviewDir, 'STATUS.txt'), `Worktree status:\n${values.WORKTREE_STATUS}\n`);
await writeTextFile(path.join(reviewDir, 'FILE_DISPOSITION.txt'), values.FILE_DISPOSITION);
await writeTextFile(path.join(geminiDir, 'GEMINI_REQUEST.md'), gemini);

console.log(reviewDir);
console.log(geminiDir);
