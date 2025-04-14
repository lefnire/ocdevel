export interface ShowType {
  title: string
  link?: string
  feed?: string
  keywords?: string
  image?: string
  date?: string | Date // Allow Date object from metas.js
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
  // default?: ReactElement // Remove commented out property
  transcript?: string | null // Loader provides string or null
  mla?: boolean
  mlg?: boolean
  archived?: boolean

  // FIXME
  created: string
  date: string
  updated: string
}