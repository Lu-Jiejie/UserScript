const replyLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('dl#thread-body > dd > span.res > a'))
const replyMap = new Map<number, number[]>()
const TOP_NAV_HEIGHT = 35

export default function replyFromLinks() {
  for (const replyLink of replyLinks) {
    const replyTo = replyLink.href.match(/\/([^\/]+)\/?$/)?.[1]
    if (replyTo && Number.isInteger(Number(replyTo))) {
      const replyToNum = Number(replyTo)
      const replyFromNum = Number(replyLink.closest('dd')?.previousElementSibling!.id.split('_')[1])

      if (replyFromNum <= replyToNum)
        continue

      if (!replyMap.has(replyToNum))
        replyMap.set(replyToNum, [])

      replyMap.get(replyToNum)!.push(replyFromNum)
    }
  }

  const titleEls = Array.from(document.querySelectorAll<HTMLDListElement>('dl#thread-body > dt'))

  for (const titleEl of titleEls) {
    const titleNum = Number(titleEl.id.split('_')[1])
    const replys = replyMap.get(titleNum)

    if (replys) {
      const resEl = document.createElement('span')
      resEl.className = 'res'

      for (const reply of replys) {
        const replyFromLink = document.createElement('a')

        replyFromLink.setAttribute('navTo', `#comment_${reply}`)
        replyFromLink.textContent = `<<${reply}`
        replyFromLink.href = `#comment_${reply}`
        replyFromLink.style.marginRight = '0.5em'
        replyFromLink.onclick = (event) => {
          event.preventDefault()
          const replyFromEl = document.querySelector(replyFromLink.getAttribute('navTo')!)
          const top = replyFromEl!.getBoundingClientRect().top + window.scrollY
          location.hash = replyFromLink.getAttribute('navTo')!
          window.scrollTo({
            top: top - TOP_NAV_HEIGHT,
          })
        }

        resEl.appendChild(replyFromLink)
      }

      titleEl.appendChild(resEl)
    }
  }
}
