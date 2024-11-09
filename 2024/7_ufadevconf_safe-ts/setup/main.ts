import { defineAppSetup } from '@slidev/types'
import { onMounted } from 'vue'

export default defineAppSetup(({ app, router }) => {
  app.use({
    install(app) {
      setTimeout(() => {  
        console.log('mounted')
        document.body.classList.add('cs-blue')
      }, 1000)
    }
  })
})