---
layout: center
timeline:
  - qr:
      url: https://sdju.github.io/speech/
    label: Все доклады
  - qr:
      url: https://t.me/zede1697
    label: Канал спикера
  - qr:
      url: https://sdju.github.io/speech/slides/2026_holyjs_you-dont-need-microfrontends/#/1
    label: Конкретный доклад
---

# QR-код для любой ссылки

<div class="flex items-center justify-center gap-12 mt-6">
  <QrCode v-bind="t.qr" :size="260" />
  <div class="text-left max-w-[360px]">
    <h2>{{ t.label }}</h2>
    <p class="text-base break-all">{{ t.qr.url }}</p>
    <p class="text-base opacity-60">Нажмите, чтобы сменить ссылку</p>
  </div>
</div>

---
layout: center
---

# Размер и светлый фон

<div class="flex items-center justify-center gap-16 mt-8">
  <div class="flex flex-col items-center gap-4">
    <QrCode url="https://t.me/zede1697" class="size-160" />
    <span class="text-base">Размер через класс</span>
  </div>
  <div class="flex flex-col items-center gap-4">
    <QrCode url="https://sdju.github.io/speech/" :size="200" color="#111827" background="#ffffff" />
    <span class="text-base">Тёмный код на светлом фоне</span>
  </div>
</div>
