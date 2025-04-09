import {create} from "zustand";
import {filters as filters_} from "~/content/podcast/resources/filters";
import { immer } from 'zustand/middleware/immer'

interface Store {
  showFilters: boolean
  toggleFilters: () => void
  learnStyles: {
    learn: string
    audio: string

    set_learn: (learn: string) => void
    set_audio: (audio: string) => void
  }
  filters: {
    [k: string]: boolean,
    // set_x: (v) => void
  }
}

export const useStore = create<Store>()(
  immer((set, get) => {
    const filters = Object.entries(filters_)
      .reduce((m, [k, v]) => {
        m[k] = Object.entries(v.opts || {}).reduce((m_, [k_, v_]) => {
          m_[k_] = true;
          return m_;
        }, {all: true});
        // set_* actions for all filters (eg set_importance())
        m[`set_${k}`] = ([opt, val]) => set(state => { // Renamed v to val
          state.filters[k][opt] = val;
          // Check if all options *except* 'all' are true
          state.filters[k].all = Object.entries(state.filters[k]).every(([key, value]) => key === 'all' || value);
        });
        return m;
      }, {})
    return {
      showFilters: true,
      toggleFilters: () => set(state => ({showFilters: !state.showFilters})),

      // learnStyles: _.transform(learnStyles, filtersToStore, {}),
      learnStyles: {
        learn: 'selfTaught',
        set_learn: (learn) => set(state => {
          state.learnStyles.learn = learn
        }),
        audio: 'normal',
        set_audio: (audio) => {
          set(state => {
            state.learnStyles.audio = audio
          })
        },
      },

      filters
    }
  }
))