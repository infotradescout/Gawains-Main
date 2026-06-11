#!/usr/bin/env node
import path from 'node:path';
import {
  getRepoByKey,
  getRepoSnapshot,
  laneRoot,
  packetValues,
  parseArgs,
  requireLane,
  laneMetadata,
  renderTemplate,
  writeJsonFile,
  writeTextFile
} from './repo-registry.mjs';
import { renderCodexPrompt } from './create-codex-prompt.mjs';

const args = parseArgs();
const repo = getRepoByKey(args['repo-key']);
const laneSlug = requireLane(args);
const snapshot = getRepoSnapshot(repo);
const values = packetValues(repo, args, snapshot, laneSlug);
const outputDir = path.join(laneRoot(repo, args['output-root']), laneSlug);

const intake = renderTemplate(`# Lane Intake

Created: {{CREATED_AT}}
Lane ID: {{LANE_ID}}
Repo: {{REPO_NAME}} ({{REPO_KEY}})
Local path: {{REPO_PATH}}
Remote: {{REPO_REMOTE}}
Branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}
Lane: {{LANE_NAME}}
State: {{LANE_STATE}}

Multiple active lanes per repo are allowed unless a repo-specific policy blocks it. This lane has its own independent finite state.

## Goal
{{GOAL}}

## Allowed Files
{{ALLOWED_FILES}}

## Banned Files
{{BANNED_FILES}}

## Validation Commands
{{VALIDATION_COMMANDS}}

## Repo Doctrine And Brand Rules
{{BRAND_RULES}}

## Banned Cross-Contamination
{{CROSS_CONTAMINATION_RULES}}

## Clean Worktree Rule
No lane may close with untracked or uncommitted files. Every file must be committed, deleted, moved to an approved artifact location, or blocked with a named next action and owner.

## Gemini Evidence Rule
Gemini receives compact review packets only by default. Raw/full diffs are exception-only.
`, values);

const status = renderTemplate(`Repo: {{REPO_KEY}}
Lane ID: {{LANE_ID}}
Lane: {{LANE_NAME}}
Branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}
State: {{LANE_STATE}}
Blocker: {{BLOCKER}}
Next action: {{NEXT_ACTION}}
Owner: {{OWNER}}
Worktree status:
{{WORKTREE_STATUS}}
`, values);

await writeTextFile(path.join(outputDir, 'LANE_INTAKE.md'), intake);
await writeTextFile(path.join(outputDir, 'CODEX_PROMPT.md'), renderCodexPrompt(values));
await writeTextFile(path.join(outputDir, 'STATUS.txt'), status);
await writeJsonFile(path.join(outputDir, 'LANE_METADATA.json'), laneMetadata(repo, values));

console.log(outputDir);
