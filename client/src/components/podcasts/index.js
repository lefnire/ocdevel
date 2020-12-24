import React, {useEffect, useState} from 'react';
import {
  Row,
  Col,
  Modal,
  Card,
  Container
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
// import {useQuery} from "../../utils";


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

export function useListenSearch() {
  const {listen} = useHistory()
  const location = useLocation()
  const setTab = useStoreActions(actions => actions.setTab)
  const setViewAs = useStoreActions(actions => actions.setViewAs)
  const q = new URLSearchParams(useLocation().search);
  function tabFromLocation(location) {
    const [sidebar, content] = [q.get("sidebar"), q.get("content")]
    if (sidebar) {
      setTab(sidebar)
    }
    if (content) {
      setViewAs(content)
    }
  }
  useEffect(() => {
    tabFromLocation(location)
    return listen(tabFromLocation)
  }, [])
  return q
}

function Series_() {
  const q = useListenSearch()

  return <Container fluid className="podcasts">
    <Helmet>
      <title>Machine Learning Guide Podcast</title>
      <meta name="description" content={podcast.teaser} />
    </Helmet>

    {/*<About />*/}
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
  </Container>
}

export default function Series() {
  return <StoreProvider store={store}><Series_ /></StoreProvider>
}