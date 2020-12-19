import {Button, ButtonGroup, Card, Col, Form, Modal, OverlayTrigger, Popover, Row} from "react-bootstrap";
import React, {useState} from "react";
import {btns} from './utils'
import {useStoreActions, useStoreState} from "easy-peasy";
import {filterKeys, filters} from "../../content/podcast/resources";
import _ from "lodash";
import About from './About'

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


export default function Sidebar() {
  const tab = useStoreState(state => state.tab)
  const setTab = useStoreActions(actions => actions.setTab)

  return <div className='sidebar'>
    {btns.tabs(tab, setTab, [
      {k: 'podcasts', v: "Podcasts"},
      {k: 'filters', v: "Filters"}
    ])}
    {{
      podcasts: <About />,
      filters: <Filters/>,
    }[tab]}
  </div>
}