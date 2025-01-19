import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: '解除复制限制',
        author: 'lu-jiejie',
        description: '解除部分网站的复制限制及小尾巴，如百度文库、CSDN、哔哩哔哩专栏等。',
        version: '1.2.0',
        namespace: 'https://github.com/LU-JIEJIE/copyable',
        homepage: 'https://github.com/LU-JIEJIE/copyable',
        license: 'MIT',
        match: [
          // bilibili专栏
          '*://www.bilibili.com/read/*',
          // csdn
          '*://blog.csdn.net/*',
          '*://wenku.csdn.net/*',
          // 考试酷
          '*://www.examcoo.com/editor/do/*',
          // 百度文库
          '*://wenku.baidu.com/view/*',
          // 飞书云文档
          '*://*.feishu.cn/*',
          // 腾讯文档
          '*://docs.qq.com/doc/*',
          // 道客巴巴
          '*://*.doc88.com/*',
        ],
        grant: ['unsafeWindow'],
      },
    }),
  ],
})
