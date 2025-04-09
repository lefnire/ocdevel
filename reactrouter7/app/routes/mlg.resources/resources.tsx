import {useStore} from "./tree/store";
import {useContext} from "react";
import {Branch} from "./tree/branch";
import {ResourceCacheContext, ResourceCacheProvider} from "./tree/resource-cache";
import {filterKeys} from "~/content/podcast/resources/filters";
import {useShallow} from "zustand/react/shallow";
import type {Resource, AllResources, ResourcePartial} from '~/content/workflowy/mlg-resources.types'
import _reduce from 'lodash/reduce'


export function Tree({flat, top}: AllResources) {
  return <div className='resources resources-tree mb-3'>
    <ResourceCacheProvider flat={flat}>
      <FilteredTree top={top} />
    </ResourceCacheProvider>
  </div>
}

type Top = AllResources['top']
type Section = keyof Top
function FilteredTree({top}: {top: Top}) {
  const {flat} = useContext(ResourceCacheContext)
  const [filters, learnStyles] = useStore(useShallow(s => [
    s.filters,
    s.learnStyles
  ]))

  function recurseTree(
    id: string,
    section: Section
  ): ResourcePartial[] | ResourcePartial | null {
    const full = flat[id]

    // section
    if (full.v?.length) {
      let v = full.v.map(({id}) => recurseTree(id, section))
      v = v.filter(Boolean)
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

    const keep = _reduce(filterKeys, (m, fk) => {
      if (!full[fk]) {return m} // N/A attrs, like video2audio
      return m && filters[fk][full[fk]]
    }, true)
    return keep ? {id} : null
  }

  const sections: Section[] = []
  if (learnStyles.learn === 'selfTaught') {
    sections.push('main')
    sections.push('math')
  } else {
    sections.push('degrees')
  }
  sections.push('audio')
  const branches = sections
    .map(section => recurseTree(top[section].id, section))
    .filter(Boolean)
  return branches.map((n: Resource) => <Branch id={n.id} key={n.id} />)
}

