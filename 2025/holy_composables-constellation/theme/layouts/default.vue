<template>
  <div 
    class="slidev-layout default w-full flex" 
    :class="$attrs.slideClass"
  >
    <div class="w-full flex flex-col justify-center items-stretch">
      <slot />
    </div>
  </div>
</template>
