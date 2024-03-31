import $ from 'jquery'

export function getMyInfo() {
  const myUid = $('#menu_profile a[href^="u.php?action-show-uid-"]').attr('href')?.match(/uid-(\d+)/)?.[1]
  return {
    uid: myUid
  }
}
