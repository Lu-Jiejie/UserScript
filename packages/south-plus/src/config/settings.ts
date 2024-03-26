import { GM_getValue as _GM_getValue, GM_setValue as _GM_setValue } from '$'

interface GMValueTypes {
  force_desktop: boolean
  domain_redirect: boolean
  target_domain: string
  netdisk_check: boolean
}

export function GM_setValue<K extends keyof GMValueTypes>(key: K, value: GMValueTypes[K]): void {
  _GM_setValue(key, value)
}

export function GM_getValue<K extends keyof GMValueTypes>(key: K, defaultVal?: GMValueTypes[K] | undefined): GMValueTypes[K] {
  return _GM_getValue(key, defaultVal)
}

export function initSettings() {
  GM_setValue('force_desktop', true)
  GM_setValue('domain_redirect', true)
  GM_setValue('target_domain', 'bbs.imoutolove.me')
  GM_setValue('netdisk_check', true)
}
