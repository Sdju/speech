/**
 * Add / remove timeline steps in slide markdown (current slide's timeline only).
 */

export interface TimelineStepMutationRequest {
  filePath: string
  /** 0-based line index of the slide in the source file (Slidev `slide.start`). */
  slideStart: number
  /** Step index to delete (0-based). */
  stepIndex?: number
}

export interface TimelineStepMutationResult {
  success: boolean
  error?: string
  detail?: string
  content?: string
  /** New step count after mutation. */
  stepCount?: number
}

type Step = { start: number, end: number }

function findFrontmatterRange(lines: string[], slideStart: number): { start: number, end: number } | null {
  let i = Math.max(0, slideStart)
  if (lines[i]?.trim() === '---')
    i += 1

  const fmStart = i
  for (; i < lines.length; i++) {
    if (lines[i].trim() === '---')
      return { start: fmStart, end: i }
  }
  return null
}

function findTimelineLine(lines: string[], fm: { start: number, end: number }): number {
  for (let t = fm.start; t < fm.end; t++) {
    if (lines[t].trim() === 'timeline:')
      return t
  }
  return -1
}

/** Steps of a single `timeline:` block (same rules as patchEdit). */
function collectSteps(lines: string[], timelineLine: number): Step[] {
  const timelineIndent = lines[timelineLine].search(/\S/)
  const stepIndent = timelineIndent + 2
  const steps: Step[] = []
  let stepStart = -1

  const finish = (end: number) => {
    if (stepStart >= 0)
      steps.push({ start: stepStart, end })
  }

  let i = timelineLine + 1
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
    finish(i)

  return steps
}

function resolveTimeline(lines: string[], slideStart: number) {
  const fm = findFrontmatterRange(lines, slideStart)
  if (!fm)
    return null
  const timelineLine = findTimelineLine(lines, fm)
  if (timelineLine < 0)
    return null
  return {
    timelineLine,
    indent: lines[timelineLine].search(/\S/),
    steps: collectSteps(lines, timelineLine),
  }
}

/** Append an empty step `{}` to the slide's timeline. */
export function addEmptyTimelineStep(
  content: string,
  req: Pick<TimelineStepMutationRequest, 'slideStart'>,
): TimelineStepMutationResult {
  const lines = content.split('\n')
  const resolved = resolveTimeline(lines, req.slideStart)
  if (!resolved)
    return { success: false, error: 'timeline not found in slide frontmatter' }

  const { steps, indent, timelineLine } = resolved
  const emptyLine = `${' '.repeat(indent + 2)}- {}`
  const insertAt = steps.length ? steps[steps.length - 1].end : timelineLine + 1

  lines.splice(insertAt, 0, emptyLine)
  return {
    success: true,
    detail: `inserted empty step at index ${steps.length} (line ${insertAt + 1})`,
    content: lines.join('\n'),
    stepCount: steps.length + 1,
  }
}

/** Delete a step by index. Refuses to remove the last step. */
export function deleteTimelineStep(
  content: string,
  req: Pick<TimelineStepMutationRequest, 'slideStart' | 'stepIndex'>,
): TimelineStepMutationResult {
  if (req.stepIndex == null || req.stepIndex < 0)
    return { success: false, error: 'stepIndex required' }

  const lines = content.split('\n')
  const resolved = resolveTimeline(lines, req.slideStart)
  if (!resolved)
    return { success: false, error: 'timeline not found in slide frontmatter' }

  const { steps } = resolved
  if (req.stepIndex >= steps.length)
    return { success: false, error: `step ${req.stepIndex} out of range (0..${steps.length - 1})` }
  if (steps.length <= 1)
    return { success: false, error: 'нельзя удалить единственный шаг' }

  const step = steps[req.stepIndex]
  lines.splice(step.start, step.end - step.start)

  return {
    success: true,
    detail: `deleted step ${req.stepIndex} (was lines ${step.start + 1}–${step.end})`,
    content: lines.join('\n'),
    stepCount: steps.length - 1,
  }
}

