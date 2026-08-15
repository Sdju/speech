# speech — инструкции для агента

Монорепо докладов на [Slidev](https://sli.dev) (Vue + Markdown). Корневой `package.json` — только оркестрация; каждая презентация — отдельный пакет со своим `pnpm dev` / `pnpm build`.

Короткие инварианты репо. Синтаксис слайдов, фазы доклада и сабагенты — через skills/agents (их description уже в контексте); сюда не копируй каталог.

Приоритет при новом/сыром докладе: сначала фазы планирования (`tech-conference-speaking`), потом материализация (`slidev-zede-style`) — не прыгай сразу к «красивым» слайдам по всему докладу.

## Карта репо

```
_template/          # канон новой презентации (копируется скриптом)
2024|2025|2026/     # доклады: {n}_{conf}_{title}/
.samples/           # референсы / клоны (вне основного workflow слайдов)
.cursor/skills/     # рабочие skill'ы
.cursor/agents/     # сабагенты
scripts/            # presentation:create, static:index
-static/            # собранный хаб бинарных билдов
```

Внутри доклада:

```
slides.md           # entry + src: parts
parts/*.md          # секции
collected/          # brief, plan, design, questions (фаза планирования)
theme/ + addon/     # тема и локальные расширения
components/ img/    # per-talk
```

Канон стиля: `_template/` + свежие доклады в `2026/` (см. skill).

## Команды

```bash
# корень репо
pnpm presentation:create -c <conf> -t "<english-title>" -y <year>
pnpm static:index

# внутри <year>/<talk>/
pnpm install
pnpm dev
pnpm build
```

CLI: `-c/--conference`, `-t/--title`, `-y/--year`, `-n/--number`, `--skip-install`, `-h`.

## Жёсткие правила

1. **Имя папки** `{n}_{conf}_{title}`: только **латиница**, kebab-case. Русский заголовок → **английский перевод**, не транслит (`you-dont-need-microfrontends`, не `vam-ne-nuzhny-…`). Контент слайдов и `title:` в FM — по-русски.
2. **Новый доклад** → `pnpm presentation:create`, не копируй `_template` руками без причины.
3. **Контент** в `parts/`, не монолитный `slides.md`.
4. **Один драйвер кликов** на слайд (`timeline` **или** `v-click` **или** magic-move — детали в skill).
5. Планирование → `collected/`; внешние референсы → `.samples/`.
6. Язык ответов пользователю: **русский** (если не попросили иначе).

## Границы

- Не коммить секреты; не трогай git config / force-push без явной просьбы.
- Не правь чужие исходники в `.samples/` «для красоты» — только если задача про исследование/knowledge и skill это разрешает.
- Не раздувай AGENTS.md деталями Slidev — обновляй skills.

## Done means

- Соблюдены фазы (или явно согласован skip с пользователем).
- Имена путей латиницей-переводом; слайды в `parts/`.
- После материализации: `pnpm dev` в папке доклада поднимается; спорный click-flow при сомнении проверен в браузере.
