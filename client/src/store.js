import { createStore, action, computed } from 'easy-peasy';
import {
  eitherOr,
  resources,
} from './content/podcast/resources'
import tree from './content/podcast/resources/tree'
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
    return sections.map(k => recurseTree(filters, learnStyles, tree[k], k))
  }

  // section
  if (node.v) {
    let v = node.v.map(n => recurseTree(filters, learnStyles, n, section=section))
    v = _.compact(v)
    if (v.length === 0) {return null}
    return {...node, v}
  }
  
  // leaf node
  if (!node.v) {
    if (node.video2audio) {
      if (learnStyles.audio === 'normal' && section === 'audio') {
        return null
      } else if (learnStyles.audio === 'hardCore' && section !== 'audio') {
        return null
      }
    }

    const keep = _.reduce(filterKeys, (m, fk) => {
      if (!node[fk]) {return m} // N/A attrs, like video2audio
      return m && filters[fk][node[fk]]
    }, true)
    return keep ? node : null
  }
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
  filteredTree: computed(({filters, learnStyles}) => recurseTree(filters, learnStyles)),
});