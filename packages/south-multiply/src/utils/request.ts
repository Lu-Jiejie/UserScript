import { GM_xmlhttpRequest } from '$'

export function get(url: string, retries: number = 3, timeout: number = 5000): Promise<string> {
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
        }
      })
    }

    attempt()
  })
}

export function post(url: string, data: string, retries: number = 3, timeout: number = 5000): Promise<string> {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      GM_xmlhttpRequest({
        method: 'POST',
        url,
        data,
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
        }
      })
    }

    attempt()
  })
}

export async function getDocument(url: string, handler?: (doc: Document) => void): Promise<Document> {
  const html = await get(url)
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  handler?.(doc)
  return doc
}
