---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
    point3: -popup-hidden
  - point1:
  - point2:
  - point3:
---

# Архитектура vs Структура

<div>
  <div class="text-xl space-y-8 max-w-6xl mx-auto">
    <div class="grid grid-cols-2 gap-8">
      <div :class="[t.point1, 'fx']" class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
        <div class="text-2xl font-bold mb-4 text-blue-600">
          🔹 Структура проекта
        </div>
        <div class="text-lg font-semibold mb-3 text-blue-400">
          «Что где лежит»
        </div>
        <div class="space-y-2 text-base">
          📁 Организация файлов, папок, модулей<br/>
          🎯 Фокус на удобстве разработки<br/>
          🔄 Навигация и сборка проекта
        </div>
      </div>
      <div :class="[t.point2, 'fx']" class="p-6 bg-green-500/20 rounded-xl border-l-4 border-green-500">
        <div class="text-2xl font-bold mb-4 text-green-600">
          🔹 Архитектура проекта
        </div>
        <div class="text-lg font-semibold mb-3 text-green-400">
          «Как работает и почему»
        </div>
        <div class="space-y-2 text-base">
          🛠️ Принципы построения системы<br/>
          🍰 Слои, компоненты, связи, паттерны<br/>
          🎯 Фокус на масштабируемости и надёжности
        </div>
      </div>
    </div>
    <div class="mt-8 text-center">
      <div :class="[t.point3, 'fx']" class="inline-flex items-center space-x-6 text-lg bg-purple-500/10 px-8 py-4 rounded-lg">
        <div class="text-blue-600 font-semibold">
          <span class="text-blue-400">Структура</span> — про организацию кода
        </div>
        <div class="text-gray-400">vs</div>
        <div class="text-green-600 font-semibold">
          <span class="text-green-400">Архитектура</span> — про организацию логики
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
    point3: -popup-hidden
  - point1:
  - point2:
  - point3:
---

# Почему это важно?

<div>
  <div class="text-xl space-y-6 max-w-5xl mx-auto">
    <div class="grid grid-cols-2 gap-6">
      <div :class="[t.point1, 'fx']" class="p-6 bg-blue-500/20 rounded-xl border-l-4 border-blue-500">
        <div class="text-2xl mb-4 text-blue-500 font-bold">👥 Для команды</div>
        <div class="space-y-2">
          💬 Единый язык общения<br/>
          🚀 Быстрое onboarding новичков<br/>
          🤝 Меньше споров и конфликтов<br/>
          🔍 Эффективное code review
        </div>
      </div>
      <div :class="[t.point2, 'fx']" class="p-6 bg-purple-500/20 rounded-xl border-l-4 border-purple-500">
        <div class="text-2xl mb-4 text-purple-500 font-bold">💼 Для бизнеса</div>
        <div class="space-y-2">
          👌 Легкий переход между проектами<br/>
          🚀 Быстрее time-to-market<br/>
          🎯 Масштабируемость продуктов<br/>
          💰 Ниже стоимость поддержки
        </div>
      </div>
    </div>
    <div :class="[t.point3, 'fx']" class="mt-8 text-center">
      <div class="text-2xl font-bold text-yellow-400 mb-4">⚡ Результат</div>
      <div class="text-lg bg-yellow-500/10 px-6 py-4 rounded-lg inline-block">
        <strong>Единая структура = Предсказуемость + Скорость + Качество</strong>
      </div>
    </div>
  </div>
</div>


---
layout: center
class: text-center
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

# Проблематика современных проектов

<div>
  <div class="text-xl space-y-6 max-w-5xl mx-auto">
    <div class="grid grid-cols-2 gap-6">
      <div :class="[t.point1, 'fx']" class="p-4 bg-red-500/20 rounded-lg">
        <strong>😵‍💫 Хаос в структуре:</strong><br/>
        • Каша из компонентов и логики<br/>
        • Неясные границы модулей<br/>
        • Споры о том, "куда положить файл"
      </div>
      <div :class="[t.point2, 'fx']" class="p-4 bg-orange-500/20 rounded-lg">
        <strong>🔗 Проблемы зависимостей:</strong><br/>
        • Циклические импорты<br/>
        • Сложно контролировать связи<br/>
        • Модули знают слишком много друг о друге
      </div>
      <div :class="[t.point3, 'fx']" class="p-4 bg-yellow-500/20 rounded-lg">
        <strong>📈 Сложность масштабирования:</strong><br/>
        • Новичкам сложно разобраться<br/>
        • Рефакторинг превращается в кошмар<br/>
        • Команда тратит время на споры
      </div>
      <div :class="[t.point4, 'fx']" class="p-4 bg-blue-500/20 rounded-lg">
        <strong>🎯 Нужно решение:</strong><br/>
        • Интуитивно понятное<br/>
        • С четкими правилами<br/>
        • Масштабируемое и гибкое
      </div>
    </div>
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

# Что есть сейчас?

