import fs from 'node:fs'
import xlsx from 'xlsx'

export function readXLSX(path: string): Record<string, any>[] {
  const workbook = xlsx.readFile(path)
  const sheetNames = workbook.SheetNames
  const sheet = workbook.Sheets[sheetNames[0]]
  const data = xlsx.utils.sheet_to_json(sheet)

  return data as Record<string, any>[]
}

export function readJSON(path: string): Record<string, string> {
  const data = fs.readFileSync(path, 'utf-8')
  return JSON.parse(data)
}

export function writeJSON(path: string, data: Record<string, string>) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
