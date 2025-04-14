import type { ReactElement } from "react";

// --- Filter Metadata Types (Keep as is from filters.tsx) ---
// Describes the structure of the filters object used for UI generation
export type FilterKey = string; // Using string as requested for flexibility
export type Opt = { t: string; d?: string; i?: ReactElement };
export type Opts = { [opt: string]: Opt };
export type Filter = { t: string; d?: string; opts?: Opts };
export type Filters = { [filterKey: FilterKey]: Filter };

// Type for the default filter values applied to leaf nodes
export type DefaultFilterValues = {
  importance: string;
  format: string;
  difficulty: string;
  engagement: string;
  topic: string;
  relevance: string;
};
// --- Specific Tag Literal Types (Derived from context) ---
export type PickValue = 'ordered' | 'all' | 'any' | 'one';
export type PriceValue = 'free' | '$' | '$$' | '$$$';

// --- Link Type (Structure within leaf nodes) ---
export type Link = {
  t: string; // Link text (e.g., "Amazon", "Website")
  l: string; // Link URL (href extracted from _note)
  p?: PriceValue; // Optional price associated with this specific link
};

// --- Base Resource Type ---
// Contains common properties and known/potential tags derived from OPML structure and processing logic
export interface ResourceBase {
  id: string; // MD5 hash of the node's text
  t: string; // Title (text attribute, tags removed)
  d: string; // Description (_note attribute, rendered as HTML from Markdown)

  // Standard filter keys (optional strings as requested)
  // Defaults are applied during processing for leaf nodes if not present
  importance?: string;
  format?: string;
  difficulty?: string;
  engagement?: string;
  topic?: string;
  relevance?: string;
  video2audio?: string; // Optional filter key
  updated?: string; // Optional filter key (value is usually a date string)

  // Specific known tags processed from OPML
  price?: PriceValue; // Price tag directly on the resource node (distinct from link price)
  tgc?: boolean; // Tag indicating a The Great Courses resource
  itunesu?: boolean; // Tag indicating an iTunes U resource
  expand?: boolean; // Tag indicating the node should be expanded by default in UI
  audioOption?: boolean; // Tag indicating the resource is suitable for audio-only consumption

  // Episode relevance tags
  mlg?: string[]; // Array of MLG episode numbers (as strings) this resource applies to
  mla?: string[]; // Array of MLA episode numbers (as strings) this resource applies to

  // Index signature to accommodate any other arbitrary tags found in the OPML
  [key: string]: any;
}

// --- Branch Node Structure ---
// Represents a node with children in the hierarchy (identified by having a 'pick' tag)
// The 'v' property holds simplified references to children (id and potentially nested 'v'),
// not the full Resource objects themselves, reflecting the structure stored in the 'flat' map.
export type ResourceChildRef = {
  id: string;
  v?: ResourceChildRef[]; // Recursive structure for nested branches
};

export interface ResourceBranch extends ResourceBase {
  pick: PickValue; // Branches MUST have a pick value defining how children are selected
  v: ResourceChildRef[]; // Branches have references to their children's structure
  links?: never; // Branches do not have direct links; links are on leaf nodes
}

// --- Leaf Node Structure ---
// Represents a terminal node in the hierarchy (identified by NOT having a 'pick' tag)
// Contains links to external resources.
export interface ResourceLeaf extends ResourceBase {
  links: Link[]; // Leaves have an array of Link objects
  v?: never; // Leaves do not have children references ('v')
  pick?: never; // Leaves explicitly do not have a 'pick' value
}

// --- Combined Resource Type ---
// A resource stored in the 'flat' map is either a branch or a leaf
export type Resource = ResourceBranch | ResourceLeaf;

// --- Tree Structure Types ---
// Base structure containing the flattened map of all processed resources, keyed by ID
// Base structure containing the flattened map of all processed resources, keyed by ID
export interface ResourcesTreeBase {
  flat: { [id: string]: Resource };
}

// Structure returned when processing for the main resources page (/mlg/resources)
export interface AllResources extends ResourcesTreeBase {
  top: { // References to the top-level category nodes
    degrees: { id: string };
    main: { id: string };
    math: { id: string };
    audio: { id: string };
  };
  nids: []; // nids is empty for the 'all resources' view
}

// Structure returned when processing for a specific episode page (/mlg/:id)
export interface EpisodeResources extends ResourcesTreeBase {
  top: {}; // No top-level structure needed for episode-specific view
  nids: string[]; // Array of resource IDs relevant to the specific episode
}

// Combined type for the possible return structures of the transform function
export type ResourceTree = AllResources | EpisodeResources;