/**
 * Patch pos-* / sp-* in slide markdown by editName.
 *
 * Timeline (when body references t.editName):
 * - updates ONLY the current click step — never earlier keyframes
 * - if key missing on current step, inserts an override there
 * - object form `block1: { class: 'pos-…' }` or scalar `block2: fx` (`:class="t.block2"`)
 *
 * No timeline for this name → body `class="…"` via data-editname or `:class="t.foo"`.
 */

export interface PatchEditRequest {
  filePath: string
  editName: string
  /** Current click index — which timeline merge step is active. */
  clicks: number
  /** New center as `x_y` for pos-* (e.g. `492_159`). */
  pos?: string
  /** Optional size `w_h` — combined with pos into sp-* when both present. */
  size?: string
  mode?: 'pos' | 'sp'
}

export interface PatchEditResult {
  success: boolean
  error?: string
  strategy?: 'timeline' | 'dom-attr' | 'class-t'
  detail?: string
}

function posRe() {
  return /pos-[^\s'"`]+/g
}
function spRe() {
  return /sp-[^\s'"`]+/g
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function replacePosInClass(classValue: string, req: PatchEditRequest): string {
  const mode = req.mode ?? (req.size ? 'sp' : 'pos')
  if (!req.pos)
    return classValue

  if (mode === 'sp' && req.size) {
    const next = `sp-${req.pos}_${req.size}`
    if (spRe().test(classValue))
      return classValue.replace(spRe(), next)
    if (posRe().test(classValue))
      return classValue.replace(posRe(), next)
    return `${classValue} ${next}`.trim()
  }

  const next = `pos-${req.pos}`
  if (posRe().test(classValue))
    return classValue.replace(posRe(), next)
  if (spRe().test(classValue))
    return classValue.replace(spRe(), next)
  return `${classValue} ${next}`.trim()
}

function patchQuotedClass(line: string, req: PatchEditRequest): string | null {
  const m = line.match(/^(.*class\s*:\s*)(['"])(.*?)\2(.*)$/)
  if (!m)
    return null
  const [, prefix, quote, value, suffix] = m
  return `${prefix}${quote}${replacePosInClass(value, req)}${quote}${suffix}`
}

function patchInlineClassAttr(line: string, req: PatchEditRequest): string | null {
  const m = line.match(/^(.*)(class\s*=\s*)(['"])(.*?)\3(.*)$/)
  if (!m)
    return null
  const [, before, classKw, quote, value, after] = m
  return `${before}${classKw}${quote}${replacePosInClass(value, req)}${quote}${after}`
}

type Step = { start: number, end: number, lines: string[] }

/** Collect `-` steps from every `timeline:` block in the file. */
function findTimelineSteps(lines: string[]): Step[] {
  const steps: Step[] = []

  for (let t = 0; t < lines.length; t++) {
    if (lines[t].trim() !== 'timeline:')
      continue

    const timelineIndent = lines[t].search(/\S/)
    let stepStart = -1
    const stepIndent = timelineIndent + 2

    const finish = (end: number) => {
      if (stepStart >= 0)
        steps.push({ start: stepStart, end, lines: lines.slice(stepStart, end) })
    }

    let i = t + 1
    for (; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()
      if (!trimmed)
        continue
      const indent = line.search(/\S/)
      if (indent <= timelineIndent) {
        finish(i)
        stepStart = -1
        break
      }
      if (trimmed.startsWith('-') && indent === stepIndent) {
        finish(i)
        stepStart = i
      }
    }
    if (stepStart >= 0)
      finish(lines.length)

    t = Math.max(t, i - 1)
  }

  return steps
}

function groupStepsByTimeline(lines: string[], steps: Step[]): Step[][] {
  const timelineStarts: number[] = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'timeline:')
      timelineStarts.push(i)
  }
  const groups = new Map<number, Step[]>()
  for (const step of steps) {
    let owner = timelineStarts[0] ?? 0
    for (const ts of timelineStarts) {
      if (ts < step.start)
        owner = ts
    }
    if (!groups.has(owner))
      groups.set(owner, [])
    groups.get(owner)!.push(step)
  }
  return [...groups.values()]
}

/**
 * In one timeline step block, find `editName:` and its class line.
 * Supports nested `class:` and scalar class strings (`block2: fx` / `:class="t.block2"`).
 */
function findEditNameClassLine(stepLines: string[], editName: string): number {
  const keyRe = new RegExp(`^\\s*-?\\s*${escapeRegExp(editName)}\\s*:`)
  for (let i = 0; i < stepLines.length; i++) {
    const line = stepLines[i]
    if (!keyRe.test(line))
      continue

    const keyIndent = line.indexOf(editName)
    const rest = line.slice(line.indexOf(':') + 1).trim()
    // Scalar on same line: quoted, pos/sp, or bare tokens for `:class="t.*"`
    if (rest && rest !== '|' && rest !== '>')
      return i

    for (let j = i + 1; j < stepLines.length; j++) {
      const nested = stepLines[j]
      if (!nested.trim())
        continue
      const ind = nested.search(/\S/)
      if (ind <= keyIndent)
        break
      if (/^\s*class\s*:/.test(nested))
        return j
    }
    return i
  }
  return -1
}

/** `block2: fx` / `block2: 'pos-1_2 fx'` — scalar class string for `:class="t.block2"`. */
function patchTimelineScalarClass(line: string, req: PatchEditRequest): string | null {
  const m = line.match(
    new RegExp(`^(\\s*-?\\s*${escapeRegExp(req.editName)}\\s*:\\s*)(.*)$`),
  )
  if (!m || !req.pos)
    return null

  const [, prefix, restRaw] = m
  const rest = restRaw.trimEnd()
  const trail = restRaw.slice(rest.length)
  const value = rest.trim()
  if (!value || value === '|' || value === '>')
    return null

  const lead = rest.slice(0, rest.length - value.length)

  const quoted = value.match(/^(['"])(.*)\1$/)
  if (quoted)
    return `${prefix}${lead}${quoted[1]}${replacePosInClass(quoted[2], req)}${quoted[1]}${trail}`

  // Nested object start — not a class string
  if (value.startsWith('{'))
    return null

  return `${prefix}${lead}${replacePosInClass(value, req)}${trail}`
}

function patchLineAt(lines: string[], absIdx: number, req: PatchEditRequest): PatchEditResult & { content?: string } {
  const original = lines[absIdx]
  let updated: string | null = patchQuotedClass(original, req)

  if (!updated)
    updated = patchTimelineScalarClass(original, req)

  if (!updated)
    return { success: false, error: `found ${req.editName} but no class/pos to patch`, detail: original }

  if (updated === original && req.pos) {
    const m = original.match(/^(.*class\s*:\s*)(['"])(.*?)\2(.*)$/)
    if (m) {
      const nextVal = replacePosInClass(m[3], req)
      updated = `${m[1]}${m[2]}${nextVal}${m[2]}${m[4]}`
    }
  }

  lines[absIdx] = updated!
  return {
    success: true,
    strategy: 'timeline',
    detail: `line ${absIdx + 1}`,
    content: lines.join('\n'),
  }
}

/**
 * Patch timeline at the *current* click only.
 * Never mutates earlier steps (animation keyframes stay intact).
 * If the key is missing on the current step, inserts an override there.
 */
export function patchTimelineEdit(
  content: string,
  req: PatchEditRequest,
): PatchEditResult & { content?: string } {
  const lines = content.split('\n')
  const steps = findTimelineSteps(lines)
  if (!steps.length)
    return { success: false, error: 'timeline not found' }

  const groups = groupStepsByTimeline(lines, steps)
  const group = selectTimelineGroup(lines, groups, req.editName)
  if (!group)
    return { success: false, error: `no timeline tied to "${req.editName}"` }

  const stepIndex = req.clicks
  if (stepIndex < 0 || stepIndex >= group.length) {
    return {
      success: false,
      error: `clicks ${stepIndex} out of range for timeline (0..${group.length - 1})`,
    }
  }

  const step = group[stepIndex]
  const local = findEditNameClassLine(step.lines, req.editName)
  if (local >= 0) {
    const result = patchLineAt(lines, step.start + local, req)
    if (result.success)
      result.detail = `step ${stepIndex} ${result.detail}`
    return result
  }

  const inserted = insertKeyIntoCurrentStep(lines, step, req, inferKeyForm(group, req.editName))
  if (!inserted.success)
    return inserted
  inserted.detail = `step ${stepIndex} inserted ${inserted.detail}`
  return inserted
}

function inferKeyForm(group: Step[], editName: string): 'object' | 'scalar' {
  for (const step of group) {
    const local = findEditNameClassLine(step.lines, editName)
    if (local < 0)
      continue
    const line = step.lines[local]
    if (/^\s*class\s*:/.test(line))
      return 'object'
    const rest = line.slice(line.indexOf(':') + 1).trim()
    if (rest && rest !== '|' && rest !== '>')
      return 'scalar'
    return 'object'
  }
  return 'object'
}

function classTokenForReq(req: PatchEditRequest): string | null {
  if (!req.pos)
    return null
  const mode = req.mode ?? (req.size ? 'sp' : 'pos')
  if (mode === 'sp' && req.size)
    return `sp-${req.pos}_${req.size}`
  return `pos-${req.pos}`
}

function insertKeyIntoCurrentStep(
  lines: string[],
  step: Step,
  req: PatchEditRequest,
  form: 'object' | 'scalar',
): PatchEditResult & { content?: string } {
  const token = classTokenForReq(req)
  if (!token)
    return { success: false, error: 'pos required to insert timeline key' }

  const dashLine = lines[step.start]
  const dashIndent = dashLine.search(/\S/)
  const keyIndent = ' '.repeat(dashIndent + 2)
  const nestedIndent = ' '.repeat(dashIndent + 4)

  const newLines = form === 'scalar'
    ? [`${keyIndent}${req.editName}: ${token}`]
    : [
        `${keyIndent}${req.editName}:`,
        `${nestedIndent}class: '${token}'`,
      ]

  lines.splice(step.end, 0, ...newLines)
  return {
    success: true,
    strategy: 'timeline',
    detail: `line ${step.end + 1}`,
    content: lines.join('\n'),
  }
}

/** Prefer the timeline whose following slide body references t.editName / data-editname. */
function selectTimelineGroup(
  lines: string[],
  groups: Step[][],
  editName: string,
): Step[] | null {
  const n = escapeRegExp(editName)
  const refRe = new RegExp(`t\\.${n}\\b|data-editname\\s*=\\s*(['"])${n}\\1`)

  const timelineStarts: number[] = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'timeline:')
      timelineStarts.push(i)
  }

  let fallback: Step[] | null = null
  for (const group of groups) {
    const owner = timelineStarts.filter(ts => ts < group[0].start).at(-1) ?? group[0].start
    const body = slideBodyAfterTimeline(lines, owner)
    if (refRe.test(body))
      return group

    if (group.some(s => findEditNameClassLine(s.lines, editName) >= 0))
      fallback = group
  }
  return fallback
}

function slideBodyAfterTimeline(lines: string[], timelineLine: number): string {
  let fmEnd = -1
  for (let i = timelineLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      fmEnd = i
      break
    }
  }
  if (fmEnd < 0)
    return ''

  let bodyEnd = lines.length
  for (let i = fmEnd + 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      bodyEnd = i
      break
    }
  }
  return lines.slice(fmEnd + 1, bodyEnd).join('\n')
}

function findNearbyClassPatch(
  lines: string[],
  anchorIdx: number,
  req: PatchEditRequest,
): { idx: number, updated: string } | null {
  for (let j = Math.max(0, anchorIdx - 2); j < Math.min(anchorIdx + 8, lines.length); j++) {
    const updated = patchInlineClassAttr(lines[j], req)
    if (updated)
      return { idx: j, updated }
  }
  return null
}

/**
 * Patch element with data-editname="…" in markdown body (non-timeline).
 */
export function patchDomEditName(
  content: string,
  req: PatchEditRequest,
): PatchEditResult & { content?: string } {
  const lines = content.split('\n')
  const name = req.editName
  const attrRe = new RegExp(`data-editname\\s*=\\s*(['"])${escapeRegExp(name)}\\1`)

  for (let i = 0; i < lines.length; i++) {
    if (!attrRe.test(lines[i]))
      continue

    const hit = findNearbyClassPatch(lines, i, req)
    if (hit) {
      lines[hit.idx] = hit.updated
      return { success: true, strategy: 'dom-attr', detail: `line ${hit.idx + 1}`, content: lines.join('\n') }
    }

    return {
      success: false,
      error: `found data-editname="${name}" but no class= nearby`,
      detail: lines[i],
    }
  }

  return { success: false, error: `data-editname="${name}" not found in file body` }
}

/**
 * Body heuristic: `:class="t.foo"` / `:class='t.foo'` → patch nearby static `class="…"`.
 */
export function patchClassTBinding(
  content: string,
  req: PatchEditRequest,
): PatchEditResult & { content?: string } {
  const lines = content.split('\n')
  const name = req.editName
  const bindRe = new RegExp(
    `:class\\s*=\\s*(['"])t\\.${escapeRegExp(name)}\\1`,
  )

  for (let i = 0; i < lines.length; i++) {
    if (!bindRe.test(lines[i]))
      continue

    const hit = findNearbyClassPatch(lines, i, req)
    if (hit) {
      lines[hit.idx] = hit.updated
      return { success: true, strategy: 'class-t', detail: `line ${hit.idx + 1}`, content: lines.join('\n') }
    }

    return {
      success: false,
      error: `found :class="t.${name}" but no class= nearby`,
      detail: lines[i],
    }
  }

  return { success: false, error: `:class="t.${name}" not found in file body` }
}

export function applyEditPatch(
  content: string,
  req: PatchEditRequest,
): PatchEditResult & { content?: string } {
  const timeline = patchTimelineEdit(content, req)
  if (timeline.success)
    return timeline

  // Soft miss: this editName is not a timeline target on this file → try body class.
  const soft = /timeline not found|no timeline tied/
  if (timeline.error && !soft.test(timeline.error))
    return timeline

  const dom = patchDomEditName(content, req)
  if (dom.success)
    return dom
  const classT = patchClassTBinding(content, req)
  if (classT.success)
    return classT
  return {
    success: false,
    error: [timeline.error, dom.error, classT.error].filter(Boolean).join(' | '),
  }
}
