import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { assembleSite, ensurePresentation } from './build-static.ts';
import { cacheKey, selectPresentations, sourceHash, safePath, loadConfig } from './static-site.ts';
import type { StaticConfig } from './static-site.ts';
import { generateStaticIndex } from './generate-static-index.ts';

function fixture(t: { after: (fn: () => void) => void }) {
  const root = fs.mkdtempSync(path.join(tmpdir(), 'speech-static-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file: string, content: string) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), content);
  };
  const git = (...args: string[]) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  git('init', '-q');
  write('.gitignore', 'node_modules/\n.cache/\ndist/\n');
  write('2026/talk/slides.md', '# Original');
  write('2026/talk/package.json', '{"private":true}');
  write('2026/other/slides.md', '# Other');
  write('legacy/slides/2026_talk/index.html', '<title>Original - Slidev</title>');
  write('legacy/slides/2026_other/index.html', '<title>Other - Slidev</title>');
  write('README.template.md', '# Test\n{{SLIDES_TABLE}}');
  git('add', '.');
  git('-c', 'user.name=Static test', '-c', 'user.email=static@example.invalid', 'commit', '-qm', 'fixture');
  const config: StaticConfig = {
    outputDir: 'dist/site', cacheDir: '.cache/static', base: '/speech/', origin: 'https://example.invalid',
    archive: { ref: git('rev-parse', 'HEAD'), directory: 'legacy', base: '/speech/' },
    presentations: [
      { slug: '2026_talk', source: '2026/talk', title: 'Original' },
      { slug: '2026_other', title: 'Other' },
    ],
  };
  config.presentations[0].archiveHash = sourceHash(config.presentations[0], root);
  return { root, write, config };
}

test('fingerprint tracks edits, new files, deletions and lockfile changes, independently of other talks', t => {
  const { root, write, config } = fixture(t);
  const entry = config.presentations[0];
  const initial = sourceHash(entry, root);
  write('2026/other/slides.md', 'unrelated edit');
  write('2026/talk/collected/plan.md', 'planning');
  write('2026/talk/README.md', 'documentation');
  write('2026/talk/node_modules/ignored.js', 'ignored');
  write('2026/talk/theme/styles/point-icons.css', 'generated icons');
  write('2026/talk/theme/styles/toolbar-icons.css', 'generated toolbar');
  assert.equal(sourceHash(entry, root), initial);
  write('2026/talk/components/New.vue', '<template>New</template>');
  assert.notEqual(sourceHash(entry, root), initial);
  fs.rmSync(path.join(root, '2026/talk/components'), { recursive: true });
  assert.equal(sourceHash(entry, root), initial);
  write('2026/talk/slides.md', 'edited');
  assert.notEqual(sourceHash(entry, root), initial);
  write('2026/talk/slides.md', '# Original');
  write('2026/talk/pnpm-lock.yaml', 'dependencies');
  assert.notEqual(sourceHash(entry, root), initial);
  fs.rmSync(path.join(root, '2026/talk/pnpm-lock.yaml'));
  fs.rmSync(path.join(root, '2026/talk/slides.md'));
  assert.notEqual(sourceHash(entry, root), initial);
});

test('cold cache restores pinned archive; warm cache does not rewrite output; missing output is repaired', t => {
  const { root, config } = fixture(t);
  const entry = config.presentations[0];
  const target = ensurePresentation(entry, config, { root, install: true });
  const index = path.join(target, 'index.html');
  fs.utimesSync(index, 1000, 1000);
  ensurePresentation(entry, config, { root, install: true });
  assert.equal(fs.statSync(index).mtimeMs, 1000000);
  fs.rmSync(index);
  ensurePresentation(entry, config, { root });
  assert.match(fs.readFileSync(index, 'utf8'), /Original/);
});

test('assembly preserves cached siblings and removes unregistered presentations', t => {
  const { root, config, write } = fixture(t);
  for (const entry of config.presentations) ensurePresentation(entry, config, { root });
  write('.cache/static/slides/orphan/index.html', '<title>Orphan</title>');
  assembleSite(config, root);
  const destination = path.join(root, config.outputDir);
  assert.ok(fs.existsSync(path.join(destination, 'slides/2026_other/index.html')));
  assert.ok(!fs.existsSync(path.join(destination, 'slides/orphan')));
  assert.match(fs.readFileSync(path.join(destination, 'index.html'), 'utf8'), /\/speech\/slides\/2026_talk\//);
  config.presentations.pop();
  assembleSite(config, root);
  assert.ok(!fs.existsSync(path.join(destination, 'slides/2026_other')));
});

test('failed build leaves previous working artifact and cache state intact', t => {
  const { root, config, write } = fixture(t);
  const entry = config.presentations[0];
  const target = ensurePresentation(entry, config, { root });
  const state = fs.readFileSync(path.join(root, config.cacheDir, 'state/2026_talk.json'), 'utf8');
  write('2026/talk/slides.md', 'changed');
  // An installed CLI that fails makes this an actual failing child process.
  write('2026/talk/node_modules/.bin/slidev', '#!/bin/sh\nexit 42\n');
  fs.chmodSync(path.join(root, '2026/talk/node_modules/.bin/slidev'), 0o755);
  assert.throws(() => ensurePresentation(entry, config, { root }));
  assert.match(fs.readFileSync(path.join(target, 'index.html'), 'utf8'), /Original/);
  assert.equal(fs.readFileSync(path.join(root, config.cacheDir, 'state/2026_talk.json'), 'utf8'), state);
  assert.ok(!fs.readdirSync(path.join(root, config.cacheDir)).some(name => name.startsWith('.build-')));
});

test('README uses registry with empty cache; URLs and titles are escaped', t => {
  const { root, config } = fixture(t);
  config.presentations[0].title = '<Talk> | title';
  generateStaticIndex({ root, config });
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  assert.match(readme, /&lt;Talk&gt; &#124; title/);
  assert.match(readme, /https:\/\/example.invalid\/speech\/slides\/2026_talk\//);
  assert.match(readme, /Other/);
});

test('base changes invalidate cache; archive-only entries cannot silently use wrong URLs', t => {
  const { root, config } = fixture(t);
  const before = cacheKey(config.presentations[0], config, root);
  config.base = '/different/';
  assert.notEqual(cacheKey(config.presentations[0], config, root), before);
  assert.throws(() => ensurePresentation(config.presentations[1], config, { root }), /requires base/);
});

test('selectors and configuration reject unknown, duplicate and escaping paths', t => {
  const { root, config, write } = fixture(t);
  assert.equal(selectPresentations(config, '2026/talk/')[0].slug, '2026_talk');
  assert.throws(() => selectPresentations(config, 'unknown'), /Unknown/);
  assert.throws(() => safePath(root, '../outside'), /inside repository/);
  config.presentations.push(config.presentations[0]);
  write('static.config.json', JSON.stringify(config));
  assert.throws(() => loadConfig(root), /duplicate slug/);
});

test('changed presentation builds once and serves literal img URLs while siblings stay cached', t => {
  const { root, config, write } = fixture(t);
  for (const entry of config.presentations) ensurePresentation(entry, config, { root });
  write('2026/talk/slides.md', 'Changed');
  write('2026/talk/img/photo.png', 'image fixture');
  write('2026/talk/node_modules/.bin/slidev', `#!/bin/sh
while [ "$#" -gt 0 ]; do
  if [ "$1" = '--out' ]; then shift; result_dir="$1"; fi
  shift
done
mkdir -p "$result_dir"
printf '<title>Changed</title>' > "$result_dir/index.html"
`);
  fs.chmodSync(path.join(root, '2026/talk/node_modules/.bin/slidev'), 0o755);
  const sibling = path.join(root, config.cacheDir, 'slides/2026_other/index.html');
  fs.utimesSync(sibling, 1000, 1000);
  for (const entry of config.presentations) ensurePresentation(entry, config, { root });
  const index = path.join(root, config.cacheDir, 'slides/2026_talk/index.html');
  assert.match(fs.readFileSync(index, 'utf8'), /Changed/);
  assert.equal(fs.statSync(sibling).mtimeMs, 1000000);
  assert.equal(fs.readFileSync(path.join(root, config.cacheDir, 'slides/2026_talk/img/photo.png'), 'utf8'), 'image fixture');
  fs.utimesSync(index, 1000, 1000);
  ensurePresentation(config.presentations[0], config, { root });
  assert.equal(fs.statSync(index).mtimeMs, 1000000);
});

test('presentation:create registers the new source and keeps static slug independent of order number', t => {
  const { root, config, write } = fixture(t);
  write('static.config.json', JSON.stringify(config));
  write('_template/package.json', '{"private":true}');
  write('_template/slides.md', '# New');
  const creator = fs.readFileSync(new URL('./create-presentation.ts', import.meta.url), 'utf8');
  write('scripts/create-presentation.ts', creator);
  execFileSync(process.execPath, ['scripts/create-presentation.ts', '-c', 'test-conf', '-t', 'Test Talk', '-y', '2099', '--skip-install'], { cwd: root });
  const registered = loadConfig(root).presentations.at(-1)!;
  assert.equal(registered.slug, '2099_test-conf_test-talk');
  assert.equal(registered.source, '2099/1_test-conf_test-talk');
  assert.ok(fs.existsSync(path.join(root, registered.source!, 'slides.md')));
});
