import Card from 'react-bootstrap/Card'
import {Col, Row, Container, Stack, Button} from 'react-bootstrap'
import {IconButton} from "~/components/utils";
import {FaCouch} from 'react-icons/fa';
import {FaDragon} from 'react-icons/fa';
import {FaEnvelope} from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa';
import {FaMicrophone} from 'react-icons/fa';
import {FaYoutube} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {SiTiktok} from 'react-icons/si';
import {FaFacebook} from 'react-icons/fa';
import { Link } from "react-router";
import type { Route } from "./+types/contact";

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
      {/*<a className="btn btn-primary" href="https://calendly.com/lefnire/60min" target="_blank">Schedule a 60-minute consultation</a>*/}
    </Stack>
    <Stack direction="horizontal" gap={2} className="justify-content-center mt-3">
      {[
        { href: "https://youtube.com/@ocdevel", Icon: FaYoutube },
        { href: "https://instagram.com/ocdevel", Icon: FaInstagram },
        { href: "https://tiktok.com/@lefnire", Icon: SiTiktok },
        { href: "https://facebook.com/ocdevel", Icon: FaFacebook }
      ].map(({ href, Icon }) => (
        <Button
          key={href}
          href={href}
          target="_blank"
          variant="link"
          className="p-1 text-dark fs-5"
        >
          <Icon />
        </Button>
      ))}
    </Stack>
  </>

  const about = <div>
    <Card.Title>Tyler Renelle</Card.Title>
    <Card.Body>
      <p>ML engineer focused on NLP, with experience in computer vision, time series, and RL. I work with Keras, Pytorch, hugginface/transformers, XGBoost, SciPy (sklearn, Pandas, numpy), hyperparameters, etc. Devops with AWS, Docker, SageMaker. Full-stack with Python, Postgres, and React / React Native.</p>
      <p>Creator of Habitica, Gnothi, and MLG. Interested in working with me? <a href="/contact">Contact me here</a>.</p>
    </Card.Body>
  </div>

  const projects = <div>
    <Card.Title>Projects</Card.Title>
    <Card.Body>
      <h6><FaCouch/> <a href="https://gnothiai.com" target="_blank">Gnothi</a></h6>
      <p>An personal journal that uses AI to provide insights & resources. I created and maintain this open source
        project.</p>
      <h6><FaDragon/> <a href="https://habitica.com" target="_blank">Habitica</a></h6>
      <p>A gamified habit tracker. I created Habitica, but am no longer with the company.</p>
      <h6><FaMicrophone/> <Link to="/mlg">Machine Learning Guide</Link></h6>
      <p>I teach the fundamentals of machine learning and artificial intelligence over a podcast.</p>
      <h6><FaMicrophone/> <Link to="/llh">Lefnire's Life Hacks</Link></h6>
      <p>I teach useful efficiencies for productivity and health living in this podcast.</p>
      <h6><FaGithub/> More</h6>
      <p>See my Github and LinkedIn profiles for more projects.</p>
    </Card.Body>
  </div>

  return <Container className='contact-hire'>
    <Row>
      <Col xs={12} lg={3} className='text-center'>
        <img src="assets/avatar.jfif" className='rounded mb-3'/>
        {links}
      </Col>
      <Col xs={12} lg={9}>
        {about}
        {projects}
      </Col>
    </Row>
  </Container>
}

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Contact Tyler Renelle"}
  ]
}