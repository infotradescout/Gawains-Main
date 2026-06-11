#!/usr/bin/env node
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  ROOT,
  LANE_STATES,
  listDirectories,
  readJsonFile,
  pathExists,
  slugify,
  writeTextFile
} from './repo-registry.mjs';

const LANE_PACKET_ROOT = path.join(ROOT, 'lane-packets');
const REVIEW_PACKET_ROOT = path.join(ROOT, 'review-packets');

export async function collectLanes() {
  const lanes = new Map();
  await collectFromRoot(LANE_PACKET_ROOT, lanes, 'lanePacketPath');
  await collectFromRoot(REVIEW_PACKET_ROOT, lanes, 'reviewPacketPath');
  return [...lanes.values()].sort((a, b) => `${a.repoKey}:${a.laneSlug}`.localeCompare(`${b.repoKey}:${b.laneSlug}`));
}

async function collectFromRoot(root, lanes, pathField) {
  for (const repoDir of await listDirectories(root)) {
    const repoKey = path.basename(repoDir);
    for (const laneDir of await listDirectories(repoDir)) {
      const laneSlug = path.basename(laneDir);
      const metadataPath = path.join(laneDir, 'LANE_METADATA.json');
      const key = `${repoKey}/${laneSlug}`;
      const existing = lanes.get(key) || fallbackLane(repoKey, laneSlug);
      let next = { ...existing, [pathField]: path.relative(ROOT, laneDir).replaceAll('\\', '/') };
      if (await pathExists(metadataPath)) {
        const metadata = await readJsonFile(metadataPath);
        next = { ...next, ...metadata, [pathField]: next[pathField] };
      }
      lanes.set(key, next);
    }
  }
}

function fallbackLane(repoKey, laneSlug) {
  return {
    laneId: `${repoKey}-${slugify(laneSlug)}-unknown`,
    repoKey,
    repoName: repoKey,
    laneName: laneSlug,
    laneSlug,
    branch: 'UNKNOWN',
    baselineSha: 'UNKNOWN',
    state: 'scoped',
    blocker: '',
    nextAction: 'Update lane metadata',
    owner: 'Gawain',
    decisionNeeded: '',
    worktreeStatus: 'UNKNOWN',
    fileDisposition: 'UNKNOWN',
    evidence: {}
  };
}

export function mergeReady(lane) {
  const evidence = lane.evidence || {};
  return lane.state === 'merge_ready'
    && evidence.codexPass
    && evidence.gawainPass
    && evidence.geminiPass
    && evidence.validationPass
    && evidence.cleanTargetWorktree
    && evidence.resolvedFileDisposition
    && evidence.noUnresolvedBlockers
    && !lane.blocker;
}

function table(lanes) {
  const rows = [
    '| laneId | repo | branch | lane | state | blocker | next action | owner |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |'
  ];
  for (const lane of lanes) {
    rows.push(`| ${cell(lane.laneId)} | ${cell(lane.repoKey)} | ${cell(lane.branch)} | ${cell(lane.laneName)} | ${cell(lane.state)} | ${cell(lane.blocker || 'none')} | ${cell(lane.nextAction || 'TBD')} | ${cell(lane.owner || 'TBD')} |`);
  }
  return rows.join('\n');
}

function cell(value) {
  return String(value ?? '').replaceAll('|', '/').replace(/\r?\n/g, ' ');
}

function board(title, lanes, body = '') {
  return `# ${title}

Generated: ${new Date().toISOString()}

${body ? `${body}\n\n` : ''}${table(lanes)}
`;
}

export async function updateBoards() {
  const lanes = await collectLanes();
  const active = lanes.filter((lane) => !['complete'].includes(lane.state));
  const decision = lanes.filter((lane) => lane.state === 'needs_thomas_decision' || lane.state === 'needs_gawain_review' || lane.decisionNeeded);
  const blockers = lanes.filter((lane) => ['blocked', 'gemini_blocked'].includes(lane.state) || lane.blocker);
  const ready = lanes.filter(mergeReady);
  const parked = lanes.filter((lane) => lane.state === 'parked');

  await writeTextFile(path.join(ROOT, 'status', 'LANE_STATUS_BOARD.md'), board('Lane Status Board', active, 'All active lanes across all repos. Completed lanes exit this active highway view.'));
  await writeTextFile(path.join(ROOT, 'status', 'DECISION_BOARD.md'), board('Decision Board', decision, 'Lanes where Thomas/Gawain authority is needed.'));
  await writeTextFile(path.join(ROOT, 'status', 'BLOCKERS.md'), board('Blockers', blockers, 'Blocked lanes remain visible without freezing unrelated lanes.'));
  await writeTextFile(path.join(ROOT, 'status', 'MERGE_READY.md'), board('Merge Ready', ready, 'Only lanes with Codex PASS, Gawain PASS, Gemini PASS, validation PASS, clean target worktree, resolved file disposition, and no blockers appear here.'));
  await writeTextFile(path.join(ROOT, 'status', 'PARKED_LANES.md'), board('Parked Lanes', parked, 'Parked lanes are visible but outside immediate execution.'));
  await writeTextFile(path.join(ROOT, 'status', 'REPO_STATUS_BOARD.md'), repoBoard(lanes));

  return lanes;
}

function repoBoard(lanes) {
  const byRepo = new Map();
  for (const lane of lanes) {
    const entry = byRepo.get(lane.repoKey) || { total: 0, active: 0, complete: 0, blocked: 0, mergeReady: 0 };
    entry.total += 1;
    if (lane.state === 'complete') entry.complete += 1;
    if (!['complete'].includes(lane.state)) entry.active += 1;
    if (['blocked', 'gemini_blocked'].includes(lane.state) || lane.blocker) entry.blocked += 1;
    if (mergeReady(lane)) entry.mergeReady += 1;
    byRepo.set(lane.repoKey, entry);
  }

  const rows = [
    '# Repo Status Board',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| repo | total lanes | active | complete | blocked | merge ready |',
    '| --- | ---: | ---: | ---: | ---: | ---: |'
  ];
  for (const [repoKey, entry] of [...byRepo.entries()].sort()) {
    rows.push(`| ${repoKey} | ${entry.total} | ${entry.active} | ${entry.complete} | ${entry.blocked} | ${entry.mergeReady} |`);
  }
  return `${rows.join('\n')}\n`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const lanes = await updateBoards();
  console.log(`updated lane boards for ${lanes.length} lanes`);
  console.log(`states: ${LANE_STATES.join(', ')}`);
}
