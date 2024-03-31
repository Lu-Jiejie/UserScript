/* eslint-disable no-alert */
import $ from 'jquery'
import { defaultStorage, getAllValues, setAllValues } from '../utils/storage'

export function exportSettings() {
  const settings = getAllValues()
  const data = JSON.stringify(settings, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  $('<a>', { href: url, download: 'settings.json' })[0].click()
  URL.revokeObjectURL(url)
}

function validateSettings(settings: Record<string, any>): boolean {
  for (const key in settings) {
    if (!(key in defaultStorage))
      return false

    if (typeof settings[key] !== typeof defaultStorage[key as keyof typeof defaultStorage])
      return false
  }

  return true
}

export function importSettings() {
  if (!confirm('你确定要导入设置吗？当前设置将被覆盖！'))
    return
  const input = $<HTMLInputElement>('<input>', { type: 'file' }).on('change', function () {
    const file = this.files![0]
    const reader = new FileReader()
    reader.onload = function () {
      const data = reader.result as string
      const settings = JSON.parse(data)
      if (!validateSettings(settings)) {
        alert('配置文件数据错误！')
        return
      }
      setAllValues(settings)
    }
    reader.readAsText(file)

    document.location.reload()
  })[0]
  input.click()
}
