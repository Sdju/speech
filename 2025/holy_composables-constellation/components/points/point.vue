<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  icon?: string,
  full?: boolean,
  attrs?: string
}>()

const active = computed(() => props.attrs?.includes('active'))
const hidden = computed(() => props.attrs?.includes('hidden'))
</script>
<template>
  <div 
    v-if="!full" 
    class="box box--rich point fx duration-400" 
    :class="{
      '-blur-hidden': hidden,
      'box--rich-active': active,
    }"
  >
    <div class="item-icon">
      <slot name="icon" >
        <div :class="icon" />
      </slot>
    </div>
    <div>
      <slot />
    </div>
  </div>
  <div v-else class="box box--rich box--rich-dark point-full fx row-span-4">
    <slot />
  </div>
</template>
<style>
.point {
  --at-apply: flex flex-row items-center gap-[8px] text-sm;
}

.point-full {
  --at-apply: text-sm bg-[#00000088] p-[12px] rd-[8px] flex flex-col gap-[8px] relative
}
</style>

