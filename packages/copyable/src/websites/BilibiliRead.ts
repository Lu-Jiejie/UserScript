import type { Website } from '../types'
import { stopCopyPropagation } from '../utils/handler'

const BilibiliRead: Website = {
  regexp: /www.bilibili.com\/read/,
  handler: () => {
    stopCopyPropagation()
  }
}

export default BilibiliRead
