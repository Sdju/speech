/**
 * Resolve the CSS containing block used for an absolutely positioned $obj.
 * Prefer explicit [data-coord-root], else nearest positioned/transformed ancestor,
 * else the slide root.
 */
export function getCoordRoot(
  el: HTMLElement,
  slideEl?: HTMLElement | null,
): HTMLElement {
  const marked = el.closest('[data-coord-root]') as HTMLElement | null
  if (marked && marked !== el)
    return marked

  let node: HTMLElement | null = el.parentElement
  while (node) {
    if (slideEl && node === slideEl)
      return slideEl

    const style = getComputedStyle(node)
    const positioned = style.position !== 'static'
    const transformed = style.transform !== 'none'
      || style.filter !== 'none'
      || style.perspective !== 'none'
      || style.willChange.split(',').some(v => /transform|filter|perspective/.test(v.trim()))

    if (positioned || transformed)
      return node

    node = node.parentElement
  }

  return slideEl ?? document.body
}

/**
 * Viewport point → CSS px relative to the padding edge of `root`,
 * undoing the slide's uniform scale transform.
 *
 * Border widths from getComputedStyle are already in unscaled CSS px,
 * while getBoundingClientRect deltas are viewport px — divide first, then subtract.
 */
export function globalToRootLocal(
  point: { x: number, y: number },
  root: HTMLElement,
  scale: number,
): { x: number, y: number } {
  const rect = root.getBoundingClientRect()
  const style = getComputedStyle(root)
  const borderLeft = parseFloat(style.borderLeftWidth) || 0
  const borderTop = parseFloat(style.borderTopWidth) || 0
  const s = scale || 1

  return {
    x: (point.x - rect.left) / s - borderLeft,
    y: (point.y - rect.top) / s - borderTop,
  }
}
