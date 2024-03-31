import { defineConfig } from 'vite'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://bbs.imoutolove.me/favicon.ico',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          '*://*.imoutolove.me/*',
          '*://imoutolove.me/*',
          // 东+
          '*://*.east-plus.net/*',
          '*://east-plus.net/*',
          // 南+
          '*://*.south-plus.net/*',
          '*://south-plus.net/*',
          '*://*.south-plus.org/*',
          '*://south-plus.org/*',
          // 北+
          '*://*.north-plus.net/*',
          '*://north-plus.net/*',
          // 魂+
          '*://*.soul-plus.net/*',
          '*://soul-plus.net/*',
          // 白+
          '*://*.white-plus.net/*',
          '*://white-plus.net/*',
          // Lv+
          '*://*.level-plus.net/*',
          '*://level-plus.net/*',
          // 春+
          '*://*.spring-plus.net/*',
          '*://spring-plus.net/*',
          // 夏+
          '*://*.summer-plus.net/*',
          '*://summer-plus.net/*',
          // 雪+
          '*://*.snow-plus.net/*',
          '*://snow-plus.net/*',
          // 蓝+
          '*://*.blue-plus.net/*',
          '*://blue-plus.net/*'
        ]
      },
      build: {
        externalGlobals: { jquery: cdn.jsdelivr('jQuery') }
      }
    })
  ]
})
