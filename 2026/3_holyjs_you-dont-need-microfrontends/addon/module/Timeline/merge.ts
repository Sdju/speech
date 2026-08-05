import type { TimelineStep } from './types'

export function deepMerge<T>(target: T, source: unknown): T {
  if (source === null || typeof source !== 'object')
    return source as T
  if (target === null || typeof target !== 'object')
    target = {} as T

  const out = target as Record<string, unknown>
  for (const key of Object.keys(source as object)) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      out[key] = deepMerge(out[key], (source as Record<string, unknown>)[key])
    }
  }
  return out as T
}

export function clicksForTimeline(steps: TimelineStep[] | undefined): number | undefined {
  if (!Array.isArray(steps) || steps.length === 0)
    return undefined
  // Step 0 is the base state at click 0; remaining steps need length-1 clicks.
  return Math.max(0, steps.length - 1)
}

export function mergeTimelineSteps(steps: TimelineStep[]) {
  const total = steps.length
  const states = Array.from({ length: total }, () => deepMerge({}, steps[0] ?? {}))
  const aliases: Record<string, [number, number]> = {}

  let click = 0
  for (const action of steps) {
    const from = click++
    const to = total

    if (action.$clicksAlias) {
      const list = Array.isArray(action.$clicksAlias) ? action.$clicksAlias : [action.$clicksAlias]
      for (const alias of list)
        aliases[alias] = [from, to]
    }

    for (let i = from; i < to; i++)
      states[i] = deepMerge(states[i], action)
  }

  return { states, aliases, total }
}
