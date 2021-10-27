import _ from "lodash";

export default _.mapValues({
  mlg: {
    t: "Machine Learning Guide",
    d: "Teaches the fundamentals of ML in podcast form. Importantly, guides users to deep-dive the concepts offline via curated resources (this website!)",
    links: [{t: "Website", l: "https://ocdevel.com/mlg", p: "free"}],
    topic: "basics",
    importance: "essential"
  },

  twiml_and_ai: {
    t: "TWiML and AI",
    d: "News & interviews experts in the field. This is a network of podcasts, not just one.",
    links: [{t: "Website", l: "https://twimlai.com", p: "free"}],
    topic: "news_interviews"
  },

  oreilly_data_show: {
    t: "O'Reilly Data Show",
    links: [{t: "Website", l: "https://www.oreilly.com/topics/oreilly-data-show-podcast", p: "free"}],
    topic: "news_interviews"
  },

  talking_machines: {
    t: "Talking machines",
    links: [{t: "Website", l: "http://www.thetalkingmachines.com/", p: "free"}],
    topic: "news_interviews"
  },

  linear_digressions: {
    t: "Linear Digressions",
    links: [{t: "Website", l: "http://lineardigressions.com/", p: "free"}],
    topic: "basics",
    importance: "valuable"
  },

  data_skeptic: {
    t: "Data Skeptic",
    links: [{t: "Website", l: "https://dataskeptic.com/", p: "free"}],
    topic: "basics",
    importance: "valuable"
  },

  // Very dated, excluding
  // partially_derivative: {
  //   t: "Partially Derivative",
  //   links: [{t: "Website", l: "http://partiallyderivative.com/", p: "free"}],
  //   topic: "basics",
  //   relevance: "dated",
  // },

  learning_machines_101: {
    t: "Learning machines 101",
    links: [{t: "Website", l: "http://www.learningmachines101.com/", p: "free"}],
    topic: "basics",
    importance: "valuable"
  },

  lex_fridman: {
    t: "Lex Fridman Podcast",
    d: "My #1 favorite podcast of any kind ever. Lex interviews experts from every walk of futurology: AI, ML, philosophy, ethics, etc. Non-technical, very inspirational.",
    links: [{t: "Website", l: "https://lexfridman.com/podcast/", p: "free"}],
    topic: "news_interviews",
    importance: "essential"
  }


}, (v) => ({
  format: "podcast",
  ...v,
}))