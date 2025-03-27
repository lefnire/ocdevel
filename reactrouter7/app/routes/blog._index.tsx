import React from "react";
// import {BlogPost, fmt} from './utils'
import {Teaser} from '~/components/blog.tsx'
import metas_ from "~/content/blog/metas.js"
import * as walkMeta from '~/routes/walk/meta.js'
import {Container} from "react-bootstrap";

const legacyFitnessDesk = {
  ...walkMeta,
  title: "Walking Desks",
}

const metas = [legacyFitnessDesk, ...metas_]

export default function List() {
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