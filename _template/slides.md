---
theme: ./theme
addons: 
  - ./_template/addon
routerMode: hash
htmlAttrs:
  lang: ru
highlighter: shiki
lineNumbers: true
css: unocss
colorSchema: dark
transition: view-transition
contextMenu: false
mdc: true
growSeed: 4
title: Тесты
class: text-center
---

# Добро пожаловать в Slidev!
Презентации для разработчиков

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Нажмите пробел для перехода к следующему слайду <carbon:arrow-right class="inline"/>
  </span>
</div>

<!--
Заметки презентатора здесь
-->

---
layout: center
class: text-center
---

# Что такое Slidev?

Slidev - это инструмент для создания слайдов, созданный для разработчиков

---

# Возможности

- 📝 **Markdown-based** - используйте привычный markdown
- 🎨 **Темы** - легко настраиваемый внешний вид
- 🧑‍💻 **Разработчикам** - подсветка кода, live coding
- 📤 **Портативность** - экспорт в PDF, PNG или SPA
