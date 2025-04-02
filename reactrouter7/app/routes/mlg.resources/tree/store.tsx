import {create} from "zustand";
import compact from "lodash/compact";
import reduce from "lodash/reduce";
import {flat, top} from "~/content/podcast/resources";
import {filterKeys, filters as filters_} from "~/content/podcast/resources/filters";
import {produce} from 'immer'

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

export const useStore = create((set, get) => ({
  showFilters: true,
  toggleFilters: () => set(state => ({showFilters: !state.showFilters})),

  // learnStyles: _.transform(learnStyles, filtersToStore, {}),
  learnStyles: {
    learn: 'selfTaught',
    set_learn: (learn) => set(produce(state => {
      state.learnStyles.learn = learn
    })),
    audio: 'normal',
    set_audio: (audio) => set(produce(state => {
      state.learnStyles.audio = audio
    })),
  },

  filters: reduce(filters_, (m,v,k) => ({
    ...m,

    // initial filters - all true
    [k]: reduce(v.opts, (m_,v_,k_) => ({
      ...m_,
      [k_]: true
    }), {all: true}),

    // set_* actions for all filters (eg set_importance())
    [`set_${k}`]: ([opt, v]) => set(produce(state => {
      state.filters[k][opt] = v
      state.filters[k].all = reduce(state.filters[k], (m, v) => m && v, true)
    })),
  }), {}),
}))

export function useFilteredTree() {
  const filters = useStore(state => state.filters)
  const learnStyles = useStore(state => state.learnStyles)

  // console.log(filters)

  return recurseTree(filters, learnStyles)
}