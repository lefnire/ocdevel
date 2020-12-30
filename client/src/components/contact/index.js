import React, {useState, useEffect} from 'react'
import {Card, Col, Row, Container, Media, Button, Alert} from "react-bootstrap";
import avatar from "../../assets/avatar.jfif";
import {FaCouch, FaDragon, FaGithub, FaLinkedin, FaMicrophone} from "react-icons/all";
import {Link, Route, Switch} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function Contact() {
  const links = <>
    <ul className="list-unstyled w-100">
      <li className='mb-1'>
        <a
          className='zocial linkedin w-100'
          target="_blank"
          href="https://www.linkedin.com/in/lefnire"
        >LinkedIn</a>
      </li>
      <li className='mb-1'>
        <a
          className='zocial github w-100'
          target="_blank"
          href="https://github.com/lefnire"
        >Github</a>
      </li>
      <li className='mb-1'>
        <a
          className='zocial email w-100'
          href="mailto:tylerrenelle@gmail.com"
        >Email</a>
      </li>
    </ul>
  </>

  const img = <>
    <img src={avatar} className='rounded mb-3'/>
  </>

  const about = <div>
    <Card.Title className='text-center'>Tyler Renelle</Card.Title>
    <Alert variant='info'>I'm looking for work! Machine learning engineering or web/mobile development, ideally part-time contracting (1099), my rate is $100/h. Open to discussing full-time roles. Contact me via email or LinkedIn.</Alert>
    <p>ML engineer focused on NLP, with experience in computer vision, time series, and RL. I work with Keras, Pytorch, hugginface/transformers, XGBoost, SciPy (sklearn, Pandas, numpy), hyperparameter optimization, etc. Devops with AWS & Docker. Full-stack with Python/FastAPI, Postgres, and React / React Native. I offer NLP services using robust tooling I maintain at <a href="https://github.com/lefnire/ml-tools" target="_blank">lefnire/ml-tools</a>.</p>
  </div>

  const projects = <div>
    <Card.Title className='text-center'>Projects</Card.Title>
    <Card.Subtitle><FaCouch /> <a href="https://gnothiai.com" target="_blank">Gnothi</a></Card.Subtitle>
    <p>An personal journal that uses AI to provide insights & resources. I created and maintain this open source project.</p>
    <Card.Subtitle><FaDragon /> <a href="https://habitica.com" target="_blank">Habitica</a></Card.Subtitle>
    <p>A gamified habit tracker. I created Habitica, but am no longer with the company.</p>
    <Card.Subtitle><FaMicrophone /> <Link to="/mlg">Machine Learning Guide</Link></Card.Subtitle>
    <p>I teach the fundamentals of machine learning and artificial intelligence over a podcast.</p>
    <Card.Subtitle><FaGithub /> More</Card.Subtitle>
    <p>See my Github and LinkedIn profiles for more projects.</p>
  </div>

  return <Container className='contact-hire'>
    <Helmet>
      <title>Contact Tyler Renelle</title>
    </Helmet>
    <Row>
      <Col xs={12} lg={3} className='text-center'>
        {img}
        {links}
      </Col>
      <Col xs={12} lg={9}>
        {about}
        {projects}
      </Col>
    </Row>
  </Container>
}