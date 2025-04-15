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
    const nodeEasyAudio = ['podcast', 'audiobook'].includes(full.format)
    const nodeHardAudio = full.audioOption
    const nodeAnyAudio = nodeEasyAudio || nodeHardAudio
    const filterLightAudio = learnStyles.audio === 'normal'
    const filterHeavyAudio = learnStyles.audio === 'hardCore'
    if (section !== 'audio') {
      // They want heavy audio. We're in the normal section, so hide it
      // (to be shown in audio section)
      if (filterHeavyAudio && nodeAnyAudio) { return null; }
    } else {
      // In the audio section. Show if light; or if heavy, and they want heavy
      if (filterLightAudio && !nodeEasyAudio) { return null; }
      if (filterHeavyAudio && !nodeHardAudio) { return null; }
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

