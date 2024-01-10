const { parseExpression } = require('@babel/parser')
const { createMacro, MacroError } = require('babel-plugin-macros')
const fs = require('fs')
const path = require('path')
const xmlJs = require('xml-js');
const reduce = require('lodash/reduce')
const crypto = require('crypto')
const last = require('lodash/last')
const find = require('lodash/find')

module.exports = createMacro(opmlMacro)

function opmlMacro({ references, state }) {
  for (const { parentPath } of references.default) {
    if (parentPath.type !== 'CallExpression')
      throw new MacroError('yaml.macro only supports usage as a function call')

    let argPath, argOptions
    try {
      const args = parentPath.get('arguments')
      argPath = args[0].evaluate().value
      if (args.length > 1) argOptions = args[1].evaluate().value
    } catch (error) {
      error.message = `yaml.macro argument evaluation failed: ${error.message}`
      throw error
    }
    /* istanbul ignore if */
    if (!argPath) throw new MacroError('yaml.macro argument evaluation failed')

    const dirname = path.dirname(state.file.opts.filename)
    const fullPath = require.resolve(argPath, { paths: [dirname] })
    const fileContent = fs.readFileSync(fullPath, { encoding: 'utf-8' })

    const res = xmlJs.xml2js(fileContent, {compact: true});
    const wf = parseWorkflowy(res)
    const exp = parseExpression(JSON.stringify(wf))
    // const exp = parseExpression(JSON.stringify(res))
    parentPath.replaceWith(exp)
  }
}

// aecd0d0c reLink
// https://giuliachiola.dev/posts/how-to-remove-all-links-in-javascript/
const reStripHtml= /<[^>]+>/g
const reTags = /\#\S+/g
const defaults = {
  importance: "supplementary",
  format: "other",
  difficulty: "easy",
  engagement: "passive",
  topic: "basics",
  relevance: "fresh",
}

let flat = {}
let episodes = {mlg: {} ,mla: {}}
function addEpisode(podcast, number, id) {
  const p = episodes[podcast]
  if (!p[number]) {
    p[number] = []
  }
  if (~p[number].indexOf(id)) {return}
  p[number].push(id)
}

function parseTree(tree, isLink = false) {
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