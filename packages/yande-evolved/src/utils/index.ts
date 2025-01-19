import fs from 'node:fs'

export function readJSON(path: string): Record<string, string> {
  const data = fs.readFileSync(path, 'utf-8')
  return JSON.parse(data)
}

export function writeJSON(path: string, data: Record<string, string>) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

export function generateTagsJsonUrl(name: string) {
  return `https://cdn.jsdelivr.net/gh/LU-JIEJIE/UserScript@main/packages/yande-evolved/src/data/${name}.json`
}
