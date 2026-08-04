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
