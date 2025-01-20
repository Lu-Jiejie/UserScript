import { GM_addStyle } from '$'
import devopiconsFont from 'atom-file-icons/dist/fonts/devopicons.woff2?url'
import fileIconsFont from 'atom-file-icons/dist/fonts/file-icons.woff2?url'
import fontawesomeFont from 'atom-file-icons/dist/fonts/fontawesome.woff2?url'
import mfixxFont from 'atom-file-icons/dist/fonts/mfixx.woff2?url'
import octiconsFont from 'atom-file-icons/dist/fonts/octicons.woff2?url'
import fileIconsCss from 'atom-file-icons/dist/index.css?raw'

export function injectIconCss() {
  GM_addStyle(fileIconsCss)
  GM_addStyle(`
  @font-face {
    font-family: 'Devicons';
    src: url(${devopiconsFont}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'File-Icons';
    src: url(${fileIconsFont}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'FontAwesome';
    src: url(${fontawesomeFont}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'mfixx';
    src: url(${mfixxFont}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Octicons Regular';
    src: url(${octiconsFont}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`)
}
