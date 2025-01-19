import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'したらば论坛体验优化',
        description: 'したらば论坛增强脚本。',
        version: '0.0.1',
        author: 'lu-jiejie',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://jbbs.shitaraba.net/bbs/read.cgi/*'],
      },
    }),
  ],
})
