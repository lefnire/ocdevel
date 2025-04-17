import {PostMeta} from '~/components/date-utils'
import type {BlogPost} from './blog/types'
import metas_ from "~/content/blog/metas.js"
import Card from 'react-bootstrap/cjs/Card';
import Container from 'react-bootstrap/cjs/Container';
import type {Route} from './+types/blog._index.tsx'
import {Link} from "react-router";

const metas = metas_ as BlogPost[]

// git-blame for [placeholder] walking pads by SEO

export default function List() {
  return <Container>
    {metas.map(p => <Teaser key={p.id} p={p} />)}
  </Container>
}

export function Teaser({p}: { p: BlogPost }) {
  const url = p.url || `/blog/${p.id}`

  return <Card
    key={p.id}
    className={`mb-3 card-post ${p.pinned ? 'card-pinned' : ''}`}
  >
    <Card.Body>
      <Card.Title>
        {p.pinned && <span className='float-end'>⭐️</span>}
        <Link to={url}>{p.title}</Link>
      </Card.Title>
      <PostMeta created={p.date} updated={p.updated} />
      <p>{p.teaser}</p>
    </Card.Body>
  </Card>
}

export function meta() {
  return [
    { title: "OCDevel Blog" },
    { name: "description", content: "Treadmill desks, walking pads, life and tech hacks, ergonomic mice and keyboards." }
  ]
}