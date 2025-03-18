import {Container} from 'react-bootstrap'
import {Outlet} from 'react-router'

export default function Home() {
  return <Container className="home">
    <Outlet />
  </Container>
}

export function meta() {
  return [
    { title: "OCDevel Blog" },
    { name: "description", content: "Treadmill desks, walking pads, life and tech hacks, ergonomic mice and keyboards." }
  ]
}