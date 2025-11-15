---
layout: center
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="Современный стек и тенденции"
/>

---

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-gold" v-click="1">
  <span>🥇</span>
  <span class="flex-1" />
  <span>Золотой стандарт</span>
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-grey" v-click="2">
  <span>🐘</span>
  <span class="flex-1" />
  <span>Достойный выбор</span>
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-green" v-click="3">
  <span>🌱</span>
  <span class="flex-1" />
  <span>Амбициозный новичок</span>
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-brown" v-click="4">
  <span>🍫</span>
  <span class="flex-1" />
  <span>Особые вкусы</span>
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-red" v-click="5">
  <span>💣</span>
  <span class="flex-1" />
  <span>Легендарный техдолг</span>
  <span class="flex-1" />
</div>

---

# Фреймворки

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <DeviconReact v-click="2" />
  <DeviconVuejs v-click="3" />
  <LogosAngularIcon v-click="4" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-grey" v-click="5">
  <span>🐘</span>
  <span class="flex-1" />
  <DeviconSvelte v-click="6" />
  <DeviconSolidjs v-click="7" />
  <LogosPreact v-click="8" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-8 cs-brown" v-click="9">
  <span>🍫</span>
  <span class="flex-1" />
  <SkillIconsHtmxDark/>
  <SkillIconsAlpinejsLight/>
  <span class="flex-1" />
</div>

---

<img src="../img/coord.png" class="$obj pos-center size-500px" />

---
layout: center
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
  - q1: '$obj fx text-1.3em pos-50%_30% w-full text-center px-10 '
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="Гонка фреймворков ушла"
/>

<v-clicks at="2">

- Фреймворки уже не появляются каждый день
- Большая тройка твердо доминирует
- TypeScript неоспоримый стандарт

</v-clicks>

---

# Веб-компоненты

<v-clicks>

- Крайне специфичное решение
- Неудобны для использования напрямую
- Дождались Declarative Shadow DOM
- Все фреймворки отчасти умеют работать с веб-компонентами

</v-clicks>

---

# Мета-фреймворки

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <LogosNextjsIcon v-click="2" />
  <MaterialIconThemeNuxt v-click="3" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-grey" v-click="4">
  <span>🐘</span>
  <span class="flex-1" />
  <MaterialIconThemeAstro v-click="5" />
  <DeviconSvelte v-click="6" />
  <DeviconRemix v-click="7" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-green" v-click="8">
  <span>🌱</span>
  <span class="flex-1" />
  <img src="../img/tanstack.png" class="img-icon" v-click="9" />
  <DeviconSolidjs v-click="10" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-brown" v-click="11">
  <span>🍫</span>
  <span class="flex-1" />
  <MaterialIconThemeQwik v-click="12" />
  <LogosAnalog v-click="13" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-red" v-click="14">
  <span>💣</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeGatsby v-click="15" />
  <span class="flex-1" />
</div>

---
layout: center
---

# Сложные изоморфные режимы

<v-clicks>

- Мир больше не ограничен CSR, SSR, SSG
- ISR, Streaming SSR, Partial Hydration, Islands Architecture
- Edge Runtime

</v-clicks>

---
layout: center
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
  - q1: '$obj fx text-1.3em pos-50%_30% w-full text-center px-10 '
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="Фронтендеры стали фуллстаками"
/>


<v-clicks at="2">

- Код фронтендера это не код для браузера
- BFF больше не пустой звук
- Понимание масштабируемости и производительности

</v-clicks>

---
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
  - q1: '$obj fx text-1.3em pos-50%_30% w-full text-center px-10 '
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="Все смешалось"
/>


<v-clicks at="2">

- Server Components: React
- Server Actions: React, Vue, Svelte
- Метафреймворки расширяют возможности написания серверов

</v-clicks>

---

# Сборщики

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <DeviconVitejs v-click="2" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-grey" v-click="3">
  <span>🐘</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeEsbuild v-click="4" />
  <img src="../img/rspack.svg" class="img-icon" v-click="5" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-green" v-click="6">
  <span>🌱</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeRolldown v-click="7" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-brown" v-click="8">
  <span>🍫</span>
  <span class="flex-1" />
  <LogosParcelIcon v-click="9" />
  <LogosBun v-click="10" />
  <LogosTurbopackIcon v-click="11" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-red" v-click="12">
  <span>💣</span>
  <span class="flex-1" />
  <SkillIconsWebpackDark v-click="13" />
  <VscodeIconsFileTypeRollup v-click="14" />
  <span class="flex-1" />
