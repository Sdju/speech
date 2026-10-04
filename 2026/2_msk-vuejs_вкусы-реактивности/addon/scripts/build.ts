#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const repoRoot = path.resolve(projectRoot, '../..');
execFileSync(process.execPath, [path.join(repoRoot, 'scripts/build-static.ts'), path.relative(repoRoot, projectRoot), ...process.argv.slice(2)], {
  cwd: repoRoot,
  stdio: 'inherit',
});
