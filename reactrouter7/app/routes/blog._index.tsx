import React from "react";
// import {BlogPost, fmt} from './utils'
import {Teaser} from '~/components/blog'
import metas_ from "~/content/blog/metas.js"
import * as walkMeta from '~/routes/walk/meta.js'
import {Container} from "react-bootstrap";
import {seoLabels} from "~/routes/walk/treadmills/data";
import type {Route} from './+types/blog._index.tsx'

// Load in a loader so the client isn't hydrated with all the data exports from
// treadmills (there's lots)
export function loader() {
  const pads = seoLabels.slice(0, 10).join(', ')
  return {
    legacyFitnessDesk: {
      ...walkMeta,
      title: "Walking Desks",
      teaser: walkMeta.teaser.replace('[placeholder]', pads)
    }
  }
}

export default function List({loaderData}: Route.ComponentProps) {
  console.log(loaderData)
  const metas = [
    loaderData.legacyFitnessDesk,
    ...metas_
  ]
  return <Container>
    {metas.map(p => <Teaser key={p.id} p={p} />)}
  </Container>
}

export function meta() {
  return [
    { title: "OCDevel Blog" },
    { name: "description", content: "Treadmill desks, walking pads, life and tech hacks, ergonomic mice and keyboards." }
  ]
}