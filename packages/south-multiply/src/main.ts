import { initUI } from './ui'
import { initSettings } from './utils/storage'
import domainRedirect from './features/domainRedirect'
import forceDesktop from './features/forceDesktop'
import netdiskCheck from './features/netdiskCheck'
import autoCompleteTasks from './features/autoCompleteTasks'
import { seamlessLoadComment, seamlessLoadPost, seamlessLoadSearch } from './features/seamlessLoad'
import { initSafeForWork } from './features/safeForWork'
import imageWallDefault from './features/imageWallDefault'

import settingsPanelCss from './css/settingsPanel.css?raw'
import safeForWorkCss from './css/safeForWork.css?raw'
import seamlessLoadCss from './css/seamlessLoad.css?raw'

import { GM_addStyle, GM_openInTab, GM_registerMenuCommand } from '$'

GM_addStyle(settingsPanelCss)
GM_addStyle(safeForWorkCss)
GM_addStyle(seamlessLoadCss)

GM_registerMenuCommand('设置', () => {
  GM_openInTab(`${document.location.origin}/u.php`, { active: true })
})

function init() {
  initSettings()
  initUI()

  // 常规
  netdiskCheck()
  autoCompleteTasks()
  imageWallDefault()

  // safe for work
  initSafeForWork()

  // 无缝加载
  seamlessLoadComment()
  seamlessLoadPost()
  seamlessLoadSearch()

  // 跳转
  forceDesktop()
  domainRedirect()
}

if (import.meta.env.VITE_SCRIPT_ENV === 'development') {
  // 延迟执行
  setTimeout(() => {
    init()
  }, 500)
}
else {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
}
