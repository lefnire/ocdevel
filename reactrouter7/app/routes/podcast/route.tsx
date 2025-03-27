import React from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import {Outlet} from 'react-router';
import About from "./about"
import type {Route} from './+types/route.tsx'
import {mlgShow, llhShow} from "~/content/podcast/metas.js";
import Navbar from './navbar'

export function loader({request}: Route.LoaderArgs) {
  const llh = request.url.includes('/llh')
  if (llh) {
    return {podcastKey: "llh", show: llhShow}
  }
  return {podcastKey: "mlg", show: mlgShow}
}

export default function PodcastLayout({loaderData}: Route.ComponentProps) {
  const {podcastKey, show} = loaderData

  return <>
    {podcastKey === 'mlg' && <Navbar />}
    <Container className={`podcast-${podcastKey}`}>
      <Row>
        <Col xs={12} md={5} className='sidebar'>
          <Row>
            <About show={show} podcastKey={podcastKey} />
          </Row>
        </Col>
        <Col xs={12} md={7}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </>
}

export function meta({data}: Route.MetaArgs) {
  return [
    {title: `${data.show.title} Podcast`},
    {name: "description", content: data.show.body}
  ]
}