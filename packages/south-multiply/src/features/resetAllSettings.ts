/* eslint-disable no-alert */
import { deleteAllValues } from '../utils/storage'

export default function resetAllSettings() {
  if (confirm('你确定初始化所有设置吗？')) {
    deleteAllValues()
    document.location.reload()
  }
}
