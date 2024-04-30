import { execSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const packageName = process.argv[2]
if (!packageName) {
  console.error('Please provide a package name')
  process.exit(1)
}

const packagePath = path.join(__dirname, '..', 'packages', packageName)
const commitMessage = `"chore(${packageName}): release v%s"`
const tagName = `"${packageName.toLocaleLowerCase()}-v%s"`

try {
  execSync(`npx bumpp --commit ${commitMessage} --tag ${tagName}`, {
    stdio: 'inherit',
    cwd: packagePath,
  })
}
catch (error) {
  console.error('Failed to release package')
}
