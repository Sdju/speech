/* ./setup/shiki.ts */
import { defineShikiSetup } from '@slidev/types'
import { transformerNotationDiff, transformerNotationWordHighlight } from '@shikijs/transformers'

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'github-dark'
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationWordHighlight()
    ]
  }
})