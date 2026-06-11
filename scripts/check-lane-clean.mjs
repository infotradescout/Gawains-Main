#!/usr/bin/env node
import { assertCleanRepo, getRepoByKey, parseArgs } from './repo-registry.mjs';

try {
  const args = parseArgs();
  const repo = getRepoByKey(args['repo-key']);
  const snapshot = assertCleanRepo(repo);
  console.log(`${repo.key} clean on ${snapshot.branch} at ${snapshot.head}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
