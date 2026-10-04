import { definePreparserSetup } from '@slidev/types'

/**
 * When a slide has `timeline:` and no explicit `clicks:`, set clicks to length-1
 * so Slidev reserves steps without DOM register / setTimeout hacks.
 */
export default definePreparserSetup(() => {
  return [
    {
      name: 'zede-timeline-clicks',
      transformSlide(_content, frontmatter) {
        const timeline = frontmatter.timeline
        if (!Array.isArray(timeline) || timeline.length === 0)
          return

        if (frontmatter.clicks != null)
          return

        // Step 0 is the base state at click 0; remaining steps need length-1 clicks.
        frontmatter.clicks = Math.max(0, timeline.length - 1)
      },
    },
    {
      // то же для `fileTree:` (FileTree.vue): шаги дерева = клики слайда
      name: 'zede-file-tree-clicks',
      transformSlide(_content, frontmatter) {
        const steps = frontmatter.fileTree
        if (!Array.isArray(steps) || steps.length === 0 || frontmatter.clicks != null || frontmatter.timeline != null)
          return
        frontmatter.clicks = Math.max(0, steps.length - 1)
      },
    },
  ]
})
