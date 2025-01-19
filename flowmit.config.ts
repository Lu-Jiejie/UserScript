import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'flowmit'

export default defineConfig({
  // 使用join来构建绝对路径
  scopes: readdirSync(join(fileURLToPath(new URL('.', import.meta.url)), 'packages')),
})
