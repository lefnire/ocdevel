import React from "react";
// import {BlogPost, fmt} from './utils'
import {Teaser} from '~/components/blog.tsx'
import metas_ from "~/content/blog/metas.js"
import {Container} from "react-bootstrap";

const legacyFitnessDesk = {
  id: '20240109-fitness-desk',
  url: "/walk",
  date: '2024-01-09',
  updated: '2025-01-25',
  title: "Walking Desk",
  pinned: true,
  affiliate: true,
  teaser: "Comparison of treadmill desk options. Under-desk walking pads: Egofit, Urevo, GoYouth, GoPlus, WalkingPad, Lifespan, iMovR. A video showing how and when to use each option. Links to stand/sit desks, monitor arms, and ergonomic peripherals.",
  jsx: true,
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