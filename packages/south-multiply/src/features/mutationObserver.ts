import $ from 'jquery'
import { hidePostImage, replaceSFWAvatar } from './safeForWork'

export default function mutationObserver() {
  if (import.meta.env.VITE_SCRIPT_ENV === 'development') {
    $('img').each((_, img) => {
      replaceSFWAvatar(img)
      hidePostImage(img)
    })
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      Array.from(mutation.addedNodes)
        .filter(node => node instanceof HTMLElement)
        .forEach((node) => {
          if ((node as HTMLElement).tagName === 'IMG') {
            replaceSFWAvatar(node as HTMLElement)
            hidePostImage(node as HTMLElement)
          }
        })
    })
  })
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
}
