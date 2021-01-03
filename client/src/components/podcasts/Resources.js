import React, {useCallback, useState} from "react";
import {filterKeys, filters} from '../../content/podcast/resources/filters'
import tree, {picks} from '../../content/podcast/resources/tree'
import {Link} from "react-router-dom";
import {
  FaInfoCircle,
} from "react-icons/all";
import {Alert, Button, ButtonGroup, Card, Col, Row, Table} from "react-bootstrap";
import {useStoreState} from "easy-peasy";
import {ReactMarkdown_, btns, icons, Popover_} from "./utils";
import _ from "lodash";

function ResourceWrapper({children, show}) {
    if (!show) {return <div>{children}</div>}
    return <Card className='shadow mb-2 pb-0'>
      <Card.Body className='p-1'>
        {children}
      </Card.Body>
    </Card>
  }

function Resource({resource}) {
  const [show, setShow] = useState(false)
  const [showHelp, setShowHelp] = useState()

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
    let className = "mr-2 text-muted"
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
          <span className='ml-2'>
            <Link to='/blog/20201213-video2audio'>How to do this?</Link>
          </span>
        </>}

      </td>
    </tr>
    // <Popover_ /> showing at random pages on page
  }

  function renderLinks() {
    return <tr>
      <td {...helpAttrs("Where to get this resource", 'pointer')}>
        Links
      </td>
      <td>
        {resource.links.map(l => (
          <a
            {...helpAttrs(filters.price.opts[l.p].d)}
            className='d-block'
            href={l.l}
            key={l.l}
            target="_blank"
          >
            {l.t} ({l.p})
          </a>
        ))}
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

export function ResourcesFlat({resources}) {
  if (!resources) {return null}

  function renderResource(r){
    if (!_.isArray(r)) {
      return <Resource resource={r} key={r.id}/>
    }
    return <Alert className='pick-one-resource' key={r.id}>
      <h6>Pick One</h6>
      {r.map(r_ => <Resource resource={r_} key={r_.id}/>)}
    </Alert>
  }

  return <div className='resources resources-flat'>
    {resources.map(renderResource)}
  </div>
}

function TreeSectionWrapper({expanded, children}) {
  return <div className={expanded ? 'section-expanded border-left border-top' : ''}>
    {expanded ? <div
      className='pl-0 m-0 border-right-0 border-bottom-0 border-top-0'
    >{children}</div>
    : <div className=''>{children}</div>}
  </div>
}

function ResourceNode({node, level=0}) {
  const [expanded, setExpanded] = useState(!!node.expand)
  const [showPick, setShowPick] = useState(false)

  const showPick_ = useCallback(() => {setShowPick(!showPick)}, [showPick])

  if (!node.pick) {
    return <div className='py-2'>
      <Resource resource={node} />
    </div>
  }

  // pick is present, but no children; this section was filtered out
  if (!node.v) {
    return null
  }

  let header = <>{expanded ? icons.minus : icons.plus} {node.t}</>
  header = level === 0 ?
      <h4 className='resource-header mb-0'>{header}</h4> :
      <div>{header}</div>

  function renderSectionInfo() {
    if (!expanded) {return null}
    if (!(node.d || node.pick)) {return null}
    return <div className='small ml-2'>
      {node.d && <div className='my-1 text-muted'>
        <ReactMarkdown_ source={node.d} />
      </div>}
      {node.pick && <div>
        <div
          className='pointer'
          onClick={showPick_}
        >
          {showPick ? icons.down : icons.right}{' '}
          {picks[node.pick].t}
        </div>
        {showPick && <div className='ml-3 text-muted'>{picks[node.pick].d}</div>}
      </div>}
    </div>
  }

  const dontPad = level === 0 || expanded

  return <div className={dontPad ? '' : 'py-2'}>
    <TreeSectionWrapper expanded={expanded}>
      <div
        onClick={() => setExpanded(!expanded)}
        className={`pointer`}
      >{header}</div>
      {renderSectionInfo()}
    </TreeSectionWrapper>
    {expanded && <ul className={`list-unstyled border-left pl-4 mb-0`}>
      {node.v.map(n => <>
        <li key={n.id || n.t}>
          <ResourceNode node={n} level={level+1} />
        </li>
      </>)}
    </ul>}
  </div>
}

export function ResourcesTree() {
  const sections = useStoreState(state => state.filteredTree)
  return <div className='resources resources-tree mb-3'>
    {sections.map(n => n && <ResourceNode node={n} key={n.t} />)}
  </div>
}