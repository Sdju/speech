---
name: slidev-zede-style
description: >-
  Создаёт и правит Slidev-доклады в стиле репозитория speech (zede): _template,
  parts/, timeline + t.*, Node/SvgArrow/XSlide, Points/bento, magic-move,
  Uno pos-/sp-/$obj/cs-*, русский контент, dark theme. Use when creating a new
  presentation, writing slides.md/parts, complex layouts, timeline animations,
  diagrams, or when the user asks for слайды/доклад/презентацию в своём стиле.
---

# Slidev в стиле speech (zede)

Канон: `_template/` + `2026/2_msk-vuejs_вкусы-реактивности`.  
Points+full / magic-move pad / bento — также `2025/msk-vuejs_magick-of-composables`, `holy_composables-constellation`, `ufadevconf_the-state-of-frontend`.  
Talk-skins (`mk-*`, `dt-*`) — per-talk. Upstream → `slidev-expert`.

## Upstream vs custom

| | Upstream | Custom speech |
|--|----------|---------------|
| Theme/addon | `theme`, `addons` | `addons: ['@/addon']` |
| Класс слайда | `class` | `slideClass` |
| Угол / blur | — | `topTitle*`, `growSeed`/`growOpacity`/`growBlur` |
| Клики сцены | `clicks`, `v-click`, magic-move | `timeline:` + `t.*` |
| Позиции / схемы | `v-drag`, builtin Arrow | `$obj`, `Node`/`SvgArrow` |
| Morph между слайдами | `view-transition` | `XSlide` |

## Workflow

```bash
pnpm presentation:create -c <conf> -t "<название>" -y <year>
```

FM из `_template` → `parts/` → один драйвер кликов на слайд → CoordHelper для `$obj`.

## Frontmatter

```yaml
---
theme: ./theme
addons:
  - '@/addon'
routerMode: hash
htmlAttrs:
  lang: ru
lineNumbers: true
colorSchema: dark
transition: view-transition   # XSlide morph; без morph — fade-out ок
contextMenu: false
comark: true
growSeed: 4
title: <название>
layout: center
---
```

Per-slide: `layout` (`center`|`default`|`intro`|`full`), `slideClass: cs-*`, `topTitle`.

## Структура / контент

`slides.md` + `parts/` + `components/` + `img/` (`/img/...`) + `theme/` + `addon/`.  
Русский; спикер Денис Чернов · `@zede_code` / `@vueist` · `@Sdju`.  
Notes = последний HTML-комментарий в конце слайда.

## Клики / timeline

| Драйвер | Когда |
|---------|--------|
| `timeline:` + `t.*` | схемы, bento, Points B/C/D |
| `v-click` | Points A, простые списки |
| magic-move | эволюция кода |

Один драйвер на слайд. При `timeline` не писать `clicks:`.

| В timeline | В шаблоне |
|------------|-----------|
| строка | `:class="t.foo"` |
| объект | `v-bind="t.foo"` |
| текст | `{{ t.title }}` |

---

## Типы сложных слайдов

| Задача | Паттерн |
|--------|---------|
| План / тезисы | Points **драйвер A** |
| Слева тезисы, справа пример | Points + `full` (**A** или **B/C/D**) |
| Карточки разного размера | bento |
| Схема | диаграмма Node+SvgArrow |
| Эволюция кода | magic-move (+ **pad строк**) |
| Элемент между слайдами | XSlide |
| Свободная композиция | `$obj` + `pos-*` |

---

## Points

Скопировать `components/points/` под нужный драйвер (API чуть отличается).

### Что делает `full`

- Класс `point-full` + `row-span-4` → **правая** колонка на высоту 4 рядов.
- В 2026 `points.vue`: без `.point-full` сетка = **1 колонка**; с `full` = 2 колонки (`:has(.point-full)`).
- В magick/holy сетка всегда 2×4 `grid-flow-col`.
- Обычно **один** `Point full` (последний в слоте).

### Props и на что влияют

| Binding | Эффект |
|---------|--------|
| `icon` | Uno-иконка слева |
| `full` | правая панель |
| `class` / `cs-*` | цвет ячейки |
| `v-click` на `Point` | появление (**только драйвер A**) |
| `:class="t.pointN"` | outline / `-blur-hidden` из timeline (**B**, magick) |
| `:attrs="t.pointN"` | `'active'`→`box--rich-active`, `'hidden'`→`-blur-hidden` (**C/D**) |

### Драйверы (строго один на слайд)

| ID | Драйвер кликов | Левые пункты | Правый `full` | Референс |
|----|----------------|--------------|---------------|----------|
| **A** | только `v-click` | `<Point v-click>` | текст с `v-click` **или** `full` сразу + `v-click` на детях | 2026 вкусы |
| **B** | `timeline` | `:class="t.pointN"` (outline) | `Example`+magic-move, `:class="t.example"` | magick intro |
| **C** | `timeline` | `:attrs="t.pointN"` active/hidden | magic-move / медиа | holy intro |
| **D** | `timeline` | как C | `v-if="t.exampleId===N"` | ufadevconf intro |

### Синхронизация A vs B/C/D

**A — ок:** несколько `Point v-click` + `Point full v-click` в конце. На слайде нет timeline и нет magic-move.  
**A — сломается:** те же `v-click` + timeline «для подсветки» или magic-move справа (два драйвера, клики съест один).

**B/C/D:** на пунктах **нет** `v-click`.

