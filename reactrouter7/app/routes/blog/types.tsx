export interface BlogPost {
  id: string;
  title: string;
  date: string;
  updated?: string;
  jsx?: boolean
  teaser?: string
  affiliate?: boolean
  default: any
  url?: string
  pinned?: boolean
}