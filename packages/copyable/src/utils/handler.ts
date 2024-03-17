export function stopCopyPropagation() {
  document.addEventListener('copy', (e) => {
    if (import.meta.env.VITE_SCRIPT_ENV === 'development')
      console.log('------copy------')

    e.stopPropagation()
  }, true)
}

export function stopSelectStartPropagation() {
  document.addEventListener('selectstart', (e) => {
    if (import.meta.env.VITE_SCRIPT_ENV === 'development')
      console.log('------selectStart------')

    e.stopPropagation()
  }, true)
}

export function enableCssUserSelect() {
  const css = '* {user-select: auto !important; -webkit-user-select: auto !important; cursor: auto !important;}'
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
}
