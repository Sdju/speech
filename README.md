# speech

Доклады на [Slidev](https://sli.dev). Каждая презентация — отдельный пакет в `{year}/{n}_{conf}_{title}/`.

## Собранные доклады

**Все слайды: <https://sdju.github.io/speech/>**

Актуальный доклад: **«Вам (не) нужны микрофронтенды»** — <https://sdju.github.io/speech/slides/2026_holyjs_you-dont-need-microfrontends/>

| Год | Доклад | Слайды |
| --- | --- | --- |
| 2026 | CSS скоупинг от А до Я | [открыть](https://sdju.github.io/speech/slides/2026_draft_css-%D1%81%D0%BA%D0%BE%D1%83%D0%BF%D0%B8%D0%BD%D0%B3-%D0%BE%D1%82-%D0%B0-%D0%B4%D0%BE-%D1%8F/) |
| 2026 | Вам (не) нужны микрофронтенды | [открыть](https://sdju.github.io/speech/slides/2026_holyjs_you-dont-need-microfrontends/) |
| 2026 | Вкусы реактивности | [открыть](https://sdju.github.io/speech/slides/2026_msk-vuejs_%D0%B2%D0%BA%D1%83%D1%81%D1%8B-%D1%80%D0%B5%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D1%81%D1%82%D0%B8/) |
| 2025 | Созвездия композаблов | [открыть](https://sdju.github.io/speech/slides/2025_holy_composables-constellation/) |
| 2025 | Жулик не воруй | [открыть](https://sdju.github.io/speech/slides/2025_holy-open_no-swiping/) |
| 2025 | Frontend 2026: недалёкое будущее | [открыть](https://sdju.github.io/speech/slides/2025_ith_frontend-2026/) |
| 2025 | Магия композаблов | [открыть](https://sdju.github.io/speech/slides/2025_msk-vuejs_magick-of-composables/) |
| 2025 | История реактивности Frontend | [открыть](https://sdju.github.io/speech/slides/2025_secon_history-of-reactivity/) |
| 2025 | Состояние фронтенда на 2025 год | [открыть](https://sdju.github.io/speech/slides/2025_ufadevconf_the-state-of-frontend/) |
| 2024 | Шестеренки реактивности Vue | [открыть](https://sdju.github.io/speech/slides/2024_holy_gears-of-vue-reactivity/) |
| 2024 | The Progressive Path | [открыть](https://sdju.github.io/speech/slides/2024_holy-spring_vue-renderer/) |
| 2024 | The Progressive Path | [открыть](https://sdju.github.io/speech/slides/2024_msk-vuejs_50-shades-of-vue-reactivity/) |
| 2024 | The Progressive Path | [открыть](https://sdju.github.io/speech/slides/2024_omsk_safe-ts/) |
| 2024 | The Progressive Path | [открыть](https://sdju.github.io/speech/slides/2024_skillbox_safe-ts/) |
| 2024 | The Progressive Path | [открыть](https://sdju.github.io/speech/slides/2024_stachka_js-that-do-not-exist/) |
| 2024 | История фронтенда | [открыть](https://sdju.github.io/speech/slides/2024_twitch_frontend-history/) |
| 2024 | Safe TS | [открыть](https://sdju.github.io/speech/slides/2024_ufadevconf_safe-ts/) |
| 2024 | Safe TS | [открыть](https://sdju.github.io/speech/slides/2024_ufadevconf_safe-ts-light/) |

`README.md` генерируется из `README.template.md`, а таблица — из `static.config.json`.
Обновить README и индекс уже собранного сайта: `pnpm static:index`.

## Статический сайт

```bash
pnpm static:build                      # собрать сайт: архив/кеш + изменённые доклады
pnpm static:build --plan               # показать реестр и ключи кеша, без сборки
pnpm static:build 2026_holyjs_you-dont-need-microfrontends
pnpm static:build 2026_holyjs_you-dont-need-microfrontends --force
pnpm static:build --install            # установить зависимости только пересобираемых докладов
pnpm static:test
```

Пути сайта, кеша, URL и список публикаций задаются в `static.config.json`.
По умолчанию готовый сайт находится в `dist/site/`, а сборки отдельных докладов — в
`.cache/static/`. Оба каталога игнорируются Git. `pnpm build` внутри опубликованного
доклада использует тот же сборщик. При сборке одного доклада остальные доступные
сборки остаются в хабе; на чистой машине для полного хаба выполните `pnpm static:build`.
При настройке других каталогов результата/кеша добавьте их в `.gitignore`.

Ключ каждого доклада учитывает содержимое исходников, новые и удалённые файлы,
локальную тему/addon, зависимости/lockfile и URL base. `node_modules`, игнорируемые
Git файлы, README и `collected/` не участвуют. Общий хаб пересоздаётся без Slidev.
Файлы, необходимые для сборки, должны быть в Git или не исключены `.gitignore`.

Для перехода 17 ранее опубликованных сборок закреплены в `archive.ref`
реестра. При пустом кеше они извлекаются через `git archive`, без установки
зависимостей и пересборки. `archiveHash` обозначает исходники на момент перехода:
это сохранение прежней публикации, а не гарантия, что старый бинарник был собран
из этих исходников. При изменении исходников доклад собирается заново; на следующих
запусках используется кеш. Чтобы навсегда отказаться от архивной версии конкретного
доклада, удалите его `archiveHash`. Доклад без `source` сохраняется только как архив.
`--force` игнорирует кеш для выбранного доклада, но не меняет политику архива.

Архив требует доступного Git-коммита `archive.ref` (в CI используется полный checkout).
История Git сохраняется; её переписывать не требуется. После очистки кеша изменённые
доклады могут потребовать повторной сборки, неизменившиеся восстанавливаются из архива.
Для lockfile v6 установка использует pnpm 8.15.9, для v9 — установленный pnpm.
Старые Slidev 0.x собираются отдельным Node 20.20.2; основной сборщик работает на Node 24.
Браузеры Playwright для статической сборки не скачиваются.

GitHub Actions восстанавливает кеш, собирает изменённые доклады и публикует весь
`dist/site/` одним Pages artifact. В ручном запуске workflow можно указать доклад для
принудительной пересборки. Ошибка сборки останавливает публикацию; рабочий локальный
результат сохраняется. Новый доклад, созданный через `presentation:create`, автоматически
добавляется в реестр; исторический пакет можно добавить туда вручную с `slug`, `source`,
`title`. Удаление записи удаляет доклад из следующего собранного сайта.

## Локальный запуск

```bash
# новый доклад
pnpm presentation:create -c <conf> -t "<english-title>" -y <year>

# внутри <year>/<talk>/
pnpm install
pnpm dev      # превью
pnpm build    # сборка
```
