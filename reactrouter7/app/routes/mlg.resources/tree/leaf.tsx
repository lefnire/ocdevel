import {memo, type PropsWithChildren, useCallback, useContext, useState} from "react";
import Card from "react-bootstrap/cjs/Card";
import {ResourceCacheContext} from "~/routes/mlg.resources/tree/resource-cache";
import type {FilterKey, Resource} from "~/content/workflowy/mlg-resources.types";
import {Icon} from "~/routes/mlg.resources/tree/icon";
import {filterKeys, filters} from "~/content/podcast/resources/filters";
import {Link} from "react-router";
import startsWith from "lodash/startsWith";
import Table from "react-bootstrap/cjs/Table";
import Alert from "react-bootstrap/cjs/Alert";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {icons} from "~/components/collapsible-icons";

const LeafWrapper = ({children, show}: PropsWithChildren<{ show: boolean }>) => {
  if (!show) {
    return <div>{children}</div>
  }
  return <Card className='shadow mb-2 pb-0'>
    <Card.Body className='p-1'>
      {children}
    </Card.Body>
  </Card>
}

const LeafExpanded = memo(({id}: {id: string}) => {
  const {flat} = useContext(ResourceCacheContext);
  const node = flat[id]
  const [showHelp, setShowHelp] = useState<string | null>(null)

  const renderIcon = (filterKey: FilterKey) => {
    const id = `${filterKey}-${node[filterKey]}`
    return <Icon key={id} id={id} />
  }

  const resetHelp = useCallback(() => setShowHelp(null), [])

  const helpAttrs = (helpMsg: string, className: string | null = null) => ({
    className,
    onMouseEnter: () => setShowHelp(helpMsg),
    onMouseLeave: resetHelp
  })

  // Removed the old renderIcon implementation, now handled by useIconRenderer hook

  // Added type for parameter
  function renderFilters(filterKey: FilterKey) {
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
        {filterKeys.map(renderFilters)}
        </tbody>
      </Table>
      {showHelp ?
        <Alert variant='info mb-0'>{showHelp}</Alert> :
        <Alert variant='info mb-0'><FaInfoCircle/> Hover over a key/value for information</Alert>
      }
    </div>
  }

  return <div>
    <div className='px-2 pb-1'>
      {node.d && <div
        className={'my-2 small text-muted'}
        dangerouslySetInnerHTML={{ __html: node.d }}
      ></div>}
      {node.itunesu && <div className='small text-muted my-2'>
        This is a recorded university course, what used be part of the iTunesU system. These courses can be listened
        to audio-only, but I wouldn't recommend it unless you're really pushing audio-heavy. The professors don't do
        a great job orating, unlike TheGreatCourses teachers who orate wonderfully. So you'll likely want the
        visuals.
      </div>}
      {renderTable()}
    </div>
  </div>
})

export const Leaf = memo(({id}: { id: string }) => {
  const {flat} = useContext(ResourceCacheContext);
  const [show, setShow] = useState(false)
  const node = flat[id];

  const renderIcon = (filterKey: FilterKey) => {
    const id = `${filterKey}-${node[filterKey]}`
    return <Icon key={id} id={id} />
  }

  const toggle = useCallback(() => setShow(!show), [show])

  return <div className="resource py-2">
    <LeafWrapper show={show}>
      <div onClick={toggle} className="pointer">
        {show ? icons.down : icons.right}
        <span className='mx-2 resource-title'>
          {node.t}
        </span>
        {filterKeys.map(renderIcon)}
      </div>
      {show && <LeafExpanded id={id} />}
    </LeafWrapper>
  </div>
})