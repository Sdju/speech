export function renderDashboard(): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Presentation Runner</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font: 14px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: #0d1117;
      color: #c9d1d9;
    }
    header {
      padding: 16px 24px;
      border-bottom: 1px solid #21262d;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    h1 { margin: 0; font-size: 16px; font-weight: 600; color: #f0f6fc; }
    .muted { color: #8b949e; font-size: 12px; }
    main { padding: 16px 24px 48px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #21262d; vertical-align: middle; }
    th { color: #8b949e; font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
    tr:hover td { background: #161b22; }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge.running { background: #23863633; color: #3fb950; }
    .badge.starting { background: #9e6a0333; color: #d29922; }
    .badge.stopped { background: #30363d; color: #8b949e; }
    .badge.error { background: #da363333; color: #f85149; }
    .actions { display: flex; gap: 6px; flex-wrap: wrap; }
    button, a.btn {
      appearance: none;
      border: 1px solid #30363d;
      background: #21262d;
      color: #c9d1d9;
      border-radius: 6px;
      padding: 4px 10px;
      font: inherit;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    button:hover, a.btn:hover { background: #30363d; border-color: #8b949e; }
    button.primary { background: #238636; border-color: #238636; color: #fff; }
    button.primary:hover { background: #2ea043; }
    button.danger { background: #da3633; border-color: #da3633; color: #fff; }
    button.danger:hover { background: #f85149; }
    button:disabled { opacity: .45; cursor: not-allowed; }
    .name { color: #f0f6fc; font-weight: 600; }
    .path { color: #8b949e; font-size: 12px; }
    .warn { color: #d29922; font-size: 12px; }
    #logs {
      display: none;
      position: fixed; inset: 0; background: #010409cc;
      align-items: center; justify-content: center; padding: 24px;
    }
    #logs.open { display: flex; }
    .logs-panel {
      width: min(900px, 100%);
      max-height: 80vh;
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 8px;
      display: flex; flex-direction: column;
    }
    .logs-header {
      padding: 12px 16px;
      border-bottom: 1px solid #21262d;
      display: flex; justify-content: space-between; align-items: center;
    }
    .logs-body {
      padding: 12px 16px;
      overflow: auto;
      white-space: pre-wrap;
      font-size: 12px;
      color: #8b949e;
      flex: 1;
    }
    .empty { padding: 48px; text-align: center; color: #8b949e; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>Presentation Runner</h1>
      <div class="muted">Запуск и контроль dev-серверов Slidev</div>
    </div>
    <div class="muted" id="updated">—</div>
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th>Презентация</th>
          <th>Статус</th>
          <th>Порт</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody id="rows">
        <tr><td colspan="4" class="empty">Загрузка…</td></tr>
      </tbody>
    </table>
  </main>

  <div id="logs">
    <div class="logs-panel">
      <div class="logs-header">
        <strong id="logs-title">Логи</strong>
        <button onclick="closeLogs()">Закрыть</button>
      </div>
      <div class="logs-body" id="logs-body"></div>
    </div>
  </div>

  <script>
    const rows = document.getElementById('rows');
    const updated = document.getElementById('updated');

    async function api(path, options) {
      const res = await fetch(path, options);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText);
      }
      return res.json();
    }

    function badge(status) {
      const label = { running: 'running', starting: 'starting', stopped: 'stopped', error: 'error' }[status] || 'stopped';
      return '<span class="badge ' + label + '">' + label + '</span>';
    }

    function actions(item) {
      const id = encodeURIComponent(item.id);
      const running = item.status === 'running' || item.status === 'starting';
      const open = item.port ? '<a class="btn" href="http://localhost:' + item.port + '" target="_blank" rel="noopener">Открыть</a>' : '';
      const start = running
        ? '<button class="danger" onclick="stop(\\'' + id + '\\')">Стоп</button>'
        : '<button class="primary" onclick="start(\\'' + id + '\\')"' + (item.hasDeps ? '' : ' title="Нет node_modules"') + '>Старт</button>';
      const logs = '<button onclick="showLogs(\\'' + id + '\\', \\'' + item.name.replace(/'/g, "\\\\'") + '\\')">Логи</button>';
      return '<div class="actions">' + start + open + logs + '</div>';
    }

    function render(items) {
      if (!items.length) {
        rows.innerHTML = '<tr><td colspan="4" class="empty">Презентации не найдены</td></tr>';
        return;
      }
      rows.innerHTML = items.map((item) => \`
        <tr>
          <td>
            <div class="name">\${item.year} / \${item.name}</div>
            <div class="path">\${item.id}</div>
            \${item.hasDeps ? '' : '<div class="warn">node_modules не установлены — pnpm install в папке презентации</div>'}
          </td>
          <td>\${badge(item.status)}</td>
          <td>\${item.port ?? '—'}</td>
          <td>\${actions(item)}</td>
        </tr>
      \`).join('');
    }

    async function refresh() {
      try {
        const data = await api('/api/presentations');
        render(data.items);
        updated.textContent = 'обновлено ' + new Date().toLocaleTimeString();
      } catch (e) {
        rows.innerHTML = '<tr><td colspan="4" class="empty">Ошибка: ' + e.message + '</td></tr>';
      }
    }

    async function start(id) {
      await api('/api/presentations/' + id + '/start', { method: 'POST' });
      await refresh();
    }

    async function stop(id) {
      await api('/api/presentations/' + id + '/stop', { method: 'POST' });
      await refresh();
    }

    async function showLogs(id, name) {
      const data = await api('/api/presentations/' + id + '/logs');
      document.getElementById('logs-title').textContent = 'Логи: ' + name;
      document.getElementById('logs-body').textContent = data.logs.join('\\n') || '(пусто)';
      document.getElementById('logs').classList.add('open');
    }

    function closeLogs() {
      document.getElementById('logs').classList.remove('open');
    }

    refresh();
    setInterval(refresh, 2000);
  </script>
</body>
</html>`;
}
