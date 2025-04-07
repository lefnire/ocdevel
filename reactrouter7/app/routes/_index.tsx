import Col_ from 'react-bootstrap/cjs/Col'
const Col = Col_.default || Col_
import Row from 'react-bootstrap/cjs/Row'
import Container from 'react-bootstrap/cjs/Container'
import Stack from 'react-bootstrap/cjs/Stack'
import Button from 'react-bootstrap/cjs/Button'
import {IconButton, sizes} from "~/components/icon-btn";
import {FaCouch} from '@react-icons/all-files/fa/FaCouch';
import {FaDragon} from '@react-icons/all-files/fa/FaDragon';
import {FaEnvelope} from '@react-icons/all-files/fa/FaEnvelope';
import {FaGithub} from '@react-icons/all-files/fa/FaGithub';
import {FaLinkedin} from '@react-icons/all-files/fa/FaLinkedin';
import {FaMicrophone} from '@react-icons/all-files/fa/FaMicrophone';
import {FaYoutube} from '@react-icons/all-files/fa/FaYoutube';
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram';
import {SiTiktok} from '@react-icons/all-files/si/SiTiktok';
import {FaFacebook} from '@react-icons/all-files/fa/FaFacebook';
import { Link } from "react-router";
import type { Route } from "./+types/_index";

import img_tyler from '~/assets/logos/avatar.jfif?w=200&h=200&format=webp&effort=max'

const icn = {size: sizes.base.v}
const icons = {
  linkedin: <FaLinkedin {...icn} />,
  github: <FaGithub {...icn} />,
  email: <FaEnvelope {...icn} />,
  youtube: <FaYoutube {...icn} />,
  instagram: <FaInstagram {...icn} />,
  tiktok: <SiTiktok {...icn} />,
  facebook: <FaFacebook {...icn} />
}

export default function Home() {
  const links = <>
    <Stack direction="vertical" gap={2}>
      <IconButton
        btnProps={{target: "_blank", href: "https://www.linkedin.com/in/lefnire"}}
        icon={icons.linkedin}
        label="LinkedIn"
      />
      <IconButton
        btnProps={{target: "_blank", href: "https://github.com/lefnire"}}
        icon={icons.github}
        label="Github"
      />
      <IconButton
        btnProps={{href: "mailto:tylerrenelle@gmail.com"}}
        icon={icons.email}
        label="Email"
      />
      {/*<a className="btn btn-primary" href="https://calendly.com/lefnire/60min" target="_blank">Schedule a 60-minute consultation</a>*/}
    </Stack>
    <Stack direction="horizontal" gap={2} className="justify-content-center mt-3">
      {[
        { href: "https://youtube.com/@ocdevel", icon: icons.youtube },
        { href: "https://instagram.com/ocdevel", icon: icons.instagram },
        { href: "https://tiktok.com/@lefnire", icon: icons.tiktok },
        { href: "https://facebook.com/ocdevel", icon: icons.facebook }
      ].map(({ href, icon }) => (
        <Button
          key={href}
          href={href}
          target="_blank"
          variant="link"
          className="p-1 text-dark fs-5"
        >
          {icon}
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
      <p>A machine learning podcast teaching the fundamentals of machine learning and artificial intelligence, both theory and practical application.</p>
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
        <img
          src={img_tyler}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={200}
          height={200}
          alt="Profile photo"
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
    { name: "description", content: "Home of Machine Learning Guide (MLG), a machine learning podcast teaching ML & AI fundamentals. Reviews of walking desks and office ergonomics." },
  ];
}