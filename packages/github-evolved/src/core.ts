import { get, observeNewElements } from './utils'

async function getIconClass(filename: string) {
  const iconJson = JSON.parse(await get('https://cdn.jsdelivr.net/npm/material-icon-theme/dist/material-icons.json'))
  const { fileNames, folderNames } = iconJson

  console.log(fileNames, folderNames)
}

function replaceIcon(filenameElement: HTMLElement, iconElement: HTMLElement) {
  // skip non-file elements
  if (iconElement.classList.contains('icon-directory'))
    return

  const filename = filenameElement.textContent?.trim() ?? ''
  const iconClass = getIconClass(filename)

  if (!iconClass)
    return

  const newIconElement = document.createElement('span')
  newIconElement.className = `icon octicon-file ${iconClass}`

  iconElement.replaceWith(newIconElement)
}

function handleIcons(containerSelector: string, filenameSelector: string, iconSelector: string) {
  observeNewElements(containerSelector, (element) => {
    const filenameElement = element.querySelectorAll<HTMLElement>(filenameSelector)
    const iconElement = element.querySelectorAll<HTMLElement>(iconSelector)
    // console.log(filenameElement, iconElement)
    // console.log('--------------------------------')
    for (let i = 0; i < filenameElement.length; i++) {
      replaceIcon(filenameElement[i], iconElement[i])
    }
  })
}

export async function main() {
  // const { iconSelector, filenameSelector } = getSelector()
  handleIcons('.react-directory-row', '.react-directory-truncate', 'svg')
}
