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
  it's a colon-separated list (#mlg:1:3:2) it's relevant to MLG episodes 1, 3, and 2. If
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

import fs from 'fs';
import crypto from 'crypto';
import xmlJs from 'xml-js';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { decode } from 'html-entities';
import type {
  Resource,
  ResourceTree,
  Link,
  ResourceChildRef,
  PickValue,
  PriceValue,
  AllResources,
  EpisodeResources,
  DefaultFilterValues,
  ResourceBase,
  ResourceBranch,
  ResourceLeaf,
} from './resources.types';

// Pre-rendering Markdown (Keep as is)
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
export async function preRenderMd(content: string): Promise<string> {
  const rawHtml = await marked.parse(content, { gfm: true }); // Explicitly enable GFM
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  return cleanHtml;
}

// Types and Options (Keep as is)
type PodcastKey = 'mlg' | 'mla';
type Opts = { id: string; podcast: PodcastKey };

// Main transform function (Keep structure)
export async function transform(opts?: Opts): Promise<ResourceTree> {
  const fileContent = fs.readFileSync(
    './app/content/podcast/resources/resources.opml',
    'utf8'
  );
  const xmlContent = xmlJs.xml2js(fileContent, { compact: true }) as OpmlStructure;
  return await parseWorkflowy(xmlContent, opts);
}

// Constants and Defaults (Keep as is)
const reStripHtml = /<[^>]+>/g; // Used for stripping HTML from 'text' attribute
const reTags = /#\S+/g;
const defaults: DefaultFilterValues = {
  importance: 'supplementary',
  format: 'other',
  difficulty: 'easy',
  engagement: 'passive',
  topic: 'basics',
  relevance: 'fresh',
};

// Global State (Keep as is, reset in parseWorkflowy)
let flat: { [id: string]: Resource } = {};
let episodes: {
  mlg: { [episodeNumber: string]: string[] };
  mla: { [episodeNumber: string]: string[] };
} = { mlg: {}, mla: {} };

// Helper to add episode references (Keep as is)
function addEpisode(podcast: PodcastKey, number: string, id: string) {
  const p = episodes[podcast];
  const numStr = String(number); // Ensure key is string
  if (!p[numStr]) {
    p[numStr] = [];
  }
  if (!p[numStr].includes(id)) {
    p[numStr].push(id);
  }
}

// OPML Structure Types (Keep as is)
type WFTree = {
  _attributes?: {
    text?: string;
    _note?: string;
  };
  outline?: WFTree[] | WFTree;
};
type OpmlStructure = {
  opml: {
    body: {
      outline: WFTree;
    };
  };
};

