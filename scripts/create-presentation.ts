#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as readline from 'node:readline/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getNextNumber(yearDir: string): number {
  if (!fs.existsSync(yearDir)) {
    return 1;
  }
  
  const entries = fs.readdirSync(yearDir, { withFileTypes: true });
  const numbers = entries
    .filter(e => e.isDirectory())
    .map(e => {
      const match = e.name.match(/^(\d+)_/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(n => n > 0);
  
  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
}

function copyDir(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.name === 'node_modules' || entry.name === '.git') {
      continue;
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      if (entry.name === '.env') continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function updateSlidesAddon(slidesPath: string, folderName: string): void {
  const content = fs.readFileSync(slidesPath, 'utf-8');
  const updated = content.replace('./_template/addon', `./${folderName}/addon`);
  fs.writeFileSync(slidesPath, updated);
}

async function prompt(rl: readline.Interface, question: string): Promise<string> {
  const answer = await rl.question(question);
  return answer.trim();
}

async function createPresentation(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log('\n📝 Создание новой презентации\n');

    const currentYear = new Date().getFullYear().toString();
    const yearDir = path.join(rootDir, currentYear);
    const nextNumber = getNextNumber(yearDir);

    console.log(`📅 Год: ${currentYear}`);
    console.log(`🔢 Порядковый номер: ${nextNumber}\n`);

    const conference = await prompt(rl, '🏛️  Название конференции: ');
    if (!conference) {
      console.error('❌ Название конференции не может быть пустым');
      process.exit(1);
    }

    const talkTitle = await prompt(rl, '📢 Название доклада: ');
    if (!talkTitle) {
      console.error('❌ Название доклада не может быть пустым');
      process.exit(1);
    }

    const folderName = `${nextNumber}_${slugify(conference)}_${slugify(talkTitle)}`;
    const presentationPath = path.join(currentYear, folderName);
    const targetPath = path.join(rootDir, presentationPath);
    const templatePath = path.join(rootDir, '_template');

    console.log(`\n📁 Папка: ${presentationPath}`);

    if (fs.existsSync(targetPath)) {
      console.error(`❌ Директория ${presentationPath} уже существует!`);
      process.exit(1);
    }

    // Copy template
    console.log('\n⏳ Копирование шаблона...');
    copyDir(templatePath, targetPath);

    // Update slides.md with correct addon path
    const slidesPath = path.join(targetPath, 'slides.md');
    if (fs.existsSync(slidesPath)) {
      updateSlidesAddon(slidesPath, folderName);
    }

    // Install dependencies
    console.log('📦 Установка зависимостей...');
    execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' });

    console.log('\n✅ Презентация создана успешно! 🎉');
    console.log('\n📌 Для начала работы:');
    console.log(`   cd ${presentationPath}`);
    console.log('   pnpm dev\n');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Ошибка:', errorMessage);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createPresentation();
