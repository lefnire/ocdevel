import fs from 'fs'
import xmlJs from 'xml-js'
import reduce from 'lodash/reduce'
import crypto from 'crypto'
import {decode} from 'html-entities'

// export function opmlPlugin({ references, state }) {
export function transform(code, id) {
  const fileContent = fs.readFileSync(id, 'utf8');
  const res = xmlJs.xml2js(fileContent, {compact: true});
  const outline = res.opml.body.outline
  return parseTree(outline)
}

// const reTags = /(\s|^)\#\S+/g
// FIXME this regex came from chatgpt, and is absolutely bonkers. There's gotta be something simpler
const reTags = /(?<!:\/\/|\w)\#(\S+?)(?=\s|$|\.|,|;|\?|!)/g

function addTargetBlank(html) {
  return html.replace(/<a\s+(?!.*?target=['"]_blank['"])([^>]+)>/gi, '<a $1 target="_blank">');
}

function parseTree(tree) {
  if (!tree) {return {}}

  let text = tree._attributes?.text || ""
  text = decode(text)
  text = addTargetBlank(text)

  let note = tree._attributes?._note || ""
  note = addTargetBlank(note)

  // pull out tags
  let tags = text.match(reTags)
  // tags = reduce(tags, (m, tag) => {
  //   let [k, ...v] = tag.split(':')
  //   k = k.substr(1)
  //   v = v?.[0] || true
  //   return {...m, [k]: v}
  // }, {})
  tags = reduce(tags, (m, tag) => {
    return {
      ...m,
      [tag.substr(1)]: true
    }
  }, {})
  text = text.replace(reTags, '').trim()

  let outline = !tree.outline ? [] : Array.isArray(tree.outline) ? tree.outline : [tree.outline]

  const id = crypto.createHash('md5').update(text).digest("hex")

  const children = outline.map(o => parseTree(o))
  return {
    id,
    text,
    note,
    tags,
    children
  }
}