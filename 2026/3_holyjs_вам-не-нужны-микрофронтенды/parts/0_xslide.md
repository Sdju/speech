---
layout: center
---

<!-- Define once: template + first paint -->
<XSlide
  name="hero"
  title="XSlide"
  subtitle="cross-slide morph"
  class="text-center"
>
  <template #default="{ title, subtitle, class: cls, style }">
    <div :class="cls" :style="style">
      <h1 class="text-6xl font-bold m-0 tracking-tight">{{ title }}</h1>
      <p v-if="subtitle" class="text-2xl opacity-70 mt-4 mb-0">{{ subtitle }}</p>
    </div>
  </template>
</XSlide>

---
layout: center
---

<!-- Reuse: same name, new attrs only → element morphs -->
<div class="grid grid-cols-[1fr_1.1fr] gap-10 items-center max-w-5xl mx-auto w-full px-8">
  <XSlide
    name="hero"
    title="Тот же блок"
    class="text-left"
  />

  <ul class="text-lg opacity-75 space-y-3 m-0 list-none p-0">
    <li class="flex gap-3"><span class="opacity-40">1</span><span>общий <code class="text-green-300">name</code></span></li>
    <li class="flex gap-3"><span class="opacity-40">2</span><span>шаблон — только в default-slot</span></li>
    <li class="flex gap-3"><span class="opacity-40">3</span><span>здесь меняем props → View Transition</span></li>
  </ul>
</div>

---
layout: center
---

<!-- Redefine: new markup under the same name (local slot wins) -->
<XSlide
  name="hero"
  title="Новая разметка"
  badge="v2"
  class="w-full max-w-2xl mx-auto"
>
  <template #default="{ title, badge, class: cls, style }">
    <div
      :class="cls"
      :style="style"
      class="flex items-center justify-between gap-6 rounded-xl border border-white/15 bg-white/5 px-8 py-6"
    >
      <h2 class="text-3xl font-bold m-0">{{ title }}</h2>
      <span
        v-if="badge"
        class="text-sm font-bold uppercase tracking-wide px-3 py-1 rounded-md bg-green-500/30 text-green-200"
      >
        {{ badge }}
      </span>
    </div>
  </template>
</XSlide>
