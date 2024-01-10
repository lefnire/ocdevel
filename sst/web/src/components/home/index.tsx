import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {Link} from "react-router-dom";
import avatar from '../../assets/avatar.jfif'
import mlg from '../../assets/MLG-Option-1.jpg'
import gnothi from '../../assets/gnothi192.png'
import {Helmet} from "react-helmet";

export default function Home() {
  const img = {
    style: {width: "100%", maxWidth: 250},
    className: 'rounded'
  }
  const col = {left: {sm:12, md:3, className: 'text-center mb-2'}, right: {sm:12, md:9}}
  return <Container>
    <Helmet>
      <title>OCDevel</title>
    </Helmet>
    <Row>
      <Col {...col.left}>
        <img src={avatar} {...img} />
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
        <img src={mlg} {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>Podcasts</Card.Title>
        <Card.Subtitle className='mb-2'>
          <Link to='/mlg'>MLG</Link>&nbsp;&bull;&nbsp;
          <Link to='/mlg'>MLA</Link>
        </Card.Subtitle>
        <p>I teach machine learning fundamental concepts / theory via a popular podcast <Link to='/mlg'>Machine Learning Guide</Link>. I also teach the applied / practicals via an exclusive podcast <Link to='/mlg'>Machine Learning Applied.</Link></p>
      </Col>
    </Row>
    <hr />

    <Row>
      <Col {...col.left}>
        <img src={gnothi} {...img} />
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