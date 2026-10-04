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
| 2024 | Safe TS | [открыть](https://sdju.github.io/speech/slides/2024_ufadevconf_safe-ts/) |
| 2024 | Safe TS | [открыть](https://sdju.github.io/speech/slides/2024_ufadevconf_safe-ts-light/) |

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
