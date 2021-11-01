import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Card, Col, Row, Stack} from "react-bootstrap";
import {
  FaDiscord,
  FaEnvelope, FaGithub,
  FaItunesNote, FaLightbulb,
  RiGooglePlayLine,
  RiSpotifyLine,
  SiRss,
  SiStitcher
} from "react-icons/all";
import {btns, icons, Popover_} from "../utils";
import {mlg, mla} from "../../../content/podcast";
import scout from "../../../assets/mlg_w_txt.jpg";
import deptLogo from "./dept-logo.png";

function AboutSection({children, title, top=false}) {
  const [show, setShow] = useState(true)

  return <>
    <Card.Header
      className={`pointer border-bottom-0 ${top ? '' : 'border-top'}`}
      onClick={() => setShow(!show)}
    >
      <Card.Title className='text-center mb-0'>
        {show ? icons.down : icons.right}{' '}
        {title}
      </Card.Title>
    </Card.Header>
    {show && <Card.Body>{children}</Card.Body>}
  </>
}

function ShowMoreLess({podcast}) {
  const [showMore, setShowMore] = useState(false)

  return <div className="mt-2">
    {showMore ? podcast.body : podcast.teaser}
    <a
      className='ms-2 text-primary text-decoration-underline pointer'
      onClick={() => setShowMore(!showMore)}
    >Show {showMore ? "less" : "more"}</a>
  </div>
}

function Links() {
  const common = {
    div: {xs: 12, sm: 6, xxl: 3, className: 'center-content'},
    a: {className: 'text-dark pointer text-center'},
  }

  return <Row className='episodes-links'>
    <Col {...common.div}>
      <Link to="/mlg/recommend" {...common.a}>
        <FaLightbulb {...btns.icon} />
        <span {...common.span}>Suggest Episode</span>
      </Link>
    </Col>

    <Col {...common.div}>
      <Popover_
        content={<div>Get notified of new episodes and announcements</div>}
        opts={{placement: 'bottom'}}
      >
        <a {...common.a} href="http://eepurl.com/cUUWfD" target="_blank">
          <FaEnvelope {...btns.icon} />
          <span {...common.span}>Mailing List</span>
        </a>
      </Popover_>
    </Col>

    <Col {...common.div}>
      <Popover_
        content={<div>Gnothi, oft-mentioned in MLG, is open source. See how to implement ML in Python.</div>}
        opts={{placement: 'bottom'}}
      >
        <a {...common.a} href="https://github.com/lefnire/gnothi" target='_blank'>
          <FaGithub {...btns.icon} />
          <span {...common.span}>Podcast Project</span>
        </a>
      </Popover_>
    </Col>

    <Col {...common.div}>
      <Popover_
        content={<div>Join fellow learners on Discord to ask questions and network</div>}
        opts={{placement: 'bottom'}}
      >
        <a {...common.a} href="https://discord.gg/2j2RUVbu" target='_blank'>
          <FaDiscord {...btns.icon} />
          <span {...common.span}>Community</span>
        </a>
      </Popover_>
    </Col>
  </Row>
}

function MLG() {
  const [showLinks, setShowLinks] = useState(false)

  return <>
    <div className="logo">
      <img src={scout} alt="Machine Learning Guide" />
    </div>

    {showLinks ? <>
      <ButtonGroup className='d-block' vertical>
        <Button {...btns.iconBtn} href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130">
          <FaItunesNote {...btns.icon} target="_blank" /> iTunes
        </Button>
        <Button {...btns.iconBtn} href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9">
          <RiSpotifyLine {...btns.icon} target="_blank" /> Spotify
        </Button>
        <Button {...btns.iconBtn} href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw=='>
          <RiGooglePlayLine {...btns.icon} target="_blank" /> Google Podcasts
        </Button>
        <Button {...btns.iconBtn} href="http://www.stitcher.com/s?fid=130679&refid=stpr">
          <SiStitcher {...btns.icon} target="_blank" /> Stitcher
        </Button>
        <Button {...btns.iconBtn} href="http://machinelearningguide.libsyn.com/rss"rel="nofollow">
          <SiRss {...btns.icon} target="_blank" /> Custom (RSS)
        </Button>
      </ButtonGroup>
    </> : <>
      <Button variant='outline-primary w-100' onClick={() => setShowLinks(true)}>Get It</Button>
    </>}

    <ShowMoreLess podcast={mlg} />
  </>
}

function Dept() {
  const [showLinks, setShowLinks] = useState(false)

  const dept = {
    teaser: "MLG is now part of Dept, who's resurrecting the podcast. Dept works in data / ML, and is looking for talent and clients. Work with us!",
    body: `Dept is a digital agency of more than 2,000 thinkers and makers spread all across the globe who specialize in technology, design, strategy, data, and everything in between. Over the course of MLG, I’ll be drawing on a bunch of examples of real-life work that Dept has completed for our clients. As always, if you’re interested in working with us, click above.`
  }

  const common = {
    btn: {variant: "outline-primary", target: "_blank"}
  }

  return <>
    <div className="logo logo-dept">
      <img src={deptLogo} alt="Dept Agency"/>
    </div>
    {showLinks ? <>
      <ButtonGroup className='d-block' vertical>
        <Button {...common.btn} href="https://www.deptagency.com/contact/">
          Hire Dept
        </Button>
        <Button {...common.btn} href="https://www.deptagency.com/careers/">
          Get Hired
        </Button>
      </ButtonGroup>

    </> : <>
      <Button
        variant='outline-primary'
        className='w-100'
        onClick={() => setShowLinks(true)}>
        Work with us
      </Button>
    </>}
    <ShowMoreLess podcast={dept}/>
  </>
}

function Podcasts() {
  return <AboutSection title='About' top={true}>
    <Row>
      <Col>
        <MLG />
      </Col>
      <Col>
        <Dept />
      </Col>
    </Row>
    <hr />
    <Links />
  </AboutSection>
}

function Updates() {
  return <AboutSection title='Updates'>
    <div className="mb-3 mlg-update ps-3">
      <Card.Title className='mb-1'>2021-10-20: Dept acquisition</Card.Title>
      <p><a target="_blank" href="https://deptagency.com">Dept</a> has acquired MLG, to allow me to finish the re-do! They're sponsoring merging MLA into the main feed, so the Patreon is going away - expect that content soon!</p>
    </div>
    <hr />
    <div className="text-muted mb-3 ps-3">
      <Card.Title className='mb-1'>2020-12-19: Podcast re-do</Card.Title>
      <p>I'm re-doing MLG (2nd edition) to refresh resources & concepts to 2021. Starting now use <Link to="/mlg/resources">Resources</Link>, and ignore the resources discussed in the episodes. Then I can to keep resources updated without editing episodes. I'm removing checkpoints and irrelevant episodes to make room for new ones - so if you see see "holes" that's normal. I'll keep the Bitcoin Trading episode, as it's info-packed, but the podcast project is now <a href='https://gnothiai.com' target='_blank'>Gnothi</a>.</p>
    </div>
  </AboutSection>
}

export default function About() {
  return <Col className='sidebar-podcasts'>
    <Card className='border-0'>
      <Podcasts />
      <Updates />
    </Card>
  </Col>
}