// --- Simplified parseTree ---
// Add parentId to args
type ParseTreeArgs = { tree: WFTree; isLink?: boolean; parentId?: string };
// Add parentId to signature with default
async function parseTree({ tree, isLink = false, parentId = 'root' }: ParseTreeArgs): Promise<Link | ResourceChildRef | null> {
  if (!tree?._attributes?.text) {
    return null; // Skip nodes without text
  }

  let text = decode(
    tree._attributes.text
      .replace(reStripHtml, '')
  ).trim()
  const note = decode(
    (tree._attributes._note || '')
  )
  const outline = tree.outline ? (Array.isArray(tree.outline) ? tree.outline : [tree.outline]) : [];

  const rawTags = text.match(reTags) ?? [];
  const tags: Record<string, any> = {}; // Simplified tag storage
  let mlgEpisodes: string[] = [];
  let mlaEpisodes: string[] = [];

  // Simplified Tag Parsing
  rawTags.forEach(tag => {
    const tagContent = tag.substring(1); // Remove #
    const [key, ...valueParts] = tagContent.split(':');
    const value = valueParts.join(':');

    if (key === 'mlg') {
      mlgEpisodes = value.split(':').map(s => s.trim()).filter(Boolean);
      // ensure it remains a list, rather than punting to below to add it
      tags[key] = mlgEpisodes
    } else if (key === 'mla') {
      mlaEpisodes = value.split(':').map(s => s.trim()).filter(Boolean);
      tags[key] = mlaEpisodes
    } else if (value === '') {
      tags[key] = true; // Boolean tag
    } else if (valueParts.length > 1) {
      tags[key] = valueParts;
    } else {
      tags[key] = value; // Value tag (pick, price, format, etc.)
    }
  });

  text = text.replace(reTags, '').trim(); // Remove tags from text *after* parsing them

  // Handle Links (Leaf children)
  if (isLink) {
    // Extract URL from note if it's an anchor tag, otherwise use note directly
    const linkMatch = note.match(/<a href="([^"]+)">/);
    const linkUrl = linkMatch ? linkMatch[1] : note;
    return { t: text, l: linkUrl.replace('&amp;', '&'), p: tags.price as PriceValue };
  }

  // Determine if leaf *before* generating ID
  const isLeaf = !tags.pick;

  // Generate ID conditionally
  const idSource = isLeaf ? text : `${parentId}::${text}`;
  const id = crypto.createHash('md5').update(idSource).digest('hex');

  // Avoid reprocessing if already in flat map
  // NOTE: This check now prevents reprocessing identical *branches* under the *same parent*,
  // and identical *leaves* globally.
  if (flat[id]) {
    // Still need to return the ID for parent linking
    return { id };
  }

  // const isLeaf = !tags.pick; // Moved up

  // Recursively parse children
  const childrenResults = await Promise.all(
    outline.map(o => parseTree({ tree: o, isLink: isLeaf, parentId: id })) // Pass current id as parentId
  );
  const children = childrenResults.filter(c => c !== null) as (Link | ResourceChildRef)[];

  // Construct Node
  const baseNode: ResourceBase = {
    id,
    t: text,
    d: await preRenderMd(note), // Render note markdown
    ...tags, // Add remaining parsed tags
  };

  let node: Resource;
  if (isLeaf) {
    node = {
      ...defaults, // Apply defaults
      ...baseNode,
      links: children as Link[],
    } as ResourceLeaf;
    // Remove properties specific to branches if they somehow got added via tags spread
    delete (node as any).pick;
    delete (node as any).v;
  } else {
    node = {
      ...baseNode,
      pick: tags.pick as PickValue, // 'pick' must exist for branches
      v: children as ResourceChildRef[],
    } as ResourceBranch;
     // Remove properties specific to leaves
    delete (node as any).links;
  }

  // Add to flat map and episode references
  flat[id] = node;
  mlgEpisodes.forEach(ep => addEpisode('mlg', ep, id));
  mlaEpisodes.forEach(ep => addEpisode('mla', ep, id));

  // Return ID for parent linking
  return { id };
}


// Helper function to find nested leaves (Keep as is)
function findNestedLeafIds(branchId: string, allNodes: { [id: string]: Resource }): string[] {
  const node = allNodes[branchId];
  if (!node || !('v' in node)) { // Check if it's a branch
    return [];
  }

  let leafIds: string[] = [];
  if (node.v) {
    for (const childRef of node.v) {
      const childNode = allNodes[childRef.id];
      if (!childNode) continue;

      if ('links' in childNode) { // Leaf node
        leafIds.push(childNode.id);
      } else if ('v' in childNode) { // Nested branch node
        leafIds = leafIds.concat(findNestedLeafIds(childNode.id, allNodes));
      }
    }
  }
  return leafIds;
}

// Main parsing orchestrator (Keep structure, use simplified parseTree)
async function parseWorkflowy(xmlContent: OpmlStructure, opts?: Opts): Promise<ResourceTree> {
  // Reset global state
  flat = {};
  episodes = { mlg: {}, mla: {} };

  const rootOutline = xmlContent.opml.body.outline;

  // Step 1: Full parse to populate 'flat' and 'episodes'
  // The root node itself isn't stored, but its children are processed.
  // We expect the root's direct children to be the main categories.
  // Ensure rootOutline.outline exists before trying to map over it
  const outlinesToParse = rootOutline.outline
    ? (Array.isArray(rootOutline.outline) ? rootOutline.outline : [rootOutline.outline])
    : [];
  const rootChildrenResults = await Promise.all(
    outlinesToParse.map(o => parseTree({ tree: o }))
  );
  const topLevelRefs = rootChildrenResults.filter(c => c !== null && 'id' in c) as ResourceChildRef[];


  // Step 2: Handle episode-specific filtering
  if (opts?.id && opts.podcast) {
    const directNids = episodes[opts.podcast]?.[opts.id] ?? [];
    let finalNids: string[] = [];

    for (const nid of directNids) {
      const node = flat[nid];
      if (!node) continue;

      if ('links' in node) { // Node is a leaf
        finalNids.push(nid);
      } else if ('v' in node) { // Node is a branch
        finalNids = finalNids.concat(findNestedLeafIds(nid, flat));
      }
    }

    finalNids = [...new Set(finalNids)]; // Remove duplicates

    return {
      flat,
      top: [], // Not relevant for episode view
      nids: finalNids,
    } as EpisodeResources;

  } else {
    return {
      flat,
      top: topLevelRefs,
      nids: [], // Empty for all resources view
    } as AllResources;
  }
}