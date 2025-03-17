import map from 'lodash/map'
import keyBy from 'lodash/keyBy'

import mlg001 from './mlg/001'
import mlg002 from './mlg/002'
import mlg003 from './mlg/003.js'
import mlg004 from './mlg/004.js'
import mlg005 from './mlg/005.js'
import mlg006 from './mlg/006.js'
import mlg007 from './mlg/007.js'
import mlg008 from './mlg/008.js'
import mlg009 from './mlg/009.js'
import mlg010 from './mlg/010.js'
import mlg011 from './mlg/011.js'
import mlg012 from './mlg/012.js'
import mlg013 from './mlg/013.js'
import mlg014 from './mlg/014.js'
import mlg015 from './mlg/015.js'
import mlg016 from './mlg/016.js'
import mlg017 from './mlg/017.js'
import mlg018 from './mlg/018.js'
import mlg019 from './mlg/019.js'
import mlg020 from './mlg/020.js'
import mlg021 from './mlg/021.js'
import mlg022 from './mlg/022.js'
import mlg023 from './mlg/023.js'
import mlg024 from './mlg/024.js'
import mlg025 from './mlg/025.js'
import mlg026 from './mlg/026.js'
import mlg027 from './mlg/027.js'
import mlg028 from './mlg/028.js'
import mlg029 from './mlg/029.js'
import mlg030 from './mlg/030.js'
import mla001 from './mla/001.js'
import mla002 from './mla/002.js'
import mla003 from './mla/003.js'
import mla004 from './mla/004.js'
import mla005 from './mla/005.js'
import mla006 from './mla/006.js'
import mla007 from './mla/007.js'
import mla008 from './mla/008.js'
import mla009 from './mla/009.js'
import mla010 from './mla/010.js'
import mla011 from './mla/011.js'
import mla012 from './mla/012.js'
import mlg031 from './mlg/031.js'
import mlg032 from './mlg/032.js'
import mla013 from './mla/013.js'
import mla014 from './mla/014.js'
import mla015 from './mla/015'
import mla016 from './mla/016'
import mla017 from './mla/017'
import mla018 from './mla/018'
import mla019 from './mla/019'
import mla020 from './mla/020'
import mlg033 from './mlg/033'
import mla022 from './mla/022'

import llh001 from './llh/001'
import llh002 from './llh/002'
import llh003 from './llh/003'
import llh004 from './llh/004'

export const episodes = map([
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

export const episodesObj = keyBy(episodes, 'id')

export const mlg = {
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
export const mla = {
  title: "Machine Learning Applied",
  teaser: "Practical machine learning. Covers languages, frameworks, tech stacks, job-hunting, and more.",
  body: "MLA is a Patreon-exclusive podcast for practical ML. Where MLG covers theory, MLA covers practice. Hands-on information about technology, industry, job-hunting & interviews, etc. Smaller, more frequent episodes, in more traditional podcast format (vs MLG's course style).",
}

export const llhEpisodes = [
  llh001,
  llh002,
  llh003,
  llh004,
]
export const llhEpisodesObj = keyBy(llhEpisodes, 'id')
export const llh = {
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