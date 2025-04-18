import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app }) => {
  app.use({
    install() {
      setTimeout(() => {  
        document.body.classList.add('cs-main')
      }, 1000)
    }
  })
})
