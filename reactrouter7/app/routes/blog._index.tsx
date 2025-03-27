import React from "react";
// import {BlogPost, fmt} from './utils'
import moment from "dayjs"
import sortBy from "lodash/sortBy"
import {Teaser} from '~/components/blog.tsx'
import metas from "~/content/blog/metas.js"
import {Container} from "react-bootstrap";

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