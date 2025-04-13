// @FIXME consolidate this conceptually with ./index.tsx. That file should have the full stuff,
// hydrated by a loader; and this file should have all the list-view basics, and for sitemap.xml


import * as mlg1 from './mlg/1/meta.js'
import * as mlg2 from './mlg/2/meta.js'
import * as mlg3 from './mlg/3/meta.js'
import * as mlg4 from './mlg/4/meta.js'
import * as mlg5 from './mlg/5/meta.js'
import * as mlg6 from './mlg/6/meta.js'
import * as mlg7 from './mlg/7/meta.js'
import * as mlg8 from './mlg/8/meta.js'
import * as mlg9 from './mlg/9/meta.js'
import * as mlg10 from './mlg/10/meta.js'
import * as mlg11 from './mlg/11/meta.js'
import * as mlg12 from './mlg/12/meta.js'
import * as mlg13 from './mlg/13/meta.js'
import * as mlg14 from './mlg/14/meta.js'
import * as mlg15 from './mlg/15/meta.js'
import * as mlg16 from './mlg/16/meta.js'
import * as mlg17 from './mlg/17/meta.js'
import * as mlg18 from './mlg/18/meta.js'
import * as mlg19 from './mlg/19/meta.js'
import * as mlg20 from './mlg/20/meta.js'
// import * as mlg21 from './mlg/21/meta.js'
import * as mlg22 from './mlg/22/meta.js'
import * as mlg23 from './mlg/23/meta.js'
import * as mlg24 from './mlg/24/meta.js'
import * as mlg25 from './mlg/25/meta.js'
import * as mlg26 from './mlg/26/meta.js'
import * as mlg27 from './mlg/27/meta.js'
import * as mlg28 from './mlg/28/meta.js'
import * as mlg29 from './mlg/29/meta.js'
import * as mlg30 from './mlg/30/meta.js'
import * as mla1 from './mla/1/meta.js'
import * as mla2 from './mla/2/meta.js'
import * as mla3 from './mla/3/meta.js'
import * as mla4 from './mla/4/meta.js'
import * as mla5 from './mla/5/meta.js'
import * as mla6 from './mla/6/meta.js'
import * as mla7 from './mla/7/meta.js'
import * as mla8 from './mla/8/meta.js'
import * as mla9 from './mla/9/meta.js'
import * as mla10 from './mla/10/meta.js'
import * as mla11 from './mla/11/meta.js'
import * as mla12 from './mla/12/meta.js'
import * as mlg31 from './mlg/31/meta.js'
import * as mlg32 from './mlg/32/meta.js'
import * as mla13 from './mla/13/meta.js'
import * as mla14 from './mla/14/meta.js'
import * as mla15 from './mla/15/meta.js'
import * as mla16 from './mla/16/meta.js'
import * as mla17 from './mla/17/meta.js'
import * as mla18 from './mla/18/meta.js'
import * as mla19 from './mla/19/meta.js'
import * as mla20 from './mla/20/meta.js'
import * as mla21 from './mla/21/meta.js'
import * as mlg33 from './mlg/33/meta.js'
import * as mla22 from './mla/22/meta.js'
import * as mla23 from './mla/23/meta.js'

import * as llh001 from './llh/1/meta.js'
import * as llh002 from './llh/2/meta.js'
import * as llh003 from './llh/3/meta.js'
import * as llh004 from './llh/4/meta.js'

export const mlgList = [
  mlg1,
  mlg2,
  mlg3,
  mlg4,
  mlg5,
  mlg6,
  mlg7,
  mlg8,
  mlg9,
  mlg10,
  mlg11,
  mlg12,
  mlg13,
  mlg14,
  mlg15,
  mlg16,
  mlg17,
  mlg18,
  mlg19,
  mlg20,
  // mlg21,
  mlg22,
  mlg23,
  mlg24,
  mlg25,
  mlg26,
  mlg27,
  mlg28,
  mlg29,
  mlg30,

  mla1,
  mla2,
  mla3,
  mla4,
  mla5,
  mla6,
  mla7,
  mla8,
  mla9,
  mla10,
  mla11,
  mla12,

  mlg31,
  mlg32,

  mla13,
  mla14,
  mla15,
  mla16,
  mla17,
  mla18,
  mla19,
  mla20,
  mla21,

  mlg33,
  mla22,
  mla23,
].map(e => ({
  mlg: !e.mla,
  id: e.mla ? `mla-${e.episode}` : e.episode,
  ...e,
}));
export const mlgObj = mlgList.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});

export const mlgShow = {
  title: "Machine Learning Guide",
  link: "https://ocdevel.com/mlg",
  feed: "http://ocdevel.com/files/podcasts/machine-learning/feed.xml",
  keywords: "machine,learning,ml,introduction,artificial,intelligence,ai",
  image: "http://ocdevel.com/files/podcasts/machine-learning/art.jpg",
  date: new Date('02/01/2017'),

  teaser: "Machine learning audio course. Teaches ML fundamentals, models (shallow and deep), math, and more.",

  body: "MLG is a machine learning podcast teaching the fundamentals of machine learning and artificial intelligence. It covers intuition, models, neural networks, math, languages, frameworks, and more. Podcasts are a great supplement during exercise, commute, chores, etc. The resources section provides a syllabus for machine learning videos, courses, books, and audio.",

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
export const llhObj = llhList.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});
export const llhShow = {
  title: "Lefnire's Life Hacks",
  link: "https://ocdevel.com/llh",
  feed: "",
  keywords: "",
  image: "",
  date: new Date("05/09/2024"),
  teaser: "Unusual hacks in efficiencies, productivity, and health, primarily focused around a work-from-home office environment.",
  body: "Life and tech hacks podcast. Over the years of developing productivity apps, making off-topic life-hack suggestions in MLG, etc; I decided to make a podcast dedicated to all my weird tips and tricks for improved productivity and efficiency in your life. Things like treadmill desks for work and study; healthy food for busy people; how to get to sleep faster, etc. Much of these lessons come from developing Habitica (a life-hack of its own), and knowing its community (with their great insights).",
  useLibsynPlayer: true
}
