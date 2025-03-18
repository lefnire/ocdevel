import React from 'react'
import moment from "dayjs";
export const fmt = 'MMM DD, YYYY';


export interface BlogPost {
  id: string;
  title: string;
  date: string;
  updated?: string;
  jsx?: boolean
  teaser?: string
  affiliate?: boolean
  default: any
}

export function PostDate({p}: {p: BlogPost}) {
  const dates = [
    <span key='date'>{moment(p.date).format(fmt)}</span>
  ]
  if (p.updated) {
    dates.push(<span key='updated' className='ms-1'>[updated {moment(p.updated).format(fmt)}]</span>)
  }
  return dates
}
