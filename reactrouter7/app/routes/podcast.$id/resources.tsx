import {ResourceCacheContext, ResourceCacheProvider} from '../mlg.resources/tree/resource-cache'
import type {Route} from './+types/route'
import {memo, useContext} from "react";
import {Leaf} from "~/routes/mlg.resources/tree/leaf";

// type Props = Route['loaderArgs']['resources']
type Props = {flat: any}
export function ResourcesFlat({flat}: Props) {
  return <ResourceCacheProvider flat={flat}>
    <div className="resources">
      <Resources />
    </div>
  </ResourceCacheProvider>
}

const Resources = () => {
  const {flat} = useContext(ResourceCacheContext)
  return Object.entries(flat)
    .map(([id, _]) => (
      <Leaf id={id} key={id} />
    ))
}
