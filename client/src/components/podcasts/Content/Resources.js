import React, {useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {
  FaInfoCircle,
} from "@react-icons/all-files/fa/FaInfoCircle";
import {Alert, Card, Table} from "react-bootstrap";
import {useFilteredTree} from "../../../store/resources";
import {startsWith} from "lodash";

import {ReactMarkdown_, icons, Popover_} from "../utils";
import {filterKeys, filters} from '../../../content/podcast/resources/filters'
import {flat, picks} from '../../../content/podcast/resources'

function ResourceWrapper({children, show}) {
    if (!show) {return <div>{children}</div>}
    return <Card className='shadow mb-2 pb-0'>
      <Card.Body className='p-1'>
        {children}
      </Card.Body>
    </Card>
  }

function Resource({node}) {
  const [show, setShow] = useState(false)
  const [showHelp, setShowHelp] = useState()

  const resource = flat[node?.id]
  if (!resource) {return null} // FIXME

  function toggle() {setShow(!show)}
  function resetHelp() {setShowHelp(null)}
  const helpAttrs = (helpMsg, className=null) => ({
    className,
    onMouseEnter: () => setShowHelp(helpMsg),
    onMouseLeave: resetHelp
  })

  function renderIcon(filterKey) {
    if (resource.card) {return null}
    // if (!resource[filterKey]) {return null} // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[resource[filterKey]]
    if (!resourceFilter || !resourceFilter.i) {return null}
    let className = "me-2 text-muted"
    className += ` icon-${filterKey}-${resource[filterKey]}`
    // if (filterKey !== 'importance') {className += ' text-muted'}
    return <Popover_
      id={`${filter.t}-${filterKey}`}
      opts={{placement: "bottom"}}
      content={<>
        <h6>{filter.t}</h6>
        <div className='small'>
          <ReactMarkdown_ source={filter.d} />
        </div>
        <h6>{resourceFilter.i} {resourceFilter.t}</h6>
        <div className='small'>
          <ReactMarkdown_ source={resourceFilter.d} />
        </div>
        <div className='text-primary'>Click item for details</div>
      </>}
    >
      <span key={filterKey} className={className}>{resourceFilter.i}</span>
    </Popover_>
  }

  function renderDetails(filterKey) {
    // if (!resource[filterKey]) {return } // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[resource[filterKey]]
    if (!resourceFilter) {return null}
    return <tr key={filterKey}>
      <td {...helpAttrs(filter.d, 'pointer')}>
        {filter.t}
      </td>
      <td {...helpAttrs(resourceFilter.d, 'pointer')}>
        {renderIcon(filterKey)}
        {resourceFilter.t || resourceFilter}

        {/*TODO put this in resources.js somewhere */}
        {filterKey === 'video2audio' && resourceFilter && <>
          <span className='ms-2'>
            <Link to='/blog/20201213-video2audio'>How to do this?</Link>
          </span>
        </>}

      </td>
    </tr>
    // <Popover_ /> showing at random pages on page
  }

  function renderLink(l) {
    const opts = {
      ...helpAttrs(filters.price.opts[l.p].d),
      key: l.l,
      className: 'd-block',
      target: "_blank"
    }
    const txt = `${l.t} (${l.p})`
    if (startsWith(l.l, '/')) {
      return <Link to={l.l} {...opts}>{txt}</Link>
    }
    return <a href={l.l} {...opts}>{txt}</a>
  }

  function renderLinks() {
    return <tr>
      <td {...helpAttrs("Where to get this resource", 'pointer')}>
        Links
      </td>
      <td>
        {resource.links.map(renderLink)}
        {resource.tgc && <Link to='/blog/20201213-tgc' className='d-block'>Get it cheaper</Link>}
      </td>
    </tr>
  }

  function renderTable() {
    if (resource.card) {return null}
    return <div className='small'>
      <Table striped size='sm filters-table my-2'>
        <colgroup>
          <col className='ft-col1' />
          <col className='ft-col2' />
        </colgroup>
        <tbody>
          {renderLinks()}
          {filterKeys.map(renderDetails)}
        </tbody>
      </Table>
      {showHelp ?
        <Alert variant='info mb-0'>{showHelp}</Alert> :
        <Alert variant='info mb-0'><FaInfoCircle /> Hover over a key/value for information</Alert>
      }
    </div>
  }

  function renderResource() {
    return <div className={`resource`}>
      <ResourceWrapper show={show}>
        <div onClick={toggle} className="pointer">
          {show ? icons.down : icons.right}
          <span className='mx-2 resource-title'>
            {resource.t}
          </span>
          {filterKeys.map(renderIcon)}
        </div>
        {show && <div className='px-2 pb-1'>
          {resource.d && <div className={'my-2 ' + (resource.card ? 'resource-card' : 'small text-muted')}>
            <ReactMarkdown_ source={resource.d} />
          </div>}
          {resource.itunesu && <div className='small text-muted my-2'>
            This is a recorded university course, what used be part of the iTunesU system. These courses can be listened to audio-only, but I wouldn't recommend it unless you're really pushing audio-heavy. The professors don't do a great job orating, unlike TheGreatCourses teachers who orate wonderfully. So you'll likely want the visuals.
          </div>}
          {renderTable()}
        </div>}
      </ResourceWrapper>
    </div>
  }

  return renderResource()
}

function TreeSectionWrapper({expanded, children}) {
  return <div className={expanded ? 'section-expanded border-start border-top' : ''}>
    {expanded ? <div
      className='ps-0 m-0 border-end-0 border-bottom-0 border-top-0'
    >{children}</div>
    : <div className=''>{children}</div>}
  </div>
}

function ResourceNode({node, level=0}) {
  const full = flat[node.id]
  const [expanded, setExpanded] = useState(!!full.expand)
  const [showPick, setShowPick] = useState(false)

  const showPick_ = useCallback(() => {setShowPick(!showPick)}, [showPick])

  if (!node?.id) {return null}
  if (!full.pick) {
    return <div className='py-2'>
      <Resource node={node} />
    </div>
  }

  // pick is present, but no children; this section was filtered out
  if (!full.v?.length) {
    return null
  }

  let header = <>{expanded ? icons.minus : icons.plus} {full.t}</>
  header = level === 0 ?
      <h4 className='resource-header mb-0'>{header}</h4> :
      <div>{header}</div>

  function renderSectionInfo() {
    if (!expanded) {return null}
    if (!(full.d || full.pick)) {return null}
    return <div className='small ms-2'>
      {full.d && <div className='my-1 text-muted'>
        <ReactMarkdown_ source={full.d} />
      </div>}
      {full.pick && <div>
        <div
          className='pointer'
          onClick={showPick_}
        >
          {showPick ? icons.down : icons.right}{' '}
          {picks[full.pick].t}
        </div>
        {showPick && <div className='ms-3 text-muted'>{picks[full.pick].d}</div>}
      </div>}
    </div>
  }

  const dontPad = level === 0 || expanded

  function renderLi(v) {
    const full = flat[v.id]
    return <li key={v.id || full.t}>
      <ResourceNode node={v} level={level+1} />
    </li>
  }

  return <div className={dontPad ? '' : 'py-2'}>
    <TreeSectionWrapper expanded={expanded}>
      <div
        onClick={() => setExpanded(!expanded)}
        className={`pointer`}
      >{header}</div>
      {renderSectionInfo()}
    </TreeSectionWrapper>
    {expanded && <ul className={`list-unstyled border-start ps-4 mb-0`}>
      {full.v.map(renderLi)}
    </ul>}
  </div>
}

export function ResourcesTree() {
  const sections = useFilteredTree()
  return <div className='resources resources-tree mb-3'>
    {sections.map(n => <ResourceNode node={n} key={n.id} />)}
  </div>
}

export function ResourcesFlat({nids}) {
  let seen = {}
  function render(node) {
    const {id} = node
    const full = flat[id]
    if (!full.pick) {
      if (seen[id]) {return null}
      seen[id] = true
      return <ResourceNode node={{id}} key={id} />
    }
    return full.v.map(render)
  }
  return <div className='resources'>
    {nids.map(id => render({id}))}
  </div>
}