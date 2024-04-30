import type { Website } from '../types'
import { enableCssUserSelect, stopSelectStartPropagation } from '../utils/handler'

const Examcoo: Website = {
  regexp: /examcoo/,
  handler: () => {
    stopSelectStartPropagation()
    enableCssUserSelect()
  },
}

export default Examcoo
