# speech

Доклады на [Slidev](https://sli.dev). Каждая презентация — отдельный пакет в `{year}/{n}_{conf}_{title}/`.

## Собранные доклады

**Все слайды: <https://sdju.github.io/speech/slides/>**

Актуальный доклад: **«Вам (не) нужны микрофронтенды»** — <https://sdju.github.io/speech/slides/2026_holyjs_you-dont-need-microfrontends/>

| Год | Доклад | Слайды |
| --- | --- | --- |
| 2026 | CSS скоупинг от А до Я | [открыть](https://sdju.github.io/speech/slides/2026_draft_css-скоупинг-от-а-до-я/) |
| 2026 | Вам (не) нужны микрофронтенды | [открыть](https://sdju.github.io/speech/slides/2026_holyjs_you-dont-need-microfrontends/) |
| 2026 | Вкусы реактивности | [открыть](https://sdju.github.io/speech/slides/2026_msk-vuejs_вкусы-реактивности/) |
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

Хаб `/slides/` генерируется скриптом `pnpm static:index` и деплоится на GitHub Pages из `-static/` через `.github/workflows/deploy.yml`.

## Локальный запуск

```bash
# новый доклад
pnpm presentation:create -c <conf> -t "<english-title>" -y <year>

# внутри <year>/<talk>/
pnpm install
pnpm dev      # превью
pnpm build    # сборка
```
