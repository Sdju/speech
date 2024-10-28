import slidev from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

function parseValue(value: string) {
  return value.endsWith('%') ? value : `${value}px`
}

export default mergeConfigs([
  slidev,
  {
    shortcuts: [
      [/^pos-(\S+)$/, ([, c1]) => {
        const pos = parseValue(c1)
        return `left-[${pos}] top-[${pos}]`
      }],
      [/^pos-(\S+)_(\S+)$/, ([, c1, c2]) => {
        const left = parseValue(c1)
        const top = parseValue(c2)
        return `left-[${left}] top-[${top}]`
      }],
      [/^size-(\S+)$/, ([, c1]) => {
        const size = parseValue(c1)
        return `w-[${size}] h-[${size}]`
      }],
      [/^size-(\S+)_(\S+)$/, ([, c1, c2]) => {
        const width = parseValue(c1)
        const height = parseValue(c2)
        return `w-[${width}] h-[${height}]`
      }],
      [/^sp-(\S+)_(\S+)_(\S+)_(\S+)$/, ([, c1, c2, c3, c4]) => {
        const x = c1.startsWith('r') ? `right-[${parseValue(c1.slice(1))}]` : `left-[${parseValue(c1)}]`
        const y = c2.startsWith('b') ? `bottom-[${parseValue(c2.slice(1))}]` : `top-[${parseValue(c2)}]`
        const width = parseValue(c3)
        const height = parseValue(c4)
        return `${x} ${y} w-[${width}] h-[${height}]`
      }],
      {
        'movable': 'absolute -translate-x-1/2 -translate-y-1/2',
        'circle': 'rounded-[100%]',
        '$obj': 'movable duration-200 ease-in-out',
        'figure': 'grid place-items-center movable filter text-xl font-bold duration-200 transform-origin-center',
        'pos-center': 'left-1/2 top-1/2',
        'size-full': 'w-full h-full',
        'framed': 'rounded-[10px] border-2 border-gray-500/20 object-cover',
      }
    ],
    presets: [
      presetWebFonts({
        fonts: {
          mono: 'DM Mono',
          sans: 'DM Sans',
          strong: 'Rubik Iso',
          fast: 'Ubuntu',
          hand: 'Caveat',
        },
      }),
    ],
  },
])
