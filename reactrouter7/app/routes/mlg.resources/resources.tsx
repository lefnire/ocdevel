import {useStore} from "./tree/store";
import {useContext} from "react";
import {Branch} from "./tree/branch";
import {ResourceCacheContext, ResourceCacheProvider} from "./tree/resource-cache";
import compact from "lodash/compact";
import reduce from "lodash/reduce";
import {filterKeys} from "~/content/podcast/resources/filters";
import {useShallow} from "zustand/react/shallow";
import type {Resource, ResourcesTree} from '~/content/workflowy/mlg-resources.types'


export function Tree({flat, top}: ResourcesTree) {
  return <div className='resources resources-tree mb-3'>
    <ResourceCacheProvider flat={flat}>
      <FilteredTree top={top} />
    </ResourceCacheProvider>
  </div>
}

function FilteredTree({top}: {top: ResourcesTree['top']}) {
  const {flat} = useContext(ResourceCacheContext)
  const [filters, learnStyles] = useStore(useShallow(s => [
    s.filters,
    s.learnStyles
  ]))

  function recurseTree(filters, learnStyles, id=null, section=null) {
    if (!id) {
      const sections = []
      if (learnStyles.learn === 'selfTaught') {
        sections.push('main')
        sections.push('math')
      } else {
        sections.push('degrees')
      }
      sections.push('audio')
      return sections.map(section => recurseTree(filters, learnStyles, top[section].id, section))
    }

    const full = flat[id]

    // section
    if (full.v?.length) {
      let v = full.v.map(({id}) => recurseTree(filters, learnStyles, id, section=section))
      v = compact(v)
      if (v.length === 0) {return null}
      return {id, v}
    }

    // leaf node
    if (full.audioOption) {
      if (learnStyles.audio === 'normal' && section === 'audio') {
        return null
      }
      if (learnStyles.audio === 'hardCore' && section !== 'audio') {
        return null
      }
    }

    const keep = reduce(filterKeys, (m, fk) => {
      if (!full[fk]) {return m} // N/A attrs, like video2audio
      return m && filters[fk][full[fk]]
    }, true)
    return keep ? {id} : null
  }

  const sections = recurseTree(filters, learnStyles).filter(Boolean)
  return sections.map((n: Resource) => <Branch id={n.id} key={n.id} />)
}

