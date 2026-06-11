import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..');
export const REGISTRY_PATH = path.join(ROOT, 'registry', 'repos.json');

const REQUIRED_REPO_FIELDS = [
  'key',
  'name',
  'localPath',
  'defaultBranch',
  'validationCommands',
  'reviewPacketRoot',
  'lanePacketRoot',
  'brandRules',
  'bannedCrossContamination',
  'defaultAllowedFiles',
  'defaultBannedFiles'
];

export function loadRegistry() {
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
  if (!Array.isArray(registry.repos)) {
    throw new Error('registry/repos.json must contain a repos array');
  }
  for (const repo of registry.repos) {
    validateRepo(repo);
  }
  return registry;
}

export function validateRepo(repo) {
  for (const field of REQUIRED_REPO_FIELDS) {
    if (repo[field] === undefined || repo[field] === null || repo[field] === '') {
      throw new Error(`Registry entry ${repo.key ?? '(missing key)'} missing required field: ${field}`);
    }
  }
  for (const field of ['validationCommands', 'brandRules', 'bannedCrossContamination', 'defaultAllowedFiles', 'defaultBannedFiles']) {
    if (!Array.isArray(repo[field])) {
      throw new Error(`Registry entry ${repo.key} field ${field} must be an array`);
    }
  }
}

export function getRepoByKey(repoKey) {
  if (!repoKey) {
    throw new Error('Missing required --repo-key');
  }
  const repo = loadRegistry().repos.find((entry) => entry.key === repoKey);
  if (!repo) {
    throw new Error(`Unknown repo key: ${repoKey}`);
  }
  return repo;
}

export function parseArgs(argv = process.argv.slice(2)) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith('--')) {
      throw new Error(`Unexpected argument: ${item}`);
    }
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

export function runGit(repoPath, args, options = {}) {
  const result = spawnSync('git', args, {
    cwd: repoPath,
    encoding: 'utf8',
    shell: false,
    ...options
  });
  return {
    code: result.status ?? 1,
    stdout: (result.stdout ?? '').trimEnd(),
    stderr: (result.stderr ?? '').trimEnd()
  };
}

export function repoExists(repo) {
  return Boolean(repo.localPath && existsSync(repo.localPath));
}

export function isGitRepo(repo) {
  if (!repoExists(repo)) {
    return false;
  }
  const result = runGit(repo.localPath, ['rev-parse', '--is-inside-work-tree']);
  return result.code === 0 && result.stdout === 'true';
}

export function getRepoSnapshot(repo) {
  if (!repoExists(repo)) {
    return snapshotBase(repo, false, false, 'PATH_MISSING');
  }
  if (!isGitRepo(repo)) {
    return snapshotBase(repo, true, false, 'NOT_GIT_REPO');
  }
  const branch = runGit(repo.localPath, ['branch', '--show-current']).stdout || 'DETACHED';
  const head = runGit(repo.localPath, ['rev-parse', '--short', 'HEAD']).stdout || 'UNKNOWN';
  const porcelain = runGit(repo.localPath, ['status', '--porcelain']).stdout;
  const remote = runGit(repo.localPath, ['remote', 'get-url', 'origin']).stdout || repo.remote || '';
  return {
    exists: true,
    isGitRepo: true,
    branch,
    head,
    status: porcelain ? 'DIRTY' : 'CLEAN',
    porcelain,
    remote
  };
}

function snapshotBase(repo, exists, isGit, status) {
  return {
    exists,
    isGitRepo: isGit,
    branch: 'UNKNOWN',
    head: 'UNKNOWN',
    status,
    porcelain: '',
    remote: repo.remote ?? ''
  };
}

export function assertCleanRepo(repo) {
  const snapshot = getRepoSnapshot(repo);
  if (!snapshot.exists || !snapshot.isGitRepo) {
    throw new Error(`${repo.key} is not a usable git repo at ${repo.localPath}`);
  }
  if (snapshot.porcelain) {
    throw new Error(`${repo.key} has uncommitted, deleted, or untracked files:\n${snapshot.porcelain}`);
  }
  return snapshot;
}

export function normalizeOutputPath(outputPath) {
  if (!outputPath) {
    throw new Error('Missing output path');
  }
  return path.isAbsolute(outputPath) ? outputPath : path.join(ROOT, outputPath);
}

export function laneRoot(repo, override) {
  return normalizeOutputPath(override || repo.lanePacketRoot);
}

export function reviewRoot(repo, override) {
  return normalizeOutputPath(override || repo.reviewPacketRoot);
}

export function geminiRoot(repo, override) {
  return normalizeOutputPath(override || path.join('exports', 'gemini', repo.key));
}

export function listValue(value, fallback = []) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return fallback;
}

export function multilineList(items) {
  const values = listValue(items);
  return values.length ? values.map((item) => `- ${item}`).join('\n') : '- TBD';
}

export function csv(items) {
  return listValue(items).join(', ');
}

export function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function requireLane(args) {
  const lane = args.lane || args['lane-name'];
  const slug = slugify(lane);
  if (!slug) {
    throw new Error('Missing required --lane');
  }
  return slug;
}

export function displayLane(args, slug) {
  return args.lane || args['lane-name'] || slug;
}

export function renderTemplate(template, values) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => values[key] ?? match);
}

export async function writeTextFile(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`, 'utf8');
}

export function formatStatus(snapshot) {
  return snapshot.porcelain || 'clean';
}

export function nowIso() {
  return new Date().toISOString();
}

export function packetValues(repo, args, snapshot, laneSlug) {
  const branch = args.branch || snapshot.branch || repo.defaultBranch;
  const baseline = args['baseline-sha'] || snapshot.head || 'TBD';
  const allowed = listValue(args['allowed-files'], repo.defaultAllowedFiles);
  const banned = listValue(args['banned-files'], repo.defaultBannedFiles);
  const validation = listValue(args['validation-commands'], repo.validationCommands);
  return {
    CREATED_AT: nowIso(),
    REPO_KEY: repo.key,
    REPO_NAME: repo.name,
    REPO_PATH: repo.localPath,
    REPO_REMOTE: snapshot.remote || repo.remote || '',
    LANE_NAME: displayLane(args, laneSlug),
    LANE_SLUG: laneSlug,
    BRANCH: branch,
    BASELINE_SHA: baseline,
    COMMIT_SHA: args['commit-sha'] || 'TBD',
    GOAL: args.goal || 'TBD',
    ALLOWED_FILES: multilineList(allowed),
    BANNED_FILES: multilineList(banned),
    VALIDATION_COMMANDS: multilineList(validation),
    BRAND_RULES: multilineList(repo.brandRules),
    CROSS_CONTAMINATION_RULES: multilineList(repo.bannedCrossContamination),
    FILES_CHANGED: args['files-changed'] || 'TBD',
    VALIDATION_SUMMARY: args['validation-summary'] || 'TBD',
    BEHAVIOR_SUMMARY: args['behavior-summary'] || 'TBD',
    SCOPE_BOUNDARIES: args['scope-boundaries'] || 'TBD',
    RISKS_CHECKED: args['risks-checked'] || 'TBD',
    FILE_DISPOSITION: args['file-disposition'] || 'TBD',
    WORKTREE_STATUS: args['worktree-status'] || formatStatus(snapshot),
    REVIEW_QUESTION: args['review-question'] || 'Does this lane satisfy scope, doctrine, validation, and merge-readiness requirements?',
    ALLOWED_FILES_CSV: csv(allowed),
    BANNED_FILES_CSV: csv(banned),
    VALIDATION_COMMANDS_CSV: csv(validation)
  };
}
