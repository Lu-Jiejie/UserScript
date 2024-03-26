import { GM_getValue } from '../config/settings'

export default async function domainRedirect() {
  if (!GM_getValue('domain_redirect') || GM_getValue('force_desktop'))
    return
  const targetDomain = GM_getValue('target_domain')
  if (!targetDomain)
    return

  const currentDomain = document.location.hostname
  if (currentDomain !== targetDomain)
    document.location.href = `${document.location.protocol}//${targetDomain}${document.location.pathname}${document.location.search}`
}
