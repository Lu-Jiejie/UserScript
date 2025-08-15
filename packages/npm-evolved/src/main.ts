// ==UserScript==
// @name         npm-evolved 收藏夹
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为 npm 网站添加收藏夹功能
// @author       LU-JIEJIE
// @match        https://www.npmjs.com/package/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

import { GM_getValue, GM_setValue } from '$'

// 收藏夹 key
const FAV_KEY = 'npm_favorites'
const STAR_OUTLINE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="#FFD600" d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7zM8.85 8.125L4 9.725L7.1 14.2L7 18.975l5-1.375l5 1.4l-.1-4.8L20 9.775l-4.85-1.65L12 4zM12 11.5"/></svg>'
const STAR_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="#FFD600" d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"/></svg>'
const BTN_CSS = `
  margin-left:8px;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

// 获取当前 package 名称
function getPackageName() {
  const match = location.pathname.match(/\/package\/([^/]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// 获取收藏夹列表
function getFavorites(): Record<string, boolean> {
  return GM_getValue(FAV_KEY, {})
}

// 设置收藏夹列表
function setFavorites(favs: Record<string, boolean>) {
  GM_setValue(FAV_KEY, favs)
}

// 判断是否已收藏
function isFavorited(pkg: string): boolean {
  const favs = getFavorites()
  return !!favs[pkg]
}

// 切换收藏状态
function toggleFavorite(pkg: string) {
  const favs = getFavorites()
  if (favs[pkg]) {
    delete favs[pkg]
  }
  else {
    favs[pkg] = true
  }
  setFavorites(favs)
}

// 创建收藏按钮
function createFavoriteBtn(pkg: string) {
  const btn = document.createElement('button')
  btn.style.cssText = BTN_CSS
  console.log(btn)
  function updateIcon() {
    btn.innerHTML = isFavorited(pkg) ? STAR_ICON : STAR_OUTLINE_ICON
    btn.title = isFavorited(pkg) ? 'Unfavorite' : 'Favorite'
  }
  btn.addEventListener('click', () => {
    toggleFavorite(pkg)
    updateIcon()
  })
  updateIcon()
  return btn
}

// 主入口
function main() {
  // 判断是否为包详情页
  const pkg = getPackageName()
  if (pkg) {
    // 包详情页
    const span = document.querySelector('main > #top > div > h2 > span')
    if (span) {
      const btn = createFavoriteBtn(pkg)
      span.parentNode?.insertBefore(btn, span.nextSibling)
    }
    return
  }

  // 判断是否为搜索列表页
  if (location.pathname.startsWith('/search')) {
    // 搜索结果包名选择器，npm 目前为 a[data-testid="package-name"]
    const packageLinks = document.querySelectorAll('#main > div > div > div > section > div > div > a')
    packageLinks.forEach((link) => {
      // 获取包名
      const pkgName = link.textContent?.trim()
      if (!pkgName)
        return
      // 防止重复插入
      if (link.nextSibling && (link.nextSibling as HTMLElement).tagName === 'BUTTON')
        return
      const btn = createFavoriteBtn(pkgName)
      link.parentNode?.insertBefore(btn, link.nextSibling)
    })
  }
}

if (import.meta.env.DEV) {
  setTimeout(() => {
    main()
  }, 1)
}
else {
  window.addEventListener('DOMContentLoaded', main)
}
