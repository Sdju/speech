---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
    point3: -popup-hidden
    point4: -popup-hidden
  - point1:
  - point2:
  - point3:
  - point4:
---

<XSlide slot="migration" #="{ className }">
  <div :class="className">
    <h1 class="mb-8 text-center">Миграция на FEOD</h1>
    <div class="space-y-6">
      <div class="text-center text-lg mb-8">
        Поэтапный переход с существующей структуры
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div :class="[t.point1, 'fx']" class="p-4 bg-blue-500/20 rounded-lg text-center">
          <div class="text-3xl mb-2">1️⃣</div>
          <h3 class="font-bold mb-2">Выделить App</h3>
          <p class="text-sm">Создать папку app и переместить конфигурации, роутер, лейауты</p>
        </div>
        <div :class="[t.point2, 'fx']" class="p-4 bg-green-500/20 rounded-lg text-center">
          <div class="text-3xl mb-2">2️⃣</div>
          <h3 class="font-bold mb-2">Создать Pages</h3>
          <p class="text-sm">Выделить страницы по файловой структуре роутинга</p>
        </div>
        <div :class="[t.point3, 'fx']" class="p-4 bg-purple-500/20 rounded-lg text-center">
          <div class="text-3xl mb-2">3️⃣</div>
          <h3 class="font-bold mb-2">Выделить Modules</h3>
          <p class="text-sm">Группировать бизнес-логику в модули с index.ts</p>
        </div>
        <div :class="[t.point4, 'fx']" class="p-4 bg-yellow-500/20 rounded-lg text-center">
          <div class="text-3xl mb-2">4️⃣</div>
          <h3 class="font-bold mb-2">Создать Common</h3>
          <p class="text-sm">Переместить переиспользуемые утилиты и компоненты</p>
        </div>
      </div>
      <div class="text-center p-4 bg-gray-500/20 rounded-lg">
        <strong>💡 Совет:</strong> Начинайте с плоской структуры, постепенно группируя связанную логику в модули
      </div>
    </div>
  </div>
</XSlide>

<XSlideOut slot="migration" title="Миграция на FEOD" />

---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
  - point1:
  - point2:
---

# 🚀 Расширения FEOD

<div class="space-y-8 max-w-6xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg">
<strong>Дополнительные возможности для продвинутых проектов</strong>
</div>
<div class="grid grid-cols-2 gap-6">
<div :class="[t.point1, 'fx']" class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
<h3 class="text-xl font-bold mb-4 text-blue-400">🌐 SSR</h3>
<div class="space-y-3 text-base">
<div>Server-Side Rendering поддержка</div>
<div>🔧 Отдельный уровень server в app</div>
<div>📄 entry.server.ts и entry.client.ts</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
<h3 class="text-xl font-bold mb-4 text-green-400">💉 DI</h3>
<div class="space-y-3 text-base">
<div>Dependency Injection</div>
<div>🔗 Решение кросс-модульных связей</div>
<div>🎯 Слабая связанность модулей</div>
</div>
</div>
</div>
<div class="text-center p-4 bg-gray-500/10 rounded-lg">
<strong>💡 Используйте расширения по мере необходимости — FEOD растёт вместе с вашим проектом</strong>
</div>
</div>

---
layout: center
timeline:
  - point3: -popup-hidden
    point4: -popup-hidden
  - point3:
  - point4:
---

# 🚀 Расширения FEOD

<div class="space-y-8 max-w-6xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg">
<strong>Дополнительные возможности для продвинутых проектов</strong>
</div>
<div class="grid grid-cols-2 gap-6">
<div :class="[t.point3, 'fx']" class="p-6 bg-purple-500/20 rounded-xl border-l-4 border-purple-500">
<h3 class="text-xl font-bold mb-4 text-purple-400">🏗️ DDD</h3>
<div class="space-y-3 text-base">
<div>Domain-Driven Design</div>
<div>📦 Структура entities + adapters</div>
<div>🎯 Доменное моделирование в модулях</div>
</div>
</div>
<div :class="[t.point4, 'fx']" class="p-6 bg-orange-500/20 rounded-xl border-l-4 border-orange-500">
<h3 class="text-xl font-bold mb-4 text-orange-400">🔧 Toolchain</h3>
<div class="space-y-3 text-base">
<div>Инструменты разработки</div>
<div>⚙️ lint, build, test, scripts</div>
<div>📁 Изоляция от основного кода</div>
</div>
</div>
</div>
<div class="text-center p-4 bg-gray-500/10 rounded-lg">
<strong>💡 Используйте расширения по мере необходимости — FEOD растёт вместе с вашим проектом</strong>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🎯 Гибкость FEOD

