import type { Website } from '../types'

const BaiduWenku: Website = {
  regexp: /wenku.baidu.com\/view/,
  handler: () => {
    (document.querySelector('.header-wrapper') as any).__vue__.$store.state.vipInfo.isVip = true

    document.addEventListener('copy', async () => {
      const originClipboard = await navigator.clipboard.readText()
      const tailPattern = /(-{56,})[\s\S]*?作者：/
      const match = tailPattern.exec(originClipboard)
      let newClipboard = originClipboard

      if (match)
        newClipboard = originClipboard.substring(0, match.index).trim()

      navigator.clipboard.writeText(newClipboard)
    })

    document.addEventListener('keydown', (e) => {
      if (!(e.ctrlKey && e.key === 'c') || window.getSelection()?.toString() || (document.querySelector('canvas') && !document.querySelector('#original-creader-interative-canvas-1')))
        return
      (document.querySelector('.reader-copy-button') as HTMLDivElement).click()
    })
  },
}

export default BaiduWenku
