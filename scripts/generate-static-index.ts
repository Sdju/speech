#!/usr/bin/env node

/** Generates the hub from assembled artifacts and README from the publication registry. */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadConfig, outputDir, repoRoot } from './static-site.ts';
import type { StaticConfig } from './static-site.ts';

interface SlideEntry {
  dir: string;
  title: string;
  href: string;
  year: string;
}

function readTitle(indexHtmlPath: string, fallback: string): string {
  try {
    const html = fs.readFileSync(indexHtmlPath, 'utf8');
    const match = html.match(/<title>([^<]*)<\/title>/i);
    if (!match?.[1]) return fallback;
    return match[1].replace(/\s*-\s*Slidev\s*$/i, '').trim() || fallback;
  } catch {
    return fallback;
  }
}

function yearOf(dir: string): string {
  const m = dir.match(/^(\d{4})(?:_|$)/);
  return m?.[1] ?? 'other';
}

function discoverSlides(directory: string, config: StaticConfig): SlideEntry[] {
  const SLIDES_DIR = path.join(directory, 'slides');
  if (!fs.existsSync(SLIDES_DIR)) return [];

  return fs
    .readdirSync(SLIDES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && config.presentations.some(entry => entry.slug === e.name))
    .map((e) => {
      const indexHtml = path.join(SLIDES_DIR, e.name, 'index.html');
      if (!fs.existsSync(indexHtml)) return null;
      return {
        dir: e.name,
        title: readTitle(indexHtml, e.name),
        href: `${config.base}slides/${e.name}/`,
        year: yearOf(e.name),
      } satisfies SlideEntry;
    })
    .filter((e): e is SlideEntry => e !== null)
    .sort((a, b) => {
      if (a.year !== b.year) {
        if (a.year === 'other') return -1;
        if (b.year === 'other') return 1;
        return b.year.localeCompare(a.year);
      }
      return a.dir.localeCompare(b.dir, 'ru');
    });
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderHtml(entries: SlideEntry[]): string {
  const byYear = new Map<string, SlideEntry[]>();
  for (const entry of entries) {
    const list = byYear.get(entry.year) ?? [];
    list.push(entry);
    byYear.set(entry.year, list);
  }

  const yearKeys = [...byYear.keys()].sort((a, b) => {
    if (a === 'other') return -1;
    if (b === 'other') return 1;
    return b.localeCompare(a);
  });

  const sections = yearKeys
    .map((year) => {
      const label = year === 'other' ? 'Без года в имени папки' : year;
      const items = (byYear.get(year) ?? [])
        .map(
          (e) => `        <li>
          <a href="${escapeHtml(e.href)}">${escapeHtml(e.title)}</a>
          <code>${escapeHtml(e.dir)}</code>
        </li>`,
        )
        .join('\n');
      return `      <section>
        <h2>${escapeHtml(label)}</h2>
        <ul>
${items}
        </ul>
      </section>`;
    })
    .join('\n\n');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>speech — доклады</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #0f1115;
      --fg: #e8eaed;
      --muted: #9aa0a6;
      --link: #8ab4f8;
      --line: #2a2f3a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: var(--bg);
      color: var(--fg);
      line-height: 1.5;
    }
    main {
      max-width: 52rem;
      margin: 0 auto;
      padding: 2.5rem 1.25rem 4rem;
    }
    h1 { font-size: 1.75rem; font-weight: 650; margin: 0 0 0.35rem; }
    .sub { color: var(--muted); margin: 0 0 2rem; }
    h2 {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 2rem 0 0.75rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid var(--line);
    }
    ul { list-style: none; margin: 0; padding: 0; }
    li {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.5rem 1rem;
      padding: 0.55rem 0;
      border-bottom: 1px solid var(--line);
    }
    a {
      color: var(--link);
      text-decoration: none;
      font-weight: 500;
    }
    a:hover { text-decoration: underline; }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.8rem;
      color: var(--muted);
    }
    .empty { color: var(--muted); }
  </style>
</head>
<body>
  <main>
    <h1>speech</h1>
    <p class="sub">Собранные доклады · ссылки на статику</p>
${
  entries.length === 0
    ? '    <p class="empty">Пока нет собранных докладов.</p>'
    : sections
}
  </main>
</body>
</html>
`;
}

function renderReadme(entries: SlideEntry[], config: StaticConfig, root: string): string {
  const template = fs.readFileSync(path.join(root, 'README.template.md'), 'utf8');
  const placeholder = '{{SLIDES_TABLE}}';
  if (!template.includes(placeholder)) {
    throw new Error(`README.template.md must contain ${placeholder}`);
  }
  const escapeCell = (text: string): string => text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('|', '&#124;')
    .replace(/[\r\n]+/g, ' ');
  const table = [
    '| Год | Доклад | Слайды |',
    '| --- | --- | --- |',
    ...entries.map((entry) =>
      `| ${entry.year === 'other' ? '—' : entry.year} | ${escapeCell(entry.title)} | [открыть](${config.origin}${encodeURI(entry.href).replaceAll('(', '%28').replaceAll(')', '%29')}) |`,
    ),
  ].join('\n');
  return template.replaceAll(placeholder, () => table);
}

export function generateStaticIndex(options: { directory?: string; readme?: boolean; config?: StaticConfig; root?: string } = {}): { count: number; path: string } {
  const config = options.config ?? loadConfig();
  const root = options.root ?? repoRoot;
  const directory = options.directory ?? outputDir(config, root);
  const entries = discoverSlides(directory, config);
  fs.mkdirSync(directory, { recursive: true });
  const index = path.join(directory, 'index.html');
  fs.writeFileSync(index, renderHtml(entries), 'utf8');
  if (options.readme !== false) {
    const published = config.presentations.map(entry => ({
      dir: entry.slug, title: entry.title, href: `${config.base}slides/${entry.slug}/`, year: yearOf(entry.slug),
    })).sort((a, b) => b.year.localeCompare(a.year) || a.dir.localeCompare(b.dir, 'ru'));
    fs.writeFileSync(path.join(root, 'README.md'), renderReadme(published, config, root), 'utf8');
  }
  return { count: entries.length, path: index };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = generateStaticIndex();
  console.log(`Wrote ${result.path} (${result.count} slides) and README.md`);
}
