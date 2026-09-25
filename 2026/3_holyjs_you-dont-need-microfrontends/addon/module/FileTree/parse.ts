/**
 * Текстовое дерево файлов → плоский список строк для FileTree.vue.
 *
 * Строка: `name[/] [@id] [#tag …] [// заметка]`
 *   name/    — папка (слэш в конце)
 *   @id      — сквозной id: строка с тем же id на другом шаге — тот же элемент, он перелетает
 *              на новое место (и переименовывается). Без @id id = `<id родителя>/<name>`,
 *              поэтому дети перелетевшей папки летят вместе с ней.
 *   #tag     — цвет/группа (green, blue, pink, violet, amber, red, cyan); наследуется детьми
 *   // text  — приглушённая заметка справа
 *   ... / …  — «и так далее»
 *
 * Вложенность — отступом. Можно вставлять и ascii-деревья (`├──`, `│`, `|`, `└──`):
 * псевдографика заменяется пробелами, глубина считается по колонке имени.
 */

export interface TreeRow {
  id: string
  name: string
  dir: boolean
  depth: number
  tags: string[]
  note?: string
  ellipsis: boolean
  parentId: string | null
  /** у элемента нет следующих соседей — коннектор └ вместо ├ */
  last: boolean
  /** rails[l] — рисовать вертикаль на уровне l (у предка глубины l есть следующие соседи) */
  rails: boolean[]
}

export interface FileTreeStepObject {
  /** дерево шага; без него — дерево предыдущего шага */
  tree?: string
  /** подсветить: id (`@map`), путь (`src/pages`), имя или тег (`#green`); остальное гаснет */
  focus?: string | string[]
  /** подпись шага */
  caption?: string
}

export type FileTreeStep = string | FileTreeStepObject

export interface ResolvedStep {
  rows: TreeRow[]
  focus: string[]
  caption?: string
}

const GLYPHS = /[│┃|├└┌┬─━╰╭]/g

export function parseTree(text: string): TreeRow[] {
  const rows: TreeRow[] = []
  const stack: { indent: number, row: TreeRow }[] = []
  const usedIds = new Set<string>()

  for (const raw of text.split('\n')) {
    const line = raw.replace(/\t/g, '    ').replace(GLYPHS, ' ').replace(/⠀/g, ' ')
    if (!line.trim())
      continue
    const indent = line.length - line.trimStart().length
    let body = line.trim()

    let note: string | undefined
    const noteAt = body.indexOf('//')
    if (noteAt >= 0) {
      note = body.slice(noteAt + 2).trim()
      body = body.slice(0, noteAt).trim()
    }
    const words = body.split(/\s+/)
    const name = words.filter(w => !w.startsWith('@') && !w.startsWith('#')).join(' ')
    const explicit = words.find(w => w.startsWith('@'))?.slice(1)
    const ownTags = words.filter(w => w.startsWith('#') && w.length > 1).map(w => w.slice(1))

    while (stack.length && stack[stack.length - 1].indent >= indent)
      stack.pop()
    const parent = stack[stack.length - 1]
    const ellipsis = name === '...' || name === '…' || /^\.{3,}$/.test(name)
    const dir = name.endsWith('/')
    const clean = dir ? name.slice(0, -1) : name

    const base = explicit ?? `${parent ? parent.row.id : ''}/${ellipsis ? '…' : clean}`
    // одинаковые имена у одного родителя (например, два «...») — не должны делить id
    let id = base
    for (let k = 2; usedIds.has(id); k++)
      id = `${base}~${k}`
    usedIds.add(id)

    const row: TreeRow = {
      id,
      name: ellipsis ? '…' : name,
      dir,
      depth: stack.length,
      tags: [...new Set([...(parent?.row.tags ?? []), ...ownTags])],
      note,
      ellipsis,
      parentId: parent?.row.id ?? null,
      last: true,
      rails: [],
    }
    rows.push(row)
    stack.push({ indent, row })
  }

  // коннекторы: последний ли среди соседей и какие вертикали тянуть через строку
  const lastChild = new Map<string | null, TreeRow>()
  for (const r of rows)
    lastChild.set(r.parentId, r)
  const byId = new Map(rows.map(r => [r.id, r]))
  for (const r of rows) {
    r.last = lastChild.get(r.parentId) === r
    const chain: TreeRow[] = []
    for (let p: TreeRow | undefined = r; p; p = p.parentId ? byId.get(p.parentId) : undefined)
      chain.unshift(p)
    // chain[l] — предок глубины l; вертикаль уровня l нужна, если у него есть следующие соседи
    r.rails = chain.map(a => !a.last)
  }
  return rows
}

/** Путь строки из имён (`src/modules/Map`) — для focus по пути. */
export function rowPaths(rows: TreeRow[]) {
  const byId = new Map(rows.map(r => [r.id, r]))
  const paths = new Map<string, string>()
  for (const r of rows) {
    const parent = r.parentId ? paths.get(r.parentId) : undefined
    const self = r.dir ? r.name.slice(0, -1) : r.name
    paths.set(r.id, parent ? `${parent}/${self}` : self)
  }
  return { byId, paths }
}

export function resolveSteps(steps: FileTreeStep[]): ResolvedStep[] {
  let rows: TreeRow[] = []
  return steps.map((s) => {
    const step = typeof s === 'string' ? { tree: s } : s
    if (step.tree != null)
      rows = parseTree(step.tree)
    const focus = step.focus == null ? [] : Array.isArray(step.focus) ? step.focus : [step.focus]
    return { rows, focus, caption: step.caption }
  })
}

/** Какие строки в фокусе: совпадение по id/пути/имени/тегу и все их потомки. */
export function focused(rows: TreeRow[], focus: string[]): Set<string> | null {
  if (!focus.length)
    return null
  const { byId, paths } = rowPaths(rows)
  const hit = (r: TreeRow) => focus.some((f) => {
    if (f.startsWith('#'))
      return r.tags.includes(f.slice(1))
    const key = f.startsWith('@') ? f.slice(1) : f.replace(/\/$/, '')
    const name = r.dir ? r.name.slice(0, -1) : r.name
    return r.id === key || paths.get(r.id) === key || name === key
  })
  const out = new Set<string>()
  for (const r of rows) {
    for (let p: TreeRow | undefined = r; p; p = p.parentId ? byId.get(p.parentId) : undefined) {
      if (hit(p)) {
        out.add(r.id)
        break
      }
    }
  }
  return out
}
