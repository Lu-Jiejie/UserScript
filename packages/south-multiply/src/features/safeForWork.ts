import $ from 'jquery'
import { getValue } from '../utils/storage'

export function replaceSFWAvatar(img: HTMLElement) {
  if (!getValue('replace_sfw_avatar'))
    return

  if (document.location.pathname !== '/read.php')
    return

  if (!img.closest('.user-pic'))
    return

  const uid = $(img).parent().attr('href')!.match(/action-show-uid-(\d+).html/)![1]
  // 2773是dicebear icons图标的seed最大值
  const formatUid = (+uid % 2774).toString()
  const sfwAvatarUrl = `https://api.dicebear.com/8.x/icons/svg?seed=${formatUid}`

  // const sfwAvatarUrl = 'images/face/none.gif'
  const sourceAvatarUrl = $(img).attr('src')!
  const width = $(img).attr('width') || 150
  const height = $(img).attr('height') || 150

  const $avatarContainer = $('<div>', { class: 'avatar-container' })
  const $sfwAvatar = $('<img>', { src: sfwAvatarUrl, class: 'sfw-avatar', style: `width: ${width}px; height: ${height}px;` })
  const $sourceAvatar = $('<img>', { src: sourceAvatarUrl, class: 'source-avatar', style: `width: ${width}px; height: ${height}px;` })
  $avatarContainer.append($sourceAvatar, $sfwAvatar)
  $(img).replaceWith($avatarContainer)
}

export function hidePostImage(img: HTMLElement) {
  if (!getValue('hide_post_image'))
    return

  if (document.location.pathname !== '/read.php')
    return

  if (!img.closest('.tpc_content'))
    return
  if ($(img).parent().hasClass('image-placeholder'))
    return
  if ($(img).attr('src')?.includes('images/post/smile/'))
    return

  $(img).attr('data-src', $(img).attr('src')!)
  $(img).attr('src', '')

  const $placeholder = $(`
      <div class="image-placeholder">
        <div class="hide-text">🙈</div>
        <div class="show-text">🙉</div>
      </div>
    `)

  $(img).replaceWith($placeholder)
  $placeholder.append(img)

  $placeholder.on('click', () => {
    $placeholder.toggleClass('show-image')
    $placeholder.css('border', 'solid')
    if ($(img).attr('src') === '')
      $(img).attr('src', $(img).attr('data-src')!)
  })
}

export function initSafeForWork() {
  $('img').each((_, img) => {
    replaceSFWAvatar(img)
    hidePostImage(img)
  })
}
