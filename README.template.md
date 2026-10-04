# speech

Доклады на [Slidev](https://sli.dev). Каждая презентация — отдельный пакет в `{year}/{n}_{conf}_{title}/`.

## Собранные доклады

**Все слайды: <https://sdju.github.io/speech/>**

Актуальный доклад: **«Вам (не) нужны микрофронтенды»** — <https://sdju.github.io/speech/slides/2026_holyjs_you-dont-need-microfrontends/>

{{SLIDES_TABLE}}

`README.md` генерируется из `README.template.md`: текст правьте в шаблоне, таблица заполняется из `-static/slides/`. Обновить README и хаб: `pnpm static:index`.

Хаб `/speech/` генерируется скриптом `pnpm static:index` и деплоится на GitHub Pages из `-static/` через `.github/workflows/deploy.yml`.

## Локальный запуск

```bash
# новый доклад
pnpm presentation:create -c <conf> -t "<english-title>" -y <year>

# внутри <year>/<talk>/
pnpm install
pnpm dev      # превью
pnpm build    # сборка
```
