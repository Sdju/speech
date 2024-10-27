import slidev from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  slidev,
  {
    shortcuts: [
      {
        'text-gradient':
          'text-transparent bg-clip-text bg-gradient-to-tl from-green-400 via-teal-400 to-blue-500',
        'movable': 'absolute -translate-x-1/2 -translate-y-1/2',
        'circle': 'rounded-[100%]',
        'figure': 'grid place-items-center movable filter text-xl font-bold duration-200 transform-origin-center',
      },
      [/^pos-(\S+)_(\S+)$/, ([, c1, c2]) => {
        const left = c1.endsWith('%') ? c1 : `${c1}px`
        const top = c2.endsWith('%') ? c2 : `${c2}px`
        return `left-[${left}] top-[${top}]`
      }],
      [/^size-(\S+)_(\S+)$/, ([, c1, c2]) => {
        const width = c1.endsWith('%') ? c1 : `${c1}px`
        const height = c2.endsWith('%') ? c2 : `${c2}px`
        return `w-[${width}] h-[${height}]`
      }],
      [/^sp-(\S+)_(\S+)_(\S+)_(\S+)$/, ([, c1, c2, c3, c4]) => {
        const left = c1.endsWith('%') ? c1 : `${c1}px`
        const top = c2.endsWith('%') ? c2 : `${c2}px`
        const width = c3.endsWith('%') ? c3 : `${c3}px`
        const height = c4.endsWith('%') ? c4 : `${c4}px`
        return `left-[${left}] top-[${top}] w-[${width}] h-[${height}]`
      }],
    ],
    rules: [['font-smiley', { 'font-family': 'Smiley Sans' }]],
    presets: [
      presetWebFonts({
        fonts: {
          mono: 'DM Mono',
          sans: 'DM Sans',
          strong: 'Rubik Iso',
          fast: 'Ubuntu',
          hand: 'Caveat',
          jp: 'M PLUS Rounded 1c',
          'jp-serif': 'Noto Serif JP',
        },
      }),
    ],
  },
])
