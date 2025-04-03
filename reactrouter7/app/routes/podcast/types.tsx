import type {ReactElement} from "react";

export interface ShowType {
  title: string
  link?: string
  feed?: string
  keywords?: string
  image?: string
  date?: string
  teaser: string
  body: string
  useLibsynPlayer?: boolean
}

export interface EpisodeType {
  id: string
  title: string
  episode: number
  mergeEpisode?: number
  guid?: string
  file?: string
  libsynEpisode: string
  teaser: string
  empty?: boolean
  default?: ReactElement
  transcript?: ReactElement
  mla?: boolean
  mlg?: boolean
  archived?: boolean

  // FIXME
  created: string
  date: string
  updated: string
}
export interface EpisodeComponent {
  episode: EpisodeType
  teaser?: boolean
  i?: number // debugging MLG/MLA numbering issue
  podcastKey: "llh" | "mlg"
  show: ShowType
}