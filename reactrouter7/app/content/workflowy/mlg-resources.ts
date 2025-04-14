/*
This file takes an OPML export from Workflowy, which is a tree-based note-taking app,
and converts it into a JavaScript object that can be used in my app. It represents the
resources relevant to podcast episodes I record; and can then be displayed either in the
podcast episode page at /mlg/$id, or in the aggregated resources page at /mlg/resources.
I use Workflowy as a start because it's easier for me to manage day-to-day, but it has
limitations, so I came up with a quirky way to design the structure for later conversion.

- Tags are used (#pick:any, #format:audiobook) in Workflowy, which get converted to
  attributes here. Eg, obj.pick="any", obj.format="audiobook".
- One tag is #mlg:1,3,2 or #mla:2. There are two subsections of the podcast: MLG and MLA.
  This tag specifies which episodes of which subsection this resource is relevant for. If
  it's a comma-separated list (#mlg:1,3,2) it's relevant to MLG episodes 1, 3, and 2. If
  it's a single number (#mla:2), it's only relevant to MLA episode 2.
- The tree structure is determined by whether #pick present or not. If present, it's a
  branch (expand to drill in); if not present, it's a leaf (click this resource for details)
- HTML elements are present in the Workflowy. The current implementation here strips
  those HTML elements, and instead defers to Markdown format in the OPML. This file
  then pre-renders the Markdown, to be later injected into the page.
- There are two ways to call compile the object. (1) where `opts: {id, podcast}` are
  not present, it will compile the entire resources tree. If they are present, it will
  collect only the resources relevant to that episode (a flat-list of leafs).
 */

import fs from 'fs'
import path from 'path'
import xmlJs from 'xml-js'
import crypto from 'crypto'
import type {
  Filters, // Keep for defaults object structure, though not strictly correct type
  Resource,
  ResourceTree,
  Link,
  ResourceChildRef,
  PickValue,
  PriceValue,
  AllResources,
  EpisodeResources,
  DefaultFilterValues, // Use this for the defaults object
  ResourceBase,
  ResourceBranch,
  ResourceLeaf
} from './mlg-resources.types'

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

type PodcastKey = 'mlg' | 'mla';
type Opts = {id: string, podcast: PodcastKey}
export async function transform(opts?: Opts): Promise<ResourceTree> {
  const fileContent = fs.readFileSync(
    './app/content/workflowy/mlg-resources.opml',
    'utf8'
  );
  // Cast the result of xml2js to our expected structure
  const xmlContent = xmlJs.xml2js(fileContent, { compact: true }) as OpmlStructure;
  return await parseWorkflowy(xmlContent, opts)
}

// aecd0d0c reLink
// https://giuliachiola.dev/posts/how-to-remove-all-links-in-javascript/
const reStripHtml= /<[^>]+>/g
const reTags = /\#\S+/g
// Although Filters describes the metadata structure, DefaultFilterValues describes the actual shape here.
const defaults: DefaultFilterValues = {
  importance: "supplementary",
  format: "other",
  difficulty: "easy",
  engagement: "passive",
  topic: "basics",
  relevance: "fresh",
};

let flat: { [id: string]: Resource } = {};

// Explicitly type the episodes structure used during parsing
let episodes: {
  mlg: { [episodeNumber: string]: string[] };
  mla: { [episodeNumber: string]: string[] };
} = { mlg: {}, mla: {} };
function addEpisode(
  podcast: PodcastKey,
  number: string, // Episode numbers are treated as strings from tags
  id: string
) {
  const p = episodes[podcast]
  if (!p[number]) {
    p[String(number)] = [] // Ensure key is string
  }
  const numStr = String(number);
  if (p[numStr]?.includes(id)) { return } // Use includes and optional chaining
  p[numStr].push(id);
}

type WFTree = {
  _attributes?: {
    text?: string
    _note?: string
  }
  outline?: WFTree[] | WFTree
}
type ParseTree = {tree: WFTree, opts?: Opts, isLink?: boolean}
// Define a type for the processed tags object
type ProcessedTags = {
  pick?: PickValue;
  price?: PriceValue;
  mlg?: string[];
  mla?: string[];
  [key: string]: any; // Allow other string/boolean tags
}

