#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const repoRoot = path.resolve(projectRoot, '../..');

const projectDir = path.basename(projectRoot);
const yearDir = path.basename(path.dirname(projectRoot));
// Source: {year}/{n}_{conf}_{title} → static: {year}_{conf}_{title} (no order number)
const slug = projectDir.replace(/^\d+_/, '');
const outName = /^\d{4}$/.test(yearDir) ? `${yearDir}_${slug}` : slug;

const STATIC_ROOT = '../../-static/slides/';
const BASE_ROOT = '/speech/slides/';

const outputPath = path.resolve(projectRoot, STATIC_ROOT, outName);
const basePath = BASE_ROOT + outName + '/';
const binDir = path.resolve(projectRoot, 'node_modules/.bin');

console.log(`📦 Building presentation...`);
console.log(`📁 Project directory: ${yearDir}/${projectDir}`);
console.log(`📁 Output name: ${outName}`);
console.log(`📁 Output path: ${outputPath}`);
console.log(`🔗 Base path: ${basePath}`);

try {
  if (existsSync(outputPath)) {
    console.log(`🧹 Cleaning previous build: ${outputPath}`);
    rmSync(outputPath, { recursive: true, force: true });
  }

  const command = `slidev build --out "${outputPath}" --base "${basePath}"`;
  console.log(`🚀 Running: ${command}`);

  execSync(command, {
    stdio: 'inherit',
    cwd: projectRoot,
    env: { ...process.env, PATH: `${binDir}${path.delimiter}${process.env.PATH}` },
  });

  console.log(`🧭 Refreshing -static/index.html hub...`);
  execSync('node scripts/generate-static-index.ts', {
    stdio: 'inherit',
    cwd: repoRoot,
  });

  console.log(`✅ Build completed successfully!`);
  console.log(`📄 Output location: ${outputPath}`);
  console.log(`🌐 Available at: ${basePath}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('❌ Build failed:', message);
  process.exit(1);
}