</div>

---

# Война экосистем

<div class="flex flex-row gap-4 text-8xl">
  <LogosUnjs/>
  <VscodeIconsFileTypeOxc />
  <img src="../img/void.png" class="img-icon" />
  <VscodeIconsFileTypeBiome/>
  <img src="../img/rspack.svg" class="img-icon" />
  <LogosBun />
</div>

---
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
    box4: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
  - box4: ''
---

<div class="grid grid-cols-12 grid-rows-[140px_140px_1fr] gap-4 h-full relative top-[-20px]">
  <div class="bento-6_1 box box--rich cs-green flex-center fx" :class="t.box1">
    <LogosUnjs class="text-8xl" />
  </div>
  <div class="bento-6_1 box box--rich cs-purple flex items-center justify-center gap-4 fx" :class="t.box1">
    <h2 class="text-4xl font-bold text-white">UnJS</h2>
  </div>
  <div class="bento-4_2 box box--rich cs-blue flex-center fx p-6" :class="t.box2">
    <div class="text-white">
      <h4 class="text-2xl font-semibold mb-4 text-blue-300">Разработчик</h4>
      <p class="text-xl">UnJS Team (nuxt community)</p>
    </div>
  </div>
  <div class="bento-8_2 box box--rich cs-orange flex items-center gap-6 fx p-6" :class="t.box3">
    <div class="text-white w-full">
      <h4 class="text-2xl font-semibold mb-3 text-orange-300">Ключевые проекты</h4>
      <div class="grid grid-cols-3 gap-3 text-lg">
        <span class="bg-orange-500/20 px-3 py-2 rd-lg"><UnjsNitro/> nitro</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg"><UnjsH3/> h3</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg"><UnjsOfetch/> ofetch</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg"><UnjsUnplugin/> unplugin</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg"><UnjsUnstorage/> unstorage</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg"><UnjsConsola/> consola</span>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-green fx p-6" :class="t.box4">
    <h4 class="text-2xl font-semibold mb-3 text-green-300">Особенности</h4>
    <ul class="text-white text-xl space">
      <li>✨ Универсальные инструменты для любых JS сред</li>
      <li>🚀 Минималистичные и производительные решения</li>
      <li>🔧 Unix в мире фронтенда</li>
    </ul>
  </div>
</div>

---
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
    box4: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
  - box4: ''
---

<div class="grid grid-cols-12 grid-rows-[140px_140px_1fr] gap-4 h-full relative top-[-20px]">
  <div class="bento-6_1 box box--rich cs-purple flex-center fx" :class="t.box1">
    <VscodeIconsFileTypeOxc class="text-8xl" />
  </div>
  <div class="bento-6_1 box box--rich cs-blue flex items-center justify-center gap-4 fx" :class="t.box1">
    <h2 class="text-4xl font-bold text-white">OXC</h2>
  </div>
  <div class="bento-4_2 box box--rich cs-green flex-center fx p-6" :class="t.box2">
    <div class="text-white">
      <h4 class="text-2xl font-semibold mb-4 text-green-300">Разработчик</h4>
      <p class="text-xl">Boshen & OXC Team</p>
    </div>
  </div>
  <div class="bento-8_2 box box--rich cs-orange flex items-center gap-6 fx p-6" :class="t.box3">
    <div class="text-white w-full">
      <h4 class="text-2xl font-semibold mb-3 text-orange-300">Компоненты экосистемы</h4>
      <div class="grid grid-cols-3 gap-3 text-lg">
        <span class="bg-orange-500/20 px-3 py-2 rd-lg">Parser</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg">Linter (oxlint)</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg">Formatter</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg">Resolver</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg">Transformer</span>
        <span class="bg-orange-500/20 px-3 py-2 rd-lg">Minifier</span>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-purple fx p-6" :class="t.box4">
    <h4 class="text-2xl font-semibold mb-3 text-purple-300">Особенности</h4>
    <ul class="text-white text-xl">
      <li>⚡ Написан на Rust - невероятная скорость</li>
      <li>🎯 Полная экосистема инструментов для JS/TS</li>
      <li>🔥 Производительность в 50-100 раз быстрее существующих решений</li>
    </ul>
  </div>
