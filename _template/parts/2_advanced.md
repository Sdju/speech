---
timeline:
  - block2: -blur-hidden fx
    block3: -blur-hidden fx
    block4: -blur-hidden fx
  - block2: fx
  - block3: fx
  - block4: fx
---

<div class="text-center mb-8 text-2xl font-bold">Формат анализа каждого подхода</div>

<div class="grid grid-cols-2 grid-rows-2 gap-4">
  <div class="text-2xl font-bold border text-center p-4 bg-green/30 border-green rounded-md">🎯 Контекст</div>
  <div :class="t.block2" class="text-2xl font-bold border text-center p-4 bg-blue/30 border-blue rounded-md">📖 Теория</div>
  <div :class="t.block3" class="text-2xl font-bold border text-center p-4 bg-red/30 border-red rounded-md">💻 Практика</div>
  <div :class="t.block4" class="text-2xl font-bold border text-center p-4 bg-purple/30 border-purple rounded-md">⚖️ Оценка</div>
</div>
