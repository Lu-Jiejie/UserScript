export function parseQueryParams(search: string) {
  const htmlString = search.match(/^\?(.+)\.html$/)?.[1]
  const queryParams: Record<string, string> = {}
  if (htmlString) {
    const queryParamsPairs = htmlString.split('-')
    for (let i = 0; i < queryParamsPairs.length; i += 2)
      queryParams[queryParamsPairs[i]] = queryParamsPairs[i + 1]
  }
  else if (search) {
    const queryParamsPairs = search.slice(1).split('&')
    queryParamsPairs.forEach((pair) => {
      const [key, value] = pair.split('=')
      queryParams[key] = value
    })
  }

  return queryParams
}
