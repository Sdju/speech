import { spawn, type ChildProcess } from 'node:child_process';
import * as net from 'node:net';

export type ProcessStatus = 'running' | 'starting' | 'stopped' | 'error';

export interface RunningProcess {
  id: string;
  cwd: string;
  port: number;
  status: ProcessStatus;
  pid?: number;
  startedAt?: number;
  error?: string;
  logs: string[];
  child?: ChildProcess;
}

const MAX_LOG_LINES = 200;
const BASE_PORT = 3030;

export class PresentationManager {
  private processes = new Map<string, RunningProcess>();

  list(): RunningProcess[] {
    return [...this.processes.values()];
  }

  get(id: string): RunningProcess | undefined {
    return this.processes.get(id);
  }

  async start(id: string, cwd: string): Promise<RunningProcess> {
    const existing = this.processes.get(id);
    if (existing?.status === 'running' || existing?.status === 'starting') {
      return existing;
    }

    const port = await findFreePort(BASE_PORT);
    const proc: RunningProcess = {
      id,
      cwd,
      port,
      status: 'starting',
      startedAt: Date.now(),
      logs: [],
    };
    this.processes.set(id, proc);

    const child = spawn('pnpm', ['dev', '--', '--port', String(port), '--open', 'false'], {
      cwd,
      env: { ...process.env, FORCE_COLOR: '0' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    proc.child = child;
    proc.pid = child.pid;

    const appendLog = (line: string) => {
      proc.logs.push(line);
      if (proc.logs.length > MAX_LOG_LINES) proc.logs.shift();
    };

    child.stdout?.on('data', (chunk: Buffer) => {
      const text = chunk.toString();
      text.split('\n').filter(Boolean).forEach(appendLog);
      if (proc.status === 'starting' && /localhost:\d+/.test(text)) {
        proc.status = 'running';
      }
    });

    child.stderr?.on('data', (chunk: Buffer) => {
      chunk.toString().split('\n').filter(Boolean).forEach((line) => appendLog(`[stderr] ${line}`));
    });

    child.on('spawn', () => {
      setTimeout(() => {
        if (proc.status === 'starting') proc.status = 'running';
      }, 3000);
    });

    child.on('error', (err) => {
      proc.status = 'error';
      proc.error = err.message;
      appendLog(`[error] ${err.message}`);
    });

    child.on('exit', (code) => {
      appendLog(`[exit] code ${code ?? 'null'}`);
      proc.status = code === 0 || code === null ? 'stopped' : 'error';
      proc.child = undefined;
      proc.pid = undefined;
      if (code !== 0 && code !== null) proc.error = `exit code ${code}`;
    });

    return proc;
  }

  stop(id: string): boolean {
    const proc = this.processes.get(id);
    if (!proc?.child) {
      if (proc) {
        proc.status = 'stopped';
        proc.child = undefined;
        proc.pid = undefined;
      }
      return false;
    }

    proc.child.kill('SIGTERM');
    setTimeout(() => proc.child?.kill('SIGKILL'), 5000);
    return true;
  }

  stopAll(): void {
    for (const proc of this.processes.values()) {
      if (proc.child) proc.child.kill('SIGTERM');
    }
  }
}

function findFreePort(start: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const tryPort = (port: number) => {
      const server = net.createServer();
      server.unref();
      server.once('error', () => tryPort(port + 1));
      server.listen(port, '127.0.0.1', () => {
        server.close((err) => {
          if (err) reject(err);
          else resolve(port);
        });
      });
    };
    tryPort(start);
  });
}
