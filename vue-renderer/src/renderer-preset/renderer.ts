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
    patchProp: () => noop('patchProp'),
    insert: () => noop('insert'),
    remove: () => noop('remove'),
    createElement: () => noop('createElement'),
    createText: () => noop('createText'),
    createComment: () => noop('createComment'),
    setText: () => noop('setText'),
    setElementText: () => noop('setElementText'),
    parentNode: () => noop('parentNode'),
    nextSibling: () => noop('nextSibling'),
    querySelector: () => noop('querySelector'),
    setScopeId: () => noop('setScopeId'),
    cloneNode: () => noop('setScopeId'),
    insertStaticContent: () => noop('insertStaticContent'),
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