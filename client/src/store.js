import { createStore, action, computed } from 'easy-peasy';
import {eitherOr, resources} from './content/podcast/resources'
import {filters as filters_, filterKeys} from './content/podcast/resources/filters'
import _ from 'lodash'

// importance: {supplementary: true, valuable: true, essential: true}
// set_importance: action()
const filters = _.transform(filters_, (m, v, k) => {
  m[k] = _.transform(v.opts, (m_, v_, k_) => {
    m_[k_] = true
    return m_
  }, {})
  m[`set_${k}`] = action((state, payload) => {
    state[k] = {...state[k], ...payload}
  })
  return m
}, {})

const structure = {
  audio: 'hardcore',
  setAudio: action((state, payload) => {state.audio = payload}),

  degrees: true,
  setDegrees: action((state, payload) => {state.degrees = payload}),

}

export const store = createStore({
  tab: "podcasts",
  setTab: action((state, tab) => {
    state.tab = tab
  }),

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

  viewAs: 'episodes',
  setViewAs: action((state, payload) => {
    state.viewAs = payload
  }),

  filters,
  filteredResources: computed(({filters}) => {
    return _.pickBy(resources, (r) => {
      return _.reduce(filterKeys, (m, fk) => {
        if (!r[fk]) {return m} // N/A attrs, like video2audio
        return m && filters[fk][r[fk]]
      }, true)
    })
  }),
});