import {Card} from 'react-bootstrap'
import {Col, Row, Container} from 'react-bootstrap'
import {Link} from "react-router";
import type {Route} from "./+types/_index";

export default function Home() {
  const img = {
    style: {width: "100%", maxWidth: 250},
    className: 'rounded'
  }
  const col = {left: {sm:12, md:3, className: 'text-center mb-2'}, right: {sm:12, md:9}}
  return <Container>
    <Row>
      <Col {...col.left}>
        <img src="/assets/avatar.jfif" {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>Tyler Renelle</Card.Title>
        <Card.Subtitle className='mb-2'>
          <Link to='/contact'>About me</Link>&nbsp;&bull;&nbsp;
          <Link to='/blog'>Blog</Link>
        </Card.Subtitle>
        <p>OCDevel is just me, Tyler (single-member LLC). I'm an ex-web/mobile developer gone machine learning engineer. I've worked with high-profile clients, mostly part-time contracting. I teach ML and work on fun ML side-projects (see below).</p>
        {/*<Alert variant='info'><FaSuitcase /> Hire me! See <Link to='/contact'>Contact/Hire page.</Link></Alert>*/}
      </Col>
    </Row>
    <hr />

    <Row>
      <Col {...col.left}>
        <img src="/assets/MLG-Option-1.jpg" {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>Podcasts</Card.Title>
        <Card.Subtitle className='mb-2'>
          <Link to='/mlg'>MLG</Link>&nbsp;&bull;&nbsp;
          <Link to='/mlg'>LLH</Link>
        </Card.Subtitle>
        <p>I teach machine learning fundamental concepts, theory, and practicals via a popular podcast <Link to='/mlg'>Machine Learning Guide</Link>. I teach life hacks - tips and tricks that have helped me succeed - in my new podcast <Link to="/llh">Lefnire's Life Hacks</Link>.</p>
      </Col>
    </Row>
    <hr />

    <Row>
      <Col {...col.left}>
        <img src="/assets/gnothi192.png" {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>Projects</Card.Title>
        <Card.Subtitle className='mb-2'>
          <a href='https://gnothiai.com' target='_blank'>Gnothi</a>&nbsp;&bull;&nbsp;
          <a href='https://habitica.com' target='_blank'>Habitica</a>
        </Card.Subtitle>
        <p>I've built quite a few fun projects, mostly centered around self-improvement - a passion of mine. My two favorites are Habitica (no longer with the company), a gamified habit-tracker; and Gnothi, a journal that uses AI to provide insights & resources. See <Link to='/contact'>about me</Link> for more projects.</p>
      </Col>
    </Row>
  </Container>
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OCDevel" },
    { name: "description", content: "Machine Learning Guide podcast, treadmill desks, and life hacks." },
  ];
}