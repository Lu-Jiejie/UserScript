const WARNING_HREF_PREFIX = '/bbs/alink.cgi?url='

export default function hrefWithoutWarning() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if ((target as HTMLElement).tagName === 'A'
      && target.getAttribute('href')?.startsWith(WARNING_HREF_PREFIX)
    ) {
      event.preventDefault()
      const href = target.getAttribute('href')
      const realHref = href!.slice(WARNING_HREF_PREFIX.length)
      window.open(decodeURIComponent(realHref), '_blank')
    }
  })
}
