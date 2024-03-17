import type { Website } from '../types'
import { stopCopyPropagation } from '../utils/handler'

const Feishu: Website = {
  regexp: /feishu.cn/,
  handler: () => {
    stopCopyPropagation()
  }
}

export default Feishu
