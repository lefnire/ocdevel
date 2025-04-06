import {FaCheckCircle} from '@react-icons/all-files/fa/FaCheckCircle'
import {FaCheckSquare} from '@react-icons/all-files/fa/FaCheckSquare'
import {FaRegCircle} from '@react-icons/all-files/fa/FaRegCircle'
import {FaRegSquare} from '@react-icons/all-files/fa/FaRegSquare'
import {FiMinusSquare} from '@react-icons/all-files/fi/FiMinusSquare'
import {FiPlusSquare} from '@react-icons/all-files/fi/FiPlusSquare'
import {icons} from "~/components/collapsible-icons";
import {useCallback, useState} from "react";
import ButtonGroup from 'react-bootstrap/cjs/ButtonGroup'
import Card from 'react-bootstrap/cjs/Card'
import Col_ from 'react-bootstrap/cjs/Col'
const Col = Col_.default || Col_
import {useStore} from "~/routes/mlg.resources/tree/store";
import {filterKeys, filters, learnStyles} from "~/content/podcast/resources/filters";
import map from "lodash/map";
import {IconButton} from "~/components/icon-btn";
import {useShallow} from "zustand/react/shallow";

const btns = {
  on: {
    variant: "outline-dark",
    className: "filter-selected"
  },
  off: {
    variant: "outline-secondary",
  },
}

const check = {
  single: [<FaRegCircle />, <FaCheckCircle />],
  multi: [<FaRegSquare />, <FaCheckSquare />]
}

function Option({opt, select, active, setHelp, multi=true}) {
  const btn = active ? btns.on : btns.off

  // perf tweaks since this re-rendered often
  const setHelp_ = useCallback(() => setHelp(opt.d), [])
  const clearHelp_ = useCallback(() => setHelp(null), [])

  return <IconButton
    {...btn}
    size="sm"
    left
    onClick={select}
    onMouseEnter={setHelp_}
    onMouseLeave={clearHelp_}
    Icon={check[multi ? 'multi' : 'single'][active ? 1 : 0]}
    Icon2={opt.i}
  >
    {opt.t}
  </IconButton>
}

function LearnStyle({k}) {
  const active = useStore(state => state.learnStyles[k])
  const select = useStore(actions => actions.learnStyles[`set_${k}`])
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
        {map(f.opts, (v, opt_k) => <Option
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
  const active = useStore(state => state[section][k])
  const select = useStore(state => state[section][`set_${k}`])
  const [show, setShow] = useState(false)
  const [help, setHelp] = useState()

  const select_ = opt_k => () => {
    select([opt_k, !active[opt_k]])
  }
  const setShow_ = useCallback(() => setShow(!show), [show])

  const f = filters[k]
  if (!f.opts) {return null}

  function renderOpt(v, opt_k) {
    const id = `${k}-${opt_k}`
    return <Option
      key={id}
      opt={v}
      active={active[opt_k]}
      select={select_(opt_k)}
      setHelp={setHelp}
    />
  }

  return <>
    <Card.Body>
      <Card.Subtitle className='pointer' onClick={setShow_}>
        {show ? <FiMinusSquare /> : <FiPlusSquare />}{' '}
        {f.t}
      </Card.Subtitle>
      {show && <ButtonGroup vertical className='w-100 mt-2'>
        {map(f.opts, renderOpt)}
      </ButtonGroup>}
    </Card.Body>
    {show && <Card.Footer className='small'>{help || f.d}</Card.Footer>}
  </>
}

export default function Filters() {
  const [show, toggle] = useStore(useShallow(s => [s.showFilters, s.toggleFilters]))

  return <Col className='sidebar-filters'>
    <Card className='border-0'>
      <Card.Header className='border-bottom-0 pointer'>
        <Card.Title
          className='mb-0 text-center'
          onClick={toggle}
        >
          {show ? icons.down : icons.right}{' '}
          Filters
        </Card.Title>
      </Card.Header>
    {show && <>
      {/* 71f9ea01: MLA/MLG filter & sorting */}
      {[
        'learn',
        'audio'
      ].map(k => <LearnStyle key={k} k={k} />)}
      {filterKeys.map(k => <Filter key={k} k={k} />)}
    </>}
    </Card>
  </Col>
}