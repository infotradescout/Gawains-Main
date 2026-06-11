#!/usr/bin/env node
import { getRepoSnapshot, loadRegistry } from './repo-registry.mjs';

const registry = loadRegistry();

for (const repo of registry.repos) {
  const snapshot = getRepoSnapshot(repo);
  console.log(`${repo.key}\t${repo.name}\t${snapshot.status}\t${snapshot.branch}\t${repo.localPath}`);
}
