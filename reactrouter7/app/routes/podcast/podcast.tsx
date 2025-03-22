import React from 'react';
import {Row, Col, Container, Navbar, Nav} from 'react-bootstrap'
import {Outlet, Link, useMatches} from 'react-router';
import {LinkContainer} from "~/components/utils"
import Filters from "./sidebar/filters"
import About from "./sidebar/about"
import type {ShowType} from "~/content/podcast/types";

interface PodcastLayout {
  podcastKey: "mlg" | "llh"
  show: ShowType
}
export default function PodcastLayout({podcastKey, show}: PodcastLayout) {
  const matches = useMatches()
  const isResources = matches[matches.length - 1].pathname === '/mlg/resources'

  const col = isResources ?
    {left: {xs:12, md:4}, right: {xs:12, md:8}} :
    {left: {xs:12, md:5}, right: {xs:12, md:7}}

  function renderNavBar() {
    if (podcastKey === "llh") { return null; }

    return <Navbar bg='dark' variant='dark' className="border-bottom justify-content-center secondary-nav">
      <Nav>
        <LinkContainer to={"/mlg"}>Episodes</LinkContainer>
        <LinkContainer to="/mlg/resources">Resources</LinkContainer>
      </Nav>
    </Navbar>
  }

  function renderResourcesInfo() {
    if (!isResources) { return null; }
    return <div className='mb-3 mlg-update ps-3 small'>
      These are resources to learn machine learning & data science. The resources are in tree-structure, in descending order of value. Use the Filters on the left to narrow your search. Hover over each button for more help. To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>. Support this show by trying a <Link to="/walk">walking desk</Link>!. [Updated 2020-10-28]
    </div>
  }

  function renderSidebar() {
    return (isResources ?
      <Filters />
      : <About show={show} podcastKey={podcastKey} />)
  }

  return <>
    {renderNavBar()}
    <Container fluid className="podcasts">
      {renderResourcesInfo()}
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