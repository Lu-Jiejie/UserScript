import { createElementFromHTML, formatLog, getLocalStorage, insertAfter, insertBefore, randomInt, setLocalStorage } from './utils'
import { CONTROL_NEXT_BUTTON, CONTROL_PREV_BUTTON, NOT_LIST_TYPE_VIDEO } from './constant'

const SET_TIMEOUT_TIME = 500
let isRandom = false
let totalPage = 0
let curRandomIndex = 0
let randomList: number[] = []
let videoList: HTMLAnchorElement[] = []
let prevButton: HTMLElement
let nextButton: HTMLElement
let lock = false

function init() {
  ({ totalPage } = getPageInfo())

  if (totalPage === 0) {
    formatLog(NOT_LIST_TYPE_VIDEO)
    return
  }
  createControlButton()
  resetControlButton()

  initVideoList()
  bindVideoListEvent()
}

function getPageInfo() {
  const pageInfoSpan = document.querySelector('span.cur-page')
  if (!pageInfoSpan)
    return { curPage: 0, totalPage: 0 }
  const [curPage, totalPage] = pageInfoSpan.innerHTML.replace(/\(|\)/, '').split('/').map(item => Number.parseInt(item))
  return { curPage, totalPage }
}

function initVideoList() {
  setTimeout(() => {
    videoList = Array.from(document.querySelectorAll('ul.list-box > li > a > div.clickitem'))
    if (videoList.length === 0) {
      initVideoList()
    }
    else {
      // create random button
      // 插入按钮会导致页面重绘，需要在获取到资源并渲染完成页面后在执行
      createRandomButton()
    }
  }, SET_TIMEOUT_TIME)
}

function createControlButton() {
  prevButton = createElementFromHTML(CONTROL_PREV_BUTTON)
  nextButton = createElementFromHTML(CONTROL_NEXT_BUTTON)

  prevButton.addEventListener('click', () => {
    if (isRandom)
      playNext(-1)

    else videoList[videoList.length - 1].click()
  })

  nextButton.addEventListener('click', () => {
    if (isRandom)
      playNext()

    else videoList[0].click()
  })
}

function prevButtonEvent(e: Event) {
  if (isRandom) {
    playNext(-1)
    e.stopPropagation()
    e.preventDefault()
  }
}
function nextButtonEvent(e: Event) {
  if (isRandom) {
    playNext()
    e.stopPropagation()
    e.preventDefault()
  }
}
function resetControlButton() {
  changeControlButtonState('prev', 'remove')
  changeControlButtonState('next', 'remove')
  setTimeout(() => {
    const nextButton = document.querySelector('div.bpx-player-ctrl-next')
    const prevButton = document.querySelector('div.bpx-player-ctrl-prev')
    if (nextButton && prevButton) {
      prevButton.removeEventListener('click', prevButtonEvent)
      nextButton.removeEventListener('click', nextButtonEvent)
      prevButton.addEventListener('click', prevButtonEvent)
      nextButton.addEventListener('click', nextButtonEvent)
    }
    else if (nextButton) {
      changeControlButtonState('prev', 'insert')
    }
    else if (prevButton) {
      changeControlButtonState('next', 'insert')
    }
    else {
      resetControlButton()
    }
  }, SET_TIMEOUT_TIME)
}

function handleRandomState(state: 'on' | 'off') {
  if (state === 'on') {
    isRandom = true
    changeRandomButtonState(true)
    setLocalStorage('isRandom', 'true')
    closeAutoPlay()
    initRandomList()
    bindVideoEvent()
  }
  else if (state === 'off') {
    isRandom = false
    changeRandomButtonState(false)
    setLocalStorage('isRandom', '')
  }
}

function closeAutoPlay() {
  lock = true
  const autoPlayButton = document.querySelector('#multi_page > div.head-con > div.head-right > span:nth-child(2) > span.switch-button') as HTMLSpanElement
  if (autoPlayButton?.classList.contains('on'))
    autoPlayButton.click()

  lock = false
}

function playNext(distance: number = 1) {
  curRandomIndex = (curRandomIndex + distance + totalPage) % randomList.length
  const nextPage = randomList[curRandomIndex]
  videoList[nextPage - 1].click()
}

function bindVideoEvent() {
  setTimeout(() => {
    const video = document.querySelector('div.bpx-player-video-wrap > video')
    if (video) {
      video.addEventListener('ended', (event) => {
        event.stopImmediatePropagation()
        playNext()
      })
    }
    else {
      bindVideoEvent()
    }
  }, SET_TIMEOUT_TIME)
}

function bindVideoListEvent() {
  setTimeout(() => {
    const videoList = document.querySelector('ul.list-box')
    videoList?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName !== 'UL') {
        resetControlButton()
        const curPage = +/p=(\d+)/.exec(document.location.href)![1]
        curRandomIndex = randomList.findIndex(item => item === curPage)
      }
    })
  }, SET_TIMEOUT_TIME)
}

function changeControlButtonState(buttonType: 'prev' | 'next', buttonState: 'insert' | 'remove') {
  const playButton = document.querySelector('div.bpx-player-ctrl-play') as HTMLElement
  if (buttonType === 'prev') {
    if (buttonState === 'insert')
      insertBefore(prevButton, playButton)
    else
      prevButton.remove()
  }
  else if (buttonType === 'next') {
    if (buttonState === 'insert')
      insertAfter(nextButton, playButton)
    else
      nextButton.remove()
  }
}

function createRandomButton() {
  const path = document.querySelector('#multi_page > div.head-con > div.head-right')!
  path.insertAdjacentHTML('afterbegin', `
  <span class="next-button" id="random-button">
    <span class="txt">随机</span>
    <span class="switch-button"></span>
  </span>
  `)
  // bind random event
  document.querySelector('span#random-button')!.addEventListener('click', () => {
    if (isRandom)
      handleRandomState('off')
    else
      handleRandomState('on')
  })

  isRandom = Boolean(getLocalStorage('isRandom')) || false
  if (isRandom)
    handleRandomState('on')
  else
    handleRandomState('off')

  // bind auto play next event
  const autoPlayButton = document.querySelector('#multi_page > div.head-con > div.head-right > span:nth-child(2)')
  autoPlayButton!.addEventListener('click', () => {
    if (autoPlayButton?.children[1].classList.contains('on') && isRandom && !lock)
      handleRandomState('off')
  })
}

function changeRandomButtonState(on: boolean) {
  const randomButton = document.querySelector('span#random-button .switch-button')!
  if (on)
    randomButton.classList.add('on')
  else
    randomButton.classList.remove('on')
}

function initRandomList() {
  randomList = Array.from({ length: totalPage }).fill(0).map((_, index) => index + 1)
  // shuffle
  for (let i = randomList.length - 1; i >= 0; i--) {
    const randomIndex = randomInt(0, i)
      ;[randomList[i], randomList[randomIndex]] = [randomList[randomIndex], randomList[i]]
  }
  const { curPage } = getPageInfo()
  randomList.splice(randomList.indexOf(curPage), 1)
  randomList.unshift(curPage)
  curRandomIndex = 0
}

init()
