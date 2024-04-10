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
    createText: (text: string) => {
      console.log(`createText: ${text}`)
      return document.createTextNode(text);
    },
    createElement: (
      tag: string,
      namespace?: "svg" | "mathml" | undefined,
    ) => {
      console.log(`createElement: ${tag}`)
      return namespace === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : namespace === 'mathml'
          ? document.createElementNS('http://www.w3.org/1998/Math/MathML', tag)
          : document.createElement(tag)
    },
    insert: (
      child: Node,
      parent: Element,
      anchor?: Node | null
    ) => {
      parent.insertBefore(child, anchor || null)
    },
    setElementText: (
      element: Element,
      text: string
    ) => {
      console.log(`setElementText: ${text}`)
      element.textContent = text
    },
    parentNode: (node: Node) => node.parentNode,
    nextSibling: (node: Node) => node.nextSibling,
    setText: (
      node: Node,
      text: string
    ) => {
      node.nodeValue = text
    },
    patchProp: () => noop('patchProp'),
    remove: () => noop('remove'),
    createComment: () => noop('createComment'),
    querySelector: () => noop('querySelector'),
    setScopeId: () => noop('setScopeId'),
    cloneNode: () => noop('setScopeId'),
    insertStaticContent: () => noop('insertStaticContent'),
  })

  const app = renderer.createApp(rootComponent, rootProps)
  const { mount } = app

  app.mount = (doc: HTMLElement): any => {
    const proxy = mount(doc)
    return proxy
  }
  return app
}