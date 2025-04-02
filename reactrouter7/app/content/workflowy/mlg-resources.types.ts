export type Filters = {
  importance: string
  format: string
  difficulty: string
  engagement: string
  topic: string
  relevance: string
}

export type Node = Filters & {
  id: string
  t: string
  d: string
  links: { t: string, l: string, p: string }[]
  v: Node[]
}