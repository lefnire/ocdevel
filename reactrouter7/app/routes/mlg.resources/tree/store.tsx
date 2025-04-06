import {create} from "zustand";
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

  filters: Object.entries(filters_).reduce((m, [k, v]) => {
    m[k] = Object.entries(v.opts || {}).reduce((m_, [k_, v_]) => {
      m_[k_] = true;
      return m_;
    }, { all: true });
    // set_* actions for all filters (eg set_importance())
    // set_* actions for all filters (eg set_importance())
    m[`set_${k}`] = ([opt, val]) => set(produce(state => { // Renamed v to val
      state.filters[k][opt] = val;
      // Check if all options *except* 'all' are true
      state.filters[k].all = Object.entries(state.filters[k]).every(([key, value]) => key === 'all' || value);
    }));
    return m;
  }, {}),
}))
