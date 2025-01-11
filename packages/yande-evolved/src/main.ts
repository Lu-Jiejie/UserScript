import websites from './websites'

websites.some((website) => {
  if (website.regexp.test(window.location.href)) {
    website.handler()
    return true
  }
  return false
})
