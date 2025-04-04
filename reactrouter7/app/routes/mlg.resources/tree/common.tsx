import {
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useState,
  useContext, memo,
} from "react";
import {Link} from "react-router";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import Card from 'react-bootstrap/cjs/Card'
import Alert from 'react-bootstrap/cjs/Alert'
import Table from 'react-bootstrap/cjs/Table'
import startsWith from "lodash/startsWith";

// switched from react-markdown for render speed (LCP)
import Markdown from 'marked-react'
import {icons} from "~/components/collapsible-icons";
import {filterKeys, filters} from '~/content/podcast/resources/filters'
import {picks} from '~/content/podcast/resources/picks'
import type {Resource, FilterKey} from "~/content/workflowy/mlg-resources.types"
import {ResourceCacheContext} from "./resource-cache";
import {Icon} from './icon'


function ResourceWrapper({children, show}: PropsWithChildren<{ show: boolean }>) {
  if (!show) {
    return <div>{children}</div>
  }
  return <Card className='shadow mb-2 pb-0'>
    <Card.Body className='p-1'>
      {children}
    </Card.Body>
  </Card>
}

const Resource = memo(({id}: { id: string }) => {
  const {flat} = useContext(ResourceCacheContext);
  const [show, setShow] = useState(false)
  const [showHelp, setShowHelp] = useState()
  const node = flat[id];

  const renderIcon = (filterKey: FilterKey) => {
    const id = `${filterKey}-${node[filterKey]}`
    return <Icon key={id} id={id} />
  }

  function toggle() {
    setShow(!show)
  }

  function resetHelp() {
    setShowHelp(null)
  }

  const helpAttrs = (helpMsg: string, className: string | null = null) => ({
    className,
    onMouseEnter: () => setShowHelp(helpMsg),
    onMouseLeave: resetHelp
  })

  // Removed the old renderIcon implementation, now handled by useIconRenderer hook

  // Added type for parameter
  function renderDetails(filterKey: FilterKey) {
    // if (!resource[filterKey]) {return } // FIXME due to old resources?
    const filter = filters[filterKey]
    const opt = node[filterKey]
    const resourceFilter = filters[filterKey]?.opts?.[opt]
    if (!(resourceFilter)) return null
    return <tr key={filterKey}>
      <td {...helpAttrs(filter.d, 'pointer')}>
        {filter.t}
      </td>
      <td {...helpAttrs(resourceFilter.d, 'pointer')}>
        {renderIcon(filterKey, opt)}
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

  function renderLink(l: Resource['links'][0]) {
    const opts = {
      ...helpAttrs(filters.price.opts[l.p].d),
      className: 'd-block',
      target: "_blank"
    }
    const txt = `${l.t} (${l.p})`
    // React doesn't allow key in the {...props} spread, have to pass explicitly
    if (startsWith(l.l, '/')) {
      return <Link to={l.l} key={l.l} {...opts}>{txt}</Link>
    }
    return <a href={l.l} key={l.l} {...opts}>{txt}</a>
  }

  function renderLinks() {
    return <tr>
      <td {...helpAttrs("Where to get this resource", 'pointer')}>
        Links
      </td>
      <td>
        {node.links.map(renderLink)}
        {node.tgc && <Link to='/blog/20201213-tgc' className='d-block'>Get it cheaper</Link>}
      </td>
    </tr>
  }

  function renderTable() {
    return <div className='small'>
      <Table striped size='sm filters-table my-2'>
        <colgroup>
          <col className='ft-col1'/>
          <col className='ft-col2'/>
        </colgroup>
        <tbody>
        {renderLinks()}
        {filterKeys.map(renderDetails)}
        </tbody>
      </Table>
      {showHelp ?
        <Alert variant='info mb-0'>{showHelp}</Alert> :
        <Alert variant='info mb-0'><FaInfoCircle/> Hover over a key/value for information</Alert>
      }
    </div>
  }

  return <div className={`resource`}>
    <ResourceWrapper show={show}>
      <div onClick={toggle} className="pointer">
        {show ? icons.down : icons.right}
        <span className='mx-2 resource-title'>
          {node.t}
        </span>
        {filterKeys.map(renderIcon)}
      </div>
      {show && <div className='px-2 pb-1'>
        {node.d && <div className={'my-2 small text-muted'}>
          <Markdown>{node.d}</Markdown>
        </div>}
        {node.itunesu && <div className='small text-muted my-2'>
          This is a recorded university course, what used be part of the iTunesU system. These courses can be listened
          to audio-only, but I wouldn't recommend it unless you're really pushing audio-heavy. The professors don't do
          a great job orating, unlike TheGreatCourses teachers who orate wonderfully. So you'll likely want the
          visuals.
        </div>}
        {renderTable()}
      </div>}
    </ResourceWrapper>
  </div>
})

function TreeSectionWrapper({expanded, children}: PropsWithChildren<{ expanded: boolean }>) {
  return <div className={expanded ? 'section-expanded border-start border-top' : ''}>
    {expanded ? <div
        className='ps-0 m-0 border-end-0 border-bottom-0 border-top-0'
      >{children}</div>
      : <div className=''>{children}</div>}
  </div>
}

export function ResourceNode({id, level = 0}: { id: string, level?: number }) { // Allow node to be undefined initially
  const {flat} = useContext(ResourceCacheContext);
  if (!flat[id]) {return null}
  return <ResourceNode_ id={id} level={level}/>
}

function ResourceNode_({id, level = 0}: { id: string, level: number }) { // node is guaranteed here by ResourceNode wrapper
  const {flat} = useContext(ResourceCacheContext);
  const node = flat[id]
  const [expanded, setExpanded] = useState(!!node.expand)
  const [showPick, setShowPick] = useState(false)

  const showPick_ = useCallback(() => {
    setShowPick(!showPick)
  }, [showPick])

  if (!node.pick) {
    return <div className='py-2'>
      <Resource id={id}/>
    </div>
  }

  // pick is present, but no children; this section was filtered out
  if (!node.v?.length) {
    return null
  }

  let header = <>{expanded ? icons.minus : icons.plus} {node.t}</>
  header = level === 0 ?
    <h4 className='resource-header mb-0'>{header}</h4> :
    <div>{header}</div>

  function renderSectionInfo() {
    if (!expanded) {
      return null
    }
    if (!(node.d || node.pick)) {
      return null
    }
    return <div className='small ms-2'>
      {node.d && <div className='my-1 text-muted'>
        <Markdown>{node.d}</Markdown>
      </div>}
      {node.pick && <div>
        <div
          className='pointer'
          onClick={showPick_}
        >
          {showPick ? icons.down : icons.right}{' '}
          {picks[node.pick].t}
        </div>
        {showPick && <div className='ms-3 text-muted'>{picks[node.pick].d}</div>}
      </div>}
    </div>
  }

  const dontPad = level === 0 || expanded

  function renderLi(v: Resource) {
    const key = `${level}-${v.id}`
    return <li key={key}>
      <ResourceNode id={v.id} level={level + 1}/>
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
      {node.v.map(renderLi)}
    </ul>}
  </div>
}