<div :class="className">
  <div class="grid grid-cols-2 gap-8 text-lg">
    <div class="space-y-4">
      <div :class="[t.point1, 'fx']" class="p-4 bg-purple-500/20 rounded-lg">
        <h3 class="text-xl font-bold mb-2 text-purple-500">🔬 Atomic Design</h3>
        <div class="text-sm space-y-1">
          <div>✅ Отлично для дизайн-систем</div>
          <div>❌ Только UI компоненты</div>
          <div>❌ Спорная классификация атом/молекула</div>
          <div>❌ Не решает бизнес-логику</div>
        </div>
      </div>
      <div :class="[t.point2, 'fx']" class="p-4 bg-blue-500/20 rounded-lg">
        <h3 class="text-xl font-bold mb-2 text-blue-500">🍰 Feature-Sliced Design</h3>
        <div class="text-sm space-y-1">
          <div>✅ Горизонтальные слои</div>
          <div>✅ Строгие правила импорта</div>
          <div>❌ Сложная ментальная модель</div>
          <div>❌ Много абстракций: entities/features/widgets</div>
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <div :class="[t.point3, 'fx']" class="p-4 bg-green-500/20 rounded-lg">
        <h3 class="text-xl font-bold mb-2 text-green-500">📦 Модульные подходы</h3>
        <div class="text-sm space-y-1">
          <div>✅ Модульность</div>
          <div>❌ Нет единого стандарта</div>
          <div>❌ Часто плоская структура</div>
          <div>❌ Неконтролируемые связи</div>
        </div>
      </div>
      <div :class="[t.point4, 'fx']" class="p-4 bg-gray-500/20 rounded-lg">
        <h3 class="text-xl font-bold mb-2 text-gray-500">🏗️ "Просто папки"</h3>
        <div class="text-sm space-y-1">
          <div>✅ Просто начать</div>
          <div>❌ Быстро превращается в хаос</div>
          <div>❌ Нет правил</div>
          <div>❌ Каждый проект уникален</div>
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
    point3: -popup-hidden
  - point1:
  - point2:
  - point3:
---

<XSlideOut slot="comparison" title="Детальное сравнение" class="text-4xl mb-8" />

<XSlide slot="comparison" #="{ className }">
  <div :class="className">
    <div class="grid grid-cols-3 gap-6 text-sm">
      <div :class="[t.point1, 'fx']" class="space-y-3">
        <h3 class="text-lg font-bold text-center bg-purple-500/30 p-2 rounded">Atomic Design</h3>
        <div class="space-y-2">
          <div class="p-3 bg-purple-500/10 rounded">
            <span class="text-purple-500">Цель:</span> Дизайн-система
          </div>
          <div class="p-3 bg-purple-500/10 rounded">
            <span class="text-purple-500">Структура:</span><br/>
            atoms → molecules → organisms → templates → pages
          </div>
          <div class="p-3 bg-purple-500/10 rounded">
            <span class="text-purple-500">Фокус:</span> UI компоненты
          </div>
          <div class="p-3 bg-red-500/20 rounded">
            <span class="text-red-500">Проблема:</span> Спорная классификация компонентов
          </div>
        </div>
      </div>
      <div :class="[t.point2, 'fx']" class="space-y-3">
        <h3 class="text-lg font-bold text-center bg-blue-500/30 p-2 rounded">Feature-Sliced Design</h3>
        <div class="space-y-2">
          <div class="p-3 bg-blue-500/10 rounded">
            <span class="text-blue-500">Цель:</span> Универсальная архитектура
          </div>
          <div class="p-3 bg-blue-500/10 rounded">
            <span class="text-blue-500">Структура:</span><br/>
            shared → entities → features → widgets → pages → app
          </div>
          <div class="p-3 bg-blue-500/10 rounded">
            <span class="text-blue-500">Фокус:</span> Изоляция фич
          </div>
          <div class="p-3 bg-red-500/20 rounded">
            <span class="text-red-500">Проблема:</span> Сложность понимания абстракций
          </div>
        </div>
      </div>
      <div :class="[t.point3, 'fx']" class="space-y-3">
        <h3 class="text-lg font-bold text-center bg-green-500/30 p-2 rounded">FEOD</h3>
        <div class="space-y-2">
          <div class="p-3 bg-green-500/10 rounded">
            <span class="text-green-500">Цель:</span> Понятная архитектура приложения
          </div>
          <div class="p-3 bg-green-500/10 rounded">
            <span class="text-green-500">Структура:</span><br/>
            global | common → modules → pages → app
          </div>
          <div class="p-3 bg-green-500/10 rounded">
            <span class="text-green-500">Фокус:</span> Сущности и их роли
          </div>
          <div class="p-3 bg-green-500/20 rounded">
            <span class="text-green-500">Решение:</span> Фрактальность + простота
          </div>
        </div>
      </div>
    </div>
  </div>
</XSlide>

---
layout: center
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
    point3: -popup-hidden
  - point1:
  - point2:
  - point3:
---

<XSlideOut slot="why-feod" title="Почему FEOD?" class="text-4xl mb-8" />

