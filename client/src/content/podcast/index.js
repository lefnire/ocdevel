import _ from 'lodash'

export const episodes = _.map([
  require('./mlg/001.js').default,
  require('./mlg/002.js').default,
  require('./mlg/003.js').default,
  require('./mlg/004.js').default,
  require('./mlg/005.js').default,
  require('./mlg/006.js').default,
  require('./mlg/007.js').default,
  require('./mlg/008.js').default,
  require('./mlg/009.js').default,
  require('./mlg/010.js').default,
  require('./mlg/011.js').default,
  require('./mlg/012.js').default,
  require('./mlg/013.js').default,
  require('./mlg/014.js').default,
  require('./mlg/015.js').default,
  require('./mlg/016.js').default,
  // require('./mlg/017.js').default,
  require('./mlg/018.js').default,
  require('./mlg/019.js').default,
  require('./mlg/020.js').default,
  require('./mlg/021.js').default,
  require('./mlg/022.js').default,
  require('./mlg/023.js').default,
  require('./mlg/024.js').default,
  require('./mlg/025.js').default,
  require('./mlg/026.js').default,
  require('./mlg/027.js').default,
  require('./mlg/028.js').default,
  require('./mlg/029.js').default,
  require('./mlg/030.js').default,
  //
  require('./mla/001.js').default,
  require('./mla/002.js').default,
  require('./mla/003.js').default,
  require('./mla/004.js').default,
  require('./mla/006.js').default,
  require('./mla/007.js').default,
  require('./mla/008.js').default,
  require('./mla/009.js').default,
  require('./mla/010.js').default,
  require('./mla/011.js').default,
  require('./mla/012.js').default,

  require('./mlg/031.js').default,
  require('./mlg/032.js').default,

  require('./mla/013.js').default,
  require('./mla/014.js').default,
], e => ({...e, mlg: !e.mla}))

export const mlg = {
  title: "Machine Learning Guide",
  link: "http://ocdevel.com/mlg",
  feed: "http://ocdevel.com/files/podcasts/machine-learning/feed.xml",
  keywords: "machine,learning,ml,introduction,artificial,intelligence,ai",
  image: "http://ocdevel.com/files/podcasts/machine-learning/art.jpg",
  date: new Date('02/01/2017'),
  episodes: _.filter(episodes, e => !e.mla),

  teaser: "Machine learning audio course. Teaches ML fundamentals, models (shallow and deep), math, and more.",

  body: "MLG teaches the fundamentals of machine learning and artificial intelligence. It covers intuition, models, math, languages, frameworks, etc. Where your other ML resources provide the trees, I provide the forest. Consider MLG your syllabus, with highly-curated resources for each episode's details at ocdevel.com. Audio is a great supplement during exercise, commute, chores, etc.",

  useLibsynPlayer: true // false will use html5 player w/ CloudFront file URL
};

export const mla = {
  title: "Machine Learning Applied",
  episodes: _.filter(episodes, e => e.mla),

  teaser: "Practical machine learning. Covers languages, frameworks, tech stacks, job-hunting, and more.",

  body: "MLA is a Patreon-exclusive podcast for practical ML. Where MLG covers theory, MLA covers practice. Hands-on information about technology, industry, job-hunting & interviews, etc. Smaller, more frequent episodes, in more traditional podcast format (vs MLG's course style).",
}