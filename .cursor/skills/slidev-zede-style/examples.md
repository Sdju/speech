# Examples: Slidev zede-style

## Points A — только v-click (2026)

На слайде нет timeline и нет magic-move.

```html
<Points>
  <Point v-click class="cs-red" icon="i-noto-rightwards-pushing-hand">
    Push — значения проталкиваются
  </Point>
  <Point v-click class="cs-orange" icon="i-material-symbols-mail-rounded">
    Не важно, хочет подписчик обновляться или нет
  </Point>
  <Point full class="cs-orange" v-click>
    Подобен почте…
  </Point>
</Points>
```

Вариант: `full` без v-click, внутри дети с `v-click` (панель сразу, контент по кликам).

## Points C — timeline attrs + sync (holy/ufa)

```yaml
timeline:
  - point1: 'active'
    point2: 'hidden'
    point3: 'hidden'
    point4: 'hidden'
    example: 'pos-0 fx duration-500 cs-red'
  - point1: ''
    point2: 'active'
    example: 'cs-blue'
  - point2: ''
    point3: 'active'
    example: 'cs-green'
  - point3: ''
    point4: 'active'
    example: 'cs-purple'
```

```html
<Points>
  <Point icon="i-…" :attrs="t.point1" class="cs-red">Пункт 1</Point>
  <Point icon="i-…" :attrs="t.point2" class="cs-green">Пункт 2</Point>
  <Point icon="i-…" :attrs="t.point3" class="cs-pink">Пункт 3</Point>
  <Point icon="i-…" :attrs="t.point4" class="cs-brown">Пункт 4</Point>
  <Point full :class="t.example">
    <Example>
      <!-- magic-move: 4 fences → 3 клика; timeline тоже 4 шага (0..3) -->
    </Example>
  </Point>
</Points>
```

Драйвер D: добавь `exampleId: 1`… и `v-if="t.exampleId === 1"` внутри full.

## Points B — outline (magick)

```yaml
timeline:
  - point1: 'outline outline-2 outline-[#CCCCCC88]'
    point2: '-blur-hidden outline-[#00000088]'
    point3: '-blur-hidden outline-[#00000088]'
    example: 'pos-0 fx duration-500'
  - point1: 'outline-[#00000088]'
    point2: 'outline outline-2 outline-[#CCCCCC88]'
```

```html
<Point :class="t.point1">…</Point>
```

## magic-move — pad строк (holy)

Между fences одинаковый line count. `⠀` = U+2800:

```
шаг 0: useLearnComposable() + пустые строки + ⠀
шаг 1: const { basics } = … + ⠀  (тот же бюджет строк)
```

Минимальный diff (magick): один и тот же 9-строчный каркас, меняется только `onUnmounted` → `onScopeDispose`.

Плохо: fence из 2 строк → следующий из 15 без pad.

## Диаграмма — step0 + дельты

```yaml
timeline:
  - block1:
      class: 'pos-484_274'
      color: 'green'
      form: 'rect'
    block2:
      class: 'pos-482_274 -blur-hidden'
      color: 'blue'
      form: 'rect'
    block3:
      class: '-blur-hidden'
      color: 'red'
      form: 'rect'
    arrow1To2:
      coords: '51%:245 51%:188'
      class: 'fx duration-500 opacity-0'
      power: 0.1
    arrow1To3:
      coords: '569:156 637:245'
      class: 'fx duration-500 opacity-0'
      power: 0.5
    arrow3To2:
      coords: '568:272 427:272'
      class: 'fx duration-500 opacity-0'
      power: 0.05
      dashed: true
    text1: 'Система'
    text2: ''
    text3: ''
  - block1:
      class: 'pos-492_159'
    block2:
      class: 'pos-482_274'
    text2: 'Раздражитель'
    arrow1To2:
      class: 'fx duration-500 animate'
  - block2:
      class: 'pos-328_274'
    block3:
      class: 'pos-637_274'
    text3: 'Реакция'
    arrow1To3:
      class: 'fx duration-500 animate'
  - arrow3To2:
      class: 'fx duration-500 animate'
  - text1: 'Store'
    text2: 'Action'
    text3: 'View'
```

```html
<div class="text-center text-3xl font-bold $obj pos-50%_50%">{{ t.title }}</div>
<Node v-bind="t.block1">{{ t.text1 }}</Node>
<Node v-bind="t.block2">{{ t.text2 }}</Node>
<Node v-bind="t.block3">{{ t.text3 }}</Node>
<SvgLayer>
  <SvgArrow v-bind="t.arrow1To2" />
  <SvgArrow v-bind="t.arrow1To3" />
  <SvgArrow v-bind="t.arrow3To2" />
</SvgLayer>
```

После черновика: CoordHelper двигает Node → правит `pos-*` в текущем step; `coords` стрелок — руками.

## Bento reveal

```yaml
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
```

```html
<div class="grid grid-cols-12 grid-rows-[140px_140px_1fr] gap-4 h-full">
  <div class="bento-6_1 box box--rich cs-green flex-center fx" :class="t.box1">…</div>
  <div class="bento-4_2 box box--rich cs-blue fx p-6" :class="t.box2">…</div>
  <div class="bento-8_2 box box--rich cs-orange fx p-6" :class="t.box3">…</div>
</div>
```

## XSlide

```html
<!-- A -->
<XSlide name="hero" title="XSlide" class="text-center">
  <template #default="{ title, class: cls, style }">
    <div :class="cls" :style="style">
      <h1 class="text-6xl font-bold m-0">{{ title }}</h1>
    </div>
  </template>
</XSlide>

<!-- B -->
<XSlide name="hero" title="Тот же блок" class="text-left" />
```

Root: `transition: view-transition`.

## Плохо → хорошо

| Плохо | Хорошо |
|-------|--------|
| `v-click` на 4 Point + timeline outline | либо A, либо B/C |
| magic-move без pad высоты | blank / `⠀` / `//` до равного line count |
| `<Node>` появляется только на шаге 3 в markdown | Node в шаблоне всегда; `-blur-hidden` в step0 |
