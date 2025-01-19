import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'yande图站体验优化',
        version: '1.0.0',
        description: 'yande网站使用体验优化，如汉化图片标签等。',
        icon: 'https://yande.re/favicon.ico',
        namespace: 'https://github.com/LU-JIEJIE/UserScript/tree/main/packages/anime-site-evolved',
        match: ['*://yande.re/*'],
        author: 'lu-jiejie',
        homepage: 'https://github.com/LU-JIEJIE/UserScript/tree/main/packages/anime-site-evolved',
        license: 'MIT',
      },
    }),
  ],
})
