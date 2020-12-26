import {Button, ButtonGroup, Card, Col, Form, Modal, OverlayTrigger, Popover, Row} from "react-bootstrap";
import React, {useState} from "react";
import {btns} from './utils'
import {useStoreActions, useStoreState} from "easy-peasy";
import {filterKeys, filters, learnStyles} from "../../content/podcast/resources/filters";
import _ from "lodash";
import About from './About'
import {FaCheckCircle, FaCheckSquare, FaCircle, FaSquare, FiMinusSquare, FiPlusSquare} from "react-icons/all";
import {useLocation} from 'react-router-dom'

let check = {size:20, className:'border-right pr-2 mr-2'}
check = {
  single: [<FaCircle {...check} />, <FaCheckCircle {...check} />],
  multi: [<FaSquare {...check} />, <FaCheckSquare {...check} />]
}

function Option({k, opt, active, select, setHelp, multi=true}) {
  const btn = active ? btns.on : btns.off
  return <Button
    {...btn}
    onClick={() => select(k)}
    onMouseEnter={() => setHelp(opt.d)}
    onMouseLeave={() => setHelp(null)}
  >
    {check[multi ? 'multi' : 'single'][active ? 1 : 0]}
    {opt.i && <span className='mr-2'>{opt.i}</span>}
    {opt.t}
  </Button>
}

function LearnStyle({k}) {
  const active = useStoreState(state => state.learnStyles[k])
  const select = useStoreActions(actions => actions.learnStyles[`set_${k}`])
  const [show, setShow] = useState(true)
  const [help, setHelp] = useState()

  const f = learnStyles[k]
  if (!f.opts) {return null}

  // TODO refactor this with <Filter /> below
  return <>
    <Card.Body>
      <Card.Subtitle className='pointer' onClick={() => setShow(!show)}>
        {show ? <FiMinusSquare /> : <FiPlusSquare />}{' '}
        {f.t}
      </Card.Subtitle>
      {show && <ButtonGroup vertical className='w-100 mt-2'>
        {_.map(f.opts, (v, k) => <Option
          key={k}
          k={k}
          opt={v}
          active={active === k}
          select={select}
          setHelp={setHelp}
          multi={false}
        />)}
      </ButtonGroup>}
    </Card.Body>
    {show && <Card.Footer className='small'>{help || f.d}</Card.Footer>}
  </>
}

function Filter({k, section='filters'}) {
  const active = useStoreState(state => state[section][k])
  const select = useStoreActions(actions => actions[section][`set_${k}`])
  const [show, setShow] = useState(false)
  const [help, setHelp] = useState()

  function select_(k) {
    select({[k]: !active[k]})
  }

  const f = filters[k]
  if (!f.opts) {return null}

  return <>
    <Card.Body>
      <Card.Subtitle className='pointer' onClick={() => setShow(!show)}>
        {show ? <FiMinusSquare /> : <FiPlusSquare />}{' '}
        {f.t}
      </Card.Subtitle>
      {show && <ButtonGroup vertical className='w-100 mt-2'>
        {_.map(f.opts, (v, k) => <Option
          key={k}
          k={k}
          opt={v}
          active={active[k]}
          select={select_}
          setHelp={setHelp}
        />)}
      </ButtonGroup>}
    </Card.Body>
    {show && <Card.Footer className='small'>{help || f.d}</Card.Footer>}
  </>
}

function Filters() {
  return <Col className='sidebar-filters'>
    <Card>
      <Card.Header>
        <Card.Title className='mb-0 text-center'>Filters</Card.Title>
      </Card.Header>

    {/* 71f9ea01: MLA/MLG filter & sorting */}
    {['learn', 'audio'].map(k => <LearnStyle key={k} k={k} />)}
    {filterKeys.map(k => <Filter key={k} k={k} />)}

    </Card>
  </Col>
}


export default function Sidebar() {
  const {pathname} = useLocation()
  return <div className='sidebar mb-3'>
    <Row>
      {pathname === '/mlg/resources' ? <Filters /> : <About />}
    </Row>
  </div>
}