async function parseTree({tree, opts, isLink}: ParseTree): Promise<Link | ResourceChildRef | {}> {
  if (!tree) {return {}}

  let text = tree._attributes?.text?.replace(reStripHtml, '').replace('&amp;', '&')
  let _note = tree._attributes?._note?.replace(reStripHtml, '').trim()
  let outline = !tree.outline ? [] : Array.isArray(tree.outline) ? tree.outline : [tree.outline]
  const rawTags = text?.match(reTags) ?? []; // Ensure text is not null/undefined
  text = text ?? ''; // Ensure text is not null/undefined

  const id = crypto.createHash('md5').update(text || '').digest("hex"); // Handle potential empty text

  // pull out tags
  // Process tags into a structured object
  const tags: ProcessedTags = rawTags.reduce((acc, tag) => {
    let [key, ...valueParts] = tag.substring(1).split(':'); // Remove #
    let value: string | boolean | string[] = valueParts.join(':'); // Rejoin if value had colons

    if (value === '') {
      value = true; // Tag without value (e.g., #tgc)
    }

    // Handle specific multi-value tags (mlg, mla)
    if (['mlg', 'mla'].includes(key)) {
      // Ensure value is treated as a string before splitting
      value = String(value).split(',').map(s => s.trim()).filter(s => s !== '');
    }

    acc[key] = value;
    return acc;
  }, {} as ProcessedTags);
  text = text.replace(/\#\S+/g, '').trim()

  if (isLink) {
    // Return type Link
    return { t: text, l: _note || '', p: tags.price };
  }

  const isLeaf = !tags.pick;

  // Recursively parse children. Expect Link[] for leaves, ResourceChildRef[] for branches.
  const childrenResult = await Promise.all(outline.map(o => (
    parseTree({ tree: o, opts, isLink: isLeaf })
  )));

  // Filter out empty results and type appropriately
  const children: (Link | ResourceChildRef)[] = childrenResult.filter(c => Object.keys(c).length > 0) as (Link | ResourceChildRef)[];
  if (!flat[id]) {
    // Construct the base node object
    const baseNode: ResourceBase = {
      id,
      t: text,
      d: await preRenderMd(_note || ''), // Ensure _note is not undefined
      ...tags, // Spread processed tags
    };

    // Create the final node, asserting the correct type (Branch or Leaf)
    let node: Resource;
    if (isLeaf) {
      node = {
        ...defaults, // Apply defaults only to leaves
        ...baseNode,
        links: children as Link[], // Children are Links for leaves
      } as ResourceLeaf;
      // Remove 'v' if it accidentally got added via spread tags
      delete node.v;
      delete node.pick;
    } else {
      node = {
        ...baseNode,
         // pick must exist for branches, cast from ProcessedTags
        pick: tags.pick as PickValue,
        v: children as ResourceChildRef[], // Children are ResourceChildRefs for branches
      } as ResourceBranch;
       // Remove 'links' if it accidentally got added via spread tags
      delete node.links;
    }
    if (
      (!opts?.id) || // blanket-parse, for /mlg/resource
      // Check episode relevance using the correctly typed tags
      (tags[opts.podcast as PodcastKey]?.includes(opts.id) && isLeaf)
    ) {
      flat[id] = node;
      // Add episode references using the processed string arrays
      tags.mlg?.forEach(ep => addEpisode('mlg', ep, id));
      tags.mla?.forEach(ep => addEpisode('mla', ep, id));
    }
  }
  return {
    id, // Return id for parent linking
    ...(isLeaf ? {} : { v: children as ResourceChildRef[] }) // Return 'v' only for branches
  }
}

// Define a minimal type for the expected XML structure
type OpmlStructure = {
  opml: {
    body: {
      outline: WFTree
    }
  }
}

async function parseWorkflowy(xmlContent: OpmlStructure, opts?: Opts): Promise<ResourceTree> {
  const outline = xmlContent.opml.body.outline;
  // The top-level parse returns a ResourceChildRef structure
  const topLevelResult = await parseTree({ tree: outline, opts, isLink: false }) as ResourceChildRef;
  const v = topLevelResult.v || []; // Get the actual top-level children refs
  if (opts?.id) {
    // Return EpisodeResources structure
    const episodeResult: EpisodeResources = {
      flat,
      top: {},
      nids: episodes[opts.podcast]?.[opts.id] ?? [], // Handle cases where episode/podcast might not exist
    };
    return episodeResult;
  }
  const top = {
    degrees: {id: v[0].id},
    main: {id: v[1].id},
    math: {id: v[2].id},
    audio: {id: v[3].id}
  }
  // Return AllResources structure
  const allResult: AllResources = {
    flat,
    top,
    nids: [],
  };
  return allResult;
}