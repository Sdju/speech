/** Семь претензий; Dev и миграция раскрываются в двух состояниях. */
export const archRisks = [
  { kind: 'boundaries', topic: 1, title: 'Разделение: где провести границы?' },
  { kind: 'ci', topic: 2, title: 'CI/CD: отдельные пайплайны, общая проверка совместимости' },
  { kind: 'dev-all', topic: 3, title: 'Dev-окружение: поднять весь продукт локально' },
  { kind: 'dev-isolated', topic: 3, title: 'Или изолировать модуль и заменить его окружение' },
  { kind: 'release', topic: 4, title: 'Независимый релиз может нарушить контракт' },
  { kind: 'contracts', topic: 5, title: 'Контракты: отправитель и получатель должны договориться' },
  { kind: 'ui', topic: 6, title: 'Единый стиль: общие компоненты и токены' },
  { kind: 'migration', topic: 7, title: 'Массовая миграция начинается с одной общей зависимости' },
  { kind: 'migration-partial', topic: 7, title: 'Catalog уже готов — остальных ещё нужно перевести' },
] as const

export type ArchRiskKind = typeof archRisks[number]['kind']
