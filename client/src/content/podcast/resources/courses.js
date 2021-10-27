import _ from "lodash";

export default _.mapValues({
  ng: {
    t: `Andrew Ng Coursera Course`,
    d: "The most essential of all ML resources ever. It's an active course with assignments. Do note, it's VERY VERY dated. It uses Matlab and only teaches shallows. It's quite renowned and timeless, but see if you can find a more recent course. See [Coursera's ML listing](https://www.coursera.org/browse/computer-science?facets=skillNameMultiTag%3AMachine+Learning%2CcategoryMultiTag%3Acomputer-science), as well as Ng's [Deep Learning](https://www.coursera.org/specializations/deep-learning) Specialization.",
    links: [{t: "Coursera", l: "https://www.coursera.org/learn/machine-learning", p: "free"}],
    relevance: "dated",
    topic: "basics",
    importance: "essential"
  },

  ng_deep_learning: {
    t: "Andrew Ng Deep Learning Course",
    links: [{t: "Coursera", l: "https://www.coursera.org/specializations/deep-learning", p: "free"}],
    topic: "dl",
    importance: "essential"
  },

  udacity_ml: {
    t: "Udacity Machine Learning",
    links: [{t: "Udacity", l: "https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009", p: "$$$"}],
    importance: "valuable",
    format: "degree"
  },

  udacity_self_driving: {
    t: "Udacity Self Driving Cars",
    links: [{t: "Udacity", l: "https://www.udacity.com/drive", p: "$$$"}],
    importance: "valuable",
    topic: "rl",
    format: "degree"
  },

  udacity_ai: {
    t: "Udacity Artificial Intelligence",
    links: [{t: "Udacity", l: "https://www.udacity.com/ai", p: "$$$"}],
    importance: "valuable",
    topic: "rl",
    format: "degree"
  },

  omscs: {
    t: "OMSCS",
    d: "Online Masters of Computer Science at Georgia Tech. Pretty renowned, very cheap. However, getting somewhat mixed-reviews on outcome (learned skills, hireability). Look at this degree first, then do your own research. If you find something better, please contact me so I can update this.",
    links: [{t: "Website", l: "https://www.omscs.gatech.edu/", p: "$$$"}],
    importance: "essential",
    topic: "basics",
    format: "degree"

  },

  // TODO either/or these
  khan_linear_algebra: {
    t: "KhanAcademy Linear Algebra",
    links: [{t: "Website", l: "https://www.khanacademy.org/math/linear-algebra", p: "free"}],
    importance: "valuable",
    topic: "math"
  },
  fastai_linear_algebra: {
    t: "Fast.ai Linear Algebra",
    links: [{t: "Website", l: "http://www.fast.ai/2017/07/17/num-lin-alg/", p: "free"}],
    importance: "valuable",
    topic: "math"
  },

  khan_stats: {
    t: "KhanAcademy Statistics",
    links: [{t: "Website", l: "https://www.khanacademy.org/math/statistics-probability", p: "free"}],
    importance: "valuable",
    topic: "math"
  },

  khan_calc: {
    t: "KhanAcademy Calculus",
    links: [{t: "Website", l: "https://www.khanacademy.org/math/calculus-home", p: "free"}],
    importance: "valuable",
    topic: "math"
  },

  fastai: {
    t: `Fast.ai`,
    d: `Practical DL for coders`,
    links: [{t: "Website", l: "http://course.fast.ai/", p: "free"}],
    difficulty: "medium",
    topic: "dl",
    importance: "essential"
  },

}, v => ({
  engagement: "active",
  difficulty: "hard",
  format: "course",
  ...v
}))