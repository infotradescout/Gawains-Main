#!/usr/bin/env node
import { getRepoSnapshot, loadRegistry } from './repo-registry.mjs';

const registry = loadRegistry();

for (const repo of registry.repos) {
  const snapshot = getRepoSnapshot(repo);
  const marker = snapshot.exists ? snapshot.status : 'MISSING_PATH';
  console.log(`${repo.key}\t${repo.name}\t${marker}\t${repo.localPath}`);
}
