import React from 'react';
import {Row, Col, Container, ButtonGroup, Card} from 'react-bootstrap'
import {Outlet} from 'react-router';
import {FaYoutube} from '@react-icons/all-files/fa/FaYoutube'
import {FaItunesNote} from '@react-icons/all-files/fa/FaItunesNote'
import {RiSpotifyLine} from '@react-icons/all-files/ri/RiSpotifyLine'
import {SiRss} from '@react-icons/all-files/si/SiRss'
import {IconButton} from "~/components/utils";
import { Image } from '@unpic/react'
import type {Route} from './+types/route_mlg'

type Props = Route.ComponentProps['loaderData'] & {img: string}
export default function Podcast(props: Props) {
  return <>
    <Container className={`podcast-${props.podcastKey}`}>
      <Row>
        <Col xs={12} md={5} className='sidebar'>
          <Row>
            <About {...props} />
          </Row>
        </Col>
        <Col xs={12} md={7}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </>
}


// git-blame: moved them to ./extras
// git-blame: dept links

function About(props: Props) {
  return <Col className='sidebar-podcasts'>
    <Card className='border-0'>
      <PodcastImage {...props} />
      <Card.Title className='text-center'>{props.show.title}</Card.Title>
      <PodcastLinks {...props} />
    </Card>
  </Col>
}

function PodcastImage({podcastKey, show, img}: Props) {
  // git-blame: links underneath; click to show
  // git-blame: attempted sourcesets with avif/webp fallback
  return <div>
    <div className="mb-3 d-none d-md-flex justify-content-center align-items-center">
      <Image
        width={290} height={290}

        // priority={true}
        loading="eager"
        fetchPriority="high"
        decoding="async"

        background="#EEEEEE"
        src={img}
        alt={show.title}
      />
    </div>
    {/*<MLGLinks />*/}
  </div>
}

function PodcastLinks({podcastKey, show}: Props) {
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
      <div className="mt-2">
        {show.body}
      </div>
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
        href="http://machinelearningguide.libsyn.com/rss"
        rel="nofollow"
        Icon={SiRss}
      >Custom (RSS)</IconButton>
    </ButtonGroup>
    <div className="mt-2">
      {show.body}
    </div>
  </>
}
