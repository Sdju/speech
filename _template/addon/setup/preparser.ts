import { definePreparserSetup } from '@slidev/types'

console.log('preparser')

export default definePreparserSetup(({ filepath, headmatter, mode }) => {
  console.log('preparser')
  return [
    // {
    //   transformRawLines(lines) {
    //     console.log('transformRawLines', lines)
    //     for (const i in lines) {
    //       if (lines[i] === '@@@')
    //         lines[i] = 'HELLO'
    //     }
    //   },
    // }
  ]
})
