import {Button, ButtonGroup, Card, Col, Form, Modal, OverlayTrigger, Popover, Row} from "react-bootstrap";
import React, {useState} from "react";
import {btns} from './utils'
import {useStoreActions, useStoreState} from "easy-peasy";
import {filterKeys, filters} from "../../content/podcast/resources/filters";
import _ from "lodash";
import About from './About'
import {FiMinusSquare, FiPlusSquare} from "react-icons/all";

const sidebarBtn = active => ({
  size: "sm",
  variant: active ? 'outline-dark' : 'outline-secondary',
  className: active ? 'text-left filter-selected' : 'text-left'
})

function Filter({fk}) {
  const selected = useStoreState(state => state.filters[fk])
  const setSelected = useStoreActions(actions => actions.filters[`set_${fk}`])
  const [show, setShow] = useState(false)
  const [help, setHelp] = useState()

  const f = filters[fk]
  if (!f.opts) {return null}
  return <>
    <Card.Body>
      <Card.Subtitle className='mb-2 pointer' onClick={() => setShow(!show)}>
        {show ? <FiMinusSquare /> : <FiPlusSquare />}{' '}
        {f.t}
      </Card.Subtitle>
      {show && <ButtonGroup vertical className='w-100'>
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
      </ButtonGroup>}
    </Card.Body>
    {show && <Card.Footer className='small'>{help || f.d}</Card.Footer>}
  </>
}

function Filters() {
  const episodeOrder = useStoreState(state => state.episodeOrder)
  const setEpisodeOrder = useStoreActions(actions => actions.setEpisodeOrder)
  const viewAs = useStoreState(state => state.viewAs)
  const mla = useStoreState(state => state.mla)
  const setMla = useStoreActions(actions => actions.setMla)
  const mlg = useStoreState(state => state.mlg)
  const setMlg = useStoreActions(actions => actions.setMlg)

  if (viewAs !== 'resources') {return null}

  return <Col className='sidebar-filters'>
    <h5 className='text-center'>Filters</h5>
    <Card>

    {viewAs === 'episodes' && <Card.Body>
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
    </Card.Body>}

    <Card.Body>
    <Card.Subtitle className='mb-1'>Learn Mode</Card.Subtitle>
    <ButtonGroup className='w-100' vertical>
      <Button {...btns.on}>Self-taught</Button>
      <Button {...btns.off}>Degrees, Certificates</Button>
    </ButtonGroup>
    </Card.Body>
    <Card.Footer className='small'>List learning resources for self-teaching, or resources for getting a degree</Card.Footer>

    <Card.Body>
    <Card.Subtitle className='mb-1'>Audio</Card.Subtitle>
    <ButtonGroup className='w-100' vertical>
      <Button {...btns.on}>Hard-core</Button>
      <Button {...btns.off}>Normal</Button>
    </ButtonGroup>
    </Card.Body>
    <Card.Footer className='small'>In hard-core mode, video resources which can be effectively consumed audio-only are listed under audio. Else, they're listed in their normal spot. See Video->Audio below</Card.Footer>

    {filterKeys.map(fk => <Filter fk={fk} key={fk} />)}
    </Card>
  </Col>
}


export default function Sidebar() {
  return <div className='sidebar'>
    <Row>
      <About />
      <Filters />
    </Row>
  </div>
}