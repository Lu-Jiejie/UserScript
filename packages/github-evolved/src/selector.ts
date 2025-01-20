import { getIconClass } from 'atom-file-icons'

function isFileTree() {
  return !!document.querySelector('nav[aria-label="File Tree Navigation"]')
}

function getSelector() {
  if (isFileTree()) {
    return {
      iconSelector: '',
      filenameSelector: '',
    }
  }
  else {
    return {
      iconSelector: 'tr > td.react-directory-row-name-cell-large-screen > div > svg',
      filenameSelector: 'tr > td.react-directory-row-name-cell-large-screen > div > div > div > div > a',
    }
  }
}

function replaceIcon(iconElement: HTMLElement, filenameElement: HTMLElement) {
  // skip non-file elements
  if (!filenameElement.getAttribute('aria-label')?.includes('File'))
    return

  const filename = filenameElement.textContent?.trim() ?? ''
  const iconClass = getIconClass(filename)

  if (!iconClass)
    return

  console.log(filename, iconClass)

  const newIconElement = document.createElement('span')
  newIconElement.className = `icon octicon-file ${iconClass}`

  iconElement.replaceWith(newIconElement)
}

export function main() {
  const { iconSelector, filenameSelector } = getSelector()

  const iconElements = document.querySelectorAll<HTMLElement>(iconSelector)
  const filenameElements = document.querySelectorAll<HTMLElement>(filenameSelector)

  for (let i = 0; i < iconElements.length; i++) {
    replaceIcon(iconElements[i], filenameElements[i])
  }
}
