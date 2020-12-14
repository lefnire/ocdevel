import { createStore, action } from 'easy-peasy';
import {filters as filters_} from './content/podcast/resources'
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
    return state
  })
  return m
}, {})

export const store = createStore({
  tab: "filters",
  setTab: action((state, tab) => {
    return {...state, tab}
  }),

  episodeOrder: 'new2old',
  setEpisodeOrder: action((state, episodeOrder) => {
    return {...state, episodeOrder}
  }),

  // TODO
  viewAs: 'episodes',

  filters
});