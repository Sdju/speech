import {createCommentNode, createNode, createTextNode, type VueactElement, type VueactNode} from './createNode';

function noop(fn: string): never {
  throw Error(`no-op: ${fn}`)
}

const propRename: Record<string, string> = {
  'xmlns:xlink': 'xmlnsXlink',
  'class': 'className',
  'onUpdate:modelValue': 'onChange',
  'modelValue': 'value'
}

export const nodeOps = {
  patchProp(el: VueactElement, key: string, _prevVal: any, nextVal: any) {
    const realKey = propRename[key] ?? key
    el.setProps({ ...el.props, [realKey]: nextVal })
  },

  insert(child: VueactNode, parent: VueactElement, anchor: VueactNode) {
    child.parent = parent

    parent.children.splice(parent.children.indexOf(anchor), 0, child)
    parent.setChildren([...parent.children])
  },

  createElement(tag: string): VueactElement {
    return createNode(tag)
  },

  createText(text: string): VueactNode {
    return createTextNode(text)
  },

  createComment(text: string): VueactNode {
    return createCommentNode(text)
  },

  setText(node: VueactNode, text: string) {
    node.payload = text
    node.parent!.setChildren([...node.parent!.children])
  },

  setElementText(node: VueactElement, text: string) {
    node.setChildren([createTextNode(text)])
  },

  parentNode(node: VueactElement) {
    return node.parent
  },

  nextSibling(node: VueactNode) {
    const pos = node.parent?.children.indexOf(node)!
    return node.parent?.children[pos + 1]!
  },

  setScopeId(node: VueactElement, id: string) {
    node.setProps({ ...node.props, [id]: '' })
  },

  remove(node: VueactNode) {
    const children = node.parent!.children
    children.splice(children.indexOf(node), 1)
    node.parent!.setChildren([...children])
    node.parent = null
  },

  querySelector() {
    noop('querySelector')
  },

  insertStaticContent() {
    noop('insertStaticContent')
  },

  cloneNode() {
    noop('cloneNode')
  },
}