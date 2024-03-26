import { GM_getValue } from '../config/settings'

export default function forceDesktop() {
  // if (document.location.pathname === '/simple/index.php') {
  //   const match = document.location.search.match(/\?t(\d+)(?:_(\d+))?\.html$/)
  //   if (match) {
  //     const postId = match[1]
  //     const page = match[2] || '1'
  //     document.location.href = `${document.location.origin}/read.php?tid-${postId}-fpage-0-toread--page-${page}.html`
  //   }
  // }
  if (!GM_getValue('force_desktop'))
    return

  if (document.location.pathname !== '/simple/index.php')
    return

  const domain = GM_getValue('domain_redirect') ? GM_getValue('target_domain') || document.location.hostname : document.location.hostname
  const origin = `${document.location.protocol}//${domain}`
  if (document.location.search === '') {
    document.location.href = origin
    return
  }
  const match = document.location.search.match(/^\?t(\d+)(?:_(\d+))?\.html$/)
  if (match) {
    const postId = match[1]
    const page = match[2] || '1'
    document.location.href = `${origin}/read.php?tid-${postId}-fpage-0-toread--page-${page}.html`
  }
}
