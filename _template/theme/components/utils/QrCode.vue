<script setup lang="ts">
import QRCodeStyling from 'qr-code-styling';
import { useTemplateRef, onMounted, watch } from 'vue';
const qrCodeRef = useTemplateRef('qrCodeRef');

const props = defineProps<{
  url: string;
}>();

onMounted(() => {
  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    type: 'svg',
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
    },
    dotsOptions: {
      color: 'white',
      type: 'dots',
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: 'white',
    },
    cornersDotOptions: {
      type: 'rounded',
      color: 'white',
    },
    backgroundOptions: {
      color: 'transparent',
    },
    data: props.url,
  });
  qrCode.append(qrCodeRef.value!);
});
</script>
<template>
  <div ref="qrCodeRef" />
</template>