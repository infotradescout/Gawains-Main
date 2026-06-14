#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execFileSync('git', ['ls-files', '*.json'], { encoding: 'utf8' })
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean);

const failures = [];

for (const file of files) {
  try {
    JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

if (failures.length) {
  console.error('JSON parse integrity check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`All tracked JSON files parsed successfully (${files.length} files).`);
}
