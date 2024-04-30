import { execSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const packagesPath = path.join(__dirname, '../packages')

// 获取packages下的所有文件夹路径
const packages = fs.readdirSync(packagesPath).map(dir => path.join(packagesPath, dir))

packages.forEach((pkg) => {
  console.log(`Building ${pkg}...`)
  execSync(`npm run build`, { stdio: 'inherit', cwd: pkg })
  execSync(`cp -r ${pkg.replace(/\\/g, '/')}/dist/. dist/`, { stdio: 'inherit' })
  // execSync(`copy  ${pkg}\\dist\\* dist\\ /E /I /Y`, { stdio: 'inherit' })
})
