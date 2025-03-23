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

import {Card} from "react-bootstrap";
import {Link} from "react-router";
import {renderBlogPost} from "~/components/markdown.tsx";

interface Teaser {
  p: BlogPost
}
export function Teaser({p}: BlogPost) {
  function renderContent() {
    if (p.teaser) {
      return <p>{p.teaser}</p>
    }
    return <div className='fade-post'>
      {renderBlogPost(p)}
      <div className='fade-post-bottom'></div>
    </div>
  }
  const url = p.url || `/blog/${p.id}`

  return <Card
    key={p.id}
    className={`mb-3 card-post ${p.pinned ? 'card-pinned' : ''}`}
  >
    <Card.Body>
      <Card.Title>
        {p.pinned && <span className='float-end'>📌</span>}
        <Link to={url}>{p.title}</Link>
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <PostDate p={p} />
      </Card.Subtitle>
      {renderContent()}
      <Link to={'/blog/' + p.id}>Read More</Link>
    </Card.Body>
  </Card>
}