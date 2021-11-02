import React from 'react'
import create from "zustand";
import compact from "lodash/compact";
import reduce from "lodash/reduce";
import {flat, top} from "../content/podcast/resources";
import {filterKeys, filters as filters_} from "../content/podcast/resources/filters";
import produce from 'immer'

function recurseTree(filters, learnStyles, node=null, section=null) {
  if (!node) {
    const sections = []
    if (learnStyles.learn === 'selfTaught') {
      sections.push('main')
      sections.push('math')
    } else {
      sections.push('degrees')
    }
    sections.push('audio')
    return sections.map(k => recurseTree(filters, learnStyles, top[k], k))
  }

  const full = flat[node.id]

  // section
  if (full.v?.length) {
    let v = full.v.map(n => recurseTree(filters, learnStyles, n, section=section))
    v = compact(v)
    if (v.length === 0) {return null}
    return {...node, v}
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
  return keep ? node : null
}

export const useStore = create((set, get) => ({
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
    }), {}),

    // set_* actions for all filters (eg set_importance())
    [`set_${k}`]: ([opt, v]) => set(produce(state => {
      state.filters[k][opt] = v
    })),
  }), {}),
}))

export function useFilteredTree() {
  const filters = useStore(state => state.filters)
  const learnStyles = useStore(state => state.learnStyles)

  return recurseTree(filters, learnStyles)
}