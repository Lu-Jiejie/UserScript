import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'b站分P视频随机播放',
        icon: 'https://www.bilibili.com/favicon.ico',
        namespace: 'https://github.com/LU-JIEJIE/bilibili-random-play',
        match: ['https://www.bilibili.com/video/*'],
        author: 'lu-jiejie',
        homepage: 'https://github.com/LU-JIEJIE/bilibili-random-play',
        license: 'MIT'
      }
    })
  ]
})
