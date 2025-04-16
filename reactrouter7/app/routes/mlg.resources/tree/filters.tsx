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
import {useStore} from "~/routes/mlg.resources/tree/store";
import {filterKeys, filters} from "~/content/podcast/resources/filters";
import {IconButton, sizes} from "~/components/icon-btn";
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

// const icon_ = {size: sizes.sm.v}
const check = {
  single: [<FaRegCircle />, <FaCheckCircle />],
  multi: [<FaRegSquare />, <FaCheckSquare />]
}

function Option({opt, select, active, setHelp, multi=true}) {
  const btnState = active ? btns.on : btns.off

  // perf tweaks since this re-rendered often
  const setHelp_ = useCallback(() => setHelp(opt.d), [])
  const clearHelp_ = useCallback(() => setHelp(null), [])
  const btnProps = {
    onClick: select,
    onMouseEnter: setHelp_,
    onMouseLeave: clearHelp_,
    ...btnState
  }

  return <IconButton
    btnProps={btnProps}
    size="sm"
    left
    icon={check[multi ? 'multi' : 'single'][active ? 1 : 0]}
    icon2={opt.i}
    label={opt.t}
  />
}

// git-blame: learn styles (audio heavy/light, self-taught vs degree)

function Filter({k, section='filters'}) {
  const [active, select] = useStore(useShallow(s => [
    s[section][k],
    s[section][`set_${k}`]
  ]))
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
        {Object.entries(f.opts || {}).map(([opt_k, v]) => renderOpt(v, opt_k))}
      </ButtonGroup>}
    </Card.Body>
    {show && <Card.Footer className='small'>{help || f.d}</Card.Footer>}
  </>
}

export default function Filters() {
  const [show, toggle] = useStore(useShallow(s => [s.showFilters, s.toggleFilters]))

  return <div className='sidebar-filters'>
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
      {/* git-blame: learn_style, audio_style */}
      {filterKeys.map(k => <Filter key={k} k={k} />)}
    </>}
    </Card>
  </div>
}