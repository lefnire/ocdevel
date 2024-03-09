import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {Link} from "react-router-dom";
import avatar from '../../assets/avatar.jfif'
import mlg from '../../assets/MLG-Option-1.jpg'
import twobird from '../../assets/twobird_icon.png'
import gnothi from '../../assets/GnothiNew.png'
import {Helmet} from "react-helmet-async";
import blog from '../../assets/blog.png';
import us from '../../assets/Us.png';

export default function Home() {
  const img = {
    style: {width: "100%", maxWidth: 100},
    className: 'rounded',
  }
  const col = {left: {sm: 12, md: 3, className: 'text-center mb-2'}, right: {sm: 12, md: 9}}
  return <Container className="hero-container">
    <Helmet>
      <title>OCDevel</title>
    </Helmet>
    <Row className="hero-sections">
      <Col {...col.left}>
        <img src={twobird} {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>Lifehacks</Card.Title>
        <Card.Subtitle className='mb-2'>
          <Link to='/contact'>Podcast</Link>&nbsp;&bull;&nbsp;
          <Link to='/blog'>Resources</Link>
        </Card.Subtitle>
        <p>OCDevel is just me, Tyler (single-member LLC). I'm an ex-web/mobile developer gone machine learning
          engineer. I've worked with high-profile clients, mostly part-time contracting. I teach ML and work on fun ML
          side-projects (see below).</p>
        {/*<Alert variant='info'><FaSuitcase /> Hire me! See <Link to='/contact'>Contact/Hire page.</Link></Alert>*/}
      </Col>
    </Row>

<Row className="hero-sections">
  <Col {...col.left}>
        <img src={blog} {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>Blog</Card.Title>
        <Card.Subtitle className='mb-2'>
          <Link to='/contact'>Treadmills</Link>&nbsp;&bull;&nbsp;
          <Link to='/blog'>Keyboards</Link>&nbsp;&bull;&nbsp;
          <Link to='/blog'>Mice</Link>
        </Card.Subtitle>
        <p>OCDevel is just me, Tyler (single-member LLC). I'm an ex-web/mobile developer gone machine learning engineer.
          I've worked with high-profile clients, mostly part-time contracting. I teach ML and work on fun ML
          side-projects (see below).</p>
        {/*<Alert variant='info'><FaSuitcase /> Hire me! See <Link to='/contact'>Contact/Hire page.</Link></Alert>*/}
      </Col>
    </Row>

<Row className="hero-sections">
  <Col {...col.left}>
        <img src={mlg} {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>MLG</Card.Title>
        <Card.Subtitle className='mb-2'>
          <Link to='/mlg'>Podcast</Link>&nbsp;&bull;&nbsp;
          <Link to='/mlg'>Resources</Link>
        </Card.Subtitle>
        <p>I teach machine learning fundamental concepts via a popular podcast <Link to='/mlg'>Machine Learning
          Guide</Link>.</p>
      </Col>
    </Row>

<Row className="hero-sections">
  <Col {...col.left}>
        <img src={gnothi} {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>AI Journal</Card.Title>
        <Card.Subtitle className='mb-2'>
          <a href='https://gnothiai.com' target='_blank'>Website</a>&nbsp;&bull;&nbsp;
          <a href='https://habitica.com' target='_blank'>Github</a>
        </Card.Subtitle>
        <p>I've built quite a few fun projects, mostly centered around self-improvement - a passion of mine. My two
          favorites are Habitica (no longer with the company), a gamified habit-tracker; and Gnothi, a journal that uses
          AI to provide insights & resources. See <Link to='/contact'>about me</Link> for more projects.</p>
      </Col>
    </Row>

    <Row className="hero-sections">
  <Col {...col.left}>
        <img src={us} {...img} />
      </Col>
      <Col {...col.right}>
        <Card.Title>Martha & Tyler</Card.Title>
        <Card.Subtitle className='mb-2'>
          <Link to='/contact'>Our Work</Link>&nbsp;&bull;&nbsp;
          <Link to='/blog'>Contact</Link>
        </Card.Subtitle>
        <p>OCDevel is just me, Tyler (single-member LLC). I'm an ex-web/mobile developer gone machine learning engineer.
          I've worked with high-profile clients, mostly part-time contracting. I teach ML and work on fun ML
          side-projects (see below).</p>
        {/*<Alert variant='info'><FaSuitcase /> Hire me! See <Link to='/contact'>Contact/Hire page.</Link></Alert>*/}
      </Col>
    </Row>
  </Container>
}