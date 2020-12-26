import React, {useState} from "react";
import {eitherOr} from "../../content/podcast/resources";
import {filterKeys, filters} from '../../content/podcast/resources/filters'
import tree, {picks} from '../../content/podcast/resources/tree'
import {Link} from "react-router-dom";
import {
  FaInfoCircle,
  FaQuestionCircle,
  FiMinusSquare,
  FiPlusSquare,
} from "react-icons/all";
import {Alert, Button, ButtonGroup, Card, Col, Row, Table} from "react-bootstrap";
import {useStoreState} from "easy-peasy";
import {ReactMarkdown_, btns} from "./utils";
import _ from "lodash";

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
          {show ? <FiMinusSquare /> : <FiPlusSquare />}
          <span className='mx-2 resource-title'>
            {resource.t}
          </span>
          {filterKeys.map(renderIcon)}
        </div>
        {show && <div className='px-2 pb-1'>
          {resource.d && <div className='small text-muted my-2'>
            <ReactMarkdown_ source={resource.d} />
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
  const filtered = useStoreState(state => state.filteredResources)
  if (!resources) {return null}

  const either = {}
  resources = _.reduce(resources, (m, r) => {
    if (!filtered[r.id]) {return m}
    if (r.eitherOr) {
      if (either[r.eitherOr]) { return m}
      either[r.eitherOr] = true
      r = _.filter(eitherOr[r.eitherOr], r_ => {
        // are the other eitherOrs listed here too?
        // are they filtered out?
        return ~resources.indexOf(r_) && filtered[r_.id]
      })
      if (r.length === 0) { return m }
      if (r.length === 1) { r = r[0] }
    }
    m.push(r)
    return m
  }, [])

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

function ResourceNode({node, filtered, level=0}) {
  const [expanded, setExpanded] = useState(!!node.expand)
  const [showPick, setShowPick] = useState(false)

  if (!node.pick) {
    if (filtered && !filtered[node.id]) {return null}
    return <div className='py-2'>
        <Resource resource={node} />
      </div>
  }

  let header = <>{expanded ? <FiMinusSquare /> : <FiPlusSquare />} {node.t}</>
  header = level === 0 ?
      <h4 className='resource-header mb-0'>{header}</h4> :
      <div>{header}</div>

  return <>
    <div className='py-1'>
      <div
        onClick={() => setExpanded(!expanded)}
        className={`pointer`}
      >
        {header}
      </div>
    </div>
    {expanded && <ul className={`list-unstyled border-left pl-4`}>
      {(node.d || node.pick) && <li className='small section-description text-info'>
        {node.d && <div>{node.d}</div>}
        {node.pick && <div>
          <span className='section-pick pointer' onClick={() => setShowPick(!showPick)}>{picks[node.pick].t}</span>
          {showPick && <span>:{' '}{picks[node.pick].d}</span>}
        </div>}
      </li>}
      {node.v.map(n => <>
        <li
          key={n.id || n.t}
        >
          <ResourceNode node={n} filtered={filtered} level={level+1} />
        </li>
      </>)}
    </ul>}
  </>
}

export function ResourcesTree() {
  const filtered = useStoreState(state => state.filteredResources)
  const degree = useStoreState(state => state.learnStyles.learn === 'degree')
  return <div className='resources resources-tree'>
    <Card className='mb-3'>
      <Card.Body>
        {degree ? <>
          <ResourceNode node={tree.degrees} filtered={filtered} />
        </> : <>
          <ResourceNode node={tree.main} filtered={filtered} />
          <ResourceNode node={tree.math} filtered={filtered} />
        </>}
        <ResourceNode node={tree.audio} filtered={filtered} />
      </Card.Body>
    </Card>
  </div>
}