import { createStore, action, computed } from 'easy-peasy';
import {
  eitherOr,
  resources,
} from './content/podcast/resources'
import {
  filters as filters_,
  filterKeys,
  learnStyles
} from './content/podcast/resources/filters'
import _ from 'lodash'

const episodes = {
  mlg: true,
  setMlg: action((state, payload) => {
    state.mlg = payload
  }),
  mla: true,
  setMla: action((state, payload) => {
    state.mla = payload
  }),

  episodeOrder: 'new2old',
  setEpisodeOrder: action((state, payload) => {
    state.episodeOrder = payload
  }),
}

// Transforms filters from ./filters.js to store attrs (getters/setters)
// importance: {supplementary: true, valuable: true, essential: true}
// set_importance: action()
function filtersToStore(m, v, k) {
  m[k] = _.transform(v.opts, (m_, v_, k_) => {
    m_[k_] = true
    return m_
  }, {})
  m[`set_${k}`] = action((state, payload) => {
    state[k] = {...state[k], ...payload}
  })
  return m
}

export const store = createStore({
  episodes,

  // learnStyles: _.transform(learnStyles, filtersToStore, {}),
  learnStyles: {
    learn: 'selfTaught',
    set_learn: action((s, p) => s.learn = p),
    audio: 'hardCore',
    set_audio: action((s, p) => s.audio = p)
  },

  filters: _.transform(filters_, filtersToStore, {}),
  filteredResources: computed(({filters}) => {
    return _.pickBy(resources, (r) => {
      return _.reduce(filterKeys, (m, fk) => {
        if (!r[fk]) {return m} // N/A attrs, like video2audio
        return m && filters[fk][r[fk]]
      }, true)
    })
  }),
});