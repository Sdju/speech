#!/usr/bin/env node

import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the project directory name (this will be the PRJ_NAME)
const projectDir = path.basename(path.resolve('.'));

// Define the static root and base root paths
const STATIC_ROOT = '../../-static/slides/';
const BASE_ROOT = '/speech/slides/';

// Construct the output and base paths
const outputPath = path.join(STATIC_ROOT, projectDir);
const basePath = BASE_ROOT + projectDir + '/';

console.log(`📦 Building presentation...`);
console.log(`📁 Project directory: ${projectDir}`);
console.log(`📁 Output path: ${outputPath}`);
console.log(`🔗 Base path: ${basePath}`);

try {
  // Run the slidev build command with calculated paths
  const command = `slidev build --out "${outputPath}" --base "${basePath}"`;
  console.log(`🚀 Running: ${command}`);
  
  execSync(command, { stdio: 'inherit' });
  
  console.log(`✅ Build completed successfully!`);
  console.log(`📄 Output location: ${outputPath}`);
  console.log(`🌐 Available at: ${basePath}`);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}