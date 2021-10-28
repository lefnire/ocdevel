const { parseExpression } = require('@babel/parser')
const { createMacro, MacroError } = require('babel-plugin-macros')
const fs = require('fs')
const path = require('path')
const xmlJs = require('xml-js');
const reduce = require('lodash/reduce')
const crypto = require('crypto')
const last = require('lodash/last')

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

    // const options = Object.assign({}, argOptions, { keepBlobsInJSON: false })
    // const res = YAML.parse(fileContent, options)
    const res = xmlJs.xml2js(fileContent, {compact: true});
    const wf = parseWorkflowy(res.opml.body.outline)
    const exp = parseExpression(JSON.stringify(wf))
    parentPath.replaceWith(exp)
  }
}

// https://dev.to/mraza007/using-regex-to-extract-links-45fg
const linkRegex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/
// https://giuliachiola.dev/posts/how-to-remove-all-links-in-javascript/
const stripTagsRegex = /<[^>]+>/g
const defaults = {
  importance: "supplementary",
  format: "other",
  difficulty: "easy",
  engagement: "passive",
  topic: "basics",
  relevance: "fresh",
}

function parseWorkflowy(tree, opts = {}) {
  if (!tree) {return {}}

  const text = tree._attributes?.text?.trim().replace(stripTagsRegex, '')
  const _note = tree._attributes?._note?.trim().replace(stripTagsRegex, '')
  const outline = !tree.outline ? [] : Array.isArray(tree.outline) ? tree.outline : [tree.outline]

  // Attributes child
  if (text === "links") {
    const links = reduce(outline, (m,v,k) => ([
      ...m,
      parseWorkflowy(v, {link: true})
    ]), [])
    return {links}
  }

  if (text === "@attrs") {
    const attrs = reduce(outline, (m,v,k) => ({
      ...m,
      ...parseWorkflowy(v, {attr: true})
    }), {})
    return {attrs}
  }

  if (opts.attr) {
    let [k, v] = text.split(':')
    k = k.replace('#','')
    v = v || true
    return {[k]: v}
  }

  if (opts.link) {
    const price = text.match(/(?<=\#)\S+/g)
    return {
      t: text.replace(/\#\S+/g, ""),
      l: _note,
      p: price?.[0]
    }
  }

  // Main content
  return reduce(outline, (m,v,k) => {
    const child = parseWorkflowy(v)
    // Merge attributes
    if (child.attrs) {
      return {...m, ...child.attrs}
    }
    // Append children
    return {...m, v: [...m.v, child]}
  }, {
    ...defaults,
    t: text,
    id: crypto.createHash('md5').update(text).digest("hex"),
    d: _note,
    v: []
  })
}