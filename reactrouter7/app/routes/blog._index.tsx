// import {BlogPost, fmt} from './utils'
import {PostDate} from '~/routes/blog/utils'
import type {BlogPost} from './blog/types'
import metas_ from "~/content/blog/metas.js"
import * as walkMeta from '~/routes/walk/meta.js'
import Card from 'react-bootstrap/cjs/Card';
import Container from 'react-bootstrap/cjs/Container';
import {getScoresAndLabels} from "~/content/treadmills/scoring/seo";
import type {Route} from './+types/blog._index.tsx'
import {Link} from "react-router";

// Load in a loader so the client isn't hydrated with all the data exports from
// treadmills (there's lots)
export function loader() {
  const {labels} = getScoresAndLabels()
  const walkingpads = labels.slice(0, 10).join(', ')
  return {
    legacyFitnessDesk: {
      ...walkMeta,
      teaser: walkMeta.teaser.replace('[placeholder]', walkingpads)
    }
  }
}

export default function List({loaderData}: Route.ComponentProps) {
  // console.log(loaderData)
  const metas = [
    loaderData.legacyFitnessDesk,
    ...metas_
  ]
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
        {p.pinned && <span className='float-end'>📌</span>}
        <Link to={url}>{p.title}</Link>
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <PostDate p={p} />
      </Card.Subtitle>
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