<template>
  <div
    class="full size-full flex"
    :class="$attrs.slideClass"
  >
    <div class="size-full flex flex-col justify-center items-stretch">
      <slot />
    </div>
  </div>
</template>
