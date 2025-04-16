import {create} from "zustand";
import {filters as filters_, type FilterKeys} from "~/content/podcast/resources/filters";
import { immer } from 'zustand/middleware/immer'

// type FiltersFilter = Record<FilterKeys, any>
// type FilterSet = Record<`set_${FilterKeys}`, () => void>
interface Store {
  showFilters: boolean
  toggleFilters: () => void
  learnStyles: {
    learn: string
    set_learn: (learn: string) => void
  }
  filters: any // FiltersFilter & FilterSet
}

export const useStore = create<Store>()(
  immer((set, get) => {

    // dynamic filters getter/setter construction
    const filters: any = {}
    Object.entries(filters_).forEach(([filterKey, filter]) => {
      filters[filterKey] = {all: true}
      Object.entries(filter.opts || {}).forEach(([optKey, opt]) => {
        filters[filterKey][optKey] = true;
      })
      // set_* actions for all filters (eg set_importance())
      filters[`set_${filterKey}`] = ([opt, val]: [string, string]) => set(state => { // Renamed v to val
        state.filters[filterKey][opt] = val;
        // Check if all options *except* 'all' are true
        state.filters[filterKey].all = (
          Object.entries(state.filters[filterKey])
            .every(([key, value]) => key === 'all' || value)
        )
      });
    });

    return {
      showFilters: true,
      toggleFilters: () => set(state => ({showFilters: !state.showFilters})),

      // learnStyles: _.transform(learnStyles, filtersToStore, {}),
      learnStyles: {
        learn: 'selfTaught',
        set_learn: (learn) => set(state => {
          state.learnStyles.learn = learn
        }),
      },

      filters
    }
  }
))