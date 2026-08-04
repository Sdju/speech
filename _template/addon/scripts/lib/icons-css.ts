import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import presetIcons, { parseIconWithLoader } from '@unocss/preset-icons'
import { encodeSvgForCss } from '@iconify/utils/lib/svg/encode-svg-for-css'
import { searchForIcon } from '@iconify/utils/lib/loader/modern'

const require = createRequire(import.meta.url)
const { loadCollectionFromFS } = require('@iconify/utils/lib/loader/fs')

const presentationRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')

const iconAliases: Record<string, string> = {
  record: 'recording-filled',
}

function escapeSelector(className: string) {
  return className.replace(/:/g, '\\:')
}

function expandIconNames(name: string): string[] {
  const names = new Set<string>([name])
  if (iconAliases[name])
    names.add(iconAliases[name])
  if (name.endsWith('-rounded'))
    names.add(name.slice(0, -'-rounded'.length))
  return [...names]
}

type IconLoader = (
  collection: string,
  icon: string,
  options: Record<string, unknown>,
) => Promise<string | undefined>

async function loadIconSvg(
  collection: string,
  icon: string,
  nodeLoader: IconLoader,
  loaderOptions: Record<string, unknown>,
): Promise<string | undefined> {
  for (const variant of expandIconNames(icon)) {
    const svg = await nodeLoader(collection, variant, loaderOptions)
    if (svg)
      return svg
  }

  const iconSet = await loadCollectionFromFS(collection, false, undefined, presentationRoot)
  if (!iconSet)
    return undefined

  return (await searchForIcon(iconSet, collection, expandIconNames(icon), loaderOptions)) || undefined
}

async function resolveIcon(
  className: string,
  nodeLoader: IconLoader,
  loaderOptions: Record<string, unknown>,
) {
  const body = className.replace(/^i-/, '')
  const parsed = await parseIconWithLoader(body, async (collection, icon) => {
    return loadIconSvg(collection, icon, nodeLoader, loaderOptions)
  }, loaderOptions)

  return parsed
}

function cssFromIcon(className: string, svg: string, extraProperties: Record<string, string>) {
  const mode = svg.includes('currentColor') ? 'mask' : 'bg'
  const url = `url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`
  const props: Record<string, string> = mode === 'mask'
    ? {
        '--un-icon': url,
        '-webkit-mask': 'var(--un-icon) no-repeat',
        'mask': 'var(--un-icon) no-repeat',
        '-webkit-mask-size': '100% 100%',
        'mask-size': '100% 100%',
        'background-color': 'currentColor',
        'color': 'inherit',
        ...extraProperties,
      }
    : {
        'background': `${url} no-repeat`,
        'background-size': '100% 100%',
        'background-color': 'transparent',
        ...extraProperties,
      }

  const body = Object.entries(props).map(([key, value]) => `${key}:${value}`).join(';')
  return `.${escapeSelector(className)}{${body}}`
}

export async function generateIconsCss(
  icons: string[],
  extraProperties: Record<string, string>,
): Promise<string> {
  const preset = presetIcons({ collectionsNodeResolvePath: presentationRoot })
  const nodeLoader = await preset.api.createNodeLoader()
  if (!nodeLoader)
    throw new Error('Node icon loader unavailable — install @iconify/json')

  const loaderOptions = {
    cwd: presentationRoot,
    customizations: {
      additionalProps: {
        display: 'inline-block',
        'vertical-align': 'middle',
        ...extraProperties,
      },
      trimCustomSvg: true,
    },
  }

  const lines: string[] = ['/* layer: icons */']
  const failed: string[] = []

  for (const className of icons) {
    const parsed = await resolveIcon(className, nodeLoader, loaderOptions)
    if (!parsed) {
      failed.push(className)
      continue
    }
    lines.push(cssFromIcon(className, parsed.svg, extraProperties))
  }

  if (failed.length)
    console.warn(`Failed to load ${failed.length} icon(s): ${failed.join(', ')}`)

  return `${lines.join('\n')}\n`
}
