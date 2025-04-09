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
  ): ResourcePartial | null {
    const full = flat[id]

    // section
    if (full.v?.length) {
      const v = full.v
        .map(({id}) => recurseTree(id, section))
        .filter(n => n !== null)
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
      const isActive = filters[fk][full[fk]]
      return m && isActive
    }, true)
    return keep ? {id, v: []} : null
  }

  const sections: Section[] = []
  if (learnStyles.learn === 'selfTaught') {
    sections.push('main')
    sections.push('math')
  } else {
    sections.push('degrees')
  }
  sections.push('audio')
  return sections
    .map(section => recurseTree(top[section].id, section))
    .filter(n => n !== null)
    .map(n => (
      <Branch id={n.id} v={n.v} key={n.id} />
    ))
}

