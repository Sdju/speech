<template>
  <div class="points">
    <slot />
  </div>
</template>
<style>
.points {
  --at-apply: grid grid-cols-2 grid-rows-4 gap-[14px] grid-flow-col mt-12;
}
</style>