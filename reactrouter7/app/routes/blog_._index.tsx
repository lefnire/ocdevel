import blog from "~/content/blog/metas.js";
import React from "react";
// import {BlogPost, fmt} from './utils'
import moment from "dayjs"
import sortBy from "lodash/sortBy"
import {Teaser} from '~/components/blog.tsx'
import {Container} from "react-bootstrap"

export async function loader() {
  const metaObjects = import.meta.glob('/app/routes/blog*/meta.js');
  const metaArr = Object.values(metaObjects)
  const resolved = await Promise.all(metaArr.map(post => post()))
  // @FIXME pins
  const sorted = sortBy(resolved, e => -moment(e.date));
  return { posts: sorted }
}

export default function List({loaderData: {posts}}) {
  return <Container className="blog">
    {posts.map(p => <Teaser key={p.id} p={p} />)}
  </Container>
}

export function meta() {
  return [
    { title: "OCDevel Blog" },
    { name: "description", content: "Treadmill desks, walking pads, life and tech hacks, ergonomic mice and keyboards." }
  ]
}