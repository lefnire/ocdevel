import React from 'react'
import {Card, Col, Row, Container, Button, Stack} from "react-bootstrap";
import {IconButton} from "../../utils";
import avatar from "../../assets/avatar.jfif";
import {FaCouch, FaDragon, FaEnvelope, FaGithub, FaLinkedin, FaMicrophone} from "react-icons/all";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function Contact() {
  const links = <>
    <Stack direction="vertical" gap={2}>
      <IconButton
        target="_blank"
        href="https://www.linkedin.com/in/lefnire"
        Icon={FaLinkedin}
      >LinkedIn</IconButton>
      <IconButton
        target="_blank"
        href="https://github.com/lefnire"
        Icon={FaGithub}
      >Github</IconButton>
      <IconButton
        href="mailto:tylerrenelle@gmail.com"
        Icon={FaEnvelope}
      >Email</IconButton>
    </Stack>
  </>

  const about = <div>
    <Card.Title>Tyler Renelle</Card.Title>
    <Card.Body>
      <p>ML engineer focused on NLP, with experience in computer vision, time series, and RL. I work with Keras, Pytorch, hugginface/transformers, XGBoost, SciPy (sklearn, Pandas, numpy), hyperparameters, etc. Devops with AWS, Docker, SageMaker. Full-stack with Python, Postgres, and React / React Native.</p>
      <p>Creator of Habitica, Gnothi, and MLG. Interested in working with me? Contact <a target="_blank" href="https://www.deptagency.com/en-us/contact/">Dept Agency</a>, tell them you want Tyler on your project!</p>
    </Card.Body>
  </div>

  const projects = <div>
    <Card.Title>Projects</Card.Title>
    <Card.Body>
      <h6><FaCouch /> <a href="https://gnothiai.com" target="_blank">Gnothi</a></h6>
      <p>An personal journal that uses AI to provide insights & resources. I created and maintain this open source project.</p>
      <h6><FaDragon /> <a href="https://habitica.com" target="_blank">Habitica</a></h6>
      <p>A gamified habit tracker. I created Habitica, but am no longer with the company.</p>
      <h6><FaMicrophone /> <Link to="/mlg">Machine Learning Guide</Link></h6>
      <p>I teach the fundamentals of machine learning and artificial intelligence over a podcast.</p>
      <h6><FaGithub /> More</h6>
      <p>See my Github and LinkedIn profiles for more projects.</p>
    </Card.Body>
  </div>

  return <Container className='contact-hire'>
    <Helmet>
      <title>Contact Tyler Renelle</title>
    </Helmet>
    <Row>
      <Col xs={12} lg={3} className='text-center'>
        <img src={avatar} className='rounded mb-3'/>
        {links}
      </Col>
      <Col xs={12} lg={9}>
        {about}
        {projects}
      </Col>
    </Row>
  </Container>
}