import * as fs from 'node:fs';
import * as path from 'node:path';

export interface Presentation {
  id: string;
  name: string;
  year: string;
  cwd: string;
  hasDeps: boolean;
}

function readPackageJson(dir: string): { scripts?: { dev?: string } } | null {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch {
    return null;
  }
}

function isSlidevPresentation(dir: string): boolean {
  const pkg = readPackageJson(dir);
  return Boolean(pkg?.scripts?.dev?.includes('slidev'));
}

function walkSlides(root: string, onFound: (slidesPath: string) => void): void {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;

    const dir = path.join(root, entry.name);
    const slidesPath = path.join(dir, 'slides.md');

    if (fs.existsSync(slidesPath)) {
      onFound(slidesPath);
      continue;
    }

    walkSlides(dir, onFound);
  }
}

export function discoverPresentations(repoRoot: string): Presentation[] {
  const presentations: Presentation[] = [];

  const yearDirs = fs
    .readdirSync(repoRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^\d{4}$/.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => b.localeCompare(a));

  for (const year of yearDirs) {
    walkSlides(path.join(repoRoot, year), (slidesPath) => {
      const cwd = path.dirname(slidesPath);
      if (!isSlidevPresentation(cwd)) return;

      const rel = path.relative(repoRoot, cwd);
      const name = rel.split(path.sep).slice(1).join('/') || path.basename(cwd);

      presentations.push({
        id: rel,
        name,
        year,
        cwd,
        hasDeps: fs.existsSync(path.join(cwd, 'node_modules')),
      });
    });
  }

  return presentations.sort((a, b) => {
    if (a.year !== b.year) return b.year.localeCompare(a.year);
    return a.name.localeCompare(b.name, 'ru');
  });
}
