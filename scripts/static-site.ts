import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export interface Presentation {
  slug: string;
  source?: string;
  title: string;
  archiveHash?: string;
}
export interface StaticConfig {
  outputDir: string;
  cacheDir: string;
  base: string;
  origin: string;
  archive: { ref: string; directory: string; base: string };
  presentations: Presentation[];
}
export function loadConfig(root = repoRoot): StaticConfig {
  const config: StaticConfig = JSON.parse(fs.readFileSync(path.join(root, 'static.config.json'), 'utf8'));
  if (!/^(?:\/|\/[\w/-]+\/)$/.test(config.base)) throw new Error('base must be an absolute URL path ending with /');
  if (!/^[a-f0-9]{40}$/.test(config.archive.ref)) throw new Error('archive.ref must be a pinned Git commit SHA');
  safePath(root, config.archive.directory);
  for (const field of ['outputDir', 'cacheDir'] as const) {
    safePath(root, config[field]);
  }
  const slugs = new Set<string>();
  for (const entry of config.presentations) {
    if (!/^[\p{L}\p{N}_-]+$/u.test(entry.slug) || slugs.has(entry.slug)) {
      throw new Error(`Invalid or duplicate slug: ${entry.slug}`);
    }
    slugs.add(entry.slug);
    if (entry.source) safePath(root, entry.source);
  }
  const output = safePath(root, config.outputDir);
  const cache = safePath(root, config.cacheDir);
  const overlaps = (a: string, b: string) => a === b || a.startsWith(`${b}${path.sep}`) || b.startsWith(`${a}${path.sep}`);
  if (overlaps(output, cache) || config.presentations.some(entry => entry.source &&
    (overlaps(output, safePath(root, entry.source)) || overlaps(cache, safePath(root, entry.source))))) {
    throw new Error('Output, cache and presentation source directories must be separate');
  }
  return config;
}
export function safePath(root: string, relative: string): string {
  const resolved = path.resolve(root, relative);
  if (!relative || path.isAbsolute(relative) || !resolved.startsWith(`${path.resolve(root)}${path.sep}`)) {
    throw new Error(`Path must be inside repository: ${relative}`);
  }
  return resolved;
}
export function outputDir(config: StaticConfig, root = repoRoot): string {
  return safePath(root, config.outputDir);
}
// Git supplies tracked files and non-ignored new files; mtimes and node_modules never affect the key.
export function sourceHash(entry: Presentation, root = repoRoot): string {
  if (!entry.source) return 'archive';
  const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', entry.source], { cwd: root })
    .toString().split('\0').filter(Boolean).sort();
  const hash = createHash('sha256');
  for (const file of [...new Set(files)]) {
    const filename = path.join(root, file);
    if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) continue;
    const relative = path.relative(entry.source, file);
    // Planning notes and documentation do not participate in the rendered presentation.
    if (relative.startsWith('collected/') || /(^|\/)README(?:\.[^/]*)?$/.test(relative) || /(^|\/)\.gitignore$/.test(relative)) continue;
    // Their generator scripts and icon declarations are inputs; generated CSS is an output.
    if (/^theme\/styles\/(?:point|toolbar)-icons\.css$/.test(relative)) continue;
    hash.update(relative).update('\0').update(fs.readFileSync(filename)).update('\0');
  }
  return hash.digest('hex');
}
export function cacheKey(entry: Presentation, config: StaticConfig, root = repoRoot): string {
  return createHash('sha256').update(JSON.stringify({
    version: 1, source: sourceHash(entry, root), base: config.base, slug: entry.slug,
    archive: entry.source ? undefined : config.archive,
  })).digest('hex');
}
export function selectPresentations(config: StaticConfig, selector?: string): Presentation[] {
  if (!selector) return config.presentations;
  const normalized = selector.replace(/\/$/, '');
  const entry = config.presentations.find(entry => entry.slug === normalized || entry.source === normalized);
  if (!entry) throw new Error(`Unknown presentation: ${selector}. Add it to static.config.json first.`);
  return [entry];
}
