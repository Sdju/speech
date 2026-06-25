#!/usr/bin/env node

import * as http from 'node:http';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverPresentations } from './discover.ts';
import { PresentationManager } from './manager.ts';
import { renderDashboard } from './dashboard.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.RUNNER_PORT || 3100);

const manager = new PresentationManager();

function json(res: http.ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function notFound(res: http.ServerResponse): void {
  json(res, 404, { error: 'Not found' });
}

function mergeStatus() {
  const presentations = discoverPresentations(REPO_ROOT);
  const running = new Map(manager.list().map((p) => [p.id, p]));

  return presentations.map((p) => {
    const proc = running.get(p.id);
    return {
      ...p,
      status: proc?.status ?? 'stopped',
      port: proc?.port,
      pid: proc?.pid,
      error: proc?.error,
    };
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const { pathname } = url;

  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderDashboard());
    return;
  }

  if (req.method === 'GET' && pathname === '/api/presentations') {
    json(res, 200, { items: mergeStatus() });
    return;
  }

  const startMatch = pathname.match(/^\/api\/presentations\/(.+)\/start$/);
  if (req.method === 'POST' && startMatch) {
    const id = decodeURIComponent(startMatch[1]);
    const presentation = discoverPresentations(REPO_ROOT).find((p) => p.id === id);
    if (!presentation) {
      json(res, 404, { error: 'Presentation not found' });
      return;
    }
    try {
      const proc = await manager.start(id, presentation.cwd);
      json(res, 200, { ok: true, port: proc.port, status: proc.status });
    } catch (err) {
      json(res, 500, { error: err instanceof Error ? err.message : String(err) });
    }
    return;
  }

  const stopMatch = pathname.match(/^\/api\/presentations\/(.+)\/stop$/);
  if (req.method === 'POST' && stopMatch) {
    const id = decodeURIComponent(stopMatch[1]);
    manager.stop(id);
    json(res, 200, { ok: true });
    return;
  }

  const logsMatch = pathname.match(/^\/api\/presentations\/(.+)\/logs$/);
  if (req.method === 'GET' && logsMatch) {
    const id = decodeURIComponent(logsMatch[1]);
    const proc = manager.get(id);
    json(res, 200, { logs: proc?.logs ?? [] });
    return;
  }

  notFound(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Presentation Runner`);
  console.log(`  → http://localhost:${PORT}\n`);
});

function shutdown() {
  console.log('\nОстанавливаю запущенные презентации…');
  manager.stopAll();
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
