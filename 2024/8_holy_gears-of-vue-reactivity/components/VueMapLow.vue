<script setup lang="ts">
const nodes = {
  prototypes: { class: 'pos-578_74', title: 'JS Prototypes', form: 'circle', color: 'red' },
  getters: { class: 'pos-175_366', title: 'getters/setters', form: 'circle', color: 'red' },
  proxy: { class: 'pos-158_148', title: 'Proxy', form: 'circle', color: 'red' },

  di: { class: 'pos-795_74', title: 'provide/inject' },
  attrs: { class: 'pos-336_68', title: 'attrs' },
  props: { class: 'pos-336_115', title: 'props' },
  reactive: { class: 'pos-337_224', title: 'reactive' },
  slots: { class: 'pos-335_168', title: 'slots' },

  computed: { class: 'pos-341_452', title: 'computed' },
  customRef: { class: 'pos-343_394', title: 'customRef' },
  shallowRef: { class: 'pos-340_340', title: 'shallowRef' },
  ref: { class: 'pos-335_288', title: 'ref' },


  dep: { class: 'pos-429_212', title: 'Dep' },
  trackTrigger: { class: 'pos-479_151', title: 'track/trigger' },
  link: { class: 'pos-527_291', title: 'Link' },
  activeSub: { class: 'pos-597_202', title: 'activeSub' },

  reactiveEffect: { class: 'pos-519_451', title: 'ReactiveEffect' },
  watch: { class: 'pos-732_408', title: 'watch' },
  watchEffect: { class: 'pos-747_459', title: 'watchEffect' },
  effect: { class: 'pos-731_505', title: 'effect' },

  effectScope: { class: 'pos-740_242', title: 'effectScope' },
  render: { class: 'pos-874_231', title: 'render' },
  setup: { class: 'pos-871_280', title: 'setup' },

  scheduler: { class: 'pos-740_350', title: 'scheduler' },
  nextTick: { class: 'pos-878_348', title: 'nextTick' },
}

const connections = [
  { start: 'getters', end: 'ref' },
  { start: 'getters', end: 'shallowRef' },
  { start: 'getters', end: 'customRef' },
  { start: 'getters', end: 'dep' },
  { start: 'ref', end: 'reactive', dashed: true },
  { start: 'dep', end: 'ref' },
  { start: 'dep', end: 'shallowRef' },
  { start: 'dep', end: 'customRef' },
  { start: 'reactive', end: 'trackTrigger' },
  { start: 'dep', end: 'trackTrigger' },
  { start: 'proxy', end: 'reactive' },
  { start: 'proxy', end: 'props' },
  { start: 'proxy', end: 'attrs' },
  { start: 'proxy', end: 'slots' },
  { start: 'props', end: 'trackTrigger' },
  { start: 'attrs', end: 'trackTrigger' },
  { start: 'slots', end: 'trackTrigger' },
  { start: 'dep', end: 'link' },
  { start: 'link', end: 'subscriber', bothDirections: true },
  { start: 'dep', end: 'activeSub' },
  { start: 'activeSub', end: 'subscriber', dashed: true },
  { start: 'dep', end: 'computed' },
  { start: 'reactiveEffect', end: 'subscriber' },
  { start: 'reactiveEffect', end: 'watch' },
  { start: 'reactiveEffect', end: 'watchEffect' },
  { start: 'reactiveEffect', end: 'effect' },
  { start: 'reactiveEffect', end: 'effectScope', dashed: true },
  { start: 'render', end: 'effectScope' },
  { start: 'setup', end: 'effectScope' }
]
</script>

<template>
  <!-- <img src="/img/map.png" class="absolute pos-0" /> -->
  <SvgLayer>
    <SvgArrow
      v-for="(connection, i) in []" 
      :key="i"
      :start="{ x: nodes[connection.start].x, y: nodes[connection.start].y }"
      :end="{ x: nodes[connection.end].x, y: nodes[connection.end].y }"
      :start-arrow="connection.bothDirections"
      :power="0.3"
      :class="{ 'stroke-dash-2': connection.dashed }"
    />
  </SvgLayer>
  <Node 
    v-for="(node, key) in nodes"
    :key="key"
    class="scale-60"
    v-bind="node"
  />
</template>
