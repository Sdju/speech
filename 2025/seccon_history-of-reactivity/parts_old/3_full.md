---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
  - point1:
  - point2:
---

# 🚀 Уровень App

<div class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-red-500/10 p-4 rounded-lg">
<strong>Входная точка приложения — где всё начинается</strong>
</div>
<div class="grid grid-cols-2 gap-8">
<div :class="[t.point1, 'fx']" class="p-6 bg-red-500/20 rounded-xl border-l-4 border-red-500">
<h3 class="text-xl font-bold mb-4 text-red-400">🎯 Что относится к App?</h3>
<div class="space-y-3 text-base">
<div>✅ Настройки и конфигурации</div>
<div>✅ Роутер и навигация</div>
<div>✅ Интеграции с внешними сервисами</div>
<div>✅ Лейауты приложения</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
<h3 class="text-xl font-bold mb-4 text-blue-400">🔐 Принцип изоляции</h3>
<div class="space-y-3 text-base">
<div>🚫 <strong>НИКТО</strong> не импортирует из <strong>App</strong></div>
<div>💡 <strong>App</strong> импортирует <strong>Pages</strong> для роутера</div>
<div>⚡ Использует IoC для интеграций</div>
<div>🎯 Всё настраивается в одном месте</div>
</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🏗️ Структура App

<div :class="[t.point1, 'fx']" class="max-w-4xl mx-auto">
<div class="p-8 bg-red-500/10 rounded-xl border border-red-500/30">
<div class="text-lg font-mono bg-gray-800 p-6 rounded-lg text-green-400">
📁 app/<br/>
├── 📁 public/     (favicon, robots.txt)<br/>
├── 📁 router/     (настройки роутера)<br/>
├── 📁 layouts/    (основные лейауты)<br/>
├── 📁 config/     (конфигурации)<br/>
├── 📁 externals/  (интеграции)<br/>
└── 📁 ui/         (Header, Footer)
</div>
<div class="mt-6 text-center text-lg text-red-400">
<span class="text-red-400">Каждая папка имеет свою четкую роль</span>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 💡 Интеграции в App

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="text-center text-lg bg-green-500/10 p-4 rounded-lg">
<span class="text-green-500">IoC паттерн для внешних сервисов</span>
</div>
<div class="bg-gray-800 p-6 rounded-lg">

```ts
// app/externals/analytics.ts
import { analytics } from '@/modules/analytics'

export function initAnalytics() {
  analytics.init({
    apiKey: process.env.ANALYTICS_KEY,
    debug: process.env.NODE_ENV === 'development'
  })
}
```

</div>
<div class="grid grid-cols-2 gap-6 text-base">
<div class="p-4 bg-blue-500/20 rounded-lg">
<span class="text-blue-500">✅ Правильно:</span> Конфигурация в App
</div>
<div class="p-4 bg-red-500/20 rounded-lg">
<span class="text-red-500">❌ Неправильно:</span> Логика в App
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 📄 Уровень Pages

