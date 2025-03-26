import React, {useState} from "react";
import {Link, useMatches} from "react-router";
import {Button, ButtonGroup, Card} from 'react-bootstrap'
import {Col, Row} from 'react-bootstrap'
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
import {IconButton} from "~/components/utils";
import useStore from "~/store/episodes";
import type {ShowType} from "~/content/podcast/types";
import {useShallow} from "zustand/react/shallow";

import img_llh from '~/assets/logos/llh290.png?w=290&h=290&format=webp'
import img_mlg from "~/assets/logos/MLG-Option-1.jpg?w=290&h=290&format=webp"
import { Image } from '@unpic/react'

interface About {
  podcastKey: "mlg" | "llh"
  show: ShowType
}

type AboutSection = React.PropsWithChildren<{title: string, top?: boolean}>
function AboutSection({children, title, top=false}: AboutSection) {
  const [showAbout, toggleAbout] = useStore(useShallow(state => [state.showAbout, state.toggleAbout]))
  return <>
    <Card.Header
      className={`pointer border-bottom-0 ${top ? '' : 'border-top'}`}
      onClick={toggleAbout}
    >
      <Card.Title className='text-center mb-0'>
        {showAbout ? icons.down : icons.right}{' '}
        {title}
      </Card.Title>
    </Card.Header>
    {showAbout && <Card.Body>{children}</Card.Body>}
  </>
}

function ShowMoreLess({show}: { show: ShowType }) {
  const [showMore, setShowMore] = useState(false)

  return <div className="mt-2">
    {showMore ? show.body : show.teaser}
    <a
      className='ms-2 text-primary text-decoration-underline pointer'
      onClick={() => setShowMore(!showMore)}
    >Show {showMore ? "less" : "more"}</a>
  </div>
}

function Links({podcastKey}: About) {
  const matches = useMatches()
  if (podcastKey === "llh") { return null; }
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

function PodcastLinks({podcastKey, show}: About) {
  const btn = {size: 'sm', variant: 'light', target: '_blank'}

  if (podcastKey === "llh") {
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
      <ShowMoreLess show={show} />
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
        href="http://machinelearningguide.libsyn.com/rss"
        rel="nofollow"
        Icon={SiRss}
      >Custom (RSS)</IconButton>
    </ButtonGroup>
    <ShowMoreLess show={show} />
  </>
}

function PodcastImage({podcastKey, show}: About) {
  // git-blame: links underneath; click to show
  return <div>
    <div className="logo mb-3">
      <img
        width={290} height={290}
        src={podcastKey === "llh" ? img_llh : img_mlg}
        alt={show.title}
      />
    </div>
    {/*<MLGLinks />*/}
  </div>
}

function Updates(props: About) {
  // hiding for now; bring bakc later
  return null;
  const show = useStore(s => s.showUpdates)
  const toggle = useStore(s => s.toggleUpdates)
  
  return <AboutSection title='Updates' show={show} toggle={toggle}>
    <div className="mb-3 mlg-update ps-3">
      <Card.Title className='mb-1'>2024-01-11: Battle Station</Card.Title>
      <p>See Tyler's workstation recommendations: <Link to="/walk">walking desk</Link> and <Link to="/blog/20240110-ergo-mouse-keyboard">keyboard + mouse.</Link></p>
    </div>
    {/* git-blame dept */}
    <hr />
    <div className="text-muted mb-3 ps-3">
      <Card.Title className='mb-1'>2020-12-19: Podcast re-do</Card.Title>
      <p>I'm re-doing MLG (2nd edition) to refresh resources & concepts to 2021. Starting now use <Link to="/mlg/resources">Resources</Link>, and ignore the resources discussed in the episodes. Then I can to keep resources updated without editing episodes. I'm removing checkpoints and irrelevant episodes to make room for new ones - so if you see see "holes" that's normal. I'll keep the Bitcoin Trading episode, as it's info-packed, but the podcast project is now <a href='https://gnothiai.com' target='_blank'>Gnothi</a>.</p>
    </div>
  </AboutSection>
}

export default function About(props: About) {
  return <Col className='sidebar-podcasts'>
    <Card className='border-0'>
      <Podcasts {...props} />
      <Updates {...props} />
    </Card>
  </Col>
}

// git-blame: dept links

function Podcasts(props: About) {
  return <AboutSection
    title='About'
    top={true}
  >
    <Row>
      <Col>
        <PodcastImage {...props} />
      </Col>
      <Col>
        <PodcastLinks {...props} />
      </Col>
    </Row>
    <Links {...props} />
  </AboutSection>
}