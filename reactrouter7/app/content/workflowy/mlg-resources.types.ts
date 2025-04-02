export type Filters = {
  importance: string
  format: string
  difficulty: string
  engagement: string
  topic: string
  relevance: string
}

export type Resource = Filters & {
  id: string
  t: string
  d: string
  links: { t: string, l: string, p: string }[]
  v: Resource[]
}

export interface ResourcesTree {
  flat: {[id: string]: Resource}
  episodes: {
    mlg: {[id: string]: string[]}
    mla: {[id: string]: string[]}
  }
  top: {
    degrees: {id: string}
    main: {id: string}
    math: {id: string}
    audio: {id: string}
  }
}