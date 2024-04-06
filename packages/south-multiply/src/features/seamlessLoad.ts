import $ from 'jquery'
import { getDocument } from '../utils/request'
import { getForumInfo, getPostInfo, getSearchInfo } from '../utils/forum'
import { throttle } from '../utils/common'
import { getValue } from '../utils/storage'
import { hidePostImage, replaceSFWAvatar } from './safeForWork'
import { unsafeWindow } from '$'

interface DividerHandler {
  Loading: (divider: JQuery<HTMLElement>, nextPage: number) => void
  Loaded: (divider: JQuery<HTMLElement>, nextPage: number) => void
  Showed: (divider: JQuery<HTMLElement>, nextPage: number) => void
  Failed: (divider: JQuery<HTMLElement>, nextPage: number) => void
}

function isAtBottom() {
  return unsafeWindow.innerHeight + unsafeWindow.scrollY >= document.body.offsetHeight - 100
}

export function seamlessLoad(currentPage: number, pages: number, containerSelector: string, divider: string, dividerHandler: DividerHandler, docPreprocess?: (doc: Document) => void) {
  let nextPageUrl: string | undefined
  let nextPageDoc: Document | undefined
  let requestLock: boolean = false

  let $container = $(containerSelector).last()
  let $divider = $(divider)

  const _handleEvent = throttle(async () => {
    if (!nextPageDoc && !requestLock) {
      if (currentPage >= pages) {
        $(document).off('scroll wheel keydown', handleEvent)
        return
      }

      $container.after($divider)

      nextPageUrl = $('.pages b').parent().next().find('a').attr('href')
      if (!nextPageUrl)
        return

      dividerHandler.Loading($divider, currentPage + 1)
      try {
        requestLock = true
        nextPageDoc = await getDocument(`${document.location.origin}/${nextPageUrl}`)
        docPreprocess && docPreprocess(nextPageDoc)
        dividerHandler.Loaded($divider, currentPage + 1)
      }
      catch (error) {
        console.error(error)
        dividerHandler.Failed($divider, currentPage + 1)
        nextPageDoc = undefined
      }
      finally {
        requestLock = false
      }
    }

    // 到达页面底部
    if (isAtBottom() && !requestLock && nextPageDoc) {
      dividerHandler.Showed($divider, currentPage + 1)
      const $nextPageContainer = $(nextPageDoc).find(containerSelector)
      $divider.after($nextPageContainer)

      // 替换换页链接
      const $pages = $('.pages')
      const $nextPagePages = $(nextPageDoc).find('.pages')
      for (let i = 0; i < $nextPagePages.length; i++)
        $pages[i].replaceWith($nextPagePages[i])

      // 添加历史记录
      const url = `${document.location.origin}/${nextPageUrl}`
      history.pushState({ [url]: true }, '', url)

      // init
      $container = $(containerSelector).last()
      $divider = $(divider)
      nextPageDoc = undefined
      currentPage++
    }
  }, 500)

  function handleEvent(e: JQuery.TriggeredEvent) {
    if ((e.originalEvent instanceof WheelEvent && e.originalEvent.deltaY > 0)
      || (e.originalEvent instanceof KeyboardEvent && (e.originalEvent.key === 'ArrowDown' || e.originalEvent.key === 'PageDown'))
      || isAtBottom())
      _handleEvent()
  }

  $(document).on('scroll wheel keydown', handleEvent)
}

export async function seamlessLoadComment() {
  if (!getValue('seamless_load_comment'))
    return

  if (document.location.pathname !== '/read.php')
    return

  const { currentPage, pages } = getPostInfo()
  if (!currentPage || !pages)
    return

  const docPreprocess = (doc: Document) => {
    $(doc).find('img').each((_, img) => {
      replaceSFWAvatar(img)
      hidePostImage(img)
    })
  }

  seamlessLoad(currentPage, pages, 'form[name="delatc"]', '<div class="h2 seamless-load-divider">分割线</div>', {
    Loading: (divider, nextPage) => {
      divider.text(`正在加载第${nextPage}页`)
    },
    Loaded: (divider, nextPage) => {
      divider.text(`第${nextPage}页已加载，向下滚动以展示`)
    },
    Showed: (divider, nextPage) => {
      divider.text(`第${nextPage}页已展示`)
    },
    Failed: (divider, nextPage) => {
      divider.text(`第${nextPage}页加载失败`)
    }
  }, docPreprocess)
}

export function seamlessLoadPost() {
  if (!getValue('seamless_load_post'))
    return

  if (document.location.pathname !== '/thread.php')
    return

  const { currentPage, pages } = getForumInfo()
  if (!currentPage || !pages)
    return
  // <tr class="tr2 seamless-load-divider">分割线</tr>
  seamlessLoad(currentPage, pages, 'tbody[style="table-layout:fixed;"]', '<tbody><tr><td colspan="5" class="h seamless-load-divider">分割线</td></tr></tbody>', {
    Loading: (divider, nextPage) => {
      divider.find('td').text(`正在加载第${nextPage}页`)
    },
    Loaded: (divider, nextPage) => {
      divider.find('td').text(`第${nextPage}页已加载，向下滚动以展示`)
    },
    Showed: (divider, nextPage) => {
      divider.find('td').text(`第${nextPage}页已展示`)
    },
    Failed: (divider, nextPage) => {
      divider.find('td').text(`第${nextPage}页加载失败`)
    }
  })
}

export function seamlessLoadSearch() {
  if (!getValue('seamless_load_search'))
    return

  if (document.location.pathname !== '/search.php')
    return

  const { currentPage, pages } = getSearchInfo()
  if (!currentPage || !pages)
    return

  seamlessLoad(currentPage, pages, '#main .t table tbody', '<tbody><tr><td colspan="7" class="h seamless-load-divider">分割线</td></tr></tbody>', {
    Loading: (divider, nextPage) => {
      divider.find('td').text(`正在加载第${nextPage}页`)
    },
    Loaded: (divider, nextPage) => {
      divider.find('td').text(`第${nextPage}页已加载，向下滚动以展示`)
    },
    Showed: (divider, nextPage) => {
      divider.find('td').text(`第${nextPage}页已展示`)
    },
    Failed: (divider, nextPage) => {
      divider.find('td').text(`第${nextPage}页加载失败`)
    }
  })
}
