<script setup lang="ts">
import { MouseService, MOUSE_SERVICE_KEY } from './MouseService'
import { SlideService, SLIDE_SERVICE_KEY } from './SlideService'
import { MemoryService, MEMORY_SERVICE_KEY } from './MemoryService'
import { ObjectService, OBJECT_SERVICE_KEY } from './ObjectService'
import { useDiContainer } from '../VueServices/useDiContainer';

const di = useDiContainer()

di.register(SLIDE_SERVICE_KEY, SlideService)
di.register(MOUSE_SERVICE_KEY, MouseService)
di.register(OBJECT_SERVICE_KEY, ObjectService)
di.register(MEMORY_SERVICE_KEY, MemoryService, { shared: false })
</script>
<template>
  <Teleport to="body">
    <slot />
  </Teleport>
</template>
