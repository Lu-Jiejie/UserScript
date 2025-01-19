import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'cheerio'
import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'
import { writeJSON } from '../utils'

enum TagType {
  general = 0,
  artist = 1,
  copyright = 3,
  character = 4,
  circle = 5,
  faults = 6,
}

const url = 'https://yande.re/tag?order=count'
const proxy = 'http://127.0.0.1:7890'
const placeholder = 'UNTRANSLATED'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tagType: keyof typeof TagType = 'faults'
const jsonFile = `../data/yande_tags_${tagType}.json`
const maxPage = 1

const json: Record<string, string> = {}

async function fetchTags() {
  for (let i = 1; i <= maxPage; i++) {
    console.log(`${url}&type=${TagType[tagType]}&page=${i}`)
    const res = await fetch(`${url}&type=${TagType[tagType]}&page=${i}`, { agent: new HttpsProxyAgent(proxy) })
    const body = await res.text()
    const $ = load(body)

    $('tbody tr td:nth-child(2) a:nth-child(2)').each((_, a) => {
      const tag = $(a).text()
      json[tag] = placeholder
    })
  }

  writeJSON(path.join(__dirname, jsonFile), json)
}

fetchTags()
