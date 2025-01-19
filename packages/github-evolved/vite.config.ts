import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: '二次元图片网站增强',
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
