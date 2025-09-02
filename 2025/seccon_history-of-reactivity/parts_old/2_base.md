
---
layout: center
timeline:
  - modularity: -popup-hidden
    fractality: -popup-hidden
    entity: -popup-hidden
  - modularity:
  - fractality:
  - entity:
---

# Основные концепции FEOD

<XSlide slot="concepts" #="{ className }">
  <div :class="className">
    <div class="grid grid-cols-3 gap-8 text-center">
      <div :class="[t.modularity, 'fx']" class="p-6 bg-green-500/20 rounded-lg">
        <span class="text-2xl mb-4 text-green-500 text-center">🧩 Модульность</span>
        <p>Независимые части проекта с собственной структурой и поведением</p>
      </div>
      <div :class="[t.fractality, 'fx']" class="p-6 bg-blue-500/20 rounded-lg">
        <span class="text-xl mb-4 text-blue-500 text-center">🔄 Фрактальность</span>
        <p>Вложенные структуры без ограничения глубины</p>
      </div>  
      <div :class="[t.entity, 'fx']" class="p-6 bg-purple-500/20 rounded-lg">
        <span class="text-2xl mb-4 text-purple-500 text-center w-full">🎯 Сущности</span>
        <p>Каждый файл/директория имеет определённую роль</p>
      </div>
    </div>
  </div>
</XSlide>

<XSlideOut slot="concepts" title="Основные концепции" />

---
layout: center
timeline:
  - global: -popup-hidden
    common: -popup-hidden
    modules: -popup-hidden
    pages: -popup-hidden
    app: -popup-hidden
  - global:
  - common:
  - modules:
  - pages:
  - app:
---

# Уровни FEOD

<XSlide slot="levels" #="{ className }">
  <div :class="className">
    <div class="space-y-4 max-w-4xl mx-auto">
      <div :class="[t.global, 'fx']" class="flex items-center p-4 bg-gray-600/20 rounded-lg">
        <div class="w-30 text-center font-bold text-gray-400">Global</div>
        <div class="flex-1">Глобальные сущности (опционально)</div>
      </div>
      <div :class="[t.common, 'fx']" class="flex items-center p-4 bg-green-500/20 rounded-lg">
        <div class="w-30 text-center font-bold text-green-500">Common</div>
        <div class="flex-1">Переиспользуемые сущности</div>
      </div>
      <div :class="[t.modules, 'fx']" class="flex items-center p-4 bg-blue-500/20 rounded-lg">
        <div class="w-30 text-center font-bold text-blue-500">Modules</div>
        <div class="flex-1">Модули с бизнес-логикой</div>
      </div>
      <div :class="[t.pages, 'fx']" class="flex items-center p-4 bg-purple-500/20 rounded-lg">
        <div class="w-30 text-center font-bold text-purple-500">Pages</div>
        <div class="flex-1">Страницы приложения</div>
      </div>
      <div :class="[t.app, 'fx']" class="flex items-center p-4 bg-red-500/20 rounded-lg">
        <div class="w-30 text-center font-bold text-red-500">App</div>
        <div class="flex-1">Настройки и запуск приложения</div>
      </div>
    </div>
  </div>
</XSlide>

<XSlideOut slot="levels" title="Уровни FEOD" />

---
layout: center
---

# Правила импорта

<XSlide slot="import-rules" #="{ className }">
  <div :class="className">
    <div class="flex justify-center mb-8">
      <div class="text-3xl font-mono bg-gray-800 p-6 rounded-lg">
        <span class="text-gray-400">Global</span> | 
        <span class="text-green-400">Common</span> → 
        <span class="text-blue-400">Modules</span> → 
        <span class="text-purple-400">Pages</span> → 
        <span class="text-red-400">App</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 text-sm">
      <div class="space-y-2">
        <div class="flex items-center">
          <div class="w-16 h-4 bg-gray-600 mr-3"></div>
          <span><span class="text-gray-400">Global</span> - не импортируется</span>
        </div>
        <div class="flex items-center">
          <div class="w-16 h-4 bg-green-500 mr-3"></div>
          <span><span class="text-green-500">Common</span> - импортируется откуда угодно</span>
        </div>
        <div class="flex items-center">
          <div class="w-16 h-4 bg-blue-500 mr-3"></div>
          <span><span class="text-blue-500">Modules</span> - только модули, pages, app</span>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex items-center">
          <div class="w-16 h-4 bg-purple-500 mr-3"></div>
          <span><span class="text-purple-500">Pages</span> - только app</span>
        </div>
        <div class="flex items-center">
          <div class="w-16 h-4 bg-red-500 mr-3"></div>
          <span><span class="text-red-500">App</span> - никто не импортирует</span>
        </div>
      </div>
    </div>
  </div>
</XSlide>

<XSlideOut slot="import-rules" title="Правила импорта" />

