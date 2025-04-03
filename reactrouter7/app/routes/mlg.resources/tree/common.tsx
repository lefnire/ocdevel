import {
  createContext,
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useContext,
  useState
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
import type {Resource, ResourcesTree} from "~/content/workflowy/mlg-resources.types"
import {PopoverTrigger} from "~/components/popover";

export const ResourceContext = createContext<{[id: string]: Resource}>({})
function ResourceWrapper({children, show}: PropsWithChildren<{show: boolean}>) {
  if (!show) {return <div>{children}</div>}
  return <Card className='shadow mb-2 pb-0'>
    <Card.Body className='p-1'>
      {children}
    </Card.Body>
  </Card>
}

const iconMemo: {[id: string]: ReactElement} = {}

function Resource({node}: {node: Resource}) {
  const flat = useContext(ResourceContext)
  const [show, setShow] = useState(false)
  const [showHelp, setShowHelp] = useState()
  const full = flat[node.id]

  function toggle() {setShow(!show)}
  function resetHelp() {setShowHelp(null)}
  const helpAttrs = (helpMsg, className=null) => ({
    className,
    onMouseEnter: () => setShowHelp(helpMsg),
    onMouseLeave: resetHelp
  })

  function renderIcon(filterKey: keyof typeof filters) {
    // if (!resource[filterKey]) {return null} // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[full[filterKey]]
    if (!resourceFilter || !resourceFilter.i) {return null}
    const lookup = `${filterKey}-${full[filterKey]}`
    if (iconMemo[lookup]) { return iconMemo[lookup] }

    const id = `${filter.t}-${filterKey}`
    let className = "me-2 text-muted"
    className += ` icon-${lookup}`
    // if (filterKey !== 'importance') {className += ' text-muted'}

    const el = <PopoverTrigger
      key={id}
      trigger={["hover", "focus"]}
      placement="bottom"
      content={{
        title: undefined,
        body: () => <>
          <h6>{filter.t}</h6>
          <p className='small'>{filter.d}</p>
          <h6>{resourceFilter.i} {resourceFilter.t}</h6>
          <p className='small'>{resourceFilter.d}</p>
          <div className='text-primary'>Click item for details</div>
        </>
      }}
    >
      <span key={filterKey} className={className}>{resourceFilter.i}</span>
    </PopoverTrigger>
    iconMemo[lookup] = el
    return el
  }

  function renderDetails(filterKey) {
    // if (!resource[filterKey]) {return } // FIXME due to old resources?
    const filter = filters[filterKey]
    const resourceFilter = filter.opts[full[filterKey]]
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

  function renderLink(l: Resource['links'][0]) {
    const opts = {
      ...helpAttrs(filters.price.opts[l.p].d),
      key: l.l,
      className: 'd-block',
      target: "_blank"
    }
    const txt = `${l.t} (${l.p})`
    // React doesn't allow key in the {...props} spread, have to pass explicitly
    const {key: jsxKey, ...rest} = opts
    if (startsWith(l.l, '/')) {
      return <Link to={l.l} key={jsxKey} {...rest}>{txt}</Link>
    }
    return <a href={l.l} key={jsxKey} {...rest}>{txt}</a>
  }

  function renderLinks() {
    return <tr>
      <td {...helpAttrs("Where to get this resource", 'pointer')}>
        Links
      </td>
      <td>
        {full.links.map(renderLink)}
        {full.tgc && <Link to='/blog/20201213-tgc' className='d-block'>Get it cheaper</Link>}
      </td>
    </tr>
  }

  function renderTable() {
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
            {full.t}
          </span>
          {filterKeys.map(renderIcon)}
        </div>
        {show && <div className='px-2 pb-1'>
          {full.d && <div className={'my-2 small text-muted'}>
            <Markdown>{full.d}</Markdown>
          </div>}
          {full.itunesu && <div className='small text-muted my-2'>
            This is a recorded university course, what used be part of the iTunesU system. These courses can be listened to audio-only, but I wouldn't recommend it unless you're really pushing audio-heavy. The professors don't do a great job orating, unlike TheGreatCourses teachers who orate wonderfully. So you'll likely want the visuals.
          </div>}
          {renderTable()}
        </div>}
      </ResourceWrapper>
    </div>
  }

  return renderResource()
}

function TreeSectionWrapper({expanded, children}: PropsWithChildren<{expanded: boolean}>) {
  return <div className={expanded ? 'section-expanded border-start border-top' : ''}>
    {expanded ? <div
      className='ps-0 m-0 border-end-0 border-bottom-0 border-top-0'
    >{children}</div>
    : <div className=''>{children}</div>}
  </div>
}

export function ResourceNode({node, level=0}: {node: Resource, level: number}) {
  // Wrapper component to error-catch missing value
  const flat = useContext(ResourceContext)
  if (!flat[node?.id]) {return null}
  return <ResourceNode_ node={node} level={level} />
}

function ResourceNode_({node, level=0}: {node: Resource, level: number}) {
  const flat = useContext(ResourceContext)
  const full = flat[node.id]
  const [expanded, setExpanded] = useState(!!full.expand)
  const [showPick, setShowPick] = useState(false)

  const showPick_ = useCallback(() => {setShowPick(!showPick)}, [showPick])

  if (!full.pick) {
    return <div className='py-2'>
      <Resource node={node} />
    </div>
  }

  // pick is present, but no children; this section was filtered out
  if (!node.v?.length) {
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
        <Markdown>{full.d}</Markdown>
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

  function renderLi(v: Resource) {
    const key = `${level}-${v.id}`
    return <li key={key}>
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
      {node.v.map(renderLi)}
    </ul>}
  </div>
}


