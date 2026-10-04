---
layout: center
fileTree:
  - caption: Компонент рядом со страницами
    tree: |
      src/ @src
        pages/
          Dashboard.vue
        components/
          Chart/ @chart #green
            Chart.vue
            useChart.ts
        main.ts // точка входа
  - focus: '@chart'
    caption: Подсветка компонента и его файлов
  - caption: Тот же компонент переезжает в модуль
    tree: |
      src/ @src
        pages/
          Dashboard.vue
        modules/
          Analytics/ #blue
            Chart/ @chart #green
              Chart.vue
              useChart.ts
        main.ts // точка входа
---

# Дерево файлов по шагам

<FileTree :height="350" :max-font="24" :width="28" />
