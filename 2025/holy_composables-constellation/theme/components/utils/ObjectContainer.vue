<script setup lang="ts">
import { ref, watch } from 'vue';
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  width?: number,
  height?: number,
  objectWidth: number,
  objectHeight: number,
  mode?: 'none' | 'fill' | 'contain' | 'cover',
}>()

const emit = defineEmits<{
  (e: 'resize', value: [number, number]): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const { width, height } = useElementSize(containerRef)

watch(() => [width.value, height.value], ([newWidth, newHeight]) => {
  emit('resize', [newWidth, newHeight])
})
</script>

<template>
  <div
    class="object-container" 
    ref="containerRef"
  >
    <slot 
      class="object"
      :class="mode ?? 'contain'"
    />
  </div>
</template>

<style>
:where(.object-container) {
  width: v-bind('objectWidth + "px"');
  height: v-bind('objectHeight + "px"');
}

.object-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* main */
  container-type: size;
  --container-ar: v-bind('width / height');
  --object-ar: v-bind('objectWidth / objectHeight');
  --min-ar: min(var(--container-ar), var(--object-ar));
}

.none {
  width: v-bind('objectWidth + "px"');
  height: v-bind('objectHeight + "px"');
}

.fill {
  width: 100cqw;
  height: 100cqh;
}

.contain {
  aspect-ratio: var(--object-ar);
  height: 100cqh;
  width: auto;

  @container style(--min-ar: var(--container-ar)) {
    width: 100cqw;
    height: auto;
  }
}

.cover {
  aspect-ratio: var(--object-ar);
  height: auto;
  width: 100cqw;

  @container style(--min-ar: var(--container-ar)) {
    width: auto;
    height: 100cqh;
  }
}

@property --min-ar {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}
</style>