```yaml
# step 0
timeline:
  - point1: 'active'          # или outline-строка в B
    point2: 'hidden'
    point3: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
  - point1: ''
    point2: 'active'
    example: 'cs-blue'
  # … по одному пункту на шаг
```

Sync с magic-move в `full`: `timeline.length - 1` === `fences - 1`.  
Outline (B): `'outline outline-2 outline-[#CCCCCC88]'` ↔ `'outline-[#00000088]'`.

Yaml/HTML → [examples.md](examples.md).

### Bento

`grid-cols-12` + `bento-{c}_{r}` + `box box--rich cs-*` + timeline `-blur-hidden`→`''`.  
Референс: `2025/ufadevconf_…/parts/4_stack.md`.

---

## Диаграммы (Node + SvgArrow)

Пошаговая схема: узлы движутся/появляются, стрелки дорисовываются, подписи меняются.

### API

- **Node** `v-bind="t.blockN"`: `color` green|blue|red, `form` rect|circle, `multiple`, `solid`, `pulse`, `highlight`; в `class` — `pos-*`, `-blur-hidden`
- **SvgLayer** — холст; внутри все **SvgArrow**
- **SvgArrow** `v-bind="t.arrow…"`: `coords: 'x1:y1 x2:y2'` (px/`%`), `power`, `dashed`, `class`
- Текст: `<Node …>{{ t.textN }}</Node>`
- Node без `inject` → `$obj` (CoordHelper)

### Рецепт

1. **Step 0 = полный граф в данных:** все blocks + все arrows. Скрытое: `-blur-hidden` / у стрелок `opacity-0`.
2. **Шаблон статический** — не добавлять Node/SvgArrow по кликам; только `v-bind` / `{{ t.* }}`.
3. **Дельты:** показать узел (убрать hide, задать `pos-*`) → стрелка `opacity-0`→`animate` → `textN` / `coords` / `title` / `multiple`.
4. **Хореография:** один узел в центре → поднять + второй + стрелка → развести + третий → обратные стрелки → rename → опционально стопка (`multiple`).
5. **power:** `0.5` дуга; `0.05`+`dashed` слабая связь; `0.001` почти прямая.
6. Черновик позиций → CoordHelper → добить `coords` стрелок.

Канон: `_template/parts/2_advanced.md`, `2026/…/1_intro.md`, `3_redux.md`.  
Полный пример → [examples.md](examples.md) § диаграмма, [reference.md](reference.md).

---

## magic-move

Эволюция кода: токены морфятся между fences.

Разметка: **4** backticks + `md magic-move`; внутри обычные ` ```lang `.

### Сохранение числа строк (критично)

Морф идёт **по строкам**. Разный line-count → блок прыгает по высоте.

**Между соседними fences — одинаковый (±1) line count:**

| Pad | Зачем |
|-----|--------|
| Пустые строки | добить высоту |
| `⠀` (U+2800) | «пустая» строка, не схлопывается (канон **holy**) |
| `// …` | строка + нарратив |
| Тот же каркас `function … { }` | морфится только diff |
| Одна замена токена | идеальный морф |

Канон: `2025/holy_composables-constellation` (часто ровно N строк на шаг).  
Без pad — только крошечные API в `Point full` (и то лучше pad).

### Остальное

- `{lines: false}` в `Point full`; full-slide обычно с номерами (**pad всё равно**).
- Solo magic-move = свой слайд. С Points = только B/C, steps ↔ fences.
- Подсветка без смены текста → `` ```js {*|1|3|*} `` ``, не magic-move.

---

## XSlide

Cross-slide morph одного фрагмента (VT). Нужен `transition: view-transition`.  
Определить: `name` + `#default`. Reuse: тот же `name`, без слота. Не для анимации внутри слайда.  
Демо: `_template/parts/0_xslide.md`.

---

## Компоненты / Uno / чеклист

| Компонент | Путь |
|-----------|------|
| Node | `addon/components/graphs/` |
| SvgArrow, SvgLayer | `addon/components/svg/` |
| XSlide | `addon/components/crosslide/` |
| Points / Example | per-talk `components/points/` |
| QrCodeIntro | `theme/components/zede/` |

Uno: `pos-*`, `sp-*`, `cs-*`, `bento-*`, `$obj`, `fx`. Не `mergeConfigs([slidev,…])`.

- [ ] Один драйвер кликов; Points A vs B/C/D осознанно
- [ ] magic-move: line-count pad
- [ ] Диаграмма: step0 = все узлы/стрелки
- [ ] XSlide только при cross-slide morph

## Anti-patterns → как правильно

| Нет | Да |
|-----|-----|
| Монолитный `slides.md` | parts + `src:` |
| `v-click` + timeline/magic-move на одном слайде | Один драйвер |
| `v-click` на Points+full «и» timeline для подсветки | A **или** B/C/D, не оба |
| `clicks:` при timeline | preparser `length-1` |
| `:class` объектом / `v-bind` строкой у Node | наоборот |
| Добавлять Node в DOM по шагам | все в шаблоне; hide через class |
| Стрелка появляется без step0 | step0 `opacity-0` → `animate` |
| magic-move 2 строки → 15 без pad | выровнять blank/`⠀`/`//` |
| Несвязанные куски в одном magic-move | минимальный diff / два слайда |
| Подсветка через magic-move | `{*|1|3|*}` |
| Дублировать слот XSlide | reuse по `name` |
| `v-drag` / builtin Arrow | `$obj` / SvgArrow |
| Голый grid вместо Points+full | `<Points>` + `<Point full>` |

→ [reference.md](reference.md) · [examples.md](examples.md)
