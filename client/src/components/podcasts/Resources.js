import React, {useState} from "react";
import {filterKeys, filters} from '../../content/podcast/resources/filters'
import tree, {picks} from '../../content/podcast/resources/tree'
import {Link} from "react-router-dom";
import {
  BiChevronDown, BiChevronRight,
  FaInfoCircle, FaMinusSquare, FaPlusSquare,
  FaQuestionCircle,
  FiMinusSquare,
  FiPlusSquare,
} from "react-icons/all";
import {Alert, Button, ButtonGroup, Card, Col, Row, Table} from "react-bootstrap";
import {useStoreState} from "easy-peasy";
import {ReactMarkdown_, btns} from "./utils";
import _ from "lodash";

// render once up here for perf
const icons = {
  plus: <FiPlusSquare />,
  minus: <FiMinusSquare />,
  down: <BiChevronDown />,
  right: <BiChevronRight />
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
    // if (!resource[filterKey]) {return null} // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[resource[filterKey]]
    if (!resourceFilter || !resourceFilter.i) {return null}
    let className = "mr-2 text-muted"
    className += ` icon-${filterKey}-${resource[filterKey]}`
    // if (filterKey !== 'importance') {className += ' text-muted'}
    return <span key={filterKey} className={className}>{resourceFilter.i}</span>
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

  function ResourceWrapper({children}) {
    if (!show) {return <div>{children}</div>}
    return <Card className='shadow mb-2 pb-0'>
      <Card.Body className='p-1'>
        {children}
      </Card.Body>
    </Card>
  }

  function renderResource() {
    return <div className={`resource`}>
      <ResourceWrapper>
        <div onClick={toggle} className="pointer">
          {show ? icons.down : icons.right}
          <span className='mx-2 resource-title'>
            {resource.t}
          </span>
          {filterKeys.map(renderIcon)}
        </div>
        {show && <div className='px-2 pb-1'>
          {resource.d && <div className='small text-muted my-2'>
            <ReactMarkdown_ source={resource.d} />
          </div>}
          {resource.itunesu && <div className='small text-muted my-2'>
            This is a recorded university course, what used be part of the iTunesU system. These courses can be listened to audio-only, but I wouldn't recommend it unless you're really pushing audio-heavy. The professors don't do a great job orating, unlike TheGreatCourses teachers who orate wonderfully. So you'll likely want the visuals.
          </div>}
          <div className='small'>
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
  if (expanded) {
    return <Alert variant='secondary' className='py-1 pl-0 m-0 section-description section-description-expanded'>
      {children}
    </Alert>
  }
  return <div className='py-1 section-description'>{children}</div>
}

function ResourceNode({node, level=0}) {
  const [expanded, setExpanded] = useState(!!node.expand)
  const [showPick, setShowPick] = useState(false)

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
    return <div className='m-0 pl-4 small'>
      {node.d && <ReactMarkdown_ source={node.d} />}
      {node.pick && <div>
        <div
          className='pointer font-weight-bold'
          onClick={() => setShowPick(!showPick)}
        >
          {showPick ? icons.down : icons.right}{' '}
          {picks[node.pick].t}
        </div>
        {showPick && <div className='ml-3'>{picks[node.pick].d}</div>}
      </div>}
    </div>
  }

  return <>
    <TreeSectionWrapper expanded={expanded}>
      <div
        onClick={() => setExpanded(!expanded)}
        className={`pointer`}
      >{header}</div>
      {renderSectionInfo()}
    </TreeSectionWrapper>
    {expanded && <ul className={`list-unstyled border-left pl-4`}>
      {node.v.map(n => <>
        <li
          key={n.id || n.t}
        >
          <ResourceNode node={n} level={level+1} />
        </li>
      </>)}
    </ul>}
  </>
}

export function ResourcesTree() {
  const sections = useStoreState(state => state.filteredTree)
  return <div className='resources resources-tree'>
    <Card className='mb-3'>
      <Card.Body>
        {sections.map(n => n && <ResourceNode node={n} key={n.t} />)}
      </Card.Body>
    </Card>
  </div>
}