export interface PatchTimelinePropertyRequest {
  filePath: string
  slideStart: number
  stepIndex: number
  /** Path inside the step: `block2` or `block1.class`. */
  keyPath: string
  newValue: unknown
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function formatYamlScalar(value: unknown, preferQuote: "'" | '"' | '' = ''): string {
  if (value === null)
    return 'null'
  if (typeof value === 'boolean')
    return value ? 'true' : 'false'
  if (typeof value === 'number')
    return Number.isFinite(value) ? String(value) : '0'
  if (typeof value !== 'string')
    return JSON.stringify(value)

  const needsQuotes = preferQuote !== ''
    || value === ''
    || /[\s:#{}[\],&*?|<>=!%@`]/.test(value)
    || value.includes("'")
    || value.includes('"')

  if (!needsQuotes)
    return value

  const q = preferQuote === '"' ? '"' : "'"
  if (q === "'")
    return `'${value.replace(/'/g, "''")}'`
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

function replaceValueAfterColon(line: string, newValue: unknown): string | null {
  const colon = line.indexOf(':')
  if (colon < 0)
    return null
  const prefix = line.slice(0, colon + 1)
  const rest = line.slice(colon + 1)
  const lead = rest.match(/^\s*/)?.[0] ?? ' '
  const old = rest.trim()
  const preferQuote: "'" | '"' | '' = old.startsWith("'")
    ? "'"
    : old.startsWith('"')
      ? '"'
      : ''
  return `${prefix}${lead || ' '}${formatYamlScalar(newValue, preferQuote)}`
}

/**
 * Find absolute line index of `keyPath` inside a step (e.g. block1.class).
 */
function findKeyLineInStep(lines: string[], step: Step, keyPath: string): number {
  const parts = keyPath.split('.').filter(Boolean)
  if (!parts.length)
    return -1

  let from = step.start
  let parentIndent = -1

  for (let pi = 0; pi < parts.length; pi++) {
    const part = parts[pi]
    const isLast = pi === parts.length - 1
    const keyRe = new RegExp(`^(-\\s*)?${escapeRegExp(part)}\\s*:`)
    let found = -1

    for (let i = from; i < step.end; i++) {
      const line = lines[i]
      const trimmed = line.trim()
      if (!trimmed)
        continue
      const indent = line.search(/\S/)
      if (parentIndent >= 0 && indent <= parentIndent)
        break
      if (!keyRe.test(trimmed))
        continue
      // For nested keys, require deeper indent than parent
      if (parentIndent >= 0 && indent <= parentIndent)
        continue
      found = i
      break
    }

    if (found < 0)
      return -1

    if (isLast)
      return found

    parentIndent = lines[found].search(/\S/)
    from = found + 1
  }

  return -1
}

/** Patch a scalar (or scalar-on-key-line) property in the current slide timeline step. */
export function patchTimelineProperty(
  content: string,
  req: PatchTimelinePropertyRequest,
): TimelineStepMutationResult {
  if (!req.keyPath)
    return { success: false, error: 'keyPath required' }

  const lines = content.split('\n')
  const resolved = resolveTimeline(lines, req.slideStart)
  if (!resolved)
    return { success: false, error: 'timeline not found in slide frontmatter' }

  const { steps } = resolved
  if (req.stepIndex < 0 || req.stepIndex >= steps.length)
    return { success: false, error: `step ${req.stepIndex} out of range (0..${steps.length - 1})` }

  const step = steps[req.stepIndex]
  const lineIdx = findKeyLineInStep(lines, step, req.keyPath)
  if (lineIdx < 0)
    return { success: false, error: `key "${req.keyPath}" not found in step ${req.stepIndex}` }

  const original = lines[lineIdx]
  const rest = original.slice(original.indexOf(':') + 1).trim()
  // Nested object header without inline value — not a scalar leaf
  if (!rest || rest === '|' || rest === '>')
    return { success: false, error: `"${req.keyPath}" is not a scalar value` }

  const updated = replaceValueAfterColon(original, req.newValue)
  if (!updated)
    return { success: false, error: 'failed to rewrite value line' }

  lines[lineIdx] = updated
  return {
    success: true,
    detail: `step ${req.stepIndex} ${req.keyPath} line ${lineIdx + 1}`,
    content: lines.join('\n'),
    stepCount: steps.length,
  }
}
