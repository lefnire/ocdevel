import {useStore} from "./tree/store";
import {useContext} from "react";
import {Branch} from "./tree/branch";
import {ResourceCacheContext, ResourceCacheProvider} from "./tree/resource-cache";
import {filterKeys} from "~/content/podcast/resources/filters";
import {useShallow} from "zustand/react/shallow";
import type {Resource, AllResources, ResourcePartial} from '~/content/podcast/resources/resources.types'
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

  function recurseTree(id: string): ResourcePartial | null {
    const full = flat[id]

    // section
    if (full.v?.length) {
      const v = full.v
        .map(({id}) => recurseTree(id))
        .filter(n => n !== null)
      if (v.length === 0) {return null}
      return {id, v}
    }

    const keep = _reduce(filterKeys, (isPassing, filterKey) => {
      // looks like {format: "book"}
      const nodeVal = full[filterKey]
      // looks like {format: {book: true}}
      const activeFilters = filters[filterKey]
      if (!nodeVal) { return isPassing; } // N/A attrs, like video2audio
      // If there are multiple values, match if any of them are present
      if (Array.isArray(nodeVal)) {
        return _reduce(nodeVal, (anyPassing, nodeVal_i) => {
          return anyPassing || activeFilters[nodeVal_i]
        }, false)
      }
      // otherwise it's a string
      return isPassing && activeFilters[nodeVal]
    }, true)
    return keep ? {id, v: []} : null
  }

  return top
    .map(section => recurseTree(section.id))
    .filter(n => n !== null)
    .map(n => (
      <Branch id={n.id} v={n.v} key={n.id} />
    ))
}

