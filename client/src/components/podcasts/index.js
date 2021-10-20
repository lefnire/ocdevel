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

import {mlg, mla, episodes} from '../../content/podcast';

import {btns} from './utils'
import Recommend from './Content/Recommend'
import {Episodes} from './Content/Episodes'
import {EpisodeRoute} from './Content/Episode'

import {StoreProvider} from "easy-peasy";
import { store } from '../../store';
import {ResourcesTree} from './Content/Resources'
import {LinkContainer} from "react-router-bootstrap";
import Filters from "./Sidebar/Filters";
import About from "./Sidebar/About";
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
      {isResources && <div className='mb-3 mlg-update pl-3'>These are resources to learn machine learning & artificial intelligence. The resources are in tree-structure, in descending order of value. Use the Filters on the left to narrow your search. Hover over each button for more help. To suggest a resource, or discuss/contend resources listed here, comment <a href="https://github.com/lefnire/ocdevel/issues/43" target="_blank">here</a>, or submit a PR against <a href="https://github.com/lefnire/ocdevel/tree/master/client/src/content/podcast/resources" target="_blank">resources.js</a></div>}
      <Row>
        <Col {...col.left} className='sidebar'>
          <Row>
            <Switch>
              <Route path="/mlg/resources" exact><Filters /></Route>
              <Route path="/mlg"><About /></Route>
            </Switch>
          </Row>
        </Col>
        <Col {...col.right}>
          <Switch>
            <Route path="/mlg" exact><Episodes /></Route>
            <Route path="/mlg/resources" exact><ResourcesTree /></Route>
            <Route path="/mlg/recommend" exact><Recommend /></Route>
            <Route path="/mlg/:id"><EpisodeRoute /></Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  </>
}

export default function Series() {
  return <StoreProvider store={store}><Series_ /></StoreProvider>
}