import type { Website } from '../types'
import { GM_addStyle } from '$'

const generalTagsTableUrl = 'https://cdn.jsdelivr.net/gh/LU-JIEJIE/UserScript@main/packages/anime-site-evolved/src/data/yande_tags_general.json'
const copyrightTagsTableUrl = 'https://cdn.jsdelivr.net/gh/LU-JIEJIE/UserScript@main/packages/anime-site-evolved/src/data/yande_tags_copyright.json'

const showImageSize = () => {
  GM_addStyle(`
  #post-list-posts li a.directlink span.directlink-info {
    display:none;
  }
  #post-list-posts li a.directlink span.directlink-res{
    display:inline;
  }
  `)
}

const bindClickToLoadRawImage = () => {
  const img = document.querySelector('#image')
  const loadRawImageButton = document.querySelector('#highres-show') as HTMLAnchorElement
  const downloadPngButton = document.querySelector('#png') as HTMLAnchorElement

  if (!img || !loadRawImageButton)
    return

  if (downloadPngButton)
    loadRawImageButton.setAttribute('href', downloadPngButton.getAttribute('href')!)

  img.addEventListener('click', () => {
    loadRawImageButton.click()
  })
}

const showImageHidden = () => {
  const hideImageButton = document.querySelector('#blacklisted-sidebar')
  hideImageButton?.remove()

  const hiddenImages = document.querySelectorAll('.javascript-hide')
  hiddenImages.forEach((hiddenImage) => {
    hiddenImage.classList.remove('javascript-hide')
  })
}

const addTagTypeHeader = () => {
  const tagDefault = document.querySelector('div.sidebar > div:nth-child(3) > h5')
  tagDefault?.remove()

  const tagTypes: Record<string, string> = {
    general: '一般',
    artist: '画师',
    copyright: '版权',
    character: '角色',
    circle: '社团',
    faults: '缺陷'
  }

  for (const tagType in tagTypes) {
    const firstTagByType = document.querySelector(`#tag-sidebar li.tag-type-${tagType}`)
    if (!firstTagByType)
      continue

    const tagTypeHeader = document.createElement('h5')
    tagTypeHeader.style.marginTop = '0.5em'
    tagTypeHeader.textContent = tagTypes[tagType]

    firstTagByType.before(tagTypeHeader)
  }
}

const translateTag = (tagLi: HTMLLIElement, tagsTable: Record<string, string>) => {
  const tagA = tagLi.children[1] as HTMLAnchorElement
  const tag = tagA.textContent!
  const tagFormatted = tag.replaceAll(' ', '_')
  if (tagsTable[tagFormatted] && tagsTable[tagFormatted] !== 'UNTRANSLATED')
    tagA.textContent = `[${tagsTable[tagFormatted]}] ${tag}`
}

const translateTags = async () => {
  const generalTagsTable = await (await fetch(generalTagsTableUrl)).json() as Record<string, string>
  const copyrightTagsTable = await (await fetch(copyrightTagsTableUrl)).json() as Record<string, string>
  const tagLis = document.querySelectorAll('#tag-sidebar li') as NodeListOf<HTMLLIElement>
  tagLis.forEach((tagLi) => {
    const tagType = tagLi.className.match(/tag-type-(\w+)/)?.[1]
    switch (tagType) {
      case 'general':
        translateTag(tagLi, generalTagsTable)
        break
      case 'copyright':
        translateTag(tagLi, copyrightTagsTable)
        break
    }
  })
}

const yande: Website = {
  regexp: /yande.re/,
  handler: async () => {
    showImageSize()
    bindClickToLoadRawImage()
    showImageHidden()
    addTagTypeHeader()
    translateTags()
  }
}

export default yande
