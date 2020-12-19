import {Button, ButtonGroup, Card, Col, Form, Modal, OverlayTrigger, Popover, Row} from "react-bootstrap";
import podcast from "../../content/podcast";
import {
  FaBriefcase,
  FaDollarSign, FaEnvelope, FaGithub,
  FaItunesNote, FaLightbulb,
  FaPatreon,
  RiGooglePlayLine,
  RiSpotifyLine,
  SiRss,
  SiStitcher
} from "react-icons/all";
import {LinkContainer} from "react-router-bootstrap";
import React, {useState} from "react";
import {patreonLink, btns} from './utils'
import {useStoreActions, useStoreState} from "easy-peasy";
import {filterKeys, filters} from "../../content/podcast/resources";
import _ from "lodash";

import librarian from '../../assets/mla_square.jpg'
import scout from '../../assets/mlg_square.jpg'

const sidebarBtn = active => ({
  size: "sm",
  variant: active ? 'outline-dark' : 'outline-secondary',
  className: active ? 'text-left filter-selected' : 'text-left'
})

function Filter({fk}) {
  const selected = useStoreState(state => state.filters[fk])
  const setSelected = useStoreActions(actions => actions.filters[`set_${fk}`])
  const [help, setHelp] = useState()

  const f = filters[fk]
  if (!f.opts) {return null}
  return <Card className='mb-2'>
    <Card.Body>
      <Card.Subtitle className='mb-2'>{f.t}</Card.Subtitle>
      <ButtonGroup vertical className='w-100'>
        {_.map(f.opts, (v,k) => <Button
            key={k}
            {...sidebarBtn(selected[k])}
            onClick={() => setSelected({[k]: !selected[k]})}
            onMouseEnter={() => setHelp(v.d)}
            onMouseLeave={() => setHelp(null)}
          >
            {v.i && <span className='mr-2'>{v.i}</span>}
            {v.t}
        </Button>)}
      </ButtonGroup>
    </Card.Body>
    <Card.Footer className='small'>{help || f.d}</Card.Footer>
  </Card>
}

function Filters() {
  const episodeOrder = useStoreState(state => state.episodeOrder)
  const setEpisodeOrder = useStoreActions(actions => actions.setEpisodeOrder)
  const viewAs = useStoreState(state => state.viewAs)
  const mla = useStoreState(state => state.mla)
  const setMla = useStoreActions(actions => actions.setMla)
  const mlg = useStoreState(state => state.mlg)
  const setMlg = useStoreActions(actions => actions.setMlg)

  // manually picked a nubmer of leftFilters that fits well
  const leftFilters = filterKeys.slice(0, 3)
  const rightFilters = filterKeys.slice(3)

  return <div className='sidebar-filters'>
    <Row>
      <Col md={12} lg={6}>
        {viewAs === 'episodes' && <Card className='mb-2'><Card.Body>
          <Card.Subtitle className='mt-3 mb-1'>Podcast</Card.Subtitle>
          <ButtonGroup className='w-100'>
            <Button
              {...sidebarBtn(mlg)}
              onClick={() => setMlg(!mlg)}
            >MLG</Button>
            <Button
              {...sidebarBtn(mla)}
              onClick={() => setMla(!mla)}
            >MLA</Button>
          </ButtonGroup>
          <Card.Subtitle className='mt-3 mb-1'>Sort</Card.Subtitle>
          <ButtonGroup className='w-100'>
            <Button
              {...sidebarBtn(episodeOrder === 'old2new')}
              onClick={() => setEpisodeOrder('old2new')}
            >Old&rarr;New</Button>
            <Button
              {...sidebarBtn(episodeOrder === 'new2old')}
              onClick={() => setEpisodeOrder('new2old')}
            >New&rarr;Old</Button>
          </ButtonGroup>
        </Card.Body></Card>}
        {leftFilters.map(fk => <Filter fk={fk} key={fk} />)}
      </Col>
      <Col md={12} lg={6}>
        {rightFilters.map(fk => <Filter fk={fk} key={fk} />)}
      </Col>
    </Row>
  </div>
}

function Podcasts() {
  const [showGetMLG, setShowGetMLG] = useState(false)
  const [showGetMLA, setShowGetMLA] = useState(false)

  function renderMLG() {
    return <>
      <div className="logo text-center">
        <img src={scout} />
      </div>

      {showGetMLG ? <>
        <ButtonGroup className='d-block' vertical>
          <Button {...btns.iconBtn} href="https://itunes.apple.com/us/podcast/machine-learning-guide/id1204521130">
            <FaItunesNote {...btns.icon} target="_blank" /> iTunes
          </Button>
          <Button {...btns.iconBtn} href="https://open.spotify.com/show/5M9yZpSyF1jc7uFp2MlhP9">
            <RiSpotifyLine {...btns.icon} target="_blank" /> Spotify
          </Button>
          <Button {...btns.iconBtn} href='https://podcasts.google.com/feed/aHR0cHM6Ly9tYWNoaW5lbGVhcm5pbmdndWlkZS5saWJzeW4uY29tL3Jzcw=='>
            <RiGooglePlayLine {...btns.icon} target="_blank" /> Google Podcasts
          </Button>
          <Button {...btns.iconBtn} href="http://www.stitcher.com/s?fid=130679&refid=stpr">
            <SiStitcher {...btns.icon} target="_blank" /> Stitcher
          </Button>
          <Button {...btns.iconBtn} href="http://machinelearningguide.libsyn.com/rss"rel="nofollow">
            <SiRss {...btns.icon} target="_blank" /> Custom (RSS)
          </Button>
        </ButtonGroup>
      </> : <>
        <Button variant='outline-primary w-100' onClick={() => setShowGetMLG(true)}>Get It</Button>
      </>}

      <p className="mt-2 text-center">{podcast.body}</p>
    </>
  }

  function renderMLA() {
    return <>
       <div className="logo text-center">
        <img src={librarian} />
      </div>
      {showGetMLA ? <>
        <Button href={patreonLink} target='_blank' className='patreon-btn d-block mb-1'><FaPatreon /> Get it on Patreon</Button>
        <LinkContainer to='/mlg/free-access'>
          <Button variant="link" className='patreon-btn-free d-block mb-1'>Get it free</Button>
        </LinkContainer>
      </> : <>
        <Button variant='outline-primary w-100' onClick={() => setShowGetMLA(true)}>Get It</Button>
      </>}
      <p className="mt-2 text-center">Is an exclusive podcast series on practical/applied tech side of the same. Smaller, more frequent episodes.</p>

    </>
  }

  return <div className='sidebar-podcasts'>
    <Card className='mb-3'>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Card.Title className='text-center'>Theory</Card.Title>
            <Card.Subtitle className='text-center text-muted mb-1'>Machine Learning Guide</Card.Subtitle>
            {renderMLG()}
          </Col>
          <Col md={6}>
            <Card.Title className='text-center'>Hands-On</Card.Title>
            <Card.Subtitle className='text-center text-muted mb-1'>Machine Learning Applied</Card.Subtitle>
            {renderMLA()}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </div>
}

function Flowchart() {
  return <h4>Coming soon</h4>
}

export default function Sidebar() {
  const tab = useStoreState(state => state.tab)
  const setTab = useStoreActions(actions => actions.setTab)

  return <div className='sidebar'>
    {btns.tabs(tab, setTab, [
      {k: 'podcasts', v: "Podcasts"},
      {k: 'filters', v: "Filters"}
    ])}
    {{
      podcasts: <Podcasts />,
      filters: <Filters/>,
      flowchart: <Flowchart />
    }[tab]}
  </div>
}