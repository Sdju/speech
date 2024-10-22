<script setup lang="ts">
import { ref, computed } from 'vue'
import f7Gear from '~icons/f7/gear'
import heroiconsCogSolid from '~icons/heroicons/cog-solid'
import claritySettingsSolid from '~icons/clarity/settings-solid'
import mingcuteSettings7Fill from '~icons/mingcute/settings-7-fill'
import zondiconsCog from '~icons/zondicons/cog'
import LineiconsCog from '~icons/lineicons/cog'


const gearsMap = {
  ref: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: f7Gear
  },
  reactive: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: zondiconsCog
  },
  computed: {
    class: 'animate-[spin_31s_linear_infinite]',
    icon: heroiconsCogSolid
  },
  watch: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: claritySettingsSolid
  },
  watchEffect: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: mingcuteSettings7Fill
  },
  vModel: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: zondiconsCog
  },
  props: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: LineiconsCog
  },
  effectScope: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: claritySettingsSolid
  },
  customRef: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: LineiconsCog
  },
} as const

const props = defineProps<{
  name: keyof typeof gearsMap,
  pos?: [number, number, number, number],
  inline?: boolean
}>()

const gear = computed(() => gearsMap[props.name] ?? gearsMap.ref)
</script>

<template>
  <span v-if="inline" class="inline-flex flex-row items-center gap-1">
    <component :is="gear.icon" class="w-[1em] h-[1em]" :class="gear.class" />
    {{ name }}
  </span>
  <div 
    v-else
    flex="~ col gap-[-10px] items-stretch" 
    :style="pos ? {
      position: 'absolute',
      left: `${pos[0]}px`,
      top: `${pos[1]}px`,
      width: `${pos[2]}px`,
      height: `${pos[3]}px`
    } : ''"
  >
    <div class="text-center text-shadow-xl"> {{ name }} </div>
    <component :is="gear.icon" class="w-full flex-1" :class="gear.class" />
  </div>
</template>