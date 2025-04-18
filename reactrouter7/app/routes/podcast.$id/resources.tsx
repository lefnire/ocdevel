import {ResourceCacheProvider} from '../mlg.resources/tree/resource-cache'
import {Leaf} from "~/routes/mlg.resources/tree/leaf";
import type {EpisodeResources} from "~/content/podcast/resources/resources.types";

// type Props = Route['loaderArgs']['resources']
export default function ResourcesFlat({flat, nids}: EpisodeResources) {
  return <>
    <ResourceCacheProvider flat={flat}>
      <div className="resources">
        <Resources nids={nids}/>
      </div>
    </ResourceCacheProvider>
  </>
}

const Resources = (
  {nids}: Pick<EpisodeResources, 'nids'>
) => {
  return nids.map(id => <Leaf id={id} key={id} route='podcast.$id'/>)
}
