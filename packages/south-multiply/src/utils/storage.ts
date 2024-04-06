import { GM_deleteValue, GM_getValue, GM_listValues, GM_setValue } from '$'

export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

export const defaultStorage = {
  category_general_expanded: false,
  netdisk_check: false,
  auto_complete_tasks: false,
  daily_tasks_last_time: 0,
  weekly_tasks_last_time: 0,
  image_wall_default: false,
  image_wall_default_array: [] as string[],

  category_seamless_expanded: false,
  seamless_load_comment: false,
  seamless_load_post: false,
  seamless_load_search: false,

  category_sfw_expanded: false,
  replace_sfw_avatar: false,
  hide_post_image: false,

  category_redirect_expanded: false,
  force_desktop: false,
  domain_redirect: false,
  target_domain: '',

  category_about_expanded: false
}

export type StorageKeys = typeof defaultStorage
export type BooleanKeys = KeysOfType<StorageKeys, boolean>
export type StringKeys = KeysOfType<StorageKeys, string>
export type NumberKeys = KeysOfType<StorageKeys, number>
export type ArrayKeys = KeysOfType<StorageKeys, string[]>

export function setValue<K extends keyof StorageKeys>(key: K, value: StorageKeys[K]): void {
  GM_setValue(key, value)
}

export function getValue<K extends keyof StorageKeys>(key: K, defaultValue?: StorageKeys[K]): StorageKeys[K] | undefined {
  return GM_getValue(key, defaultValue)
}

export function deleteAllValues() {
  GM_listValues().forEach(key => GM_deleteValue(key))
}

export function getAllValues() {
  const values: Partial<Record<keyof StorageKeys, StorageKeys[keyof StorageKeys]>> = {}
  for (const key in defaultStorage)
    values[key as keyof StorageKeys] = getValue(key as keyof StorageKeys)
  return values as StorageKeys
}

export function setAllValues(values: Partial<Record<keyof StorageKeys, StorageKeys[keyof StorageKeys]>>) {
  for (const key in values)
    setValue(key as keyof StorageKeys, values[key as keyof StorageKeys]!)
}

export function initSettings() {
  for (const key in defaultStorage) {
    if (getValue(key as keyof StorageKeys) === undefined)
      setValue(key as keyof StorageKeys, defaultStorage[key as keyof StorageKeys])
  }
}
