<script lang="ts" setup>
/**
 * Cross-slide shared element (View Transitions).
 *
 * - With default slot: defines the template for this page and renders it.
 * - Without slot: reuses the nearest earlier definition of `name`.
 *
 * Requires `transition: view-transition` on the deck (or those slides).
 */
import { computed, inject, useAttrs, useSlots, type Ref } from 'vue'
import { useNav } from '@slidev/client'
import { useXSlides } from '../../module/XSlides/XSlidesService'

const props = defineProps<{
  /** Registry key shared across slides */
  name?: string
  /** @deprecated use `name` */
  slot?: string
}>()

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()
const { register, resolve } = useXSlides()
const { isPlaying, isPresenter } = useNav()

/** Per-slide page no from SlideWrapper (`$$slidev-page`). */
const pageRef = inject<Ref<number>>('$$slidev-page')
const page = computed(() => pageRef?.value ?? 0)
const key = computed(() => props.name || props.slot || '')

if (slots.default && key.value)
  register(key.value, page.value, slots.default)

const visible = computed(() => isPlaying.value || isPresenter.value)

const bound = computed(() => {
  const rest = { ...attrs } as Record<string, unknown>
  const userClass = rest.class
  const userStyle = rest.style
  delete rest.class
  delete rest.style

  const vtStyle: Record<string, string> = {
    'view-transition-name': key.value ? `x-slide-${key.value}` : 'none',
  }

  const style = userStyle == null || userStyle === ''
    ? vtStyle
    : Array.isArray(userStyle)
      ? [vtStyle, ...userStyle]
      : [vtStyle, userStyle]

  return {
    ...rest,
    class: ['vt', userClass],
    className: ['vt', userClass],
    style,
  }
})

const render = computed(() => {
  if (slots.default)
    return slots.default
  if (!key.value)
    return undefined
  return resolve(key.value, page.value)
})
</script>

<template>
  <component
    :is="render"
    v-if="visible && render"
    v-bind="bound"
  />
</template>
