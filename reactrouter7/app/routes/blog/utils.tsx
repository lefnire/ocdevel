import React from 'react'
import moment from "dayjs";
import type {BlogPost} from "./types";
export const fmt = 'MMM DD, YYYY';

export function PostDate({p}: {p: BlogPost}) {
  const dates = [
    <span key='date'>{moment(p.date).format(fmt)}</span>
  ]
  if (p.updated) {
    dates.push(<span key='updated' className='ms-1'>[updated {moment(p.updated).format(fmt)}]</span>)
  }
  return dates
}