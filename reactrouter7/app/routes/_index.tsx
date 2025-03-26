import {Col, Row, Container, Stack, Button, Card} from 'react-bootstrap'
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
import type { Route } from "./+types/_index";

import {Image} from '@unpic/react'
import img_tyler from '~/assets/logos/avatar.jfif?w=200&h=200&format=webp'

export default function Home() {
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
    <h3>Tyler Renelle</h3>
    <div>
      <p>Full-stack engineer in machine learning, websites, and mobile apps. Big on workspace ergonomics, especially <Link to="/walk">walking desks</Link>.</p>
      {/*<p>Creator of Habitica, Gnothi, and MLG. Interested in working with me? <a href="mailto:tylerrenelle@gmail.com">Contact me for consultant work!</a></p>*/}
    </div>
  </div>

  const projects = <div>
    <h3>Projects</h3>
    <div>
      <h6><FaMicrophone/> <Link to="/mlg">Machine Learning Guide</Link></h6>
      <p>This podcast teaches the fundamentals of machine learning and artificial intelligence. Both theory and practical application.</p>
      <h6><FaMicrophone/> <Link to="/llh">Lefnire's Life Hacks</Link></h6>
      <p>This podcast teaches useful efficiencies for productivity and health living.</p>
      <h6><FaCouch/> <a href="https://gnothiai.com" target="_blank">Gnothi</a></h6>
      <p>A journal that uses AI to provide insights & resources. I created and maintain this open source
        project.</p>
      <h6><FaDragon/> <a href="https://habitica.com" target="_blank">Habitica</a></h6>
      <p>A gamified habit tracker. I created Habitica, but am no longer with the company.</p>
      <h6><FaGithub/> More</h6>
      <p>See my Github and LinkedIn profiles for more projects.</p>
    </div>
  </div>

  return <Container className='contact-hire'>
    <Row>
      <Col xs={12} lg={3} className='text-center'>
        <Image
          src={img_tyler}
          width={200}
          height={200}
          className='rounded mb-3'
        />
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
    { title: "OCDevel" },
    { name: "description", content: "Machine Learning Guide podcast, treadmill desks, and life hacks." },
  ];
}