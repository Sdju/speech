<script setup lang="ts">
import { MouseService, MOUSE_SERVICE_KEY } from '../../module/CoordHelper/MouseService'
import { SlideService, SLIDE_SERVICE_KEY } from '../../module/CoordHelper/SlideService'
import { MemoryService, MEMORY_SERVICE_KEY } from '../../module/CoordHelper/MemoryService'
import { ObjectService, OBJECT_SERVICE_KEY } from '../../module/CoordHelper/ObjectService'
import { useDiContainer } from '../../module/VueServices/useDiContainer';

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
