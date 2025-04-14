import {
  type PropsWithChildren,
  useCallback,
  useState,
  useContext, memo,
} from "react";

import {icons} from "~/components/collapsible-icons";
import {picks} from '~/content/podcast/resources/picks'
import type {Resource, ResourcePartial} from "~/content/podcast/resources/resources.types"
import {ResourceCacheContext} from "./resource-cache";
import {Leaf} from './leaf'

// override v, so resourceFilter can pare it down. Pass in manually from caller
type Branch = ResourcePartial & {level?: number}
export const Branch = memo(({id, v, level = 0}: Branch) => {
  const {flat} = useContext(ResourceCacheContext);
  const node = flat[id]
  if (!node) {return null}
  return <Branch_ node={node} v={v} level={level}/>
})

type Branch_ = { node: Resource, v: ResourcePartial[], level: number }
const Branch_ = ({node, v, level = 0}: Branch_)=> {
  const [expanded, setExpanded] = useState(!!node.expand)
  const [showPick, setShowPick] = useState(false)
  const id = node.id

  const showPick_ = useCallback(() => {
    setShowPick(!showPick)
  }, [showPick])

  if (!node.pick) {
    return <Leaf id={id}/>
  }

  // pick is present, but no children; this section was filtered out
  if (!v?.length) {
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
      {node.d && <div
        className='my-1 text-muted'
        dangerouslySetInnerHTML={{ __html: node.d }}
      ></div>}
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

  return <div className={dontPad ? '' : 'py-2'}>
    <TreeSectionWrapper expanded={expanded}>
      <div
        onClick={() => setExpanded(!expanded)}
        className={`pointer`}
      >{header}</div>
      {renderSectionInfo()}
    </TreeSectionWrapper>
    {expanded && <ul className={`list-unstyled border-start ps-4 mb-0`}>
      {v.map(v => (
        <li key={`${level}-${v.id}`}>
          <Branch id={v.id} v={v.v} level={level + 1}/>
        </li>
      ))}
    </ul>}
  </div>
}

function TreeSectionWrapper({expanded, children}: PropsWithChildren<{ expanded: boolean }>) {
  return <div className={expanded ? 'section-expanded border-start border-top' : ''}>
    {expanded ? <div
        className='ps-0 m-0 border-end-0 border-bottom-0 border-top-0'
      >{children}</div>
      : <div className=''>{children}</div>}
  </div>
}
