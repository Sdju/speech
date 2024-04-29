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
    patchProp: (
      el,
      key,
      prevValue,
      nextValue,
      namespace,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren,
    ) => {
      const isSVG = namespace === 'svg'
      if (key === 'class') {
        if (nextValue) {
          el.className = nextValue
        } else {
          el.removeAttribute('class')
        }
      } else if (key === 'style') {
        const style = (el as HTMLElement).style
        const isCssString = isString(nextValue)
        let hasControlledDisplay = false
        if (nextValue && !isCssString) {
          if (prevValue) {
            if (!isString(prevValue)) {
              for (const key in prevValue) {
                if (nextValue[key] == null) {
                  setStyle(style, key, '')
                }
              }
            } else {
              for (const prevStyle of prevValue.split(';')) {
                const key = prevStyle.slice(0, prevStyle.indexOf(':')).trim()
                if (nextValue[key] == null) {
                  setStyle(style, key, '')
                }
              }
            }
          }
          for (const key in nextValue) {
            if (key === 'display') {
              hasControlledDisplay = true
            }
            setStyle(style, key, nextValue[key])
          }
        } else {
          if (isCssString) {
            if (prevValue !== nextValue) {
              // #9821
              const cssVarText = (style as any)[CSS_VAR_TEXT]
              if (cssVarText) {
                ;(nextValue as string) += ';' + cssVarText
              }
              style.cssText = nextValue as string
              hasControlledDisplay = displayRE.test(nextValue)
            }
          } else if (prevValue) {
            el.removeAttribute('style')
          }
        }
      } else if (isOn(key)) {
        // ignore v-model listeners
        if (!isModelListener(key)) {
          patchEvent(el, key, prevValue, nextValue, parentComponent)
        }
      } else if (
        key[0] === '.'
          ? ((key = key.slice(1)), true)
          : key[0] === '^'
            ? ((key = key.slice(1)), false)
            : shouldSetAsProp(el, key, nextValue, isSVG)
      ) {
        patchDOMProp(
          el,
          key,
          nextValue,
          prevChildren,
          parentComponent,
          parentSuspense,
          unmountChildren,
        )
      } else {
        patchAttr(el, key, nextValue, isSVG, parentComponent)
      }
    },

    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null)
    },

    remove: child => {
      child.parentNode?.removeChild(child)
    },

    createElement: (tag): Element => document.createElement(tag),

    createText: text => document.createTextNode(text),

    createComment: text => document.createComment(text),

    setText: (node, text) => {
      node.nodeValue = text
    },

    setElementText: (el, text) => {
      el.textContent = text
    },

    parentNode: node => node.parentNode as Element | null,

    nextSibling: node => node.nextSibling,

    querySelector: selector => document.querySelector(selector),

    setScopeId(el, id) {
      el.setAttribute(id, '')
    },
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