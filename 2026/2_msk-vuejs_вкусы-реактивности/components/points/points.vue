<template>
  <div class="points">
    <slot />
  </div>
</template>

<style>
.points {
  --at-apply: grid gap-[14px] mt-8;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(4, minmax(0, auto));
  grid-auto-flow: column;
}

.points:not(:has(.point-full)) {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: none;
  grid-auto-rows: auto;
  grid-auto-flow: row;
}
</style>
