import type { Website } from '../types'
import { unsafeWindow } from '$'

const Doc88: Website = {
  regexp: /www.doc88.com/,
  handler: () => {
    console.log(unsafeWindow.Config.vip)
    setTimeout(() => {
      console.log(unsafeWindow.Config.vip)
    }, 2000)
  },
}

export default Doc88
