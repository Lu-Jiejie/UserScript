import type { Website } from '../types'
import { enableCssUserSelect, stopCopyPropagation } from '../utils/handler'

const CSDN: Website = {
  regexp: /csdn/,
  handler: () => {
    stopCopyPropagation()
    enableCssUserSelect()
  },
}

export default CSDN
