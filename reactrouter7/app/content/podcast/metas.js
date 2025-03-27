// @FIXME consolidate this conceptually with ./index.tsx. That file should have the full stuff,
// hydrated by a loader; and this file should have all the list-view basics, and for sitemap.xml

import map from 'lodash/map'
import keyBy from 'lodash/keyBy'

import * as mlg001 from './mlg/001/meta.js'
import * as mlg002 from './mlg/002/meta.js'
import * as mlg003 from './mlg/003/meta.js'
import * as mlg004 from './mlg/004/meta.js'
import * as mlg005 from './mlg/005/meta.js'
import * as mlg006 from './mlg/006/meta.js'
import * as mlg007 from './mlg/007/meta.js'
import * as mlg008 from './mlg/008/meta.js'
import * as mlg009 from './mlg/009/meta.js'
import * as mlg010 from './mlg/010/meta.js'
import * as mlg011 from './mlg/011/meta.js'
import * as mlg012 from './mlg/012/meta.js'
import * as mlg013 from './mlg/013/meta.js'
import * as mlg014 from './mlg/014/meta.js'
import * as mlg015 from './mlg/015/meta.js'
import * as mlg016 from './mlg/016/meta.js'
import * as mlg017 from './mlg/017/meta.js'
import * as mlg018 from './mlg/018/meta.js'
import * as mlg019 from './mlg/019/meta.js'
import * as mlg020 from './mlg/020/meta.js'
import * as mlg021 from './mlg/021/meta.js'
import * as mlg022 from './mlg/022/meta.js'
import * as mlg023 from './mlg/023/meta.js'
import * as mlg024 from './mlg/024/meta.js'
import * as mlg025 from './mlg/025/meta.js'
import * as mlg026 from './mlg/026/meta.js'
import * as mlg027 from './mlg/027/meta.js'
import * as mlg028 from './mlg/028/meta.js'
import * as mlg029 from './mlg/029/meta.js'
import * as mlg030 from './mlg/030/meta.js'
import * as mla001 from './mla/001/meta.js'
import * as mla002 from './mla/002/meta.js'
import * as mla003 from './mla/003/meta.js'
import * as mla004 from './mla/004/meta.js'
import * as mla005 from './mla/005/meta.js'
import * as mla006 from './mla/006/meta.js'
import * as mla007 from './mla/007/meta.js'
import * as mla008 from './mla/008/meta.js'
import * as mla009 from './mla/009/meta.js'
import * as mla010 from './mla/010/meta.js'
import * as mla011 from './mla/011/meta.js'
import * as mla012 from './mla/012/meta.js'
import * as mlg031 from './mlg/031/meta.js'
import * as mlg032 from './mlg/032/meta.js'
import * as mla013 from './mla/013/meta.js'
import * as mla014 from './mla/014/meta.js'
import * as mla015 from './mla/015/meta.js'
import * as mla016 from './mla/016/meta.js'
import * as mla017 from './mla/017/meta.js'
import * as mla018 from './mla/018/meta.js'
import * as mla019 from './mla/019/meta.js'
import * as mla020 from './mla/020/meta.js'
import * as mlg033 from './mlg/033/meta.js'
import * as mla022 from './mla/022/meta.js'

import * as llh001 from './llh/1/meta.js'
import * as llh002 from './llh/2/meta.js'
import * as llh003 from './llh/3/meta.js'
import * as llh004 from './llh/4/meta.js'

export const mlgList = map([
  mlg001,
  mlg002,
  mlg003,
  mlg004,
  mlg005,
  mlg006,
  mlg007,
  mlg008,
  mlg009,
  mlg010,
  mlg011,
  mlg012,
  mlg013,
  mlg014,
  mlg015,
  mlg016,
  mlg017,
  mlg018,
  mlg019,
  mlg020,
  mlg021,
  mlg022,
  mlg023,
  mlg024,
  mlg025,
  mlg026,
  mlg027,
  mlg028,
  mlg029,
  mlg030,

  mla001,
  mla002,
  mla003,
  mla004,
  mla005,
  mla006,
  mla007,
  mla008,
  mla009,
  mla010,
  mla011,
  mla012,

  mlg031,
  mlg032,

  mla013,
  mla014,
  mla015,
  mla016,
  mla017,
  mla018,
  mla019,
  mla020,

  mlg033,
  mla022,
], e => ({
  mlg: !e.mla,
  id: e.mla ? `mla-${e.episode}` : e.episode,
  ...e,
}))
export const mlgObj = keyBy(mlgList, 'id')

export const mlgShow = {
  title: "Machine Learning Guide",
  link: "https://ocdevel.com/mlg",
  feed: "http://ocdevel.com/files/podcasts/machine-learning/feed.xml",
  keywords: "machine,learning,ml,introduction,artificial,intelligence,ai",
  image: "http://ocdevel.com/files/podcasts/machine-learning/art.jpg",
  date: new Date('02/01/2017'),

  teaser: "Machine learning audio course. Teaches ML fundamentals, models (shallow and deep), math, and more.",

  body: "MLG teaches the fundamentals of machine learning and artificial intelligence. It covers intuition, models, math, languages, frameworks, etc. Where your other ML resources provide the trees, I provide the forest. Consider MLG your syllabus, with highly-curated resources for each episode's details at ocdevel.com. Audio is a great supplement during exercise, commute, chores, etc.",

  useLibsynPlayer: true // false will use html5 player w/ CloudFront file URL
};
export const mlaShow = {
  title: "Machine Learning Applied",
  teaser: "Practical machine learning. Covers languages, frameworks, tech stacks, job-hunting, and more.",
  body: "MLA is a Patreon-exclusive podcast for practical ML. Where MLG covers theory, MLA covers practice. Hands-on information about technology, industry, job-hunting & interviews, etc. Smaller, more frequent episodes, in more traditional podcast format (vs MLG's course style).",
}

export const llhList = [
  llh001,
  llh002,
  llh003,
  llh004,
]
export const llhObj = keyBy(llhList, 'id')
export const llhShow = {
  title: "Lefnire's Life Hacks",
  link: "https://ocdevel.com/llh",
  feed: "",
  keywords: "",
  image: "",
  date: new Date("05/09/2024"),
  teaser: "Unusual hacks in efficiencies, productivity, and health, primarily focused around a work-from-home office environment.",
  body: "Over the years of developing productivity apps, making off-topic life-hack suggestions in MLG, etc; I decided to make a podcast dedicated to all my weird tips and tricks for improved productivity and efficiency in your life. Things like treadmill desks for work and study; healthy food for busy people; how to get to sleep faster, etc. Much of these lessons come from developing Habitica (a life-hack of its own), and knowing its community (with their great insights).",
  useLibsynPlayer: true
}
