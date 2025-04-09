import type {ReactElement} from "react";

// export type FilterKey = {
//   importance: string;
//   format: string;
//   difficulty: string;
//   engagement: string;
//   topic: string;
//   relevance: string;
//   video2audio?: string; // Added optional video2audio filter key
//   price?: string; // Added optional price filter key (used in common.tsx)
//   updated?: string; // Added optional updated filter key (used in common.tsx)
// };

export type FilterKey = string
export type Opt = {t: string, d?: string, i?: ReactElement}
export type Opts = {[opt: string]: Opt}
export type Filter = {t: string, d?: string, opts?: Opts}
export type Filters = {[filterKey: string]: Filter}

export type Resource = Filters & {
  id: string;
  t: string; // Title
  d?: string; // Description (make optional as it's checked)
  links: { t: string, l: string, p: string }[];
  v?: Resource[]; // Children (make optional as it's checked)
  // Add missing optional properties observed in common.tsx
  tgc?: boolean;
  itunesu?: boolean;
  expand?: boolean;
  pick?: string; // Assuming string type based on usage with picks[full.pick]
};
export type ResourcePartial = {id: string, v: ResourcePartial[]}

type ResourcesTree_ = {
  flat: {[id: string]: Resource}
  episodes: {
    mlg: {[id: string]: string[]}
    mla: {[id: string]: string[]}
  }
}
export type AllResources = ResourcesTree_ & {
  top: {
    degrees: {id: string}
    main: {id: string}
    math: {id: string}
    audio: {id: string}
  }
}
export type EpisodeResources = ResourcesTree_ & {
  nids: string[]
}
export type ResourceTree = EpisodeResources | AllResources