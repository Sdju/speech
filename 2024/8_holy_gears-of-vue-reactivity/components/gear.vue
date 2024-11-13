<script setup lang="ts">
import { computed } from 'vue'
import f7Gear from '~icons/f7/gear'
import heroiconsCogSolid from '~icons/heroicons/cog-solid'
import claritySettingsSolid from '~icons/clarity/settings-solid'
import mingcuteSettings7Fill from '~icons/mingcute/settings-7-fill'
import zondiconsCog from '~icons/zondicons/cog'
import LineiconsCog from '~icons/lineicons/cog'
import LogosVue from '~icons/logos/vue'
import LogosVueuse from '~icons/logos/vueuse'
import LogosPinia from '~icons/logos/pinia'
import IonGearA from '~icons/ion/gear-a'

const gearsMap = {
  ref: {
    class: 'animate-[spin_13s_linear_infinite]',
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
  components: {
    class: 'animate-[spin_25s_linear_infinite]',
    icon: heroiconsCogSolid
  },
  watch: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: claritySettingsSolid
  },
  watchers: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: claritySettingsSolid
  },
  watchEffect: {
    class: 'animate-[spin_13s_linear_infinite]',
    icon: mingcuteSettings7Fill
  },
  vModel: {
    class: 'animate-[spin_20s_linear_infinite]',
    icon: zondiconsCog
  },
  props: {
    class: 'animate-[spin_17s_linear_infinite]',
    icon: LineiconsCog
  },
  effectScope: {
    class: 'animate-[spin_25s_linear_infinite]',
    icon: claritySettingsSolid
  },
  customRef: {
    class: 'animate-[spin_14s_linear_infinite]',
    icon: LineiconsCog
  },
  Dep: {
    class: 'animate-[spin_11s_linear_infinite]',
    icon: IonGearA
  },
  nextTick: {
    class: 'animate-[spin_21s_linear_infinite]',
    icon: IonGearA
  },
  effect: {
    class: 'animate-[spin_21s_linear_infinite]',
    icon: IonGearA
  },
  Track: {
    class: 'animate-[spin_31s_linear_infinite]',
    icon: zondiconsCog
  },
  Trigger: {
    class: 'animate-[spin_31s_linear_infinite]',
    icon: heroiconsCogSolid
  },
  activeSub: {
    class: 'animate-[spin_22s_linear_infinite]',
    icon: mingcuteSettings7Fill
  },

  // special
  Vue: {
    class: '',
    icon: LogosVue
  },
  VueUse: {
    class: '',
    icon: LogosVueuse
  },
  Pinia: {
    class: '',
    icon: LogosPinia
  },
} as const

const props = defineProps<{
  name: keyof typeof gearsMap,
  pos?: [number, number, number, number],
  inline?: boolean,
  headless?: boolean,
}>()

const gear = computed(() => gearsMap[props.name] ?? gearsMap.ref)
</script>

<template>
  <span v-if="inline" class="inline-flex flex-row items-center gap-1">
    <component :is="gear.icon" class="w-[1em] h-[1em]" :class="gear.class" />
    {{ headless ? '' : name }}
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
    <div v-if="!headless" class="text-center text-shadow-xl"> {{ name }} </div>
    <component :is="gear.icon" class="w-full flex-1" :class="gear.class" />
  </div>
</template>