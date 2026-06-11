import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, '..');
export const REGISTRY_PATH = path.join(ROOT, 'registry', 'repos.json');

export function loadRegistry() {
  const raw = readFileSync(REGISTRY_PATH, 'utf8');
  const registry = JSON.parse(raw);
  if (!Array.isArray(registry.repos)) {
    throw new Error('registry/repos.json must contain a repos array');
  }
  return registry;
}

export function getRepoByKey(repoKey) {
  if (!repoKey) {
    throw new Error('Missing required --repo-key');
  }
  const registry = loadRegistry();
  const repo = registry.repos.find((entry) => entry.key === repoKey);
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
  const missing = !repoExists(repo);
  if (missing) {
    return {
      exists: false,
      isGitRepo: false,
      branch: 'UNKNOWN',
      head: 'UNKNOWN',
      status: 'PATH_MISSING',
      porcelain: '',
      remote: repo.remote ?? ''
    };
  }

  const gitRepo = isGitRepo(repo);
  if (!gitRepo) {
    return {
      exists: true,
      isGitRepo: false,
      branch: 'UNKNOWN',
      head: 'UNKNOWN',
      status: 'NOT_GIT_REPO',
      porcelain: '',
      remote: repo.remote ?? ''
    };
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

export function renderTemplate(template, values) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    return values[key] ?? match;
  });
}

export async function writeTextFile(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`, 'utf8');
}

export function formatStatus(snapshot) {
  if (!snapshot.porcelain) {
    return 'clean';
  }
  return snapshot.porcelain;
}

export function nowIso() {
  return new Date().toISOString();
}
