import React, {useState} from "react";
import {Link} from "react-router";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {FaDiscord} from 'react-icons/fa'
import {FaYoutube} from 'react-icons/fa'
import {FaEnvelope} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
import {FaItunesNote} from 'react-icons/fa'
import {FaLightbulb} from 'react-icons/fa'
import {RiGooglePlayLine} from 'react-icons/ri'
import {RiSpotifyLine} from 'react-icons/ri'
import {SiRss} from 'react-icons/si'
import {SiStitcher} from 'react-icons/si'
import {icons, Popover_} from "~/components/utils";
import {mlg, llh} from "~/content/podcast";
// import scout from "../../../assets/MLG-Option-1.jpg";
// import deptLogo from "../../../assets/dept.jpg";
import {IconButton} from "~/components/utils";
import useStore from "~/store/episodes";
import {FaBusinessTime} from "react-icons/fa";
import {FaUserPlus} from "react-icons/fa";
import {usePodcastKey} from "~/components/utils.tsx";

const scout = "/assets/MLG-Option-1.jpg"

function AboutSection({children, title, show, toggle, top=false}) {
  return <>
    <Card.Header
      className={`pointer border-bottom-0 ${top ? '' : 'border-top'}`}
      onClick={toggle}
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
  const key = usePodcastKey()
  if (key === "llh") { return null; }
  const common = {
    div: {xs: 12, md: 6, className: 'p-1'},
  }
  const btn = {variant: 'light'}

  function SuggestEpisode() {
    // no longer working
    return null;
    return <Col {...common.div}>
      <IconButton
        {...btn}
        href="/mlg/recommend"
        Icon={FaLightbulb}
        >Suggest Episode</IconButton>
    </Col>
  }

  function MailingList() {
    return <Popover_
      content={<div>Get notified of new episodes and announcements</div>}
      opts={{placement: 'bottom'}}
    >
      <Col {...common.div}>
        <IconButton {...btn} href="http://eepurl.com/cUUWfD" target="_blank" Icon={FaEnvelope}>
          Mailing List
        </IconButton>
      </Col>
    </Popover_>
  }

  function PodcastProject() {
    return <Popover_
      content={<div>Gnothi, oft-mentioned in MLG, is open source. See how to implement ML in Python.</div>}
      opts={{placement: 'bottom'}}
    >
      <Col {...common.div}>
        <IconButton {...btn} href="https://github.com/lefnire/gnothi" target='_blank' Icon={FaGithub}>
          Podcast Project
        </IconButton>
      </Col>
    </Popover_>
  }

  function Community() {
    // Discord gone after Dept
    return null;
    return <Popover_
      content={<div>Join fellow learners on Discord to ask questions and network</div>}
      opts={{placement: 'bottom'}}
    >
      <Col {...common.div}>
        <IconButton {...btn} href="https://discord.gg/2j2RUVbu" target='_blank' Icon={FaDiscord}>
          Community
        </IconButton>
      </Col>
    </Popover_>
  }

  return <>
    <hr />
    <Row>
      <SuggestEpisode />
      <MailingList />
      <PodcastProject />
      <Community />
    </Row>
  </>
}

function PodcastLinks() {
  const btn = {size: 'sm', variant: 'light', target: '_blank'}
  const key = usePodcastKey()

  if (key === "llh") {
    return <>
      <ButtonGroup className='d-block' vertical>
        <IconButton
          {...btn}
          href="https://www.youtube.com/playlist?list=PLxSuxy9i_cj2XvfWqGsr5L6Jtlm-wc6lA"
          Icon={FaYoutube}
        >YouTube</IconButton>
        <IconButton
          {...btn}
          href="https://podcasts.apple.com/us/podcast/lefnires-life-hacks/id1745611207"
          Icon={FaItunesNote}
        >iTunes</IconButton>
        <IconButton
          {...btn}
          href="https://open.spotify.com/show/1tb7GRSH9m6OyP93M0xZAg?si=ced0307bfcb64ade"
          Icon={RiSpotifyLine}
        >Spotify</IconButton>
        <IconButton
          {...btn}
          href="https://feeds.libsyn.com/528247/rss" rel="nofollow"
          Icon={SiRss}
        >Custom (RSS)</IconButton>
      </ButtonGroup>
      <ShowMoreLess podcast={llh} />
    </>
  }

  return <>
    <ButtonGroup className='d-block' vertical>
      <IconButton
        {...btn}
        href="https://www.youtube.com/playlist?list=PLxSuxy9i_cj1EwQIUFJUYonQ1AU3JVVcS"
        Icon={FaYoutube}
      >YouTube</IconButton>
      <IconButton
        {...btn}
        href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130"
        Icon={FaItunesNote}
      >iTunes</IconButton>
      <IconButton
        {...btn}
        href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9"
        Icon={RiSpotifyLine}
      >Spotify</IconButton>
      <IconButton
        {...btn}
        href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw=='
        Icon={RiGooglePlayLine}
      >Google Podcasts</IconButton>
      <IconButton
        {...btn}
        href="http://www.stitcher.com/s?fid=130679&refid=stpr"
        Icon={SiStitcher}
      >Stitcher</IconButton>
      <IconButton
        {...btn}
        href="http://machinelearningguide.libsyn.com/rss"rel="nofollow"
        Icon={SiRss}
      >Custom (RSS)</IconButton>
    </ButtonGroup>
    <ShowMoreLess podcast={mlg} />
  </>
}

function PodcastImage() {
  // git-blame: links underneath; click to show
  const key = usePodcastKey()
  const img = key === "llh" ? <img src="/llh290.png" alt="Lefnire's Life Hacks"/>
      // TODO use public link instead of importing image?
      : <img src={scout} alt="Machine Learning Guide"/>
  return <div>
    <div className="logo mb-3">
      {img}
    </div>
    {/*<MLGLinks />*/}
  </div>
}

function Updates() {
  // hiding for now; bring bakc later
  return null;
  const show = useStore(s => s.showUpdates)
  const toggle = useStore(s => s.toggleUpdates)
  
  return <AboutSection title='Updates' show={show} toggle={toggle}>
    <div className="mb-3 mlg-update ps-3">
      <Card.Title className='mb-1'>2024-01-11: Battle Station</Card.Title>
      <p>See Tyler's workstation recommendations: <Link to="/blog/20240109-fitness-desk">walking desk</Link> and <Link to="/blog/20240110-ergo-mouse-keyboard">keyboard + mouse.</Link></p>
    </div>
    {/* git-blame dept */}
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

// git-blame: dept links

function Podcasts() {
  const show = useStore(s => s.showAbout)
  const toggle = useStore(s => s.toggleAbout)

  return <AboutSection
      title='About'
      top={true}
      show={show}
      toggle={toggle}
  >
    <Row>
      <Col>
        <PodcastImage />
      </Col>
      <Col>
        <PodcastLinks />
      </Col>
    </Row>
    <Links />
  </AboutSection>
}