import wf from '../../workflowy/mlg-resources.opml'

console.log(wf)

export const picks = {
  ordered: {t: "Complete In Order", d: "Complete each section in order before moving on the next (unless specified as optional)."},
  all: {t: "Complete All", d: "Order doesn't matter, but I recommend all these resources. Listed in descending order of my preference."},
  any: {t: "Pick Any", d: "All these resources are good. Pick as many as you like (or none). Listed in descending order of my preference."},
  one: {t: "Pick One", d: "These resources generally cover the same material. You only really need one, but up to you if you want more than one of these for learning-by-repetition. Listed in descending order of my preference."},
}

export const flat = wf.flat
export const episodes = wf.episodes
export const top = wf.top