</div>

---
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
    box4: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
  - box4: ''
---

<div class="grid grid-cols-12 grid-rows-[140px_140px_1fr] gap-4 h-full relative top-[-20px]">
  <div class="bento-6_1 box box--rich cs-blue flex-center fx" :class="t.box1">
    <img src="../img/void.png" class="img-icon" style="font-size: 8rem;" />
  </div>
  <div class="bento-6_1 box box--rich cs-orange flex items-center justify-center gap-4 fx" :class="t.box1">
    <h2 class="text-4xl font-bold text-white">Void</h2>
  </div>
  <div class="bento-4_2 box box--rich cs-green flex-center fx p-6" :class="t.box2">
    <div class="text-white">
      <h4 class="text-2xl font-semibold mb-4 text-green-300">Разработчик</h4>
      <p class="text-xl">Evan You (Vue & Vite)</p>
    </div>
  </div>
  <div class="bento-8_2 box box--rich cs-purple flex items-center gap-6 fx p-6" :class="t.box3">
    <div class="text-white w-full">
      <h4 class="text-2xl font-semibold mb-3 text-purple-300">Ключевые инструменты</h4>
      <div class="grid grid-cols-3 gap-3 text-lg">
        <span class="bg-purple-500/20 px-3 py-2 rd-lg"><DeviconVitejs/> Vite</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg"><DeviconVitest/> Vitest</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg"><VscodeIconsFileTypeRolldown/> Rolldown</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg"><VscodeIconsFileTypeOxc/> Oxc</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg"><img src="../img/vitep.svg" class="img-icon" /> Vite+</span>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-blue fx p-6" :class="t.box4">
    <h4 class="text-2xl font-semibold mb-3 text-blue-300">Особенности</h4>
    <ul class="text-white text-xl">
      <li>🌟 Единая high-performance экосистема инструментов</li>
      <li>🚀 Замена медленным JS-инструментам на Rust-альтернативы</li>
      <li>💎 Интеграция лучших практик в единое целое</li>
    </ul>
  </div>
</div>

---
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
    box4: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
  - box4: ''
---

<div class="grid grid-cols-12 grid-rows-[140px_140px_1fr] gap-4 h-full relative top-[-20px]">
  <div class="bento-6_1 box box--rich cs-green flex-center fx" :class="t.box1">
    <VscodeIconsFileTypeBiome class="text-8xl" />
  </div>
  <div class="bento-6_1 box box--rich cs-purple flex items-center justify-center gap-4 fx" :class="t.box1">
    <h2 class="text-4xl font-bold text-white">Biome</h2>
  </div>
  <div class="bento-4_2 box box--rich cs-orange flex-center fx p-6" :class="t.box2">
    <div class="text-white">
      <h4 class="text-2xl font-semibold mb-4 text-orange-300">Разработчик</h4>
      <p class="text-xl">Biome Team (бывший Rome Tools)</p>
    </div>
  </div>
  <div class="bento-8_2 box box--rich cs-blue flex items-center gap-6 fx p-6" :class="t.box3">
    <div class="text-white w-full">
      <h4 class="text-2xl font-semibold mb-3 text-blue-300">Возможности</h4>
      <div class="grid grid-cols-2 gap-3 text-lg">
        <span class="bg-blue-500/20 px-3 py-2 rd-lg">Linter</span>
        <span class="bg-blue-500/20 px-3 py-2 rd-lg">Formatter</span>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-green fx p-6" :class="t.box4">
    <h4 class="text-2xl font-semibold mb-3 text-green-300">Особенности</h4>
    <ul class="text-white text-xl">
      <li>⚡ Все в одном инструменте - заменяет ESLint + Prettier</li>
      <li>🦀 Написан на Rust - мгновенная работа</li>
      <li>🎯 Zero-config - работает из коробки</li>
    </ul>
  </div>
</div>

---
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
    box4: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
  - box4: ''
---

