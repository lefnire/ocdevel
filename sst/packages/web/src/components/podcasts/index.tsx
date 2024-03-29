import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Switch, Route, useLocation, Outlet, Link} from 'react-router-dom';
import {Helmet} from "react-helmet-async";

import {mlg} from '../../content/podcast';


import {LinkContainer} from "react-router-bootstrap";
import {Lazy} from "../utils"
const Recommend = () => import('./Content/Recommend')
const EpisodeRoute = () => import('./Content/Episode')
const ResourcesTree = () => import('./Content/Resources')
const Episodes = () => import('./Content/Episodes')
const Filters = () => import("./Sidebar/Filters")
const About = () => import("./Sidebar/About")
// import {useQuery} from "../../utils";

function FiltersRouter() {
  const location = useLocation()

  if (location.pathname.startsWith("/mlg/resource")) {
    return <Lazy c={Filters} />
  }
  return <Lazy c={About} />
}

export default function Series() {
  const location = useLocation()
  const isResources = location.pathname === '/mlg/resources'

  const col = isResources ?
    {left: {xs:12, md:4}, right: {xs:12, md:8}} :
    {left: {xs:12, md:5}, right: {xs:12, md:7}}
  return <>
    <Helmet>
      <title>Machine Learning Guide Podcast</title>
      <meta name="description" content={mlg.teaser} />
    </Helmet>
    <Navbar bg='dark' variant='dark' className="border-bottom justify-content-center secondary-nav">
      <Nav>
        <LinkContainer to="/mlg" exact>
          <Nav.Link>Episodes</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/mlg/resources">
          <Nav.Link>Resources</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>

    <Container fluid className="podcasts">
      {isResources && <div className='mb-3 mlg-update ps-3 small'>These are resources to learn machine learning & data science. The resources are in tree-structure, in descending order of value. Use the Filters on the left to narrow your search. Hover over each button for more help. To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>. Also see <Link to="/blog/20240111-tylers-setup">hardware / software picks</Link>. [Updated 2020-10-28]</div>}
      <Row>
        <Col {...col.left} className='sidebar'>
          <Row>
            <FiltersRouter />
          </Row>
        </Col>
        <Col {...col.right}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  </>
}