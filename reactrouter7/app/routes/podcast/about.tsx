import React from "react";
import {ButtonGroup, Card} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {FaYoutube} from 'react-icons/fa'
import {FaItunesNote} from 'react-icons/fa'
import {RiSpotifyLine} from 'react-icons/ri'
import {SiRss} from 'react-icons/si'
import {IconButton} from "~/components/utils";
import type {ShowType} from "~/content/podcast/types";

import img_llh from '~/assets/logos/llh290.png?w=290&h=290&format=webp&effort=6'
import img_mlg from "~/assets/logos/MLG-Option-1.jpg?w=290&h=290&format=webp&effort=6"
import { Image } from '@unpic/react'

interface About {
  podcastKey: "mlg" | "llh"
  show: ShowType
}

// git-blame: moved them to ./extras
// git-blame: dept links

export default function About(props: About) {
  return <Col className='sidebar-podcasts'>
    <Card className='border-0'>
      <PodcastImage {...props} />
      <Card.Title className='text-center'>{props.show.title}</Card.Title>
      <PodcastLinks {...props} />
    </Card>
  </Col>
}

function PodcastImage({podcastKey, show}: About) {
  // git-blame: links underneath; click to show
  return <div>
    <div className="logo mb-3">
      <Image
        width={290} height={290}
        priority={true}
        background="#EEEEEE"
        src={podcastKey === "llh" ? img_llh : img_mlg}
        alt={show.title}
      />
    </div>
    {/*<MLGLinks />*/}
  </div>
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