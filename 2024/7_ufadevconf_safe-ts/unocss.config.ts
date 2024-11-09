import slidev from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

function parseValue(value: string) {
  return value.endsWith('%') ? value : `${value}px`
}


const variants = {
  orange: "[--bg-keyword:#cc8b00] [--bg-first:#ffae00] [--bg-second:#dc8e27] [--bg-third:#a27839] [--v-color:theme('colors.amber.500')] ",
  blue: "[--bg-keyword:#3c5cff] [--bg-first:#3c5cff] [--bg-second:#4cbbc5] [--bg-third:#5d1dff] [--v-color:theme('colors.blue.500')] ",
  lightblue: "[--bg-keyword:#0099ff] [--bg-first:#0099ff] [--bg-second:#4cbbc5] [--bg-third:#5d1dff] [--v-color:theme('colors.blue.500')] ",
  green: "[--bg-keyword:#5a8f29] [--bg-first:#49ff3c] [--bg-second:#4cc580] [--bg-third:#ceff1d] [--v-color:theme('colors.gray.500')] ",
  red: "[--bg-keyword:#990000] [--bg-first:#ff4d4d] [--bg-second:#ff8080] [--bg-third:#ff9999] [--v-color:theme('colors.red.500')] ",
  purple: "[--bg-keyword:#990099] [--bg-first:#ff4dff] [--bg-second:#ff80ff] [--bg-third:#ff99ff] [--v-color:theme('colors.purple.500')] ",
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
      [/^cs-(\S+)/, ([, variant]) => {
        return variants[variant]
      }],
      {
        'movable': 'absolute -translate-x-1/2 -translate-y-1/2 transform-origin-center',
        'circle': 'rounded-[100%]',
        '$obj': 'movable duration-200 ease-in-out filter',
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
