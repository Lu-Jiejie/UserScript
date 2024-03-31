import $ from 'jquery'
import { get } from '../utils/request'
import { getValue, setValue } from '../utils/storage'

export const DAILY_TASK_ACCEPT = 'https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job&cid=15&nowtime=1711814495907&verify=22a6d4b9'
export const DAILY_TASK_COMPLETE = 'https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job2&cid=15&nowtime=1711814495907&verify=22a6d4b9'
export const WEEKLY_TASK_ACCEPT = 'https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job&cid=14&nowtime=1711814495907&verify=22a6d4b9'
export const WEEKLY_TASK_COMPLETE = 'https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job2&cid=14&nowtime=1711814495907&verify=22a6d4b9'

// <?xml version="1.0" encoding="utf-8"?><ajax><![CDATA[您还没有登录或注册，暂时不能使用此功能!!]]></ajax>
// <?xml version="1.0" encoding="utf-8"?><ajax><![CDATA[confirm	拒离上次申请[日常]还没超过 18 小时]]></ajax>
// <?xml version="1.0" encoding="utf-8"?><ajax><![CDATA[confirm	拒离上次申请[周常]还没超过 158 小时]]></ajax>
// <?xml version="1.0" encoding="utf-8"?><ajax><![CDATA[confirm	未申请任务!	14]]></ajax>

async function getTaskLastTime() {
  const domain = getValue('domain_redirect') && getValue('target_domain') ? getValue('target_domain') : document.location.hostname
  const res = await get(`https://${domain}/plugin.php?H_name-tasks-actions-endtasks.html`)
  if (res.includes('您没有登录或者您没有权限访问此页面'))
    return false

  $(res).find('table table td[valign="top"]').each((_, el) => {
    const text = $(el).text()
    const match = text.match(/(\d{4}-\d{2}-\d{2}) (AM|PM):(\d{2}:\d{2}:\d{2})/)
    if (match) {
      const timestamp = new Date(`${match[1]} ${match[3]}`).getTime()
      if (text.includes('日常'))
        setValue('daily_tasks_last_time', timestamp)
      else if (text.includes('周常'))
        setValue('weekly_tasks_last_time', timestamp)
    }
  })
  return true
}

export default async function autoCompleteTasks() {
  if (!getValue('auto_complete_tasks'))
    return

  if (getValue('daily_tasks_last_time') === 0 || getValue('weekly_tasks_last_time') === 0)
    getTaskLastTime()

  if (getValue('daily_tasks_last_time')! + 1000 * 60 * 60 * 18 > Date.now() && getValue('weekly_tasks_last_time')! + 1000 * 60 * 60 * 158 > Date.now())
    return

  await get(DAILY_TASK_ACCEPT)
  await get(DAILY_TASK_COMPLETE)
  await get(WEEKLY_TASK_ACCEPT)
  await get(WEEKLY_TASK_COMPLETE)
}
