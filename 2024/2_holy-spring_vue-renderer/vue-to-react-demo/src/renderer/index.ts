import {type Component, createRenderer,} from 'vue'
import {createRoot} from 'react-dom/client';
import {createElement, useState, Fragment} from 'react';
import {nodeOps} from '@/renderer/nodeOps';
import {createNode, type VueactElement, type VueactNode} from '@/renderer/createNode';

export const createApp = (rootComponent: Component, rootProps?: Record<string, unknown> | null) => {
  const renderer = createRenderer<VueactNode, VueactElement>(nodeOps)

  const app = renderer.createApp(rootComponent, rootProps)
  const { mount } = app

  app.mount = (doc: Element | string): any => {
    if (typeof doc === 'string') {
      doc = document.querySelector(doc)!
    }

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

import { openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"
 
  export function render(_ctx, _cache) {
      return (_openBlock(), _createElementBlock("div", null, "Hello"))
    }
  import { openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"
 
  export function render(_ctx, _cache) {
      return (_openBlock(), _createElementBlock("div", null, "Hello"))
    }