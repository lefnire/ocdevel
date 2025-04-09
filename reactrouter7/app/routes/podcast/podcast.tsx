import Row from 'react-bootstrap/cjs/Row'
import Col from '~/components/col'
import Container from 'react-bootstrap/cjs/Container'
import ButtonGroup from 'react-bootstrap/cjs/ButtonGroup'
import Card from 'react-bootstrap/cjs/Card'
import {Outlet} from 'react-router';
import {FaYoutube} from '@react-icons/all-files/fa/FaYoutube'
import {FaItunesNote} from '@react-icons/all-files/fa/FaItunesNote'
import {RiSpotifyLine} from '@react-icons/all-files/ri/RiSpotifyLine'
import {SiRss} from '@react-icons/all-files/si/SiRss'
import {IconButton, sizes} from "~/components/icon-btn";
import type {Route} from './+types/route_mlg'
import {memo} from "react";

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
      <img
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

const size = "sm"
const linkButtons = {
  youtube: {icon: <FaYoutube size={sizes.base.v} />, label: "YouTube"},
  itunes: {icon: <FaItunesNote size={sizes.base.v} />, label: "iTunes"},
  spotify: {icon: <RiSpotifyLine size={sizes.base.v} />, label: "Spotify"},
  rss: {icon: <SiRss size={sizes.base.v} />, label: "Custom (RSS)"},
}
type PodcastSource = keyof typeof linkButtons

type LinkButton = {id: PodcastSource, href: string}
const btnProps = {size, variant: 'light', target: '_blank'} as const
const LinkButton = memo(({id, href}: LinkButton) => {
  const btnProps_ = {...btnProps, href}
  // @ts-ignore
  if (id === 'rss') { btnProps_['rel'] = 'nofollow' }
  return <IconButton
    btnProps={btnProps_}
    icon={linkButtons[id].icon}
    label={linkButtons[id].label}
  />
})

function PodcastLinks({podcastKey, show}: Props) {

  if (podcastKey === "llh") {
    return <>
      <ButtonGroup className='d-block' vertical>
        <LinkButton id="youtube" href="https://www.youtube.com/playlist?list=PLxSuxy9i_cj2XvfWqGsr5L6Jtlm-wc6lA" />
        <LinkButton id="itunes" href="https://podcasts.apple.com/us/podcast/lefnires-life-hacks/id1745611207" />
        <LinkButton id="spotify" href="https://open.spotify.com/show/1tb7GRSH9m6OyP93M0xZAg?si=ced0307bfcb64ade" />
        <LinkButton id="rss" href="https://feeds.libsyn.com/528247/rss" />
      </ButtonGroup>
      <div className="mt-2">
        {show.body}
      </div>
    </>
  }

  return <>
    <ButtonGroup className='d-block' vertical>
      <LinkButton id="youtube" href="https://www.youtube.com/playlist?list=PLxSuxy9i_cj1EwQIUFJUYonQ1AU3JVVcS" />
      <LinkButton id="itunes" href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130" />
      <LinkButton id="spotify" href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9" />
      <LinkButton id="rss" href="http://machinelearningguide.libsyn.com/rss" />
    </ButtonGroup>
    <div className="mt-2">
      {show.body}
    </div>
  </>
}
