import { readdirSync, stat, statSync } from 'node:fs'
import { defineConfig } from 'flowmit'

// 在scopes里填入packages文件夹下的所有包名，ts自动生成

export default defineConfig({
  scopes: readdirSync('packages'),
})
