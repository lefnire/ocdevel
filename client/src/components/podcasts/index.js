import React, {useEffect, useState} from 'react';
import {
  Row,
  Col,
  Modal,
  Card,
  Container, Navbar, Nav
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

  const col = location.pathname === '/mlg/resources' ?
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