import React, {useMemo} from 'react';
import {Row, Col, Container, Navbar, Nav} from 'react-bootstrap'
import {Route, useLocation, Outlet, Link} from 'react-router';

import {mlg} from '../../content/podcast';


import {LinkContainer, usePodcastKey} from "~/components/utils"
import Recommend from './recommend'
import EpisodeRoute from './full'
import ResourcesTree from './resources'
import Episodes from './list'
import Filters from "./sidebar/filters"
import About from "./sidebar/about"
// import {useQuery} from "../../utils";


export default function Series() {
  const podcastKey = usePodcastKey()
  const location = useLocation()

  const isResources = location.pathname === '/mlg/resources'
    const col = isResources ?
      {left: {xs:12, md:4}, right: {xs:12, md:8}} :
      {left: {xs:12, md:5}, right: {xs:12, md:7}}

  function renderNavBar() {
    if (podcastKey === "llh") { return null; }
    return <Navbar bg='dark' variant='dark' className="border-bottom justify-content-center secondary-nav">
      <Nav>
        <LinkContainer to={"/" + podcastKey}>Episodes</LinkContainer>
        <LinkContainer to="/mlg/resources">Resources</LinkContainer>
      </Nav>
    </Navbar>
  }

  function renderSidebar() {
    if (location.pathname.startsWith("/mlg/resource")) {
      return <Filters />
    }
    return <About />
  }

  return <>
    {renderNavBar()}

    <Container fluid className="podcasts">
      {isResources && (
        <div className='mb-3 mlg-update ps-3 small'>
          These are resources to learn machine learning & data science. The resources are in tree-structure, in descending order of value. Use the Filters on the left to narrow your search. Hover over each button for more help. To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>. Support this show by trying a <Link to="/blog/20240109-fitness-desk">walking desk</Link>!. [Updated 2020-10-28]
        </div>
      )}
      <Row>
        <Col {...col.left} className='sidebar'>
          <Row>
            {renderSidebar()}
          </Row>
        </Col>
        <Col {...col.right}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </>
}

export function meta() {
  return []
  // @FIXME
  // <Helmet>
  //     { podcastKey === "mlg" ? <title>Machine Learning Guide Podcast</title>
  //     : podcastKey === "llh" ? <title>Lefnire's Life Hacks</title>
  //     : null }
  //
  //     <meta name="description" content={mlg.teaser} />
  //   </Helmet>
}