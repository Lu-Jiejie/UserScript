import $ from 'jquery'
import { getValue, setValue } from '../utils/storage'
import { parseQueryParams } from '../utils/url'

function initImageWallDefaultButton(categoryId: string, type: string) {
  const $button = $('<span class="fr" style="margin-left:0.5em"><a href="#" style="color:rgb(255, 0, 255);font-weight:bold;">[默认进入图墙模式：❌️]</a></span>')
  $('#breadcrumbs span[class="fr gray3"]').before($button)

  const defaultArray = getValue('image_wall_default_array')
  if (defaultArray?.includes(`${categoryId}-${type}`))
    $button.find('a').text('[默认进入图墙模式：✔️]')

  $button.on('click', (e) => {
    e.preventDefault()
    if (e.target.textContent?.includes('❌️')) {
      setValue('image_wall_default_array', [...getValue('image_wall_default_array')!, `${categoryId}-${type}`])
      document.location.href = document.location.href.replace(/\/thread.php/, '/thread_new.php')
    }
    else {
      setValue('image_wall_default_array', getValue('image_wall_default_array')!.filter(item => item !== `${categoryId}-${type}`))
      document.location.href = document.location.href.replace(/\/thread_new.php/, '/thread.php')
    }
  })
}

function replaceCategoryUrl() {
  $('a[href*="thread.php"]').each((_, anchor) => {
    const queryParams = parseQueryParams($(anchor).attr('href')!)
    const categoryId = queryParams.fid
    const type = queryParams.type || (queryParams.search === 'digest' ? 'digest' : '0')
    if (getValue('image_wall_default_array')?.includes(`${categoryId}-${type}`))
      $(anchor).attr('href', $(anchor).attr('href')!.replace(/thread.php/, 'thread_new.php'))
  })
}

export default function imageWallDefault() {
  if (!getValue('image_wall_default'))
    return

  if (document.location.pathname === '/thread.php' || document.location.pathname === '/thread_new.php') {
    const queryParams = parseQueryParams(document.location.search)
    const categoryId = queryParams.fid
    const type = queryParams.type || (queryParams.search === 'digest' ? 'digest' : '0')
    if (getValue('image_wall_default_array')?.includes(`${categoryId}-${type}`) && document.location.pathname !== '/thread_new.php')
      document.location.href = document.location.href.replace(/\/thread.php/, '/thread_new.php')

    initImageWallDefaultButton(categoryId, type)
  }

  replaceCategoryUrl()
}
