#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execFileSync('git', ['ls-files', '*.mjs'], { encoding: 'utf8' })
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean);

const failures = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  if (!content.startsWith('#!')) {
    continue;
  }

  const lines = content.split(/\r?\n/);
  const firstLine = lines[0];

  if (firstLine !== '#!/usr/bin/env node') {
    failures.push(`${file}: first line must be exactly "#!/usr/bin/env node"; got ${JSON.stringify(firstLine)}`);
  }

  if (lines.length < 2 || lines[1].trim() === '') {
    failures.push(`${file}: JavaScript must begin on line 2 or later after the hashbang`);
  }

  if (/^#!.*\b(import|const|function)\b/.test(firstLine)) {
    failures.push(`${file}: hashbang line contains JavaScript and would comment out executable code`);
  }
}

if (failures.length) {
  console.error('MJS hashbang integrity check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`MJS hashbang integrity checks passed (${files.length} tracked .mjs files inspected).`);
}
