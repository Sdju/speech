import {createElement, useMemo, useState} from 'react';

let id = 0

export interface VueactNode {
  id: number
  parent: null | VueactElement
  render: () => ReturnType<typeof createElement> | string | null | undefined
  payload?: unknown
}

export interface VueactElement extends VueactNode {
  reactComponent: () => ReturnType<typeof createElement>

  props: Record<string, unknown>
  setProps: (props: Record<string, unknown>) => void

  children: VueactNode[]
  setChildren: (newChildren: VueactNode[]) => void

  ref: unknown
  refSetter: {
    set current(newRef: unknown);
    get current(): unknown;
  }
}

export function createTextNode(content: string): VueactNode {
  return {
    payload: content,
    id: id++,
    parent: null,
    render() {
      return this.payload as string
    }
  }
}

export function createCommentNode(content: string) {
  return {
    payload: content,
    id: id++,
    parent: null,
    render() {
      return null
    }
  }
}

export function createNode(tag: string) {
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

  const element: VueactElement = {
    id: id++,
    parent: null,
    render: () => createElement(element.reactComponent),

    props: {},
    setProps(newProps: Record<string, unknown>) {
      element.props = newProps
    },

    children: [],
    setChildren(newChildren: VueactNode[]) {
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

    reactComponent
  }
  return element
}