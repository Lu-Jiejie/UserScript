import { getValue } from '../utils/storage'

export default async function domainRedirect() {
  if (!getValue('domain_redirect') || getValue('force_desktop'))
    return
  const targetDomain = getValue('target_domain')
  if (!targetDomain)
    return

  const currentDomain = document.location.hostname
  if (currentDomain !== targetDomain)
    document.location.href = `${document.location.protocol}//${targetDomain}${document.location.pathname}${document.location.search}`
}
