#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cacheKey, loadConfig, outputDir, repoRoot, safePath, selectPresentations, sourceHash } from './static-site.ts';
import type { Presentation, StaticConfig } from './static-site.ts';
import { generateStaticIndex } from './generate-static-index.ts';

function run(command: string, args: string[], cwd: string) {
  execFileSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, CI: 'true', PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1' } });
}
export function ensurePresentation(entry: Presentation, config: StaticConfig, options: { force?: boolean; install?: boolean; root?: string } = {}): string {
  const root = options.root ?? repoRoot;
  const cache = safePath(root, config.cacheDir);
  const target = path.join(cache, 'slides', entry.slug);
  const state = path.join(cache, 'state', `${entry.slug}.json`);
  const key = cacheKey(entry, config, root);
  let savedKey: string | undefined;
  try { savedKey = JSON.parse(fs.readFileSync(state, 'utf8')).key; } catch { /* Missing/corrupt state is a cache miss. */ }
  if (!options.force && fs.existsSync(path.join(target, 'index.html')) && savedKey === key) {
    console.log(`cache  ${entry.slug}`);
    return target;
  }
  fs.mkdirSync(cache, { recursive: true });
  const staging = fs.mkdtempSync(path.join(cache, '.build-'));
  const built = path.join(staging, 'output');
  try {
    const useArchive = !options.force && config.base === config.archive.base && (!entry.source || entry.archiveHash === sourceHash(entry, root));
    if (useArchive || !entry.source) {
      if (config.base !== config.archive.base) throw new Error(`Archived ${entry.slug} requires base ${config.archive.base}`);
      console.log(`archive ${entry.slug}`);
      const archivedPath = `${config.archive.directory}/slides/${entry.slug}`;
      const tar = path.join(staging, 'archive.tar');
      run('git', ['archive', '--format=tar', `--output=${tar}`, config.archive.ref, '--', archivedPath], root);
      run('tar', ['-xf', tar, '-C', staging], root);
      fs.renameSync(path.join(staging, archivedPath), built);
    } else {
      const source = safePath(root, entry.source!);
      console.log(`build  ${entry.slug}`);
      if (options.install) {
        const lockfile = path.join(source, 'pnpm-lock.yaml');
        const legacyLock = fs.existsSync(lockfile) && /^lockfileVersion: ['"]?6\.0/m.test(fs.readFileSync(lockfile, 'utf8'));
        // Preserve old lockfiles rather than silently upgrading historical dependencies.
        if (legacyLock) run('npx', ['--yes', 'pnpm@8.15.9', 'install', '--frozen-lockfile'], source);
        else run('pnpm', ['install', '--frozen-lockfile'], source);
      }
      const pkg = JSON.parse(fs.readFileSync(path.join(source, 'package.json'), 'utf8'));
      if (pkg.scripts?.['icons:generate']) run('pnpm', ['run', 'icons:generate'], source);
      const cliManifest = path.join(source, 'node_modules/@slidev/cli/package.json');
      const legacyCLI = fs.existsSync(cliManifest) && JSON.parse(fs.readFileSync(cliManifest, 'utf8')).version.startsWith('0.');
      const buildArgs = ['build', '--out', built, '--base', `${config.base}slides/${entry.slug}/`];
      // Historical Slidev/Shiki versions can crash on Node 24; keep their build runtime separate.
      if (legacyCLI) run('npx', ['--yes', 'node@20.20.2', path.join(source, 'node_modules/@slidev/cli/bin/slidev.mjs'), ...buildArgs], source);
      else run('pnpm', ['exec', 'slidev', ...buildArgs], source);
    }
    // Literal img/ URLs in HTML/frontmatter are not necessarily bundled by Vite.
    // Supplement imported snapshots too, without changing their compiled JS/CSS.
    if (entry.source) {
      const images = path.join(safePath(root, entry.source), 'img');
      if (fs.existsSync(images)) fs.cpSync(images, path.join(built, 'img'), { recursive: true });
    }
    if (!fs.existsSync(path.join(built, 'index.html'))) throw new Error(`Missing index.html for ${entry.slug}`);
    // A failed build leaves the last working copy and its state intact.
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.rmSync(target, { recursive: true, force: true });
    fs.renameSync(built, target);
    fs.mkdirSync(path.dirname(state), { recursive: true });
    fs.writeFileSync(state, JSON.stringify({ key: cacheKey(entry, config, root) }) + '\n');
    return target;
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
}
export function assembleSite(config: StaticConfig, root = repoRoot): void {
  const destination = outputDir(config, root);
  const staging = `${destination}.tmp`;
  fs.rmSync(staging, { recursive: true, force: true });
  fs.mkdirSync(path.join(staging, 'slides'), { recursive: true });
  try {
    for (const entry of config.presentations) {
      const source = path.join(safePath(root, config.cacheDir), 'slides', entry.slug);
      if (fs.existsSync(path.join(source, 'index.html'))) fs.cpSync(source, path.join(staging, 'slides', entry.slug), { recursive: true });
    }
    generateStaticIndex({ directory: staging, readme: false, config, root });
    fs.rmSync(destination, { recursive: true, force: true });
    fs.renameSync(staging, destination);
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
  }
}
export function main(args = process.argv.slice(2)) {
  const config = loadConfig();
  const selectors = args.filter(arg => !arg.startsWith('--'));
  if (selectors.length > 1) throw new Error('Specify at most one presentation');
  const selector = selectors[0];
  const known = new Set(['--force', '--install', '--plan']);
  for (const arg of args) if (arg.startsWith('--') && !known.has(arg)) throw new Error(`Unknown option: ${arg}`);
  const entries = selectPresentations(config, selector);
  if (args.includes('--plan')) {
    for (const entry of entries) console.log(`${entry.slug}\t${entry.source ?? '(archive only)'}\t${cacheKey(entry, config)}`);
    return;
  }
  for (const entry of entries) ensurePresentation(entry, config, { force: args.includes('--force'), install: args.includes('--install') });
  assembleSite(config);
  console.log(`Site: ${outputDir(config)}`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; }
}
