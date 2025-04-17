import { defineAppSetup } from '@slidev/types'
import { computed } from 'vue'

export default defineAppSetup(({ app }) => {
  app.use({
    install() {
      setTimeout(() => {  
        document.body.classList.add('cs-main')
      }, 1000)
    }
  })
  app.mixin({
    data() {
      if (this._.setupState?.InjectedLayout && this._.setupState.$clicksContext?.timeline) {
        return {
          t: computed(() => this._.setupState.$clicksContext?.timeline)
        }
      }
      return {}
    }
  })
})
