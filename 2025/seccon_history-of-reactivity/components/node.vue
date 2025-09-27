<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

const { 
  color = 'green',
  form = 'rect',
  inject = false,
  multiple = false,
  title,
  pulse = false,
  highlight = false,
} = defineProps<{
  color?: 'green' | 'blue' | 'red',
  form?: 'circle' | 'rect',
  inject?: boolean,
  multiple?: boolean,
  title?: string,
  pulse?: boolean,
  highlight?: boolean,
}>()

const colorPresets = {
  green: {
    color: 'bg-green/40 b-green c-green',
  },
  blue: {
    color: 'bg-blue/40 b-blue c-blue',
  },
  red: {
    color: 'bg-red/40 b-red c-red',
  },
  orange: {
    color: 'bg-orange/40 b-orange c-orange',
  },
  purple: {
    color: 'bg-purple/40 b-purple c-purple',
  },
  gray: {
    color: 'bg-gray/40 b-gray c-gray',
  },
  transparent: {
    color: 'bg-transparent b-transparent c-white',
  },
}

const formPresets = {
  circle: 'rounded-[50%] px-4 py-2',
  rect: 'rounded-[8px] px-4 py-2',
}

const attrs = useAttrs()

const classList = computed(() => {
  return [
    twMerge(
      'fx b-1 grid place-items-center text-xl font-bold duration-200',
      highlight && `[--un-drop-shadow:var(--v-color)]`,
      pulse && 'animate-pulse',
      colorPresets[color].color,
      formPresets[form],
      attrs.class as string,
    ),
    {
      $obj: !inject,
    }
  ]
})

const multipleList = computed(() => {
  return Array.from({ length: 5 }, (_, i) => {
    return {
      marginLeft: `${(i + 1) * 7}px`,
      marginTop: `-${(i + 1) * 7}px`,
      opacity: 0.5 ** (i + 1),
      transitionDelay: `${i * 100}ms`,
    }
  })
})

</script>

<template>
  <div :class="classList">
    <Transition name="title" mode="out-in">
      <slot v-if="$slots.default">
        <slot />
      </slot>
      <span v-else :key="title">{{ title }}</span>
    </Transition>
  </div>
  <TransitionGroup name="multiple">
    <div
      v-if="multiple"
      v-for="item in multipleList"
      :key="item.marginLeft"
      :class="classList"
      :style="item"
    >
      <slot>
        {{ title }}
      </slot>
    </div>
  </TransitionGroup>
</template>

<style scoped>
.multiple-enter-active,
.multiple-leave-active {
  transition: all 0.3s ease;
}

.multiple-enter-from,
.multiple-leave-to {
  opacity: 0 !important;
  transform: translateY(20px);
}

.multiple-move {
  transition: transform 0.3s ease;
}

.title-enter-active,
.title-leave-active {
  transition: all 0.3s ease;
}

.title-enter-from,
.title-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.title-enter-to,
.title-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>