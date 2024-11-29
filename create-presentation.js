#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateEnvFile(presentationPath, targetPath) {
  const normalizedPath = presentationPath.replace(/\\/g, '/');
  const projectName = normalizedPath.replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '-');
  
  // Calculate relative path to static root
  const depth = normalizedPath.split('/').length;
  const staticRoot = '../'.repeat(depth) + '-static/slides/';
  
  const envContent = `PRJ_NAME=${projectName}\nSTATIC_ROOT=${staticRoot}\nBASE_ROOT=/speech/slides/`;
  fs.writeFileSync(path.join(targetPath, '.env'), envContent);
}

function copyDir(src, dest) {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read directory contents
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.name === 'node_modules' || entry.name === '.git') {
      continue; // Skip node_modules and .git directories
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Skip .env file as we'll generate it separately
      if (entry.name === '.env') continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function createPresentation() {
  const args = process.argv.slice(2);
  
  if (args.length !== 1) {
    console.error('Usage: node create-presentation.js <presentation-name>');
    console.error('Example: node create-presentation.js 2024/my-awesome-talk');
    process.exit(1);
  }

  const presentationPath = args[0];
  const templatePath = path.join(__dirname, '_template');
  const targetPath = path.join(__dirname, presentationPath);

  // Check if presentation directory already exists
  if (fs.existsSync(targetPath)) {
    console.error(`Error: Directory ${presentationPath} already exists!`);
    process.exit(1);
  }

  try {
    // Copy template to new location
    console.log(`Creating new presentation in ${presentationPath}...`);
    copyDir(templatePath, targetPath);

    // Generate .env file
    console.log('Generating .env file...');
    generateEnvFile(presentationPath, targetPath);

    // Initialize git repository
    console.log('Initializing git repository...');
    execSync('git init', { cwd: targetPath });

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('pnpm install', { cwd: targetPath });

    console.log('\nPresentation created successfully! 🎉');
    console.log('\nTo start working on your presentation:');
    console.log(`1. cd ${presentationPath}`);
    console.log('2. pnpm run dev');
  } catch (error) {
    console.error('Error creating presentation:', error.message);
    process.exit(1);
  }
}

createPresentation(); 