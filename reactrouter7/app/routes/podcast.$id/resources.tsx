import {ResourceNode} from "~/routes/mlg.resources/tree/common";
import {ResourceCacheContext, ResourceCacheProvider} from '../mlg.resources/tree/resource-cache'
import type {Route} from './+types/route'
import {useContext} from "react";

// type Props = Route['loaderArgs']['resources']
type Props = {flat: any}
export function ResourcesFlat({flat}: Props) {
  return <ResourceCacheProvider flat={flat}>
    <div className="resources">
      <Resources />
    </div>
  </ResourceCacheProvider>
}

function Resources() {
  const {flat} = useContext(ResourceCacheContext)
  return Object.entries(flat)
    .map(([id, resource]) => (
      <ResourceNode id={id} key={id} />
    ))
}
