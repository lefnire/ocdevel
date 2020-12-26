import _ from 'lodash'
import {defaults} from './filters'


const TODO = {
  audio: {
    how_to_create_mind: `[How to Create a Mind](http://amzn.to/2tXLvUm) \`audio:easy\``,
    cs229: `(removed CS229 - very heavy chalkboard use lends poorly to audio)`,

  },
  other: {
    // nns_and_dl: `[Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) \`book:medium\` shorter online "book"`,
    kaggle: `[Kaggle.com](https://www.kaggle.com/)`,
    patreon: `[Patreon](https://www.patreon.com/machinelearningguide)`,
  }
}

const podcasts = _.mapValues({
  mlg: {
    t: "Machine Learning Guide",
    links: [{t: "Website", l: "https://ocdevel.com/mlg", p: "free"}],
    topic: "basics",
  },

  twiml_and_ai: {
    t: "TWiML and AI",
    // d: "News & interviews podcast",
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
  },

  data_skeptic: {
    t: "Data Skeptic",
    links: [{t: "Website", l: "https://dataskeptic.com/", p: "free"}],
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
  },

  lex_fridman: {
    t: "Lex Fridman Podcast",
    d: "My #1 favorite podcast of any kind ever. Lex interviews experts from every walk of futurology: AI, ML, philosophy, ethics, etc. Non-technical, very inspirational.",
    links: [{t: "Website", l: "https://lexfridman.com/podcast/", p: "free"}],
    topic: "news_interviews"
  }


}, (v) => ({
  format: "podcast",
  ...v,
}))

