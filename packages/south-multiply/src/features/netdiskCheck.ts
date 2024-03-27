import { getValue } from '../config/settings'
import { get, post } from '../utils/request'

function baiduNetdiskCheck() {
  const baiduNetdiskAnchors = document.querySelectorAll<HTMLAnchorElement>(`a[href^='https://pan.baidu.com/s/']`)
  baiduNetdiskAnchors.forEach((anchor) => {
    const link = anchor.href
    anchor.textContent = `${link} ⏳`
    get(link).then((responseText) => {
      console.log(responseText.includes('不存在'))
      console.log(responseText.includes('已失效'))
      if (responseText.includes('过期时间：') || responseText.includes('请输入提取码：'))
        anchor.textContent = `${link} ✔️`
      else
        anchor.textContent = `${link} ❌️`
    })
  })
}

function quarkNetdiskCheck() {
  const checkUrl = 'https://drive.quark.cn/1/clouddrive/share/sharepage/token?pr=ucpro&fr=pc'
  const quarkNetdiskAnchors = document.querySelectorAll<HTMLAnchorElement>(`a[href^='https://pan.quark.cn/s/']`)
  quarkNetdiskAnchors.forEach((anchor) => {
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
