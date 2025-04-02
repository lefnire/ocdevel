import fs from 'fs'
import path from 'path'
import xmlJs from 'xml-js'
import reduce from 'lodash/reduce'
import crypto from 'crypto'
import type {Filters, Resource, ResourcesTree} from './mlg-resources.types'
import last from 'lodash/last'
import find from 'lodash/find'

export function transform(code: string, id: string) {
  const fileContent = fs.readFileSync(id, 'utf8');
  const res = xmlJs.xml2js(fileContent, {compact: true});
  return parseWorkflowy(res)
}

// aecd0d0c reLink
// https://giuliachiola.dev/posts/how-to-remove-all-links-in-javascript/
const reStripHtml= /<[^>]+>/g
const reTags = /\#\S+/g
const defaults: Filters = {
  importance: "supplementary",
  format: "other",
  difficulty: "easy",
  engagement: "passive",
  topic: "basics",
  relevance: "fresh",
}

let flat: ResourcesTree['flat'] = {}

let episodes: ResourcesTree['episodes'] = {mlg: {} ,mla: {}}
function addEpisode(
  podcast: 'mla' | 'mlg',
  number: string | number,
  id: string
) {
  const p = episodes[podcast]
  if (!p[number]) {
    p[number] = []
  }
  if (~p[number].indexOf(id)) {return}
  p[number].push(id)
}

type WFTree = {
  _attributes?: {
    text?: string
    _note?: string
  }
  outline?: WFTree[] | WFTree
}
function parseTree(tree: WFTree, isLink = false) {
  if (!tree) {return {}}

  let text = tree._attributes?.text?.replace(reStripHtml, '').replace('&amp;', '&')
  let _note = tree._attributes?._note?.replace(reStripHtml, '').trim()
  let outline = !tree.outline ? [] : Array.isArray(tree.outline) ? tree.outline : [tree.outline]
  let tags = text.match(reTags)

  const id = crypto.createHash('md5').update(text).digest("hex")

  // pull out tags
  tags = reduce(tags, (m,tag) => {
    let [k, ...v] = tag.split(':')
    k = k.substr(1)
    if (!~['mlg', 'mla'].indexOf(k)) {
      v = v?.[0] || true
    }
    return {...m, [k]: v}
  }, {})
  text = text.replace(/\#\S+/g, '').trim()

  if (isLink) {
    return {t: text, l: _note, p: tags.price}
  }

  let isResource = !tags.pick
  const children = outline.map(o => parseTree(o, isResource))
  if (!flat[id]) {
    const node = {
      ...(isResource ? {...defaults} : {}),
      id,
      t: text,
      d: _note,
      ...tags,
      [isResource ? 'links' : 'v']: children
    }
    flat[id] = node
    tags.mlg?.forEach(ep => addEpisode('mlg', ep, id))
    tags.mla?.forEach(ep => addEpisode('mla', ep, id))
  }
  return {
    id,
    ...(isResource ? {} : {v: children})
  }
}

function parseWorkflowy(res) {
  const outline = res.opml.body.outline
  const {v} = parseTree(outline, false)
  const top = {
    degrees: {id: v[0].id},
    main: {id: v[1].id},
    math: {id: v[2].id},
    audio: {id: v[3].id}
  }
  return {flat, top, episodes}
}