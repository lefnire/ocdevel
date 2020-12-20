import React, {useState} from 'react';
import {
  Row,
  Col,
  Modal,
  Card,
} from 'react-bootstrap';
import {Switch, Route, useHistory} from 'react-router-dom';
import _ from 'lodash';
import {Helmet} from "react-helmet";

import Sidebar from './Sidebar'
import {btns} from './utils'
import FreeAccess from './FreeAccess'
import Recommend from './Recommend'
import podcast from '../../content/podcast';
import {EpisodeFull, Episodes} from './Episodes'

import {StoreProvider, useStoreState, useStoreActions, useStore} from "easy-peasy";
import { store } from '../../store';
import {ResourcesTree} from './Resources'


function Resources() {
  const filtered = useStoreState(state => state.filteredResources)
  const r = _.values(filtered)
  return <ResourcesTree resources={r} />
}

function Content() {
  const viewAs = useStoreState(state => state.viewAs)
  const setViewAs = useStoreActions(actions => actions.setViewAs)
  return <>
    {btns.tabs(viewAs, setViewAs, [
      {k: "episodes", v: "Episodes"},
      {k: "resources", v: "Resources"}
    ])}
    {{
      episodes: <Episodes />,
      resources: <Resources />
    }[viewAs]}
  </>
}

function Series_() {
  return <div className="podcasts">
    <Helmet>
      <title>Machine Learning Guide Podcast</title>
      <meta name="description" content={podcast.teaser} />
    </Helmet>

    <Row>
      <Col xs={12} md={5} className='sidebar'>
        <Sidebar />
      </Col>
      <Col xs={12} md={7}>
        <Switch>
          <Route path="/mlg" exact><Content /></Route>
          <Route path="/mlg/recommend" exact><Recommend /></Route>
          <Route path="/mlg/free-access" exact><FreeAccess /></Route>
          <Route path="/mlg/:id"><EpisodeFull /></Route>
        </Switch>
      </Col>
    </Row>
  </div>
}

export default function Series() {
  return <StoreProvider store={store}><Series_ /></StoreProvider>
}