# Reference: Slidev zede-style

К [SKILL.md](SKILL.md).

## Создание

```bash
pnpm presentation:create -c msk-vuejs -t "Вкусы реактивности" -y 2026
```

`build.ts` → `-static/slides/{year}_{conf}_{title}/…` (без порядкового номера папки), `base` `/speech/slides/{year}_{conf}_{title}/…`.  
После сборки обновляет разводящую `-static/index.html` (`pnpm static:index` / `scripts/generate-static-index.ts`).

## Frontmatter (custom)

`timeline`, `slideClass`, `topTitle`/`topTitleClass`, `growSeed`/`growOpacity`/`growBlur` — не upstream.  
`addons: ['@/addon']` — alias. `class` ≠ `slideClass`.

## Points — детали драйверов

### Какой `components/points/` копировать

| Драйвер | Откуда | Отличия |
|---------|--------|---------|
| A (v-click) | `2026/2_msk-vuejs_вкусы-реактивности` | `:has(.point-full)`, есть `attrs` |
| B (outline) | `2025/msk-vuejs_magick-of-composables` | всегда 2×4; нет attrs; + `Example` |
| C/D (attrs) | `2025/holy_…` или `ufadevconf_…` | `attrs` active/hidden; D + `exampleId` |

### Sync timeline ↔ magic-move

1. Число кликов = `timeline.length - 1` = `fences - 1`.
2. Step 0: point1 active/outline, остальные hidden; example `pos-0 fx duration-500` (+ cs).
3. Шаг i: снять active с i−1, дать i; сменить `example` class и/или `exampleId`.
4. На пунктах нет `v-click`.

### Outline-строки (B)

- Активный: `outline outline-2 outline-[#CCCCCC88]`
- Неактивный видимый: `outline-[#00000088]`
- Скрытый: `-blur-hidden outline-[#00000088]`

## magic-move — pad

Канон равных counts: `2025/holy_composables-constellation/parts/4_basics.md`, `5_specific.md`.  
Braille pad в sidebar: `parts/2_intro.md` (`⠀`).  
Минимальный token-diff: magick `4_specific_techniques.md` (`onUnmounted`→`onScopeDispose`, 9=9 строк).

`{lines: false}` — Point full. Full-slide — с line numbers + pad.

## Диаграммы — детали

### SvgArrow

- `coords: 'x1:y1 x2:y2'` или `start`/`end`
- `%` считается от sizes SvgLayer (960×552)
- `.animate path` — stroke draw (`SvgArrow.vue`)
- `endArrow` default true; `dashed`; `power` = кривизна

### Node

Typed color green|blue|red; presets также orange/purple/gray/transparent (для генерации — typed).  
`multiple: true` — стопка (Reducers). `solid` — заливка для circle-токенов.

### Хореография-шаблоны

| Talk | Паттерн |
|------|---------|
| intro вкусы / template advanced | build-up из центра + стрелки animate |
| redux | старт уже 3 узла; клики = rename + block4 + multiple |
| rxjs | scale/opacity reveal mid-nodes на линии |
| signals | всё hidden → блоками → arrows |

### CoordHelper

DEV only. `$obj` / timeline keys → `data-editname`. Apply = текущий click-step. Стрелки после drag — править `coords`.

## Bento

`bento-{cols}_{rows}` = col-span + row-span + `relative of-hidden`.  
Ячейки: `box box--rich cs-*`. Reveal: timeline class на `:class="t.boxN"`.

## Пути

| Что | Где |
|-----|-----|
| Node | `addon/components/graphs/node.vue` |
| SvgArrow, SvgLayer | `addon/components/svg/` |
| XSlide | `addon/components/crosslide/` |
| QrCodeIntro | `theme/components/zede/` |
| Points | per-talk |

## Uno / theme

`pos-*`, `size-*`, `sp-*`, `cs-*`, `bento-*`, `$obj`, `fx`.  
Не mergeConfigs slidev Uno. Theme: `layouts.css`, `utils.css`, `animations.css`.
