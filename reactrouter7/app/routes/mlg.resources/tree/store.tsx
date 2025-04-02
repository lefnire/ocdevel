import {create} from "zustand";
import reduce from "lodash/reduce";
import {filters as filters_} from "~/content/podcast/resources/filters";
import {produce} from 'immer'

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
