<script lang="ts" setup>
defineProps<{
  icon?: string,
  full?: boolean
}>()
</script>
<template>
  <div v-if="!full" class="item fx duration-400">
    <div class="item-icon">
      <div :class="icon" />
    </div>
    <div>
      <slot />
    </div>
  </div>
  <div v-else class="point-full fx example row-span-4">
    <slot />
  </div>
</template>
<style>
.point {
  --at-apply: text-sm bg-[#00000088] p-[12px] rd-[8px] flex flex-row items-center gap-[8px]
}

.point-full {
  --at-apply: text-sm bg-[#00000088] p-[12px] rd-[8px] flex flex-col gap-[8px] relative
}
</style>

