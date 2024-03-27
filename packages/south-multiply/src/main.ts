import { initSettings } from './config/settings'
import domainRedirect from './features/domainRedirect'
import forceDesktop from './features/forceDesktop'
import netdiskCheck from './features/netdiskCheck'

initSettings()

forceDesktop()
domainRedirect()
netdiskCheck()
