<script setup lang="ts">
const nodes = {
  prototypes: { class: 'pos-578_74', title: 'JS Prototypes', form: 'circle', color: 'red' },
  getters: { class: 'pos-175_366', title: 'getters/setters', form: 'circle', color: 'red' },
  proxy: { class: 'pos-172_147', title: 'Proxy', form: 'circle', color: 'red' },

  di: { class: 'pos-795_74', title: 'provide/inject' },
  attrs: { class: 'pos-336_68', title: 'attrs' },
  props: { class: 'pos-336_115', title: 'props' },
  reactive: { class: 'pos-337_224', title: 'reactive' },
  slots: { class: 'pos-335_168', title: 'slots' },

  computed: { class: 'pos-341_452', title: 'computed' },
  customRef: { class: 'pos-343_394', title: 'customRef' },
  shallowRef: { class: 'pos-340_340', title: 'shallowRef' },
  ref: { class: 'pos-335_288', title: 'ref' },

  dep: { class: 'pos-475_360', title: 'Dep', color: 'orange' },
  trackTrigger: { class: 'pos-479_151', title: 'track/trigger', color: 'orange' },
  link: { class: 'pos-527_291', title: 'Link', color: 'orange' },
  activeSub: { class: 'pos-597_202', title: 'activeSub', color: 'orange' },

  reactiveEffect: { class: 'pos-519_451', title: 'ReactiveEffect', color: 'blue' },
  watch: { class: 'pos-732_408', title: 'watch', color: 'blue' },
  watchEffect: { class: 'pos-747_459', title: 'watchEffect', color: 'blue' },
  effect: { class: 'pos-731_505', title: 'effect', color: 'blue' },

  effectScope: { class: 'pos-739_296', title: 'effectScope', color: 'purple' },
  render: { class: 'pos-730_347', title: 'render', color: 'orange' },
  setup: { class: 'pos-859_296', title: 'setup', color: 'orange' },

  scheduler: { class: 'pos-736_244', title: 'scheduler', color: 'orange' },
  nextTick: { class: 'pos-838_197', title: 'nextTick', color: 'purple' },

  legendRed: { class: 'pos-45_443', title: 'JS API', color: 'red' },
  legendOrange: { class: 'pos-149_523', title: 'Vue Internal', color: 'orange' },
  legendBlue: { class: 'pos-54_523', title: 'Listeners', color: 'blue' },
  legendGreen: { class: 'pos-107_483', title: 'Data', color: 'green' },
  legendPurple: { class: 'pos-44_483', title: 'Extra', color: 'purple' },
  legendArrow2: { class: 'pos-70_242', title: 'Основан', color: 'transparent' },
  legendArrow1: { class: 'pos-73_291', title: 'Взаимодействие', color: 'transparent' },
}

const connections = [
  { coords: '192:131 307:67', power: 0.2 },
  { coords: '199:137 303:116', power: 0.15 },
  { coords: '198:158 305:169', power: -0.15 },
  { coords: '190:160 297:224', power: -0.2 },
  { coords: '209:352 312:287', power: 0.2 },
  { coords: '209:352 312:287', power: 0.2 },
  { coords: '228:356 292:340', power: 0.2 },
  { coords: '228:372 296:392', power: -0.15 },
  { coords: '228:372 296:392', power: -0.15 },
  { coords: '209:381 296:451', power: -0.2 },
  { coords: '336:241 336:269', power: 0.07 },
  { coords: '364:67 433:133', power: 0.2, startArrow: true, dashed: true  },
  { coords: '367:115 428:144', power: 0.1, startArrow: true, dashed: true  },
  { coords: '364:168 427:158', power: -0.1, startArrow: true, dashed: true  },
  { coords: '374:223 434:170', power: -0.2, startArrow: true, dashed: true },
  { coords: '474:341 472:172', power: -0.1, startArrow: true, dashed: true },
  { coords: '452:341 357:286', power: -0.2 },
  { coords: '447:352 387:336', power: -0.2 },
  { coords: '447:364 389:390', power: 0.2 },
  { coords: '452:376 386:441', power: 0.2 },
  { coords: '631:73 738:74', power: 0.1 },
  { coords: '461:449 386:452', power: 0.1 },
  { coords: '501:358 523:310', power: -0.22, startArrow: true, dashed: true },
  { coords: '527:274 555:202', power: 0.2, startArrow: true, dashed: true },
  { coords: '541:432 600:220', power: 0.1, startArrow: true, dashed: true },
  { coords: '559:432 692:245', power: 0.17, startArrow: true, dashed: true },
  { coords: '574:434 695:348', power: 0.1 },
  { coords: '579:446 697:406', power: 0.1 },
  { coords: '579:457 697:457', power: -0.1 },
  { coords: '573:465 697:503', power: -0.1 },
  { coords: '568:434 690:296', power: 0.15 },
  { coords: '784:244 835:216', power: -0.5, startArrow: true, dashed: true },
  { coords: '787:297 827:297', power: 0.05 },
  { coords: '22:262 122:262', power: 0.1 },
  { coords: '22:312 122:312', power: 0.1, startArrow: true, dashed: true },
]
</script>

<template>
  <img src="/img/map.png" class="absolute sp-0_0_100%_100% pointer-events-none opacity-0" />

  <SvgLayer>
    <SvgArrow
      v-for="(connection, i) in connections" 
      :key="i"
      v-bind="connection"
    />
  </SvgLayer>
  <Node 
    v-for="(node, key) in nodes"
    :key="key"
    class="scale-60"
    v-bind="node"
  />
</template>
