import React, {useState} from "react";
import {eitherOr} from "../../content/podcast/resources";
import {filterKeys, filters} from '../../content/podcast/resources/filters'
import tree from '../../content/podcast/resources/tree'
import {Link} from "react-router-dom";
import {FaChevronDown, FaChevronUp, FaInfoCircle} from "react-icons/all";
import {Alert, Button, Card, Col, Row, Table} from "react-bootstrap";
import {useStoreState} from "easy-peasy";
import {ReactMarkdown_} from "./utils";
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
    return <span key={filterKey} className='mr-2 text-muted'>{resourceFilter.i}</span>
  }

  function renderFilter(filterKey) {
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

  const fontWeight = {
    essential: 600,
    supplementary: 400
  }[resource.importance] || 500
  return <li>
    <div onClick={toggle} className='pointer'>
      {show ? <FaChevronUp /> :<FaChevronDown />}
      <span className="mx-2" style={{fontWeight}}>
        {resource.t}
      </span>
      {filterKeys.map(renderIcon)}
    </div>
    {show && <>
      {resource.d && <div className='small text-muted my-2'>
        <ReactMarkdown_ source={resource.d} />
      </div>}
      <div className='mb-2 small'>
        <Table striped size='sm mb-0 filters-table'>
          <colgroup>
            <col className='ft-col1' />
            <col className='ft-col2' />
	        </colgroup>
          <tbody>
            {renderLinks()}
            {filterKeys.map(renderFilter)}
          </tbody>
        </Table>
        {showHelp ?
          <Alert variant='info mt-0'>{showHelp}</Alert> :
          <Alert variant='info mt-0'><FaInfoCircle /> Hover over a key/value for information</Alert>
        }
      </div>
    </>}
  </li>
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

  return <ul className='list-unstyled'>
    {resources.map(renderResource)}
  </ul>
}

export function ResourcesTree() {
  const [showMore, setShowMore] = useState({})

  function renderTree(node, level=0) {
    if (!node.pick) {
      return <Resource resource={node} />
    }

    if (node.hide && !showMore[node.hide]) {
      return <Button
        variant='link'
        size='sm'
        onClick={() => setShowMore({...showMore, [node.hide]: true})}
        >Dive deeper</Button>
    }

    const ul = level > 0 ? "border-left pl-3" : ""
    return <>
      {level > 0 && <>
        <strong>Pick {node.pick} </strong>
        {node.t && <span>{node.t} </span>}
        {node.d && <div className='small text-muted'>{node.d}</div>}
      </>}
      <ul className={`list-unstyled mb-3 ${ul}`}>
        {node.v.map(n => <li key={n.id || n.t}>
          {renderTree(n, level=level+1)}
        </li>)}
      </ul>
    </>
  }

  return <div>
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title>{tree.main.t}</Card.Title>
        <p className='small text-muted'>{tree.main.d}</p>
        {renderTree(tree.main)}
      </Card.Body>
    </Card>

    <Card className='mb-3'>
      <Card.Body>
        <Card.Title>{tree.math.t}</Card.Title>
        <p className='small text-muted'>{tree.math.d}</p>
        {renderTree(tree.math)}
      </Card.Body>
    </Card>

    <Card className='mb-3'>
      <Card.Body>
        <Card.Title>{tree.audio.t}</Card.Title>
        <p className='small text-muted'>{tree.audio.d}</p>
        {renderTree(tree.audio)}
      </Card.Body>
    </Card>
  </div>
}