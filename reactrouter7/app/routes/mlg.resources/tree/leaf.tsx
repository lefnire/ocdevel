import {memo, type PropsWithChildren, useCallback, useContext, useState} from "react";
import Card from "react-bootstrap/cjs/Card";
import {ResourceCacheContext} from "~/routes/mlg.resources/tree/resource-cache";
import type {FilterKey, Resource} from "~/content/podcast/resources/resources.types";
import {Icon} from "~/routes/mlg.resources/tree/icon";
import {filterKeys, filters} from "~/content/podcast/resources/filters";
import {Link} from "react-router";
import Table from "react-bootstrap/cjs/Table";
import Alert from "react-bootstrap/cjs/Alert";
import {FaInfoCircle} from "@react-icons/all-files/fa/FaInfoCircle";
import {icons} from "~/components/collapsible-icons";
import {mlgObj} from '~/content/podcast/metas'

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

  const renderIcon = (filterKey: FilterKey, opt: string) => {
    const id = `${filterKey}-${opt}`
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
    // handle multi-value tags, like #format:book:audiobook
    const opts = Array.isArray(opt) ? opt : [opt]
    return opts.flatMap(opt => {
      const resourceFilter = filter?.opts?.[opt]
      if (!(resourceFilter)) return null
      return <tr key={`${filterKey}-${opt}`}>
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
    }).filter(Boolean)
  }

  function renderLink(l: Resource['links'][0]) {
    const opts = {
      ...helpAttrs(filters.price.opts[l.p].d),
      className: 'd-block',
      target: "_blank"
    }
    const txt = `${l.t} (${l.p})`
    // React doesn't allow key in the {...props} spread, have to pass explicitly
    if (l.l?.startsWith('/')) { // Added optional chaining for safety
      return <Link to={l.l} key={l.l} {...opts}>{txt}</Link>
    }
    return <a href={l.l} key={l.l} {...opts}>
      {txt}
      {l.l.includes('amzn.to') ? " (affiliate link)" : ""}
    </a>
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

  function renderEpisode(id: string){
    const episode = mlgObj[id]
    if (!episode) { return null; }
    // TODO duplicating utils.buildTitle to bypase useContext requirement
    const titleStart = episode.mla ? 'MLA' : 'MLG'
    const num = String(episode.episode).padStart(3, '0');
    const title = `${titleStart} ${num} ${episode.title}`;
    return <tr key={id}>
      <td {...helpAttrs("Relevant Machine Learning Guide Episode", 'pointer')}>
        {id.includes('mla') ? "MLA" : "MLG"} Episode
      </td>
      <td>
        <Link to={`/mlg/${id}`} className='d-block'>{title}</Link>
      </td>
    </tr>
  }

  function renderEpisodes() {
    const ids = [
      ...(node.mlg || []),
      ...((node.mla || []).map(id => `mla-${id}`))
    ]
    if (!ids.length) { return null; }
    return ids.flatMap(renderEpisode)
  }

  function renderTable() {
    if (node.info) { return null; }
    return <div className='small'>
      <Table striped size='sm filters-table my-2'>
        <colgroup>
          <col className='ft-col1'/>
          <col className='ft-col2'/>
        </colgroup>
        <tbody>
        {renderLinks()}
        {filterKeys.flatMap(renderFilters)}
        {renderEpisodes()}
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
      {node.missing && <div className='my-2'>
        <mark>This resource might be missing now. This is common with YouTube-hosted university courses, because Universities like Stanford & MIT faced legal battles around accessibility and had to pull certain lectures. Sometimes old (2016) lectures are retained, but with the fast pace of ML, I wouldn't recommend anything older than 2020. I kept links here in case your search skills are better than mine; but don't search too hard, there's plenty of other good resources.</mark>
      </div>}
      {node.itunesu && <div className='my-2'>
        <mark>This is a recorded university course, what used be part of the iTunesU system. These courses can be listened to audio-only, but I wouldn't recommend it unless you're really pushing audio-heavy. The professors don't do a great job orating, unlike TheGreatCourses teachers who orate wonderfully. So you'll likely want the
          visuals.</mark>
      </div>}
      {renderTable()}
    </div>
  </div>
})

type Leaf = {id: string, route?: "podcast.$id" | "mlg/resources"}
export const Leaf = memo(({id, route}: Leaf) => {
  const {flat} = useContext(ResourceCacheContext);
  const [show, setShow] = useState(false)
  const node = flat[id];
  const toggle = useCallback(() => setShow(!show), [show])

  // Only show core resources within show-notes. They should come to mlg/resources for
  // fuller picture
  if (route === 'podcast.$id' && node.hide) { return null; }

  function renderTitle() {
    const classes = ["mx-2 resource-title"]
    if (node.info) { classes.push("text-muted") }
    if (node.archived) { classes.push("text-decoration-line-through") }
    return <span className={classes.join(' ')}>{node.t}</span>
  }

  function renderIcons() {
    if (node.info) { return null; }
    return filterKeys.flatMap(fk => {
      const val = node[fk]
      // allow multiple values per tag, like #format:book:audiobook
      const vals = Array.isArray(val) ? val : [val]
      return vals.map((val:string) => {
        const id = `${fk}-${val}`
        return <Icon key={id} id={id} />
      })
    })
  }


  return <div className="resource py-2">
    <LeafWrapper show={show}>
      <div onClick={toggle} className="pointer">
        {show ? icons.down : icons.right}
        {renderTitle()}
        {renderIcons()}
      </div>
      {show && <LeafExpanded id={id} />}
    </LeafWrapper>
  </div>
})