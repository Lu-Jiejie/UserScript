import { GM_getValue, GM_setValue } from '$'

interface GMValueTypes {
  force_desktop: boolean
  domain_redirect: boolean
  target_domain: string
  netdisk_check: boolean
}

export function setValue<K extends keyof GMValueTypes>(key: K, value: GMValueTypes[K] | undefined): void {
  GM_setValue(key, value)
}

export function getValue<K extends keyof GMValueTypes>(key: K, defaultVal?: GMValueTypes[K] | undefined): GMValueTypes[K] | undefined {
  return GM_getValue(key, defaultVal)
}

export function initSettings() {
  setValue('force_desktop', true)
  setValue('domain_redirect', true)
  setValue('target_domain', 'bbs.imoutolove.me')
  setValue('netdisk_check', true)
}
