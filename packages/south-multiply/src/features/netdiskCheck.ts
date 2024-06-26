import $ from 'jquery'
import { get, post } from '../utils/request'
import { getValue } from '../utils/storage'

function baiduNetdiskCheck() {
  $<HTMLAnchorElement>('a[href^=\'https://pan.baidu.com/s/\']').each((_, anchor) => {
    const link = anchor.href
    anchor.textContent = `${link} ⏳`
    get(link).then((responseText) => {
      console.log(responseText)
      if (responseText.includes('过期时间') || responseText.includes('请输入提取码'))
        anchor.textContent = `${link} ✔️`
      else
        anchor.textContent = `${link} ❌️`
    })
  })
}

function quarkNetdiskCheck() {
  const checkUrl = 'https://drive.quark.cn/1/clouddrive/share/sharepage/token?pr=ucpro&fr=pc'
  $<HTMLAnchorElement>('a[href^=\'https://pan.quark.cn/s/\']').each((_, anchor) => {
    const link = anchor.href
    const shardId = link.match(/\/s\/([a-zA-Z0-9]+)(?=\?|$)/)?.[1]
    anchor.textContent = `${link} ⏳`
    post(checkUrl, JSON.stringify({ pwd_id: shardId, passcode: '' })).then((responseText) => {
      const responseParsed = JSON.parse(responseText)
      if (responseParsed.message === 'ok' || responseParsed.message === '需要提取码')
        anchor.textContent = `${link} ✔️`
      else
        anchor.textContent = `${link} ❌️`
    })
  })
}

export default function netdiskCheck() {
  if (document.location.pathname !== '/read.php' || !getValue('netdisk_check'))
    return
  baiduNetdiskCheck()
  quarkNetdiskCheck()
}
