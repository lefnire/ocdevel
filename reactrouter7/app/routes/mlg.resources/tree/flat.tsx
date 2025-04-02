import {ResourceNode, ResourceContext} from "~/routes/mlg.resources/tree/common";
import type {Resource} from '~/content/workflowy/mlg-resources.types'
import React from "react";

interface ResourcesFlat {
  flat: {[id: string]: Resource}
  nids: string[]
}
export function ResourcesFlat({flat, nids}: ResourcesFlat) {
  let seen: Record<string, boolean> = {}
  function render(item: string | {id: string}) {
    // Handle both string IDs and object IDs
    const id = typeof item === 'string' ? item : item.id;

    const full = flat[id]
    if (!full) { return null }
    if (!full.pick) {
      if (seen[id]) {return null}
      seen[id] = true
      return <ResourceNode node={{id}} key={id} />
    }
    // using full.v instead of node.v, since we don't want filters
    return full.v.map(render)
  }
  const built = nids.map(render)
  return <div className='resources'>
    <ResourceContext.Provider value={flat}>
      {built}
    </ResourceContext.Provider>
  </div>
}