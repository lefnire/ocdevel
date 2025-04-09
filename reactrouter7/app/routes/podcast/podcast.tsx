import Row from 'react-bootstrap/cjs/Row'
import Col from '~/components/col'
import Container from 'react-bootstrap/cjs/Container'
import Card from 'react-bootstrap/cjs/Card'
import {Outlet} from 'react-router';
import {FaYoutube} from '@react-icons/all-files/fa/FaYoutube'
import {FaItunesNote} from '@react-icons/all-files/fa/FaItunesNote'
import {RiSpotifyLine} from '@react-icons/all-files/ri/RiSpotifyLine'
import {SiRss} from '@react-icons/all-files/si/SiRss'
import {IconButton, sizes} from "~/components/icon-btn";
import type {Route} from './+types/route_mlg'
import {memo} from "react";
import {FaEnvelope} from "@react-icons/all-files/fa/FaEnvelope";
import type {ButtonProps} from "react-bootstrap/cjs/Button";

type Props = Route.ComponentProps['loaderData'] & {img: string}
export default function Podcast(props: Props) {
  return <>
    <Container className={`podcast-${props.podcastKey}`}>
      <Row>
        <Col xs={12} md={5} className='sidebar'>
          <div className="sidebar-podcasts">
            <About {...props} />
          </div>
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

function About({podcastKey, show, img}: Props) {
  const links_ = (
    podcastKey === 'llh' ? [
      {id:"itunes", href: "https://podcasts.apple.com/us/podcast/lefnires-life-hacks/id1745611207"},
      {id:"spotify", href: "https://open.spotify.com/show/1tb7GRSH9m6OyP93M0xZAg?si=ced0307bfcb64ade"},
      {id:"youtube", href: "https://www.youtube.com/playlist?list=PLxSuxy9i_cj2XvfWqGsr5L6Jtlm-wc6lA"},
      {id:"rss", href: "https://feeds.libsyn.com/528247/rss"},
    ] : [
      {id:"itunes", href:"https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130"},
      {id:"spotify", href:"https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9"},
      {id:"youtube", href:"https://www.youtube.com/playlist?list=PLxSuxy9i_cj1EwQIUFJUYonQ1AU3JVVcS"},
      {id:"rss", href:"http://machinelearningguide.libsyn.com/rss"},
      {id:"email", href:"http://eepurl.com/cUUWfD"},
    ]
  )
  const links = links_.map(l => (
    <LinkButton id={l.id as PodcastSource} href={l.href} key={l.id} />
  ))

  // git-blame: links underneath; click to show
  // git-blame: attempted sourcesets with avif/webp fallback
  const image = <img
    width={250} height={250}
    className='w-100 h-100'
    // priority={true}
    loading="eager"
    fetchPriority="high"
    decoding="async"

    background="#EEEEEE"
    src={img}
    alt={show.title}
  />

  return <>
    <Card.Title className='text-center'>{show.title}</Card.Title>
    <Row className="my-3 justify-content-center align-items-center">
      <Col lg={6} sm={12} className="d-none d-md-flex">
        {image}
      </Col>
      <Col lg={6} sm={12} className='d-flex flex-column'>
        {links}
      </Col>
    </Row>
    <div className="mt-2">
      {show.body}
    </div>
  </>
}


const size = undefined
const linkButtons = {
  youtube: {icon: <FaYoutube size={sizes.base.v} />, label: "YouTube"},
  itunes: {icon: <FaItunesNote size={sizes.base.v} />, label: "iTunes"},
  spotify: {icon: <RiSpotifyLine size={sizes.base.v} />, label: "Spotify"},
  rss: {icon: <SiRss size={sizes.base.v} />, label: "RSS"},
  email: {icon: <FaEnvelope size={sizes.base.v} />, label: "Mailing List"}
}
type PodcastSource = keyof typeof linkButtons

type LinkButton = {id: PodcastSource, href: string}
const btnProps: ButtonProps = {size, variant: 'light', target: '_blank'} as const
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

