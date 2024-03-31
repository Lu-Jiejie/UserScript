import $ from 'jquery'

// interface CreateElementOptions {
//   class?: string
//   sytle?: string
//   attributes?: Record<string, string>
//   text?: string
// }

// export function createElement(tagName: string, options: CreateElementOptions): Element {
//   const element = document.createElement(tagName)
//   if (options.className)
//     element.className = options.className
//   if (options.sytle)
//     element.setAttribute('style', options.sytle)
//   if (options.attributes) {
//     for (const [key, value] of Object.entries(options.attributes))
//       element.setAttribute(key, value)
//   }
//   if (options.textContent)
//     element.textContent = options.textContent
//   if (options.callback)
//     options.callback(element)
//   return element
// }

// export function insertNewElement(parent: Element, tagName: string, options: CreateElementOptions = {}): Element {
//   const element = createElement(tagName, options)
//   parent.appendChild(element)
//   return element
// }

interface Attributes {
  class?: string
  style?: string
  text?: string
  [key: string]: any
}

export function createElement(tagName: string, attributes: Attributes = {}): Element {
  const $element = $(`<${tagName}>`, attributes)

  return $element[0]!
}

export function insertNewElement(parent: Element, tagName: string, attributes: Attributes = {}): Element {
  const element = createElement(tagName, attributes)
  $(parent).append(element)
  return element
}
