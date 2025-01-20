import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        'name': 'Github 体验增强',
        'description': 'Github 体验增强。',
        'version': '0.0.0',
        'icon': 'https://github.com/favicon.ico',
        'namespace': 'https://github.com/LU-JIEJIE/UserScript/tree/main/packages/github-evolved',
        'match': ['https://github.com/*'],
        'author': 'lu-jiejie',
        'homepage': 'https://github.com/LU-JIEJIE/UserScript/tree/main/packages/github-evolved',
        'license': 'MIT',
        'run-at': 'document-start',
      },
    }),
  ],
})
