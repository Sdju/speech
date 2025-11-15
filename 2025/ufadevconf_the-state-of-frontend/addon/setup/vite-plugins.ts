import { defineVitePluginsSetup } from '@slidev/types'
import { createSlidesPartsPlugin } from '../module/SlidesPartsPlugin'

export default defineVitePluginsSetup((options) => {
  return [
    createSlidesPartsPlugin(options.entry)
  ]
})
