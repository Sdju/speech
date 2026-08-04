#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

const projectDir = path.basename(projectRoot);

const STATIC_ROOT = '../../-static/slides/';
const BASE_ROOT = '/speech/slides/';

const outputPath = path.resolve(projectRoot, STATIC_ROOT, projectDir);
const basePath = BASE_ROOT + projectDir + '/';
const binDir = path.resolve(projectRoot, 'node_modules/.bin');

console.log(`📦 Building presentation...`);
console.log(`📁 Project directory: ${projectDir}`);
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

  console.log(`✅ Build completed successfully!`);
  console.log(`📄 Output location: ${outputPath}`);
  console.log(`🌐 Available at: ${basePath}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('❌ Build failed:', message);
  process.exit(1);
}
