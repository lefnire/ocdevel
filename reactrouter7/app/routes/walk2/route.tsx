import {Container, Col, Row} from 'react-bootstrap'
import Table from './treadmills/table'
import TopSection from "./top-section";




export default function Route() {
  return <div>
    <TopSection />
    <Table />
    <Container fluid>
      <div>Bottom section</div>
    </Container>
  </div>
}

export function meta() {
  return [
    { title: "Best Walking Pads 2025" },
    // TODO optimize per https://trends.google.com/trends/explore?date=today%203-m&geo=US&q=walking%20pad,treadmill%20desk,walking%20desk&hl=en-GB
    { name: "description", content: "Best under desk walking pads for treadmill desks. Urevo, Egofit, LifeSpan, Cintra, CitySports, Maksone, Yagud, Ancheer, Kingsmith, DeerRun, and more." }
  ]
}