#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as readline from 'node:readline/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

interface CliOptions {
  conference?: string;
  title?: string;
  year?: string;
  number?: number;
  skipInstall: boolean;
  help: boolean;
}

function printHelp(): void {
  console.log(`
Использование:
  pnpm presentation:create [опции] [конференция] [название доклада]

Опции:
  -c, --conference <name>   Название конференции
  -t, --title <name>        Название доклада
  -y, --year <year>         Год (по умолчанию: текущий)
  -n, --number <num>        Порядковый номер (по умолчанию: следующий свободный)
      --skip-install        Не запускать pnpm install
  -h, --help                Показать справку

Примеры:
  pnpm presentation:create --conference draft --title "CSS скоупинг от А до Я"
  pnpm presentation:create draft "CSS скоупинг от А до Я"
  pnpm presentation:create -c msk-vuejs -t "CSS scoping" -y 2026 -n 2
`);
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    skipInstall: false,
    help: false,
  };
  const positional: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];
    const hasValue = next !== undefined && !next.startsWith('-');

    switch (arg) {
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '--skip-install':
        options.skipInstall = true;
        break;
      case '-c':
      case '--conference':
        if (!hasValue) throw new Error(`Опция ${arg} требует значение`);
        options.conference = next;
        i++;
        break;
      case '-t':
      case '--title':
        if (!hasValue) throw new Error(`Опция ${arg} требует значение`);
        options.title = next;
        i++;
        break;
      case '-y':
      case '--year':
        if (!hasValue) throw new Error(`Опция ${arg} требует значение`);
        options.year = next;
        i++;
        break;
      case '-n':
      case '--number': {
        if (!hasValue) throw new Error(`Опция ${arg} требует значение`);
        const parsed = Number.parseInt(next, 10);
        if (Number.isNaN(parsed) || parsed < 1) {
          throw new Error(`Некорректный номер: ${next}`);
        }
        options.number = parsed;
        i++;
        break;
      }
      default:
        if (arg.startsWith('-')) {
          throw new Error(`Неизвестная опция: ${arg}`);
        }
        positional.push(arg);
    }
  }

  if (!options.conference && positional[0]) {
    options.conference = positional[0];
  }
  if (!options.title && positional[1]) {
    options.title = positional[1];
  }

  return options;
}

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
      return match ? Number.parseInt(match[1], 10) : 0;
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

async function resolveField(
  rl: readline.Interface | null,
  value: string | undefined,
  question: string,
  label: string,
): Promise<string> {
  if (value) return value;

  if (!rl || !process.stdin.isTTY) {
    console.error(`❌ Не указано: ${label}. Передайте через CLI или запустите в интерактивном режиме.`);
    console.error('   pnpm presentation:create --help');
    process.exit(1);
  }

  const answer = await prompt(rl, question);
  if (!answer) {
    console.error(`❌ ${label} не может быть пустым`);
    process.exit(1);
  }

  return answer;
}

async function createPresentation(): Promise<void> {
  let options: CliOptions;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${errorMessage}`);
    console.error('   pnpm presentation:create --help');
    process.exit(1);
  }

  if (options.help) {
    printHelp();
    return;
  }

  const interactive = process.stdin.isTTY && !options.conference && !options.title;
  const rl = interactive
    ? readline.createInterface({ input: process.stdin, output: process.stdout })
    : null;

  try {
    console.log('\n📝 Создание новой презентации\n');

    const currentYear = options.year ?? new Date().getFullYear().toString();
    const yearDir = path.join(rootDir, currentYear);
    const nextNumber = options.number ?? getNextNumber(yearDir);

    console.log(`📅 Год: ${currentYear}`);
    console.log(`🔢 Порядковый номер: ${nextNumber}\n`);

    const conference = await resolveField(
      rl,
      options.conference,
      '🏛️  Название конференции: ',
      'название конференции',
    );

    const talkTitle = await resolveField(
      rl,
      options.title,
      '📢 Название доклада: ',
      'название доклада',
    );

    const folderName = `${nextNumber}_${slugify(conference)}_${slugify(talkTitle)}`;
    const presentationPath = path.join(currentYear, folderName);
    const targetPath = path.join(rootDir, presentationPath);
    const templatePath = path.join(rootDir, '_template');

    console.log(`\n📁 Папка: ${presentationPath}`);

    if (fs.existsSync(targetPath)) {
      console.error(`❌ Директория ${presentationPath} уже существует!`);
      process.exit(1);
    }

    console.log('\n⏳ Копирование шаблона...');
    copyDir(templatePath, targetPath);

    const slidesPath = path.join(targetPath, 'slides.md');
    if (fs.existsSync(slidesPath)) {
      updateSlidesAddon(slidesPath, folderName);
    }

    if (!options.skipInstall) {
      console.log('📦 Установка зависимостей...');
      execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' });
    }

    console.log('\n✅ Презентация создана успешно! 🎉');
    console.log('\n📌 Для начала работы:');
    console.log(`   cd ${presentationPath}`);
    console.log('   pnpm dev\n');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Ошибка:', errorMessage);
    process.exit(1);
  } finally {
    rl?.close();
  }
}

createPresentation();