<div class="grid grid-cols-12 grid-rows-[140px_140px_1fr] gap-4 h-full relative top-[-20px]">
  <div class="bento-6_1 box box--rich cs-orange flex-center fx" :class="t.box1">
    <img src="../img/rspack.svg" class="img-icon" style="font-size: 8rem;" />
  </div>
  <div class="bento-6_1 box box--rich cs-blue flex items-center justify-center gap-4 fx" :class="t.box1">
    <h2 class="text-4xl font-bold text-white">Rspack</h2>
  </div>
  <div class="bento-4_2 box box--rich cs-purple flex-center fx p-6" :class="t.box2">
    <div class="text-white">
      <h4 class="text-2xl font-semibold mb-4 text-purple-300">Разработчик</h4>
      <p class="text-xl">ByteDance (TikTok)</p>
    </div>
  </div>
  <div class="bento-8_2 box box--rich cs-green flex items-center gap-6 fx p-6" :class="t.box3">
    <div class="text-white w-full">
      <h4 class="text-2xl font-semibold mb-3 text-green-300">Экосистема</h4>
      <div class="grid grid-cols-3 gap-3 text-lg">
        <span class="bg-green-500/20 px-3 py-2 rd-lg">Rspack</span>
        <span class="bg-green-500/20 px-3 py-2 rd-lg">Rsbuild</span>
        <span class="bg-green-500/20 px-3 py-2 rd-lg">Rspress</span>
        <span class="bg-green-500/20 px-3 py-2 rd-lg">Rsdoctor</span>
        <span class="bg-green-500/20 px-3 py-2 rd-lg">Rstest</span>
        <span class="bg-green-500/20 px-3 py-2 rd-lg">Rslint</span>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-orange fx p-6" :class="t.box4">
    <h4 class="text-2xl font-semibold mb-3 text-orange-300">Особенности</h4>
    <ul class="text-white text-xl">
      <li>🔥 Совместимость с Webpack - легкая миграция</li>
      <li>⚡ В 5-10 раз быстрее благодаря Rust</li>
      <li>🏢 Production-ready - используется в ByteDance</li>
    </ul>
  </div>
</div>

---
timeline:
  - box1: '-blur-hidden'
    box2: '-blur-hidden'
    box3: '-blur-hidden'
    box4: '-blur-hidden'
  - box1: ''
  - box2: ''
  - box3: ''
  - box4: ''
---

<div class="grid grid-cols-12 grid-rows-[140px_140px_1fr] gap-4 h-full relative top-[-20px]">
  <div class="bento-6_1 box box--rich cs-blue flex-center fx" :class="t.box1">
    <LogosBun class="text-8xl" />
  </div>
  <div class="bento-6_1 box box--rich cs-green flex items-center justify-center gap-4 fx" :class="t.box1">
    <h2 class="text-4xl font-bold text-white">Bun</h2>
  </div>
  <div class="bento-4_2 box box--rich cs-orange flex-center fx p-6" :class="t.box2">
    <div class="text-white">
      <h4 class="text-2xl font-semibold mb-4 text-orange-300">Разработчик</h4>
      <p class="text-xl">Jarred Sumner & Bun Team</p>
    </div>
  </div>
  <div class="bento-8_2 box box--rich cs-purple flex items-center gap-6 fx p-6" :class="t.box3">
    <div class="text-white w-full">
      <h4 class="text-2xl font-semibold mb-3 text-purple-300">Возможности</h4>
      <div class="grid grid-cols-3 gap-3 text-lg">
        <span class="bg-purple-500/20 px-3 py-2 rd-lg">Рантайм</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg">Бандлер</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg">Пакетный менеджер</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg">Тест раннер</span>
        <span class="bg-purple-500/20 px-3 py-2 rd-lg">Dev Server</span>
      </div>
    </div>
  </div>
  <div class="col-span-12 row-span-1 box box--rich cs-blue fx p-6" :class="t.box4">
    <h4 class="text-2xl font-semibold mb-3 text-blue-300">Особенности</h4>
    <ul class="text-white text-xl">
      <li>🚀 JavaScriptCore + Zig - экстремальная производительность</li>
      <li>🎁 Все инструменты в одном пакете</li>
      <li>🔌 Drop-in замена для Node.js</li>
    </ul>
  </div>
</div>

---

