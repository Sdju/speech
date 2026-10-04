<script setup lang="ts">
import QRCodeStyling, { type Options } from 'qr-code-styling'
import { computed, onMounted, onBeforeUnmount, useTemplateRef, watch } from 'vue'

const props = withDefaults(defineProps<{
  url: string
  size?: number
  color?: string
  background?: string
}>(), { size: 200, color: '#ffffff', background: 'transparent' })

const qrCodeRef = useTemplateRef('qrCodeRef')
let qrCode: QRCodeStyling | undefined

const options = computed<Options>(() => ({
  width: props.size,
  height: props.size,
  type: 'svg',
  // At least four modules of empty space, including the smallest QR (21 modules).
  margin: Math.ceil(props.size * 4 / 29),
  qrOptions: { errorCorrectionLevel: 'H' },
  dotsOptions: { color: props.color, type: 'dots' },
  cornersSquareOptions: { color: props.color, type: 'extra-rounded' },
  cornersDotOptions: { color: props.color, type: 'rounded' },
  backgroundOptions: { color: props.background },
  data: props.url,
}))

onMounted(() => {
  qrCode = new QRCodeStyling(options.value)
  qrCode.append(qrCodeRef.value!)
})

watch(options, value => qrCode?.update(value))
onBeforeUnmount(() => { qrCode = undefined })
</script>

<template>
  <div
    ref="qrCodeRef"
    class="qr-code"
    :style="{ '--qr-size': `${size}px` }"
    role="img"
    :aria-label="`QR-код: ${url}`"
  />
</template>

<style>
:where(.qr-code) {
  width: var(--qr-size);
  height: var(--qr-size);
  flex-shrink: 0;
}

.qr-code > svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
