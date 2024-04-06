import { parseQueryParams } from '../utils/url'
import { getMyInfo } from '../utils/forum'
import { initSettingsPanel } from './settingsPanel'

export function initUI() {
  const { uid: myUid } = getMyInfo()
  const queryParams = parseQueryParams(document.location.search)
  if (document.location.pathname === '/u.php' && (!document.location.search || (!queryParams.action && queryParams.uid === myUid)))
    initSettingsPanel()
}