<div :class="[t.point1, 'fx']" class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-blue-500/10 p-4 rounded-lg">
<strong>FEOD адаптируется под ваши потребности</strong>
</div>
<div class="p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl">
<div class="text-center text-2xl font-bold mb-6 text-indigo-400">
💫 FEOD — это принципы, а не догмы
</div>
<div class="grid grid-cols-3 gap-6 text-base">
<div class="text-center p-4 bg-green-500/20 rounded-lg">
<div class="text-xl mb-2">🔧</div>
<strong>Опциональные уровни</strong>
</div>
<div class="text-center p-4 bg-blue-500/20 rounded-lg">
<div class="text-xl mb-2">📝</div>
<strong>Свободные названия</strong>
</div>
<div class="text-center p-4 bg-purple-500/20 rounded-lg">
<div class="text-xl mb-2">🏗️</div>
<strong>Свободная структура</strong>
</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
  - point1:
  - point2:
---

# 🔧 Опциональные уровни

<div class="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
<div :class="[t.point1, 'fx']" class="space-y-6">
<div class="p-6 bg-purple-500/20 rounded-xl border-l-4 border-purple-500">
<h3 class="text-xl font-bold mb-4 text-purple-400">📄 Pages внутри модулей</h3>
<div class="text-lg font-mono bg-gray-800 p-4 rounded-lg text-green-400">
📁 modules/AdminPanel/<br/>
├── 📁 pages/<br/>
│&nbsp;&nbsp;&nbsp;├── 📄 dashboard.vue<br/>
│&nbsp;&nbsp;&nbsp;└── 📄 settings.vue<br/>
├── 📁 ui/<br/>
└── 📄 index.ts
</div>
<div class="text-sm text-purple-300 mt-3">
💡 Когда страницы тесно связаны с модулем
</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="space-y-6">
<div class="p-6 bg-gray-500/20 rounded-xl border-l-4 border-gray-500">
<h3 class="text-xl font-bold mb-4 text-gray-400">🌍 Global по необходимости</h3>
<div class="space-y-3 text-base">
<div class="p-3 bg-green-500/20 rounded">
<strong>✅ Есть Global:</strong> Много глобальных типов
</div>
<div class="p-3 bg-blue-500/20 rounded">
<strong>✅ Нет Global:</strong> Простой проект
</div>
</div>
<div class="text-sm text-gray-300 mt-3">
🎯 Добавляйте только при реальной потребности
</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
  - point1:
  - point2:
---

# 📝 Свободные названия

<div class="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
<div :class="[t.point1, 'fx']" class="space-y-6">
<h3 class="text-xl font-bold mb-4 text-blue-400 text-center">Классические названия</h3>
<div class="text-lg font-mono bg-gray-800 p-4 rounded-lg text-green-400">
📁 src/<br/>
├── 📁 app/<br/>
├── 📁 pages/<br/>
├── 📁 modules/<br/>
├── 📁 common/<br/>
└── 📁 globals/
</div>
</div>
<div :class="[t.point2, 'fx']" class="space-y-6">
<h3 class="text-xl font-bold mb-4 text-purple-400 text-center">Ваши названия</h3>
<div class="text-lg font-mono bg-gray-800 p-4 rounded-lg text-green-400">
📁 src/<br/>
├── 📁 app/<br/>
├── 📁 views/<br/>
├── 📁 features/<br/>
├── 📁 shared/<br/>
└── 📁 types/
</div>
</div>
</div>
<div class="text-center p-4 bg-indigo-500/10 rounded-lg mt-8">
<strong>✅ Главное — соблюдать архитектурные правила импорта</strong>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🏗️ Свободная структура

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="text-center text-lg bg-purple-500/10 p-4 rounded-lg mb-8">
<strong>Добавляйте папки под задачи вашего проекта</strong>
</div>
<div class="grid grid-cols-2 gap-8">
<div class="space-y-4">
<h4 class="text-lg font-bold text-blue-400">📦 В модулях:</h4>
<div class="text-sm font-mono bg-gray-800 p-4 rounded-lg text-green-400">
📁 modules/Analytics/<br/>
├── 📁 ui/<br/>
├── 📁 api/<br/>
├── 📁 stores/<br/>
├── 📁 workers/     🆕<br/>
├── 📁 configs/     🆕<br/>
└── 📄 index.ts
</div>
</div>
<div class="space-y-4">
<h4 class="text-lg font-bold text-green-400">🔧 В Common:</h4>
<div class="text-sm font-mono bg-gray-800 p-4 rounded-lg text-green-400">
📁 common/<br/>
├── 📁 ui/<br/>
├── 📁 utilities/<br/>
├── 📁 composables/<br/>
├── 📁 directives/  🆕<br/>
├── 📁 constants/   🆕<br/>
└── 📁 validators/  🆕
</div>
</div>
</div>
<div class="text-center p-4 bg-yellow-500/10 rounded-lg">
<strong>🎯 Важна суть задач, а не жесткий набор папок</strong>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
    point3: -popup-hidden
    point4: -popup-hidden
  - point1:
  - point2:
  - point3:
  - point4:
