const targetHostName = 'bbs.imoutolove.me'

const currentHostName = document.location.hostname

if (currentHostName !== targetHostName)
  document.location.hostname = targetHostName