<XSlide slot="why-feod" #="{ className }">
  <div :class="className">
    <div class="space-y-8 max-w-5xl mx-auto">
      <div class="text-center text-xl mb-8">
        FEOD объединяет лучшее из существующих подходов, избегая их недостатков
      </div>
      <div class="grid grid-cols-2 gap-8">
        <div :class="[t.point1, 'fx']" class="space-y-4">
          <h3 class="text-xl font-bold text-green-400">✨ Что взяли лучшего:</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start">
              <span class="text-purple-400 mr-2">•</span>
              <div><strong>Из Atomic:</strong> Модульность и переиспользуемость</div>
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <div><strong>Из FSD:</strong> Горизонтальные слои и правила импорта</div>
            </li>
            <li class="flex items-start">
              <span class="text-green-400 mr-2">•</span>
              <div><strong>Из Модульных:</strong> Гибкость и простоту начала работы</div>
            </li>
            <li class="flex items-start">
              <span class="text-orange-400 mr-2">•</span>
              <div><strong>Из Гексагональной:</strong> Изоляцию модулей и публичные API</div>
            </li>
          </ul>
        </div>
        <div :class="[t.point2, 'fx']" class="space-y-4">
          <h3 class="text-xl font-bold text-red-400">🚫 Что исправили:</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start">
              <span class="text-red-400 mr-2">×</span>
              <div>Убрали спорную классификацию компонентов</div>
            </li>
            <li class="flex items-start">
              <span class="text-red-400 mr-2">×</span>
              <div>Упростили ментальную модель</div>
            </li>
            <li class="flex items-start">
              <span class="text-red-400 mr-2">×</span>
              <div>Дали четкие критерии размещения</div>
            </li>
            <li class="flex items-start">
              <span class="text-red-400 mr-2">×</span>
              <div>Добавили фрактальность для масштабирования</div>
            </li>
          </ul>
        </div>
      </div>
      <div :class="[t.point3, 'fx']" class="mt-8 text-center">
        <div class="text-2xl font-bold text-yellow-400 mb-4">🎯 Результат</div>
        <div class="text-lg bg-yellow-500/10 px-6 py-4 rounded-lg inline-block">
          <strong>Интуитивная, гибкая и масштабируемая архитектура</strong>
        </div>
      </div>
    </div>
  </div>
</XSlide>

---
layout: center
disabled: true
timeline:
  - point1: -popup-hidden
    point2: -popup-hidden
    point3: -popup-hidden
  - point1:
  - point2:
  - point3:
---

<XSlideOut slot="real-examples" title="Примеры из практики" class="text-4xl mb-8" />

<XSlide slot="real-examples" #="{ className }">
  <div :class="className">
    <div class="space-y-6 max-w-5xl mx-auto text-sm">
      <div class="grid grid-cols-2 gap-6">
        <div :class="[t.point1, 'fx']" class="space-y-4">
          <h3 class="text-lg font-bold text-red-400">😰 Типичные проблемы проектов:</h3>
          <div class="p-4 bg-red-500/20 rounded-lg">
            <span class="text-red-400">Плоская структура:</span><br/>
            <code class="text-xs">src/components/ - 147 файлов</code><br/>
            Невозможно найти нужный компонент
          </div>
          <div class="p-4 bg-orange-500/20 rounded-lg">
            <span class="text-orange-400">Хаос зависимостей:</span><br/>
            <code class="text-xs">Header импортирует User из utils/</code><br/>
            Нарушение логики архитектуры
          </div>
          <div class="p-4 bg-yellow-500/20 rounded-lg">
            <span class="text-yellow-400">Дублирование логики:</span><br/>
            <code class="text-xs">3 разных validateEmail функции</code><br/>
            Потому что не знали о существовании
          </div>
        </div>
        <div :class="[t.point2, 'fx']" class="space-y-4">
          <h3 class="text-lg font-bold text-green-400">✅ С FEOD:</h3>
          <div class="p-4 bg-green-500/20 rounded-lg">
            <span class="text-green-400">Ясная структура:</span><br/>
            <code class="text-xs">modules/User/ - все о пользователе</code><br/>
            Сразу понятно, где искать
          </div>
          <div class="p-4 bg-blue-500/20 rounded-lg">
            <span class="text-blue-400">Контроль импортов:</span><br/>
            <code class="text-xs">app → pages → modules → common</code><br/>
            Невозможно нарушить архитектуру
          </div>
          <div class="p-4 bg-purple-500/20 rounded-lg">
            <span class="text-purple-400">Переиспользование:</span><br/>
            <code class="text-xs">common/utilities/validateEmail</code><br/>
            Одно место для всех утилит
          </div>
        </div>
      </div>
      <div :class="[t.point3, 'fx']" class="mt-8 text-center">
        <div class="text-2xl font-bold text-yellow-400 mb-4">⚡ Результат</div>
        <div class="text-lg bg-yellow-500/10 px-6 py-4 rounded-lg inline-block">
          <strong>Команда тратит время на фичи, а не на поиск файлов</strong>
        </div>
      </div>
    </div>
  </div>
</XSlide>