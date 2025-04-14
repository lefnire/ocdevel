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
      value = String(value).split(':').map(s => s.trim()).filter(s => s !== '');
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
      // Always add the node to flat, regardless of opts
      flat[id] = node;

      // Always add episode references if tags exist, regardless of opts
      tags.mlg?.forEach(ep => addEpisode('mlg', ep, id));
      tags.mla?.forEach(ep => addEpisode('mla', ep, id));
    } // This closes the `if (!flat[id])` block from line 168
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

// Helper function to recursively find all leaf node IDs under a given branch ID
function findNestedLeafIds(branchId: string, allNodes: { [id: string]: Resource }): string[] {
  const node = allNodes[branchId];
  // Base case: If it's not a branch node in flat, return empty array
  if (!node || !('v' in node)) {
    return [];
  }

  let leafIds: string[] = [];
  // Iterate over children references (ResourceChildRef[]) if they exist
  if (node.v) {
  for (const childRef of node.v) {
    const childNode = allNodes[childRef.id];
    if (!childNode) continue; // Skip if child node not found (shouldn't happen in theory)

    // Check if the child node is a leaf
    if ('links' in childNode) { // Leaves have 'links' property
      leafIds.push(childNode.id);
    }
    // Check if the child node is another branch
    else if ('v' in childNode) { // Branches have 'v' property
      // Recursively find leaves in the nested branch
      leafIds = leafIds.concat(findNestedLeafIds(childNode.id, allNodes));
    }
  } // End of loop
  } // End of if (node.v)
  return leafIds;
}


async function parseWorkflowy(xmlContent: OpmlStructure, opts?: Opts): Promise<ResourceTree> {
  // Reset global state variables at the beginning of each parse
  flat = {};
  episodes = { mlg: {}, mla: {} };

  const outline = xmlContent.opml.body.outline;

  // Step 1: Perform a full parse of the tree to populate 'flat' and 'episodes'
  // We pass 'undefined' for opts here so parseTree processes everything.
  const topLevelResult = await parseTree({ tree: outline, opts: undefined, isLink: false }) as ResourceChildRef;

  // Step 2: Check if episode-specific filtering is requested
  if (opts?.id && opts.podcast) {
    // Get the list of node IDs directly tagged for this episode
    const directNids = episodes[opts.podcast]?.[opts.id] ?? [];
    let finalNids: string[] = [];

    // Iterate through directly tagged nodes
    for (const nid of directNids) {
      const node = flat[nid];
      if (!node) continue; // Skip if node not found in flat map

      // Check if the node is a leaf
      if ('links' in node) {
        // If it's a leaf, add its ID directly
        finalNids.push(nid);
      }
      // Check if the node is a branch
      else if ('v' in node) {
        // If it's a branch, find all nested leaf IDs under it
        const nestedLeaves = findNestedLeafIds(nid, flat);
        // Add the found leaf IDs to the final list
        finalNids = finalNids.concat(nestedLeaves);
      }
    }

    // Remove duplicate IDs that might arise from the process
    finalNids = [...new Set(finalNids)];

    // Construct the result for a specific episode
    const episodeResult: EpisodeResources = {
      flat, // Return the complete flat map as before
      top: {}, // 'top' structure is not relevant for episode-specific results
      nids: finalNids, // The aggregated list of relevant leaf node IDs
    };
    return episodeResult;

  } else {
    // Step 3: Handle the case where no specific episode is requested (return all resources)
    const v = topLevelResult.v || []; // Get top-level children references

    // Define the 'top' structure based on the top-level nodes
    // Add checks for array length to prevent errors if the structure is unexpected
    const top = {
      degrees: v.length > 0 ? { id: v[0].id } : { id: '' },
      main:    v.length > 1 ? { id: v[1].id } : { id: '' },
      math:    v.length > 2 ? { id: v[2].id } : { id: '' },
      audio:   v.length > 3 ? { id: v[3].id } : { id: '' }
    };

    // Construct the result for all resources
    const allResult: AllResources = {
      flat, // The complete flat map
      top, // The defined top-level structure
      nids: [], // 'nids' is empty when returning all resources
    };
    return allResult;
  }
}