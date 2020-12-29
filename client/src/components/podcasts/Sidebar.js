import {Button, ButtonGroup, Card, Col, Form, Modal, OverlayTrigger, Popover, Row} from "react-bootstrap";
import React, {useCallback, useState} from "react";
import {btns} from './utils'
import {useStoreActions, useStoreState} from "easy-peasy";
import {filterKeys, filters, learnStyles} from "../../content/podcast/resources/filters";
import _ from "lodash";
import About from './About'
import {
  FaCheckCircle,
  FaCheckSquare,
  FaCircle,
  FaRegCircle, FaRegSquare,
  FaSquare,
  FiMinusSquare,
  FiPlusSquare
} from "react-icons/all";
import {useLocation} from 'react-router-dom'

let check = {size:20, className:'border-right pr-2 mr-2'}
check = {
  single: [<FaRegCircle {...check} />, <FaCheckCircle {...check} />],
  multi: [<FaRegSquare {...check} />, <FaCheckSquare {...check} />]
}

function Option({opt, select, active, setHelp, multi=true}) {
  const btn = active ? btns.on : btns.off

  // perf tweaks since this re-rendered often
  const setHelp_ = useCallback(() => setHelp(opt.d), [])
  const clearHelp_ = useCallback(() => setHelp(null), [])

  return <Button
    {...btn}
    onClick={select}
    onMouseEnter={setHelp_}
    onMouseLeave={clearHelp_}
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

  const setShow_ = useCallback(() => setShow(!show), [show])
  const select_ = useCallback(opt_k => () => {
    select(opt_k)
  }, [k, active])

  const f = learnStyles[k]
  if (!f.opts) {return null}

  // TODO refactor this with <Filter /> below
  return <>
    <Card.Body>
      <Card.Subtitle className='pointer' onClick={setShow_}>
        {show ? <FiMinusSquare /> : <FiPlusSquare />}{' '}
        {f.t}
      </Card.Subtitle>
      {show && <ButtonGroup vertical className='w-100 mt-2'>
        {_.map(f.opts, (v, opt_k) => <Option
          key={opt_k}
          opt={v}
          active={active === opt_k}
          select={select_(opt_k)}
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

  const select_ = useCallback(opt_k => () => {
    select({[opt_k]: !active[opt_k]})
  })
  const setShow_ = useCallback(() => setShow(!show), [show])

  const f = filters[k]
  if (!f.opts) {return null}

  return <>
    <Card.Body>
      <Card.Subtitle className='pointer' onClick={setShow_}>
        {show ? <FiMinusSquare /> : <FiPlusSquare />}{' '}
        {f.t}
      </Card.Subtitle>
      {show && <ButtonGroup vertical className='w-100 mt-2'>
        {_.map(f.opts, (v, opt_k) => <Option
          key={k}
          opt={v}
          active={active[opt_k]}
          select={select_(opt_k)}
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