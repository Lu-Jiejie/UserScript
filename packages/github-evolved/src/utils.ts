import { GM_xmlhttpRequest } from '$'

export function isDev() {
  return import.meta.env.DEV
}

export function observeNewElements(selector: string, callback: (element: Element) => void) {
  if (isDev()) {
    document.querySelectorAll(selector).forEach(callback)
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // 检查新增节点本身是否匹配选择器
        if (node instanceof Element && node.matches(selector)) {
          callback(node)
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  })
}

export function get(url: string, retries = 3, timeout = 1000): Promise<string> {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        timeout,
        onload: (res) => {
          resolve(res.responseText)
        },
        onerror: (err) => {
          if (retries > 0) {
            retries--
            attempt()
          }
          else {
            reject(err)
          }
        },
        ontimeout: () => {
          if (retries > 0) {
            retries--
            attempt()
          }
          else {
            reject(new Error(`Request to ${url} timed out`))
          }
        },
      })
    }

    attempt()
  })
}
