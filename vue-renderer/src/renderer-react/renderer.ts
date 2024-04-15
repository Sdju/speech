import {type Component, createRenderer,} from 'vue'
import {createRoot} from 'react-dom/client';
import {Fragment} from 'react/jsx-runtime';
import {createElement, useMemo, useRef, useState} from 'react';

function noop(fn: string): never {
  throw Error(`no-op: ${fn}`)
}

const propRename: Record<string, string> = {
  'xmlns:xlink': 'xmlnsXlink',
  'class': 'className',
  'onUpdate:modelValue': 'onChange',
  'modelValue': 'value'
}

let id = 0

function createNode(tag: string) {
  const reactComponent = {
    [tag]: () => {
      ;[element.props, element.setProps] = useState(element.props)
      ;[element.children, element.setChildren] = useState(element.children)

      const children = useMemo(() => {
        return element.children.map(child => child.render())
      }, [element.children]);

      return createElement(tag, { ...element.props, ref: element.refSetter }, ...children)
    }
  }[tag]

  const element = {
    id: id++,
    parent: null,
    render: () => createElement(element.reactComponent),

    props: {} as Record<string, unknown>,
    setProps(newProps: Record<string, unknown>) {
      element.props = newProps
    },

    children: [] as unknown[],
    setChildren(newChildren: unknown[]) {
      element.children = newChildren
    },

    ref: null as unknown,
    refSetter: {
      set current(newRef) {
        element.ref = newRef
      },
      get current() {
        return element.ref
      }
    },

    addEventListener(event, listener, flags) {
      console.log(event, listener, flags)
    },
    removeEventListener(event, listener, flags) {
      console.log(event, listener, flags)
    },

    reactComponent
  }
  return element
}

export const createApp = (rootComponent: Component, rootProps?: Record<string, unknown> | null) => {
  const renderer = createRenderer({
    patchProp(el, key, _prevVal, nextVal) {
      const realKey = propRename[key] ?? key
      el.setProps({ ...el.props, [realKey]: nextVal })
    },

    insert(child, parent, anchor) {
      child.parent = parent

      parent.children.splice(parent.children.indexOf(anchor), 0, child)
      parent.setChildren([...parent.children])
    },

    createElement(tag) {
      return createNode(tag)
    },

    createText(text: string) {
      return {
        text,
        parent: null,
        render() {
          return this.text
        }
      }
    },

    createComment(text) {
      return {
        comment: text,
        parent: null,
        render: () => null
      }
    },

    setText(node, text) {
      node.text = text
      node.parent.setChildren([...node.parent.children])
    },

    setElementText(node, text) {
      node.setChildren([{
        text,
        parent: node,
        render() {
          return this.text
        }
      }])
    },

    parentNode(node) {
      return node.parent
    },

    nextSibling(node) {
      const pos = node.parent?.children.indexOf(node)
      return node.parent?.children[pos + 1]
    },

    setScopeId(node, id) {
      node.setProps({ ...node.props, [id]: '' })
    },

    remove(node) {
      const children = node.parent.children
      children.splice(children.indexOf(node), 1)
      node.parent.setChildren([...children])
      node.parent = null
    },

    // для телепорта
    querySelector() {
      noop('querySelector')
    },

    insertStaticContent() {
      noop('insertStaticContent')
    },

    cloneNode() {
      noop('cloneNode')
    },
  })

  const app = renderer.createApp(rootComponent, rootProps)
  const { mount } = app

  app.mount = (doc: HTMLElement): any => {
    const container = createNode('root')
    const root = () => {
      ;[container.children, container.setChildren] = useState(container.children)

      return createElement(Fragment, null, ...container.children.map(child => child.render()))
    }
    const proxy = mount(container)

    createRoot(doc).render(createElement(root))

    return proxy
  }
  return app
}
