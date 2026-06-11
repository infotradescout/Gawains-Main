#!/usr/bin/env node
import { getRepoByKey, getRepoSnapshot, parseArgs } from './repo-registry.mjs';

const args = parseArgs();
const repo = getRepoByKey(args['repo-key']);
const snapshot = getRepoSnapshot(repo);

console.log(`repo: ${repo.key}`);
console.log(`name: ${repo.name}`);
console.log(`path: ${repo.localPath}`);
console.log(`exists: ${snapshot.exists}`);
console.log(`git: ${snapshot.isGitRepo}`);
console.log(`branch: ${snapshot.branch}`);
console.log(`head: ${snapshot.head}`);
console.log('status --porcelain:');
console.log(snapshot.porcelain || 'clean');

if (!snapshot.exists || !snapshot.isGitRepo) {
  process.exitCode = 1;
}
