import { defineAppSetup } from '@slidev/types'
import { computed } from 'vue'
import { provideXSlides } from '../module/XSlides/XSlidesService'

export default defineAppSetup(({ app }) => {
  app.use({
    install() {
      setTimeout(() => {  
        document.body.classList.add('cs-main', 'duration-200', 'ease-in-out')
      }, 1000)
    }
  })
  provideXSlides(app)
  app.mixin({
    data() {
      if (this._.provides['$$slidev-clicks-context']?.value?.timeline) {
        console.log('this._.setupState', this._.provides['$$slidev-clicks-context'].value.timeline)
        return {
          t: computed(() => this._.provides['$$slidev-clicks-context'].value.timeline)
        }
      }
      return {}
    }
  })
})
