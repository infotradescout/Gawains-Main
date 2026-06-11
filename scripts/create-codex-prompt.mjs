#!/usr/bin/env node
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  getRepoByKey,
  getRepoSnapshot,
  laneRoot,
  packetValues,
  parseArgs,
  requireLane,
  renderTemplate,
  writeTextFile
} from './repo-registry.mjs';

export function renderCodexPrompt(values) {
  return renderTemplate(`# Codex Prompt

Created: {{CREATED_AT}}
Repo: {{REPO_NAME}} ({{REPO_KEY}})
Repo path: {{REPO_PATH}}
Branch: {{BRANCH}}
Baseline SHA: {{BASELINE_SHA}}
Lane: {{LANE_NAME}}

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

## Clean File Disposition Rule
No lane may close with untracked or uncommitted files. Every file must be committed, deleted, moved to an approved artifact location, or blocked with a named next action and owner.

## Evidence Return Rule
Return compact evidence only by default. Do not include raw/full git diff output unless Thomas explicitly asks, Gemini specifically requests it, or line-level review is required to resolve a blocker.

## Required Codex Return Format
Repo:
Lane:
Branch:
Baseline SHA:
Commit SHA:
Files inspected:
Files changed:
Validation commands:
Validation result:
Behavior summary:
Scope boundaries:
Risks checked:
File disposition:
Final worktree status:
Push status:
Open blockers with owner:
`, values);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs();
  const repo = getRepoByKey(args['repo-key']);
  const laneSlug = requireLane(args);
  const snapshot = getRepoSnapshot(repo);
  const values = packetValues(repo, args, snapshot, laneSlug);
  const outputDir = path.join(laneRoot(repo, args['output-root']), laneSlug);
  const outputFile = path.join(outputDir, 'CODEX_PROMPT.md');

  await writeTextFile(outputFile, renderCodexPrompt(values));
  console.log(outputFile);
}
