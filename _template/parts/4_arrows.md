---
layout: full
timeline:
  - arrow:
      d: M 210 260 C 350 80 570 440 750 260
      reveal: 0
      dashed: true
      class: cs-green
    label: Нажмите, чтобы прорисовать стрелку
  - arrow:
      reveal: 1
    label: Линия и наконечник движутся вместе
  - arrow:
      reveal: 0.5
    label: Прогресс можно уменьшить или задать частично
---

<h1 class="absolute top-12 left-12">Своя траектория стрелки</h1>

<SvgLayer>
  <SvgArrow v-bind="t.arrow" />
</SvgLayer>

<div class="absolute bottom-12 left-12 text-xl">{{ t.label }}</div>