---

# 🌍 Где используется FEOD

<div class="space-y-8 max-w-6xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg">
<strong>Реальные проекты и примеры внедрения</strong>
</div>
<div class="grid grid-cols-2 gap-6">
<div :class="[t.point1, 'fx']" class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
<h3 class="text-xl font-bold mb-4 text-blue-400">🛒 Маркетплейс</h3>
<div class="space-y-3 text-base">
<div>🧪 Обкатка идей и концепций</div>
<div>✅ Проверка принципов на практике</div>
<div>📊 Сбор фидбека</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
<h3 class="text-xl font-bold mb-4 text-green-400">🚚 Курьерские компании</h3>
<div class="space-y-3 text-base">
<div>🔄 Схожая концепция архитектуры</div>
<div>📦 Модульная организация логики</div>
<div>🎯 Успешное применение принципов</div>
</div>
</div>
<div :class="[t.point3, 'fx']" class="p-6 bg-purple-500/20 rounded-xl border-l-4 border-purple-500">
<h3 class="text-xl font-bold mb-4 text-purple-400">📡 TechRadar</h3>
<div class="space-y-3 text-base">
<div>🔄 Планомерный переход к подходу</div>
<div>⚙️ Постепенная миграция в процессе</div>
<div>📈 Положительные результаты</div>
</div>
</div>
<div :class="[t.point4, 'fx']" class="p-6 bg-orange-500/20 rounded-xl border-l-4 border-orange-500">
<h3 class="text-xl font-bold mb-4 text-orange-400">📖 Документация</h3>
<div class="space-y-3 text-base">
<div>💾 Примеры в репозитории</div>
<div>⚙️ SSR приложение</div>
</div>
</div>
</div>
<div class="text-center p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg">
<strong>🚀 FEOD успешно применяется в продакшне и продолжает развиваться</strong>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 📋 Статус FEOD в компании

<div :class="[t.point1, 'fx']" class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg">
<strong>🎖️ Рекомендованная методология</strong>
</div>
<div class="grid grid-cols-2 gap-8">
<div class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
<h3 class="text-xl font-bold mb-4 text-green-400">✅ Новые проекты</h3>
<div class="space-y-3 text-base">
<div>🚀 Стартуют с FEOD из коробки</div>
<div>📋 Единый стандарт для команды</div>
<div>🎯 Консистентная архитектура</div>
</div>
</div>
<div class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
<h3 class="text-xl font-bold mb-4 text-blue-400">🔄 Существующие проекты</h3>
<div class="space-y-3 text-base">
<div>😌 Никого не заставляем переписывать</div>
<div>📈 Постепенная миграция при желании</div>
<div>🛠️ Поддержка текущих решений</div>
</div>
</div>
</div>
<div class="text-center space-y-4">
<div class="p-4 bg-purple-500/10 rounded-lg">
<strong>📚 Обучение:</strong> Документация, примеры и поддержка команды
</div>
</div>
</div>

---
layout: center
class: text-center
---

# Заключение

<XSlide slot="conclusion" #="{ className }">
  <div :class="className">
    <div class="text-xl space-y-6 max-w-4xl mx-auto">
      <div class="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
        <strong>FEOD</strong> — это не просто структура папок,<br/>
        это <em>подход организации кода</em>
      </div>
      <div class="grid grid-cols-3 gap-6 text-base">
        <div class="p-4 bg-green-500/20 rounded">
          <strong>Простота</strong><br/>
          Понятная структура для всех
        </div>
        <div class="p-4 bg-blue-500/20 rounded">
          <strong>Контроль</strong><br/>
          Четкие правила импорта
        </div>
        <div class="p-4 bg-purple-500/20 rounded">
          <strong>Масштабируемость</strong><br/>
          От малых до больших проектов
        </div>
      </div>
    </div>
  </div>
</XSlide>

<XSlideOut slot="conclusion" title="Начните использовать FEOD уже сегодня!" />