import $ from 'jquery'
import { parseQueryParams } from './url'

export function getMyInfo() {
  const myUid = $('#menu_profile a[href^="u.php?action-show-uid-"]').attr('href')?.match(/uid-(\d+)/)?.[1]
  return {
    uid: myUid,
  }
}

export function getPostInfo() {
  const bodyText = document.body.textContent!
  const categoryId = bodyText.match(/fid = '(\d+)'/)?.[1]
  const postId = bodyText.match(/tid = '(\d+)'/)?.[1]
  const pagesResult = bodyText.match(/Pages: (\d+)\/(\d+)/)
  const currentPage = pagesResult?.[1] !== undefined ? Number(pagesResult[1]) : undefined
  const pages = pagesResult?.[2] !== undefined ? Number(pagesResult[2]) : undefined
  return {
    categoryId,
    postId,
    currentPage,
    pages,
  }
}

export function getForumInfo() {
  const bodyText = document.body.textContent!
  const queryParams = parseQueryParams(document.location.search)
  const pagesResult = bodyText.match(/Pages: (\d+)\/(\d+)/)
  const currentPage = pagesResult?.[1] !== undefined ? Number(pagesResult[1]) : undefined
  const pages = pagesResult?.[2] !== undefined ? Number(pagesResult[2]) : undefined
  return {
    categoryId: queryParams.fid,
    type: queryParams.type,
    currentPage,
    pages,
  }
}

export function getSearchInfo() {
  const bodyText = document.body.textContent!
  const queryParams = parseQueryParams(document.location.search)
  const pagesResult = bodyText.match(/Pages: (\d+)\/(\d+)/)
  const currentPage = pagesResult?.[1] !== undefined ? Number(pagesResult[1]) : undefined
  const pages = pagesResult?.[2] !== undefined ? Number(pagesResult[2]) : undefined
  return {
    keyword: queryParams.keyword,
    currentPage,
    pages,
  }
}
