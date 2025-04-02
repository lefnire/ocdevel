import {useStore} from "./store";
import React from "react";
import {ResourceNode, ResourceContext} from "./common";
import {flat, top} from "~/content/podcast/resources";
import compact from "lodash/compact";
import reduce from "lodash/reduce";
import {filterKeys} from "~/content/podcast/resources/filters";
import {useShallow} from "zustand/react/shallow";
import type {Resource, ResourcesTree} from '~/content/workflowy/mlg-resources.types'


export default function ResourcesTree({flat, top}: ResourcesTree) {
  return <div className='resources resources-tree mb-3'>
    <ResourceContext.Provider value={flat}>
      <FilteredTree {...top} />
    </ResourceContext.Provider>
  </div>
}

function FilteredTree(props: ResourcesTree['top']) {
  const [filters, learnStyles] = useStore(useShallow(s => [
    s.filters,
    s.learnStyles
  ]))
  const sections = recurseTree(filters, learnStyles)
  return sections.map((n: Resource) => n && <ResourceNode node={n} key={n.id} />)
}

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