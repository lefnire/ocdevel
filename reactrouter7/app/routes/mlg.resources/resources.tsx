import {useStore} from "./tree/store";
import {useContext} from "react";
import {Branch} from "./tree/branch";
import {ResourceCacheContext, ResourceCacheProvider} from "./tree/resource-cache";
import {filterKeys} from "~/content/podcast/resources/filters";
import type {AllResources, ResourceChildRef} from '~/content/podcast/resources/resources.types'
import _reduce from 'lodash/reduce'
// import {mlgList} from "~/content/podcast/metas";


export function Tree({flat, top}: AllResources) {
  return <div className='resources resources-tree mb-3'>
    <ResourceCacheProvider flat={flat}>
      <FilteredTree top={top} />
    </ResourceCacheProvider>
  </div>
}

type Top = AllResources['top']
function FilteredTree({top}: {top: Top}) {
  const {flat} = useContext(ResourceCacheContext)
  const filters = useStore(s => s.filters)

  // console.log(mlgList.map(episode => {
  //   return `${episode.mla ? "MLA" : "MLG"} ${episode.episode} ${episode.title}. ${episode.teaser?.slice(0, 100)}...`
  // }))

  function recurseTree(id: string): ResourceChildRef | null {
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