<div :class="[t.point1, 'fx']" class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-purple-500/10 p-4 rounded-lg">
<span class="text-purple-500">Страницы = URL адреса в вашем приложении</span>
</div>
<div class="p-6 bg-purple-500/20 rounded-xl border-l-4 border-purple-500">
<h3 class="text-xl font-bold mb-4 text-purple-400">🔒 Принципы изоляции</h3>
<div class="space-y-3 text-base">
<div>🚫 Pages не импортируется никем (кроме App)</div>
<div>✅ Pages импортирует Modules и Common</div>
<div>🎯 Самостоятельные сущности</div>
<div>💡 Модули могут создавать свои роуты</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🗺️ Файловый роутинг

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto">
<div class="p-8 bg-purple-500/10 rounded-xl border border-purple-500/30">
<div class="space-y-4 text-lg">
<div class="flex justify-between items-center p-3 bg-gray-800 rounded">
<code class="text-blue-400">/main/home</code>
<span class="text-gray-400">→</span>
<code class="text-green-400">pages/main/home.vue</code>
</div>
<div class="flex justify-between items-center p-3 bg-gray-800 rounded">
<code class="text-blue-400">/posts/123</code>
<span class="text-gray-400">→</span>
<code class="text-green-400">pages/posts/[id].vue</code>
</div>
<div class="flex justify-between items-center p-3 bg-gray-800 rounded">
<code class="text-blue-400">/admin/</code>
<span class="text-gray-400">→</span>
<code class="text-green-400">pages/admin/index.vue</code>
</div>
<div class="flex justify-between items-center p-3 bg-gray-800 rounded">
<code class="text-blue-400">/*</code>
<span class="text-gray-400">→</span>
<code class="text-green-400">pages/[...404].vue</code>
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

# 🎭 Продвинутые возможности Pages

<div class="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
<div :class="[t.point1, 'fx']" class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
<h3 class="text-xl font-bold mb-4 text-blue-400">Multiple views</h3>
<div class="space-y-3 text-base">
<div><code>login.form.vue</code> → <code>&lt;router-view name="form"&gt;</code></div>
<div><code>login.content.vue</code> → <code>&lt;router-view name="content"&gt;</code></div>
<div class="text-sm text-blue-300">💡 Разные части одной страницы</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
<h3 class="text-xl font-bold mb-4 text-green-400">Приватные модули</h3>
<div class="space-y-3 text-base">
<div><code>pages/home.vue</code></div>
<div><code>pages/_home/</code> (приватный модуль)</div>
<div class="text-sm text-green-300">🎯 Логика только для этой страницы</div>
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

# 🧩 Уровень Modules

<div class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-blue-500/10 p-4 rounded-lg">
<strong>Модули = микро-зависимости с бизнес-логикой</strong>
</div>
<div class="grid grid-cols-2 gap-8">
<div :class="[t.point1, 'fx']" class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
<h3 class="text-xl font-bold mb-4 text-blue-400">🎯 Что это модуль?</h3>
<div class="space-y-3 text-base">
<div>✅ Комплексная бизнес-логика</div>
<div>✅ Переиспользуемая функциональность</div>
<div>✅ Интеграция с API</div>
<div>❌ Простые утилиты (это Common)</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="p-6 bg-purple-500/20 rounded-xl border-l-4 border-purple-500">
<h3 class="text-xl font-bold mb-4 text-purple-400">🔄 Фрактальность</h3>
<div class="space-y-3 text-base">
<div>📦 Модуль может содержать подмодули</div>
<div>🔒 Подмодули изолированы</div>
<div>📤 Доступ только через index.ts</div>
<div>♾️ Любая глубина вложенности</div>
</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 📁 Структура модуля

<div :class="[t.point1, 'fx']" class="max-w-4xl mx-auto">
<div class="p-8 bg-blue-500/10 rounded-xl border border-blue-500/30">
<div class="text-lg font-mono bg-gray-800 p-6 rounded-lg text-green-400">
📁 modules/User/<br/>
├── 📁 modules/     (подмодули)<br/>
│&nbsp;&nbsp;&nbsp;└── 📁 Profile/<br/>
├── 📁 ui/          (компоненты)<br/>
├── 📁 stores/      (состояние)<br/>
├── 📁 api/         (API запросы)<br/>
├── 📄 types.ts<br/>
└── 📄 index.ts     (публичный API)
</div>
<div class="mt-6 text-center text-lg text-blue-400">
<strong>index.ts — единственная точка входа</strong>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 💡 Публичный API модуля

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="text-center text-lg bg-blue-500/10 p-4 rounded-lg">
<strong>Контролируйте, что экспортируете</strong>
</div>
<div class="bg-gray-800 p-6 rounded-lg">

```ts
// modules/User/index.ts
export { UserProfile } from './ui/UserProfile.vue'
export { useUserStore } from './stores/user'
export type { User } from './types'

// Приватные файлы остаются внутри модуля
// ./internal/validateUser.ts - недоступен снаружи
```

</div>
<div class="grid grid-cols-2 gap-6 text-base">
<div class="p-4 bg-green-500/20 rounded-lg">
<strong>✅ Публичное:</strong> Экспортируется
</div>
<div class="p-4 bg-red-500/20 rounded-lg">
<strong>🔒 Приватное:</strong> Только внутри модуля
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# ⚠️ Кросс-модульные связи

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="grid grid-cols-2 gap-6">
<div class="p-6 bg-red-500/20 rounded-xl border-l-4 border-red-500">
<h3 class="text-xl font-bold mb-4 text-red-400">🚫 Запрещено</h3>
<div class="space-y-3 text-base">
<div>Зигзагообразные импорты</div>
<div>Прямой доступ к подмодулям</div>
<div><code>modules/A/submodule/file.ts</code></div>
</div>
</div>
<div class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
<h3 class="text-xl font-bold mb-4 text-green-400">✅ Разрешено</h3>
<div class="space-y-3 text-base">
<div>Только через публичный API</div>
<div>IoC для слабой связанности</div>
<div><code>modules/A/index.ts</code></div>
</div>
</div>
</div>
<div class="text-center p-4 bg-yellow-500/10 rounded-lg">
<strong>💡 Совет:</strong> Минимизируйте связи между модулями
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 📦 Фрактальность: Подмодули

<div :class="[t.point1, 'fx']" class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-purple-500/10 p-4 rounded-lg">
<strong>Модули внутри модулей — бесконечная вложенность</strong>
</div>
<div class="p-6 bg-purple-500/20 rounded-xl border-l-4 border-purple-500">
<h3 class="text-xl font-bold mb-4 text-purple-400">🎯 Что такое подмодуль?</h3>
<div class="space-y-3 text-base">
<div>📦 Модуль, который находится внутри другого модуля</div>
<div>🔒 Полностью изолирован от внешнего мира</div>
<div>📤 Доступен только через родительский модуль</div>
<div>♾️ Может содержать свои подмодули</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🏗️ Структура подмодулей

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto">
<div class="p-8 bg-purple-500/10 rounded-xl border border-purple-500/30">
<div class="text-lg font-mono bg-gray-800 p-6 rounded-lg text-green-400">
📁 modules/UserManagement/<br/>
├── 📁 modules/          (подмодули)<br/>
│&nbsp;&nbsp;&nbsp;├── 📁 UserProfile/<br/>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📁 modules/   (подподмодули)<br/>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── 📁 AvatarUpload/<br/>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📁 ui/<br/>
│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── 📄 index.ts<br/>
│&nbsp;&nbsp;&nbsp;└── 📁 UserSettings/<br/>
├── 📁 ui/<br/>
├── 📁 api/<br/>
└── 📄 index.ts          (только экспорт подмодулей)
</div>
<div class="mt-6 text-center text-lg text-purple-400">
<strong>Любая глубина вложенности</strong>
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

# 🔐 Изоляция подмодулей

<div class="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
<div :class="[t.point1, 'fx']" class="p-6 bg-red-500/20 rounded-xl border-l-4 border-red-500">
<h3 class="text-xl font-bold mb-4 text-red-400">🚫 Запрещено</h3>
<div class="space-y-3 text-base">
<div>Прямой импорт подмодуля:</div>
<div class="text-sm bg-gray-800 p-2 rounded">
<code>modules/UserManagement/modules/UserProfile</code>
</div>
<div>Зигзагообразные импорты между подмодулями</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
<h3 class="text-xl font-bold mb-4 text-green-400">✅ Разрешено</h3>
<div class="space-y-3 text-base">
<div>Только через родительский модуль:</div>
<div class="text-sm bg-gray-800 p-2 rounded">
<code>modules/UserManagement</code>
</div>
<div>Экспорт через index.ts родителя</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 💡 Экспорт подмодулей

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="text-center text-lg bg-purple-500/10 p-4 rounded-lg">
<strong>Родительский модуль контролирует доступ</strong>
</div>
<div class="bg-gray-800 p-6 rounded-lg">

```ts
// modules/UserManagement/index.ts
import { UserProfile } from './modules/UserProfile'
import { UserSettings } from './modules/UserSettings'

// Экспортируем только то, что нужно снаружи
export { UserProfile }
export { UserSettings }

// modules/UserProfile/index.ts остается приватным
// Его содержимое недоступно напрямую
```

</div>
<div class="grid grid-cols-2 gap-6 text-base">
<div class="p-4 bg-blue-500/20 rounded-lg">
<strong>✅ Контроль:</strong> Только нужное API
</div>
<div class="p-4 bg-green-500/20 rounded-lg">
<strong>🔒 Изоляция:</strong> Детали скрыты
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🎯 Когда создавать подмодуль?

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="grid grid-cols-2 gap-6">
<div class="space-y-4">
<div class="p-4 bg-yellow-500/20 rounded-lg border-l-4 border-yellow-500">
<h4 class="font-bold text-yellow-400">⚡ Сигналы для создания:</h4>
<div class="text-sm space-y-2 mt-2">
<div>📈 Модуль стал слишком большим</div>
<div>🔧 Есть логически связанная группа файлов</div>
<div>🎯 Нужна дополнительная изоляция</div>
<div>♻️ Часть логики переиспользуется внутри</div>
</div>
</div>
</div>
<div class="space-y-4">
<div class="p-4 bg-blue-500/20 rounded-lg border-l-4 border-blue-500">
<h4 class="font-bold text-blue-400">✅ Преимущества:</h4>
<div class="text-sm space-y-2 mt-2">
<div>📦 Лучшая организация кода</div>
<div>🔒 Четкие границы ответственности</div>
<div>🚀 Легче тестировать и поддерживать</div>
<div>📤 Контролируемое API</div>
</div>
</div>
</div>
</div>
<div class="text-center p-4 bg-purple-500/10 rounded-lg">
<strong>💡 Подмодули помогают масштабировать архитектуру без потери контроля</strong>
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

# 🔧 Уровень Common

<div class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-green-500/10 p-4 rounded-lg">
<strong>Переиспользуемые сущности без привязки к бизнес-логике</strong>
</div>
<div class="grid grid-cols-2 gap-8">
<div :class="[t.point1, 'fx']" class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
<h3 class="text-xl font-bold mb-4 text-green-400">✅ Критерии для Common</h3>
<div class="space-y-3 text-base">
<div>🎯 Не привязано к бизнес-логике</div>
<div>📄 Помещается в 1 файл</div>
<div>🌍 Может использоваться везде</div>
<div>🚫 Не взаимодействует с модулями</div>
</div>
</div>
<div :class="[t.point2, 'fx']" class="p-6 bg-red-500/20 rounded-xl border-l-4 border-red-500">
<h3 class="text-xl font-bold mb-4 text-red-400">🚫 Ограничения</h3>
<div class="space-y-3 text-base">
<div>❌ <strong>НЕТ index.ts файлов!</strong></div>
<div>❌ Не более 1-2 файлов на сущность</div>
<div>💡 Мотивирует создавать модули</div>
</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 📁 Структура Common

<div :class="[t.point1, 'fx']" class="max-w-4xl mx-auto">
<div class="p-8 bg-green-500/10 rounded-xl border border-green-500/30">
<div class="text-lg font-mono bg-gray-800 p-6 rounded-lg text-green-400">
📁 common/<br/>
├── 📁 ui/           (общие компоненты)<br/>
│&nbsp;&nbsp;&nbsp;├── 📄 Button.vue<br/>
│&nbsp;&nbsp;&nbsp;└── 📄 Modal.vue<br/>
├── 📁 composables/  (композаблы)<br/>
│&nbsp;&nbsp;&nbsp;└── 📄 useLocalStorage.ts<br/>
├── 📁 utilities/    (утилиты)<br/>
│&nbsp;&nbsp;&nbsp;└── 📄 formatDate.ts<br/>
└── 📁 types/        (типы)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📄 api.ts
</div>
<div class="mt-6 text-center text-lg text-green-400">
<strong>Никаких index.ts!</strong>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🤔 Когда выносить в модуль?

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="grid grid-cols-2 gap-6">
<div class="space-y-4">
<div class="p-4 bg-yellow-500/20 rounded-lg border-l-4 border-yellow-500">
<h4 class="font-bold text-yellow-400">⚠️ Сигналы миграции:</h4>
<div class="text-sm space-y-2 mt-2">
<div>📦 Несколько Common связались</div>
<div>🏢 Появилась бизнес-логика</div>
<div>🔗 Нужны модули</div>
<div>📁 Не помещается в 1-2 файла</div>
</div>
</div>
</div>
<div class="space-y-4">
<div class="p-4 bg-blue-500/20 rounded-lg border-l-4 border-blue-500">
<h4 class="font-bold text-blue-400">✅ Решение:</h4>
<div class="text-sm space-y-2 mt-2">
<div>🚀 Создать модуль</div>
<div>📤 Переместить связанные сущности</div>
<div>🔧 Добавить index.ts</div>
<div>🎯 Определить публичный API</div>
</div>
</div>
</div>
</div>
<div class="text-center p-4 bg-green-500/10 rounded-lg">
<strong>💡 Common мотивирует к правильной архитектуре</strong>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 🌍 Уровень Global

<div :class="[t.point1, 'fx']" class="space-y-8 max-w-5xl mx-auto text-lg">
<div class="text-center text-xl mb-8 bg-gray-500/10 p-4 rounded-lg">
<strong>Опциональный уровень для глобальных определений</strong>
</div>
<div class="grid grid-cols-2 gap-8">
<div class="p-6 bg-gray-500/20 rounded-xl border-l-4 border-gray-500">
<h3 class="text-xl font-bold mb-4 text-gray-300">🔧 Что может быть</h3>
<div class="space-y-3 text-base">
<div>🛠️ Shim-ы для библиотек</div>
<div>🌍 Глобальные компоненты</div>
<div>📝 Глобальные переменные</div>
<div>📋 Расширения типов</div>
</div>
</div>
<div class="p-6 bg-red-500/20 rounded-xl border-l-4 border-red-500">
<h3 class="text-xl font-bold mb-4 text-red-400">🚫 Главное правило</h3>
<div class="text-center space-y-3">
<div class="text-2xl font-bold text-red-400">НЕ ИМПОРТИРУЕТСЯ!</div>
<div class="text-base text-red-300">Global работает автоматически</div>
</div>
</div>
</div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
  - point1:
---

# 💡 Пример Global

<div :class="[t.point1, 'fx']" class="max-w-5xl mx-auto space-y-6">
<div class="text-center text-lg bg-gray-500/10 p-4 rounded-lg">
<strong>Расширение типов без импорта</strong>
</div>
<div class="bg-gray-800 p-6 rounded-lg">

```ts
// globals/vue-router.d.ts
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
  }
}
```

</div>
<div class="text-center p-4 bg-orange-500/10 rounded-lg">
<strong>⚠️ Помните:</strong> Global ≠ Common. Для переиспользуемой логики используйте Common!
</div>
</div>
