import { spawn, type ChildProcess } from 'node:child_process';
import * as net from 'node:net';

export type ProcessStatus = 'running' | 'starting' | 'stopped' | 'error';
export type InstallStatus = 'idle' | 'installing' | 'done' | 'error';

export interface InstallJob {
  id: string;
  status: InstallStatus;
  error?: string;
  logs: string[];
  child?: ChildProcess;
}

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
  private installs = new Map<string, InstallJob>();

  list(): RunningProcess[] {
    return [...this.processes.values()];
  }

  get(id: string): RunningProcess | undefined {
    return this.processes.get(id);
  }

  getInstall(id: string): InstallJob | undefined {
    return this.installs.get(id);
  }

  async install(id: string, dirs: string[]): Promise<InstallJob> {
    const existing = this.installs.get(id);
    if (existing?.status === 'installing') return existing;

    const job: InstallJob = {
      id,
      status: 'installing',
      logs: [],
    };
    this.installs.set(id, job);

    const appendLog = (line: string) => {
      job.logs.push(line);
      if (job.logs.length > MAX_LOG_LINES) job.logs.shift();
    };

    try {
      for (const dir of dirs) {
        appendLog(`[install] ${dir}`);
        await runPnpmInstall(dir, appendLog, (child) => {
          job.child = child;
        });
      }
      job.status = 'done';
      appendLog('[install] готово');
    } catch (err) {
      job.status = 'error';
      job.error = err instanceof Error ? err.message : String(err);
      appendLog(`[error] ${job.error}`);
    } finally {
      job.child = undefined;
    }

    return job;
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

function runPnpmInstall(
  cwd: string,
  appendLog: (line: string) => void,
  onChild: (child: ChildProcess) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['install'], {
      cwd,
      env: { ...process.env, FORCE_COLOR: '0' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    onChild(child);

    child.stdout?.on('data', (chunk: Buffer) => {
      chunk.toString().split('\n').filter(Boolean).forEach(appendLog);
    });

    child.stderr?.on('data', (chunk: Buffer) => {
      chunk
        .toString()
        .split('\n')
        .filter(Boolean)
        .forEach((line) => appendLog(`[stderr] ${line}`));
    });

    child.on('error', (err) => reject(err));

    child.on('exit', (code) => {
      if (code === 0 || code === null) resolve();
      else reject(new Error(`pnpm install завершился с кодом ${code}`));
    });
  });
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