# Тестирование

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <LogosVitest v-click="2" />
  <VscodeIconsFileTypeStorybook v-click="3" />
  <LogosPlaywright v-click="4" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-grey" v-click="5">
  <span>🐘</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeNode v-click="6" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-brown" v-click="8">
  <span>🍫</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeHistoire v-click="9" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-red" v-click="10">
  <span>💣</span>
  <span class="flex-1" />
  <LogosJest v-click="11" />
  <LogosJasmine v-click="12" />
  <LogosCypress v-click="13" />
  <span class="flex-1" />
</div>

---

# Стилизация

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <MaterialIconThemeTailwindcss v-click="2" />
  <VscodeIconsFileTypeCss v-click="3"/>
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-grey" v-click="4">
  <span>🐘</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeUnocss v-click="5"/>
  <EmojioneV1LightningMood v-click="12"/>
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-brown" v-click="6">
  <span>🍫</span>
  <span class="flex-1" />
  <DeviconStyledcomponents v-click="7"/>
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-red" v-click="8">
  <span>💣</span>
  <span class="flex-1" />
  <DeviconSass v-click="9"/>
  <VscodeIconsFileTypePostcss v-click="10"/>
  <span class="flex-1" />
</div>

---
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
  - q1: '$obj fx text-1.3em pos-50%_30% w-full text-center px-10 '
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="UI тоже развиваются"
/>

<v-clicks at="2">

- От полноценных до безголовых
- Shadcn революция: теперь вы управляете исходниками

</v-clicks>


---

# Линтеры и форматтеры

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <MaterialIconThemePrettier v-click="2" />
  <DeviconEslint v-click="3" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-grey" v-click="4">
  <span>🐘</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeBiome v-click="5"/>
  <FileIconsStylelint v-click="6" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-green" v-click="7">
  <span>🌱</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeOxc v-click="8" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-brown" v-click="9">
  <span>🍫</span>
  <span class="flex-1" />
  <img src="../img/dprint.png" class="img-icon" v-click="10" />
  <span class="flex-1" />
</div>

---

# Рантаймы

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <VscodeIconsFileTypeNode v-click="2" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-grey" v-click="3">
  <span>🐘</span>
  <span class="flex-1" />
  <LogosBun v-click="4" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-brown" v-click="6">
  <span>🍫</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeDeno v-click="5" />
  <span class="flex-1" />
</div>

---
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
  - q1: '$obj fx text-1.3em pos-50%_30% w-full text-center px-10 '
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="Рантаймов больше не 2"
/>

<v-clicks at="2">

- Большы мы не ограничены Node.js и браузером
- <logos-bun /> bun, <logos-deno /> deno, ![](../img/edge.png){.img-icon} edge-light, <logos-fastly /> fastly, ![](../img/llrt.png){.img-icon} LLRT, <logos-netlify /> netlify, ![](../img/wasmer.png){class="img-icon"} wasmer, ![](../img/workerd.png){.img-icon} workerd
- WinterTC это новый стандарт

</v-clicks>

---

# Менеджмент зависимостей

<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 cs-gold" v-click="1">
  <span>🥇 </span>
  <span class="flex-1" />
  <DeviconPnpm v-click="2" />
  <VscodeIconsFileTypeLightTurbo v-click="3" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-grey" v-click="4">
  <span>🐘</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeNpm v-click="5" />
  <SimpleIconsNx v-click="6" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-green" v-click="7">
  <span>🌱</span>
  <span class="flex-1" />
  <VscodeIconsFileTypeJsr v-click="8" />
  <span class="flex-1" />
</div>
<div class="box box--rich flex-center-row text-4xl text-white p-4 gap-4 mt-6 cs-red" v-click="9">
  <span>💣</span>
  <span class="flex-1" />
  <LogosYarn v-click="10" />
  <VscodeIconsFileTypeLightLerna v-click="11" />
  <span class="flex-1" />
</div>

---
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
  - q1: '$obj fx text-1.3em pos-50%_30% w-full text-center px-10 '
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="Микрофронтенды - наигрались и хватит"
/>

<v-clicks at="2">

- Микрофронтенды - не серебряная пуля
- Они решают сложные задачи, но не всегда это необходимо
- Порой есть более дешевые и простые решения
</v-clicks>

---
layout: center
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="В 2025 мы не стоим на месте"
/>

---
layout: center
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
---

<AnimatedText
  :class="t.q1"
  :mode="t.q1Mode"
  words="AI меняет ландшафт"
