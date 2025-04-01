import { main } from './core'
import { isDev } from './utils'

if (isDev()) {
  setTimeout(() => {
    main()
  }, 500)
}
else {
  document.addEventListener('DOMContentLoaded', () => {
    main()
  })
}
