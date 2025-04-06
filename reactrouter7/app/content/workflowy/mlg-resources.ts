import fs from 'fs'
import path from 'path'
import xmlJs from 'xml-js'
import crypto from 'crypto'
import type {Filters, Resource, ResourcesTree} from './mlg-resources.types'

// npm install -D marked dompurify jsdom
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
export async function preRenderMd(content: string) {
  // Parse and sanitize the markdown
  const rawHtml = await marked.parse(content); // marked returns a Promise now
  const cleanHtml = DOMPurify.sanitize(rawHtml); // CRITICAL!
  return cleanHtml
}

type Opts = {id: string, podcast: 'mlg' | 'mla'}
export async function transform(opts?: Opts) {
  const fileContent = fs.readFileSync(
    './app/content/workflowy/mlg-resources.opml',
    'utf8'
  );
  const xmlContent = xmlJs.xml2js(fileContent, {compact: true});
  return await parseWorkflowy(xmlContent, opts)
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
type ParseTree = {tree: WFTree, opts?: Opts, isLink?: boolean}
async function parseTree({tree, opts, isLink}: ParseTree) {
  if (!tree) {return {}}

  let text = tree._attributes?.text?.replace(reStripHtml, '').replace('&amp;', '&')
  let _note = tree._attributes?._note?.replace(reStripHtml, '').trim()
  let outline = !tree.outline ? [] : Array.isArray(tree.outline) ? tree.outline : [tree.outline]
  let tags = text.match(reTags)

  const id = crypto.createHash('md5').update(text).digest("hex")

  // pull out tags
  tags = (tags || []).reduce((m, tag) => {
    let [k, ...v] = tag.split(':')
    k = k.substr(1)
    if (!['mlg', 'mla'].includes(k)) { // Use includes for better readability
      v = v?.[0] || true
    }
    m[k] = v; // Directly modify accumulator for potentially better performance
    return m;
  }, {});
  text = text.replace(/\#\S+/g, '').trim()

  if (isLink) {
    return {t: text, l: _note, p: tags.price}
  }

  let isLeaf = !tags.pick
  const children = await Promise.all(outline.map(o => (
    parseTree({tree: o, opts, isLink: isLeaf})
  )))
  if (!flat[id]) {
    const node = {
      ...(isLeaf ? {...defaults} : {}),
      id,
      t: text,
      d: await preRenderMd(_note || ''), // Ensure _note is not undefined
      ...tags,
      [isLeaf ? 'links' : 'v']: children
    }
    if (
      (!opts?.id) || // blanket-parse, for /mlg/resource
      (tags[opts.podcast]?.includes(opts.id) && isLeaf)
    ) {
      flat[id] = node
      tags.mlg?.forEach(ep => addEpisode('mlg', ep, id))
      tags.mla?.forEach(ep => addEpisode('mla', ep, id))
    }
  }
  return {
    id,
    ...(isLeaf ? {} : {v: children})
  }
}

async function parseWorkflowy(xmlContent: any, opts?: Opts) {
  const outline = xmlContent.opml.body.outline
  const {v} = await parseTree({tree: outline, opts, isLink: false})
  if (opts?.id) {
    return {
      flat,
      top: {},
      nids: episodes[opts.podcast][opts.id]
    }
  }
  const top = {
    degrees: {id: v[0].id},
    main: {id: v[1].id},
    math: {id: v[2].id},
    audio: {id: v[3].id}
  }
  return {
    flat,
    top,
    nids: []
    //, episodes
  }
}