import slidev from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  slidev,
  {
    shortcuts: {
      'text-gradient':
        'text-transparent bg-clip-text bg-gradient-to-tl from-green-400 via-teal-400 to-blue-500',
      'movable': 'absolute -translate-x-1/2 -translate-y-1/2',
      'circle': 'rounded-[100%]',
      'figure': 'grid place-items-center movable text-xl font-bold duration-200 transform-origin-center',
    },
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
