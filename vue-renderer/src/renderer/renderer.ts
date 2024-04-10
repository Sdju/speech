import {
  createRenderer,
  type CreateAppFunction,
  type Component,
} from 'vue'

function noop(fn: string): any {
  throw Error(`no-op: ${fn}`)
}

export const createApp = (rootComponent: Component, rootProps?: Record<string, unknown> | null) => {
  const renderer = createRenderer({
    patchProp: (el, key, prevVal, nextVal) => {
      if (el) {
        if (key === 'src') {
          el.src = nextVal
        }

        if (key === 'width') {
          el.width = nextVal
        }

        if (key === 'height') {
          el.height = nextVal
        }
      }

      if (nextVal && key === 'styles') {
        for (const [attr, value] of Object.entries(nextVal)) {
          el.styles[attr] = value
        }
      }
    },

    insert: (child, parent, anchor) => {
      if (parent instanceof HTMLElement) {
        parent.innerText = 'Hello'
        console.log(child)
        return
      }
      parent.children.push(child)
      child.parent = parent
    },

    createElement: (tag) => {
      if (tag === 'Image') {
        return { type: 'image' }
      }

      if (tag === 'Text') {
        return { type: 'text', children: [] }
      }

      if (tag === 'View') {
        return { type: 'view', children: [] }
      }

      throw Error(`Unknown tag ${tag}`)
    },

    createText: (text: string) => {
      return { type: 'content', text }
    },

    parentNode: node => {
      return null
    },

    createComment: () => noop('createComment'),
    setText: () => noop('setText'),
    setElementText: () => noop('setElementText'),
    nextSibling: () => noop('nextSibling'),
    querySelector: () => noop('querySelector'),
    setScopeId: () => noop('setScopeId'),
    cloneNode: () => noop('cloneNode'),
    insertStaticContent: () => noop('insertStaticContent'),
    remove: () => noop('remove')
  })

  const app = renderer.createApp(rootComponent, rootProps)
  const { mount } = app

  app.mount = (doc: HTMLElement): any => {
    const proxy = mount(doc)
    console.log(proxy)
    return proxy
  }
  return app
}