const tgc = _.mapValues({
  tgc_ml: {
    t: "TGC Machine Learning",
    links: [{t: "TGC", p: "$$", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=PD9070&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fintroduction-to-machine-learning.html%3Fai%3D107119&intsrc=PUI1_1204"}],
    topic: "basics"
  },

  tgc_consciousness: {
    t: "Philosophy of Mind: Brains, Consciousness, and Thinking Machines",
    links: [
      {t: "Amazon", l: "http://amzn.to/2kQGgk5", p: "$"},
      {t: "TGC", l: "https://goo.gl/fDteyi", p: "$$"} // FIXME
    ],
    topic: "fun",
    format: "audiobook",
    difficulty: "easy",
    importance: "valuable"
  },

  tgc_stats: {
    t: `TGC Statistics & Probability`,
    links: [
      {t: "TGC Statistics", l: "https://goo.gl/4vvXJs", p: "$$"},
      {t: "TGC Probability", l: "https://goo.gl/Q4KwZ6", p: "$$"},
    ],
    topic: "math"
  },

  tgc_calc: {
    t: "TGC Calculus",
    links: [
      {t: "TGC Calc 1", l: "https://goo.gl/fcLP3l", p: "$$"},
      {t: "TGC Calc 2", l: "https://goo.gl/sBpljN", p: "$$"},
      {t: "TGC Calc 3", l: "https://goo.gl/8Hdwuh", p: "$$"}
    ],
    topic: "math"
  },

  tgc_math_decision_making: {
    t: "TGC Mathematical Decision Making",
    d: "Course on \"Operations Research\", similar to ML",
    links: [{t: "TGC", l: "https://goo.gl/V75I49"}],
    topic: "basics"
  },

  tgc_info_theory: {
    t: "TGC Information Theory",
    links: [{t: "https://goo.gl/ugAi2m", l: "https://goo.gl/ugAi2m", p: "$$"}],
    topic: "math"
  },

  tgc_linear_algebra: {
    t: "TGC Linear Algebra",
    links: [{t: "TGC", p: "$$", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=PD1056&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fmastering-linear-algebra-an-introduction-to-applications.html%3Fai%3D107119&intsrc=PUI1_1204"}],
    topic: "math"
  }

}, v => ({
  tgc: true,
  difficulty: "hard",
  format: "video",
  video2audio: "good",
  importance: "essential",
  audioOption: true,
  ...v
}))

const fun = _.mapValues({
  singularity_is_near: {
    t: "The Singularity Is Near",
    links: [{t: "Amazon", l: "http://amzn.to/2lzCqKk", p: "$"}],
    importance: "valuable",
    audioOption: true
  },

  superintelligence: {
    t: "Superintelligence",
    d: "Doom-and-gloom favorite of Musk, Gates, Hawking.",
    links: [{t: "Amazon", l: "http://amzn.to/2lzLcrL", p: "$"}],
    audioOption: true
  },

  machines_of_loving_grace: {
    t: `Machines of Loving Grace`,
    d: "AI History",
    links: [{t: "Amazon", l: "http://amzn.to/2kRcBWq", p: "$"}],
    audioOption: true
  },

  master_algorithm: {
    t: `The Master Algorithm`,
    d: 'Semi-technical overview of ML basics & main algorithms',
    links: [{t: "Amazon", l: "http://amzn.to/2kLOQjW", p: "$"}],
    difficulty: "medium",
    audioOption: true
  },

  feeling_of_life: {
    t: "The Feeling of Life Itself: Why Consciousness Is Widespread but Can't Be Computed",
    d: 'Discusses _Integrated Information Theory_ (IIT), very popular framework in consciousness theory.',
    links: [{t: "Amazon", l: "https://amzn.to/3au4KtQ", p: "$"}],
    difficulty: "easy",
    audioOption: true
  },

  society_of_mind: {
    t: "The Society of Mind",
    d: "About the composability and independent agency of the parts of your mind. Valuable for those interested in Panpsychism. By one of the founding fathers of AI, Marvin Minsky.",
    links: [{t: "Amazon", l: "https://amzn.to/3mC6umS", p: "$"}],
    difficulty: "medium"
  }

}, v => ({
  format: "audiobook",
  topic: "fun",
  ...v
}))

const courses = _.mapValues({
  ng: {
    t: `Andrew Ng Coursera Course`,
    d: "The most essential of all ML resources ever. It's an active course with assignments. Do note, it's VERY VERY dated. It uses Matlab and only teaches shallows. It's quite renowned and timeless, but see if you can find a more recent course. See [Coursera's ML listing](https://www.coursera.org/browse/computer-science?facets=skillNameMultiTag%3AMachine+Learning%2CcategoryMultiTag%3Acomputer-science), as well as Ng's [Deep Learning](https://www.coursera.org/specializations/deep-learning) Specialization.",
    links: [{t: "Coursera", l: "https://www.coursera.org/learn/machine-learning", p: "free"}],
    relevance: "dated",
    importance: "essential"
  },

  ng_deep_learning: {
    t: "Andrew Ng Deep Learning Course",
    links: [{t: "Coursera", l: "https://www.coursera.org/specializations/deep-learning", p: "free"}],
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
    format: "degree"
  },

  udacity_ai: {
    t: "Udacity Artificial Intelligence",
    links: [{t: "Udacity", l: "https://www.udacity.com/ai", p: "$$$"}],
    importance: "valuable",
    format: "degree"
  },

  omscs: {
    t: "OMSCS",
    d: "Online Masters of Computer Science at Georgia Tech. Pretty renowned, very cheap. However, getting somewhat mixed-reviews on outcome (learned skills, hireability). Look at this degree first, then do your own research. If you find something better, please contact me so I can update this.",
    links: [{t: "Website", l: "https://www.omscs.gatech.edu/", p: "$$$"}],
    importance: "essential",
    format: "degree"

  },

  // TODO either/or these
  khan_linear_algebra: {
    t: "KhanAcademy Linear Algebra",
    links: [{t: "Website", l: "https://www.khanacademy.org/math/linear-algebra", p: "free"}],
    topic: "math"
  },
  fastai_linear_algebra: {
    t: "Fast.ai Linear Algebra",
    links: [{t: "Website", l: "http://www.fast.ai/2017/07/17/num-lin-alg/", p: "free"}],
    topic: "math"
  },

  khan_stats: {
    t: "KhanAcademy Statistics",
    links: [{t: "Website", l: "https://www.khanacademy.org/math/statistics-probability", p: "free"}],
    topic: "math"
  },

  khan_calc: {
    t: "KhanAcademy Calculus",
    links: [{t: "Website", l: "https://www.khanacademy.org/math/calculus-home", p: "free"}],
    topic: "math"
  },

  fastai: {
    t: `Fast.ai`,
    d: `Practical DL for coders`,
    links: [{t: "Website", l: "http://course.fast.ai/", p: "free"}],
    difficulty: "medium",
    importance: "essential"
  },

}, v => ({
  engagement: "active",
  difficulty: "hard",
  format: "course",
  ...v
}))

const videos = _.mapValues({
  stanford_nlp: {
    t:`Stanford NLP YouTube`,
    d: "If offline, skip to the Deep NLP playlist (see [tweet](https://twitter.com/jurafsky/status/972726681118023680)).",
    links: [{t: "YouTube", l: "https://www.youtube.com/playlist?list=PL6397E4B26D00A269", p: "free"}],
    difficulty: "medium",
    audioOption: true
  },

  cs224n: {
    t:`Stanford cs224n: Deep NLP`,
    d: "replaces cs224d",
    links: [{t: "YouTube", l: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5Jsnh1rnUwq_TcylNr7EkRe6", p: "free"}],
    difficulty: "medium",
    audioOption: true
  },

  cs231n: {
    t:`Stanford cs231n: CNNs`,
    links: [{t: "YouTube", l: "https://www.youtube.com/playlist?list=PLkt2uSq6rBVctENoVBg1TpCC7OQi31AlC", p: "free"}],
    difficulty: "medium",
    audioOption: true
  },

  cs294: {
    t:`Berkeley cs294: Deep Reinforcement Learning`,
    links: [{t: "Website", l: "http://rll.berkeley.edu/deeprlcourse/", p: "free"}],
    difficulty: "hard",
    audioOption: true
  },

  david_silver: {
    t:`RL Course by David Silver`,
    links: [{t: "YouTube", l: "https://www.youtube.com/playlist?list=PLzuuYNsE1EZAXYR4FJ75jcJseBmo4KQ9-", p: "free"}],
    video2audio: "good",
    difficulty: "hard",
    audioOption: true
  }
}, v => ({
  engagement: "passive",
  format: "video",
  video2audio: "medium",
  ...v
}))

const others = _.mapValues({
  tour_ml_algos: {
    t: `Tour of Machine Learning Algorithms`,
    links: [{t: "Website", l: "http://machinelearningmastery.com/a-tour-of-machine-learning-algorithms", p: "free"}]
  },

  wikipedia_ai: {
    t: `Wikipedia:AI`,
    links: [{t: "Wikipedia:AI", l: "https://en.wikipedia.org/wiki/Artificial_intelligence", p: "free"}],
  },

  math_primer: {
    t: `Math Primer PDF`,
    d: "See \"Section Notes\" of [cs229](http://cs229.stanford.edu/materials.html)",
    links: [{t: "Website", l: "http://cs229.stanford.edu/materials.html", p: "free"}],
    difficulty: 'medium',
    topic: "math"
  },

  dl_simplified: {
    t: "Deep Learning Simplified",
    d: "Quick series to get a lay-of-the-land.",
    links: [{t: "YouTube", l: "https://www.youtube.com/watch?v=b99UVkWzYTQ", p: "free"}],
    format: "video"
  },

  tensorflow_tuts: {
    t: `TensorFlow Tutorials`,
    d: "Official TensorFlow tutorials, quick-start you into some hands-on code",
    links: [{t: "Website", l: "https://www.tensorflow.org/get_started/get_started", p: "free"}],
    difficulty: "medium"
  },

  rnn_articles: {
    t: `RNN Overview Articles`,
    links: [
      {t: "Unreasonable Effectiveness of RNNs", l: "http://karpathy.github.io/2015/05/21/rnn-effectiveness/", p: "free"},
      {t: "Deep Learning, NLP, and Representations", l: "http://colah.github.io/posts/2014-07-NLP-RNNs-Representations/", p: "free"},
      {t: "Understanding LSTM Networks", l: "http://colah.github.io/posts/2015-08-Understanding-LSTMs/", p: "free"}
    ],
    difficulty: "medium"
  },

  tf_tuts_rnns: {
    t: `TensorFlow RNN Tutorials`,
    d: "start at Word2Vec + next 2 pages",
    links: [{t: "Website", l: "https://www.tensorflow.org/tutorials/word2vec", p: "free"}],
    difficulty: "medium"
  },

}, v => ({
  format: "other",
  ...v
}))

const books = _.mapValues({
  qai: {
    t: "The Quest for Artificial Intelligence",
    d: "Textbook about the history of AI",
    links: [
      {t: "Amazon", l: "http://amzn.to/2kRd4Ie", p: "$$"},
      {t: "PDF", l: "http://ai.stanford.edu/~nilsson/QAI/qai.pdf", p: "free"}
    ],
  },

  hundred_page_ml: {
    t: "The Hundred-Page Machine Learning Book",
    links: [
      {t: "Website", l: "http://themlbook.com/", p: "$"},
      {t: "Amazon", l: "https://amzn.to/3aKAbQI", p: "$"}
    ],
    importance: "essential"
  },

  book_linear_algebra: {
    t: "Introduction to Linear Algebra",
    links: [{t: "Amazon", l: "https://amzn.to/2wP8TWS", p: "$"}],
    topic: "math"
  },

  book_stats: {
    t: "All of statistics",
    links: [{t: "Amazon", l: "http://amzn.to/2t2dOwg", p: "$"}],
    topic: "math"
  },

  book_calc: {
    t: "Calculus Book",
    links: [{t: "Amazon", l: "http://amzn.to/2tXfXhp", p: "$"}],
    topic: "math"
  },

  // ml_with_r: `[Machine Learning with R](http://amzn.to/2n5fSUF) \`book:medium\``,
  handson_tensorflow: {
    t: "Hands-On Machine Learning with Scikit-Learn and TensorFlow",
    links: [{t: "Amazon", l: "https://amzn.to/3nwGxqt", p: "$"}],
    difficulty: "medium",
    importance: "essential"
  },

  dl_book: {
    t: `Deep Learning Book`,
    d: "Comprehensive DL bible; highly mathematical",
    links: [
      {t: "Amazon", l: "http://amzn.to/2tXgCiT", p: "$$"},
      {t: "HTML", l: "http://www.deeplearningbook.org", p: "free"}
    ],
    importance: "essential"
  },

  book_python: {
    t: `Python Book`,
    links: [{t: "Amazon", l: "http://amzn.to/2mVgtJW", p: "$"}],
    difficulty: "medium"
  },

  python_data_analysis: {
    t: "Python for Data Analysis: Data Wrangling with Pandas, NumPy, and IPython 2nd Edition",
    links: [{t: "Amazon", l: "https://amzn.to/2IHFh2m", p: "$"}],
    difficulty: "easy"
  },

  elements_of_stat_learning: {
    t: "Elements of Statistical Learning",
    links: [{t: "Amazon", l: "http://amzn.to/2tWW8He", p: "$"}],
    importance: "valuable"
  },

  pattern_rec: {
    t: "Pattern Recognition and Machine Learning",
    links: [
      {t: "Amazon", l: "http://amzn.to/2sDIIfb", p: "$"},
      {t: "PDF", l: "https://goo.gl/aX038j", p: "free"}
    ],
    importance: "valuable"
  },

  speech_and_nlp: {
    t: `Speech and Language Processing`,
    d: `comprehensive classical-NLP bible`,
    links: [{t: "Amazon", l: "http://amzn.to/2uZaNyg", p: "$"}],
    difficulty: "hard",
    importance: "essential"
  },

  nltk: {
    t:`NLTK Book`,
    links: [{t: "Website", l: "http://www.nltk.org/book", p: "free"}],
    difficulty: "medium"
  },

  sutton_barto: {
    t:`Sutton & Barto 2nd Ed`,
    links: [{t: "PDF", l: "http://incompleteideas.net/book/the-book-2nd.html", p: "free"}],
    importance: "essential"
  },

  aima: {
    t:`AI a Modern Approach`,
    links: [
      {t: "Website", l: "http://aima.cs.berkeley.edu/", p: "free"},
      {t: "Amazon", l: "http://amzn.to/2E02dEr", p: "$"}
    ],
    importance: "essential"
  }

}, v => ({
  format: "book",
  difficulty: "hard",
  ...v
}))

export const resources = _.mapValues({
  ...books,
  ...podcasts,
  ...tgc,
  ...fun,
  ...others,
  ...courses,
  ...videos
}, (v, k) => ({
  id: k,
  ...defaults,
  ...v,
}))