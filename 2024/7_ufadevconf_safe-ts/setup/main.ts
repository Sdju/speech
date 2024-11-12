import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app }) => {
  app.use({
    install() {
      setTimeout(() => {  
        document.body.classList.add('cs-blue')
      }, 1000)
    }
  })
})