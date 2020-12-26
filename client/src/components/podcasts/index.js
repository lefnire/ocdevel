import React, {useEffect, useState} from 'react';
import {
  Row,
  Col,
  Modal,
  Card,
  Container, Navbar, Nav, Alert
} from 'react-bootstrap';
import {Switch, Route, useHistory, useLocation} from 'react-router-dom';
import _ from 'lodash';
import {Helmet} from "react-helmet";

import Sidebar from './Sidebar'
import {btns} from './utils'
import FreeAccess from './FreeAccess'
import Recommend from './Recommend'
import podcast from '../../content/podcast';
import {EpisodeFull, Episodes} from './Episodes'

import {StoreProvider, useStoreState, useStoreActions, useStore, useLocalStore} from "easy-peasy";
import { store } from '../../store';
import {ResourcesTree} from './Resources'
import About from './About'
import {LinkContainer} from "react-router-bootstrap";
// import {useQuery} from "../../utils";


function Series_() {
  const location = useLocation()
  const isResources = location.pathname === '/mlg/resources'

  const col = isResources ?
    {left: {xs:12, md:4}, right: {xs:12, md:8}} :
    {left: {xs:12, md:5}, right: {xs:12, md:7}}
  return <>
    <Helmet>
      <title>Machine Learning Guide Podcast</title>
      <meta name="description" content={podcast.teaser} />
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
      {isResources && <Alert variant='info'>These are resources to learn machine learning & artificial intelligence. The resources are in tree-structure, in descending order of value. Use the Filters on the left to narrow your search, especially handy is the "Audio Preference" filter. Hover over each button for more help. To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>, or submit a PR against <a href="https://github.com/lefnire/ocdevel/tree/master/client/src/content/podcast/resources" target="_blank">resources.js</a></Alert>}
      <Row>
        <Col {...col.left} className='sidebar'>
          <Sidebar />
        </Col>
        <Col {...col.right}>
          <Switch>
            <Route path="/mlg" exact><Episodes /></Route>
            <Route path="/mlg/resources" exact><ResourcesTree /></Route>
            <Route path="/mlg/recommend" exact><Recommend /></Route>
            <Route path="/mlg/free-access" exact><FreeAccess /></Route>
            <Route path="/mlg/:id"><EpisodeFull /></Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  </>
}

export default function Series() {
  return <StoreProvider store={store}><Series_ /></StoreProvider>
}