import rough from 'roughjs'

export const ROUGH_TARGETS = [
  '.box',
  '.mk-panel',
  '.mk-title',
  '.mk-tray',
  '.point',
  '.point-full',
  '.mk-section-hero--img .mk-section-hero__content',
  '.rough-target',
  '.slidev-layout blockquote',
].join(',')

export const ROUGH_HEADINGS = '.slidev-layout h1, .slidev-layout h2'

interface RoughOptions {
  roughness: number
  bowing: number
  strokeWidth: number
  fillStyle: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch'
  fillWeight: number
  hachureAngle: number
  padding: number
  fill: boolean
}

const DEFAULT_OPTIONS: RoughOptions = {
  roughness: 1.45,
  bowing: 1.1,
  strokeWidth: 1.6,
  fillStyle: 'hachure',
  fillWeight: 0.35,
  hachureAngle: 58,
  padding: 3,
  fill: true,
}

type Decoration = {
  resizeObserver: ResizeObserver
  svg: SVGSVGElement
}

const decorations = new WeakMap<HTMLElement, Decoration>()

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++)
    hash = (hash << 5) - hash + value.charCodeAt(i)
  return Math.abs(hash)
}

function resolveCssColor(_el: HTMLElement, token: string, fallback: string): string {
  const probe = document.createElement('span')
  probe.style.color = token || fallback
  probe.style.display = 'none'
  document.body.appendChild(probe)
  const color = getComputedStyle(probe).color
  probe.remove()
  return color || fallback
}

function getStrokeColor(el: HTMLElement): string {
  const style = getComputedStyle(el)
  const border = style.borderTopColor
  if (border && border !== 'rgba(0, 0, 0, 0)')
    return border
  return resolveCssColor(el, style.getPropertyValue('--bg-first'), '#9a948a')
}

function getFillColor(el: HTMLElement): string {
  const style = getComputedStyle(el)
  return resolveCssColor(
    el,
    style.getPropertyValue('--bg-first') || style.getPropertyValue('--bg-keyword'),
    'rgb(120, 120, 120)',
  )
}

function isCircleLike(el: HTMLElement): boolean {
  const radius = getComputedStyle(el).borderRadius
  if (!radius.includes('%'))
    return false
  return Number.parseFloat(radius) >= 40
}

function isVisible(el: HTMLElement): boolean {
  const style = getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden')
    return false
  if (style.opacity === '0' || el.classList.contains('invisible'))
    return false
  const rect = el.getBoundingClientRect()
  return rect.width > 2 && rect.height > 2
}

function ensurePositioned(el: HTMLElement) {
  if (getComputedStyle(el).position === 'static')
    el.style.position = 'relative'
  el.classList.add('rough-source')
}

function drawShape(
  el: HTMLElement,
  svg: SVGSVGElement,
  options: RoughOptions,
) {
  while (svg.firstChild)
    svg.removeChild(svg.firstChild)

  const width = el.clientWidth
  const height = el.clientHeight
  if (width < 2 || height < 2)
    return

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  const generator = rough.svg(svg)
  const padding = options.padding
  const stroke = getStrokeColor(el)
  const fill = getFillColor(el)
  const seed = hashString(`${el.className}:${width}:${height}`)

  const shapeOptions = {
    roughness: options.roughness,
    bowing: options.bowing,
    stroke,
    strokeWidth: options.strokeWidth,
    fill: options.fill ? fill : undefined,
    fillStyle: options.fillStyle,
    fillWeight: options.fillWeight,
    hachureAngle: options.hachureAngle,
    seed,
  }

  const node = isCircleLike(el)
    ? generator.ellipse(
        width / 2,
        height / 2,
        width - padding * 2,
        height - padding * 2,
        shapeOptions,
      )
    : generator.rectangle(
        padding,
        padding,
        width - padding * 2,
        height - padding * 2,
        shapeOptions,
      )

  svg.appendChild(node)
}

export function decorateElement(
  el: HTMLElement,
  partial: Partial<RoughOptions> = {},
) {
  if (el.dataset.roughDecorated === 'true')
    return
  if (!isVisible(el))
    return

  const options = { ...DEFAULT_OPTIONS, ...partial }
  ensurePositioned(el)

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('class', 'rough-overlay')
  svg.setAttribute('aria-hidden', 'true')
  el.prepend(svg)

  const draw = () => drawShape(el, svg, options)
  draw()

  const resizeObserver = new ResizeObserver(() => draw())
  resizeObserver.observe(el)

  el.dataset.roughDecorated = 'true'
  decorations.set(el, { resizeObserver, svg })
}

export function undecorateElement(el: HTMLElement) {
  const decoration = decorations.get(el)
  if (!decoration)
    return

  decoration.resizeObserver.disconnect()
  decoration.svg.remove()
  decorations.delete(el)
  delete el.dataset.roughDecorated
  el.classList.remove('rough-source')
}

export function decorateHeading(el: HTMLElement) {
  if (el.dataset.roughUnderline === 'true')
    return
  if (!isVisible(el))
    return

  ensurePositioned(el)
  el.classList.add('rough-heading')

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('class', 'rough-heading__svg')
  svg.setAttribute('aria-hidden', 'true')
  el.appendChild(svg)

  const draw = () => {
    while (svg.firstChild)
      svg.removeChild(svg.firstChild)

    const width = el.clientWidth
    const height = el.clientHeight
    if (width < 2 || height < 2)
      return

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    const generator = rough.svg(svg)
    const accent = resolveCssColor(
      el,
      getComputedStyle(el).getPropertyValue('--bg-first') || getComputedStyle(el).getPropertyValue('--v-color'),
      '#3498db',
    )

    const highlight = generator.rectangle(
      0,
      height * 0.52,
      width,
      height * 0.34,
      {
        roughness: 1.8,
        bowing: 1.4,
        stroke: 'transparent',
        fill: accent,
        fillStyle: 'solid',
        fillWeight: 1,
        seed: hashString(el.textContent || 'heading'),
      },
    )

    svg.appendChild(highlight)
  }

  draw()
  const resizeObserver = new ResizeObserver(() => draw())
  resizeObserver.observe(el)

  el.dataset.roughUnderline = 'true'
  decorations.set(el, { resizeObserver, svg })
}

export function clearRoughDecorations(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-rough-decorated="true"]').forEach(undecorateElement)
  root.querySelectorAll<HTMLElement>('[data-rough-underline="true"]').forEach((el) => {
    undecorateElement(el)
    el.classList.remove('rough-heading')
    delete el.dataset.roughUnderline
  })
}

export function refreshRoughDecorations(root?: ParentNode | null) {
  const scope = root ?? document.querySelector('.slidev-page.is-active')
  if (!scope)
    return

  clearRoughDecorations(scope)

  scope.querySelectorAll<HTMLElement>(ROUGH_TARGETS).forEach((el) => {
    if (isVisible(el))
      decorateElement(el)
  })

  scope.querySelectorAll<HTMLElement>(ROUGH_HEADINGS).forEach((el) => {
    if (isVisible(el))
      decorateHeading(el)
  })
}
