/* eslint-disable unused-imports/no-unused-vars */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readJSON, readXLSX, writeJSON } from '../utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tagsCharacterCnTable = readXLSX(path.join(__dirname, '../data/preTranslate/tags_character_cn.xlsx'))
const tagsGeneralCnTable = readXLSX(path.join(__dirname, '../data/preTranslate/tags_general_cn.xlsx'))
const tagsAnyCnTable = readJSON(path.join(__dirname, '../data/preTranslate/tags_any_cn.json'))

const targetTagsGeneralPath = path.join(__dirname, '../data/yande_tags_general.json')
const targetTagsGeneralJSON = readJSON(targetTagsGeneralPath)

for (const tag in targetTagsGeneralJSON) {
  let tagCn = targetTagsGeneralJSON[tag]
  if (tagCn !== 'UNTRANSLATED')
    continue

  tagCn = tagsGeneralCnTable.find(row => row.tag === tag)?.right_tag_cn || tagsAnyCnTable[tag]
  if (tagCn)
    targetTagsGeneralJSON[tag] = tagCn
}

writeJSON(targetTagsGeneralPath, targetTagsGeneralJSON)