/>

---
layout: center
timeline:
  - q1: '$obj fx text-1.3em pos-50% w-full text-center px-10 '
    q1Mode: false
  - q1Mode: true
---

<div class="text-center w-full text-6xl  rainbow-text">
  Эксперементируйте, пробуйте, говорите!
</div>

<DeviconReact class="$obj pos-712_51 size-150 swinging" />
<VscodeIconsFileTypeAngular class="$obj pos-492_444 size-150 drift" />
<LogosPinia class="$obj pos-85_70 size-150 pinia" />

<style>
.rainbow-text{
	position: relative;
  
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  padding: 2px 4px 6px;
  margin: -2px -4px -6px;
	background: linear-gradient(90deg in hsl, rgb(255, 75, 75), rgb(81, 255, 75), rgb(123, 130, 255), rgb(255, 75, 75));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: move 1s linear infinite, pulse-alt 2s ease-in-out infinite;
}

.swinging {
  animation: swinging 2s linear infinite;
}

.pinia {
  animation: hue-rotate 1.7s linear infinite, shake 0.5s linear infinite;
}

.drift {
  animation: drift 1.7s linear infinite;
}

@keyframes move{
  0%{background-position: 0 0;}
  100%{background-position: 1000px 0;}
}

@keyframes shake {
  0%{transform: rotate(7deg) scale(1.05);}
  50%{transform: rotate(20deg) scale(1.1);}
  100%{transform: rotate(7deg) scale(1.05);}
}

@keyframes hue-rotate {
  0%{filter: hue-rotate(0deg); }
  100%{filter: hue-rotate(360deg);}
  200%{filter: hue-rotate(720deg);}
}

@keyframes swinging {
  0%{transform: rotate(0deg) scale(1);}
  50%{transform: rotate(180deg) scale(70%);}
  100%{transform: rotate(360deg) scale(1);}
}

@keyframes drift {
  0%{transform: skew(0deg) translate(-500px, -50%);}
  100%{transform: skew(40deg) translate(500px, -50%);}
}
</style>

---
layout: center
---

# Спасибо за внимание!

---

<div class="grid grid-cols-12 grid-rows-[120px_120px_1fr] gap-4 h-full relative top-[-12px] wut">
  <div class="bento-6_3 box box--rich cs-blue">
    <img class="absolute inset-0 w-full h-full object-cover" src="../img/utro2.png" />
    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg-keyword)] to-transparent p-6">
      <p class="text-4xl font-bold text-center text-white mb-2">Тяжелое утро</p>
    </div>
  </div>
  <div class="bento-3_2 box box--rich cs-purple flex-center fx">
    <QrCodeIntro class="size-180" />
    <p class="text-white text-center text-lg">@zede_code</p>
  </div>
  <div class="bento-3_1 box box--rich cs-orange flex items-center gap-4 fx">
    <div class="size-80 rd-xl">
      <ZedeIcon class="size-full" />
    </div>
    <div>
      <h4 class="text-xl font-semibold text-orange-300 mb-1">Zede</h4>
      <p class="text-sm text-orange-400/70">@zede_code</p>
    </div>
  </div>
  <div class="bento-3_1 box box--rich cs-green flex items-center gap-4 fx">
    <div class="size-80 rd-xl of-hidden">
      <img src="../img/vueist.png" class="size-full object-cover" />
    </div>
    <div>
      <h4 class="text-xl font-semibold text-green-300 mb-1">Vueist</h4>
      <p class="text-sm text-green-400/70">@vueist</p>
    </div>
  </div>
  <div class="bento-3_1 box box--rich cs-gold flex items-center gap-4 fx">
    <ImgExample src="../img/ufaqr.png" />
  </div>
  <div class="bento-3_1 box box--rich cs-gold flex items-center gap-4 fx">
    <div class="size-80 rd-xl of-hidden">
      <img src="../img/ufajs.jpg" class="size-full object-cover" />
    </div>
    <div>
      <h4 class="text-xl font-semibold text-yellow-300 mb-1">UfaJS</h4>
      <p class="text-sm text-yellow-400/70">@ufajs</p>
    </div>
  </div>
</div>

<style>
.wut {
  text-shadow: 0 0 7px #000000;
}
</style>