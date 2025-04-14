import {createContext} from "react";
import type {EpisodeType} from "~/routes/podcast/types";
import type {ResourceLeaf, ResourceTree} from "~/content/podcast/resources/resources.types";

export type EpisodeContext = {
  resources: ResourceTree
  show: any // we'll use ShowContext for real values; this is used for Rout.MetaArgs
  episode: EpisodeType
  transcript: string | null
  i?: number
}

// @ts-ignore
export const EpisodeContext = createContext<EpisodeContext>()