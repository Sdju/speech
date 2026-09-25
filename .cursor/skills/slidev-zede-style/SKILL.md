---
name: slidev-zede-style
description: >-
  Создаёт и правит Slidev-доклады в стиле репозитория speech (zede): _template,
  parts/, timeline + t.*, Node/SvgArrow/XSlide, Points/bento, magic-move,
  Uno pos-/sp-/$obj/cs-*, русский контент, dark theme, latin folder names.
  Use when creating or editing Slidev slides/parts, layouts, animations,
  diagrams; scaffold via presentation:create; materialize after
  tech-conference-speaking phases.
---

# Slidev в стиле speech (zede)

Канон: `_template/` + `2026/2_msk-vuejs_вкусы-реактивности`.  
Points+full / magic-move pad / bento — также `2025/msk-vuejs_magick-of-composables`, `holy_composables-constellation`, `ufadevconf_the-state-of-frontend`.  
Talk-skins (`mk-*`, `dt-*`) — per-talk. Upstream → `slidev-expert`.

Этот skill — про **синтаксис, форматы и визуальные паттерны** Slidev в speech.  
План доклада, фазы зрелости, wireframe → md → материализация → [tech-conference-speaking](../tech-conference-speaking/SKILL.md).

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

  Не создавай «сразу готовые» слайды хаотично по всему докладу. Иди по фазам [tech-conference-speaking](../tech-conference-speaking/SKILL.md); этот skill подключай там, где нужны scaffold, синтаксис и материализация.

  **Исключение:** слайд с `Статус: реализация` в HTML-комментарии можно материализовать сразу (md → при необходимости визуал), не дожидаясь фазы 3/4 на весь доклад. Правки пользователя в `Контент`/`Спикер` у такого слайда — синхронизируй в тело.

| Фаза | Кто ведёт | Роль этого skill |
|------|-----------|------------------|
| 1 сбор фактуры | tech-conference-speaking | при необходимости scaffold папки |
| 2 wireframe | tech-conference-speaking | заглушки в `parts/`, FM, структура |
| 2.1 дизайн | tech-conference-speaking | идеи ↔ доступные паттерны (Points, Node…) |
| 3 markdown | tech-conference-speaking | простой md/mermaid в `parts/` |
| 4 материализация | **этот skill** + tech-conference-speaking | стилизованные слайды, timeline, диаграммы |
| послайдово | оба | только слайды с `Статус: реализация` |

### Создание папки

```bash
pnpm presentation:create -c <conf> -t "<english-title>" -y <year>
```

Правила имени (`{n}_{conf}_{title}`):

- **только латиница** в `conference` и `title` для CLI/`-t` (кириллица в пути запрещена);
- русское название → **английский перевод**, не транслит  
  (`Вам не нужны микрофронтенды` → `you-dont-need-microfrontends`, не `vam-ne-nuzhny-…`);
- kebab-case; бренд конфы как принято (`holyjs`, `msk-vuejs`);
- `title:` в frontmatter / контент слайдов — по-русски.

Артефакты планирования: `<path-to-slides>/collected/`. Референсы: `.samples/`.

Дальше: FM из `_template` → `parts/` → один драйвер кликов на слайд → CoordHelper для `$obj`.

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
| `FileTree` | эволюция дерева файлов (сам себе драйвер) |

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
| Эволюция структуры папок | `FileTree` (не magic-move по ascii-дереву) |
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

## FileTree

Дерево файлов по шагам: удалённое схлопывается → остальное едет (FLIP) → новое въезжает по очереди.
Компонент: `addon/components/filetree/FileTree.vue`, парсер: `addon/module/FileTree/parse.ts`.

```yaml
---
layout: center
fileTree:
  - caption: 'Подпись шага'          # необязательно
    tree: |
      src/ @src                      # `/` в конце — папка
        components/
          Map/ @map-ui #green        # @id — сквозной id, #tag — цвет (наследуется детьми)
          ...                        # «и так далее»
        main.js // точка входа       # // — заметка справа
  - focus: '#green'                  # без tree — дерево прошлого шага; focus: @id | путь | имя | #tag
  - tree: |
      src/ @src
        modules/
          Map/ #green
            components/ @map-ui      # тот же @id → строка перелетает и переименовывается, дети — с ней
---

<FileTree />
```

- Клики регистрирует сам (`steps − 1`), **других драйверов на слайде нет**. Под timeline: `<FileTree :steps="…" :step="t.tree" />`.
- Без `@id` id = `<id родителя>/<имя>`: переезд без `@id` = удалить + создать. Хочешь перелёт — ставь `@id`.
- Отступ — любым числом пробелов; ascii-дерево (`├──`, `|`) тоже парсится.
- Цвета тегов: green, blue, pink, violet, amber, red, cyan. Шрифт подбирается под самый длинный шаг (`height`, `maxFont`, `width` — пропсы).
- Прыжок через шаги и вход на слайд — без анимации.

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
| Сразу «красивые» слайды без фаз | [tech-conference-speaking](../tech-conference-speaking/SKILL.md); исключение — `Статус: реализация` |
| Кириллица / транслит в имени папки | латиница = **перевод** (`you-dont-need-…`) |
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
