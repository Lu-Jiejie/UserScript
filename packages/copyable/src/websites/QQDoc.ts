import type { Website } from '../types'
import { unsafeWindow } from '$'

const QQDoc: Website = {
  regexp: /docs.qq.com\/doc/,
  handler: () => {
    document.addEventListener('keydown', (e) => {
      if (!(e.ctrlKey && e.key === 'c'))
        return
      // e.stopPropagation()
      // e.stopImmediatePropagation()
      e.preventDefault()
      const selectText = unsafeWindow.pad.editor.getCopyContent().plain
      navigator.clipboard.writeText(selectText)
    })
  },
}

export default QQDoc
