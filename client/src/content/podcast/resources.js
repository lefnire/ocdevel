import _ from 'lodash'
import {
  CgMathPercent,
  FaBlog,
  FaBook,
  FaChalkboardTeacher,
  FaCouch, FaEye, FaGraduationCap,
  FaHeadphones, FaMicrophone, FaNewspaper, FaRegSmile, FaRegStar, FaRobot,
  FaRunning, FaStar, FaStarHalfAlt, FaTrophy,
  FaVideo, GiBattery0, GiBattery100, GiBattery50, IoIosChatbubbles, MdWeb, TiSortAlphabetically
} from "react-icons/all";

export const filters = {
  engagement: {
    t: "Engagement",
    d: `Is this resource "sit back and enjoy", or does it require coding challenges, exercises, etc?`,
    opts: {
      active: {t: "Active", d: "Requires engagement, like assignments or exercises", i: <FaRunning />},
      passive: {t: "Passive", d: "Passive learning resource, like podcasts or videos", i: <FaCouch />}
    }
  },
  difficulty: {
    t: "Difficulty",
    d: `How hard is this resource to consume? Ie, how much caffeine do you need?`,
    opts: {
      easy: {t: "Easy", d: "Very easy material", i: <GiBattery0 />},
      medium: {t: "Medium", d: "Somewhat difficult material, be caffeinated", i: <GiBattery50 />},
      hard: {t: "Hard", d: "Difficult material, for hard-core learning sessions", i: <GiBattery100 />},
    }
  },
  format: {
    t: "Format",
    d: `Resource format (book, video, course, etc).`,
    opts: {
      audiobook: {t: "Audiobook", d: "Audiobook or similar learning resources", i: <FaHeadphones />},
      podcast: {t: "Podcast", d: "Podcast", i: <FaMicrophone />},
      video: {t: "Video", d: "Video learning resource", i: <FaVideo />},
      book: {t: "Book", d: "Book resource. Textbooks or tradebooks", i: <FaBook />},
      course: {t: "Course", d: "Online course. Either do-it-yourself (no grading) or graded with assignments", i: <FaChalkboardTeacher />},
      degree: {t: "Degree / Certificate", d: "Online degree or certificate. Prefer a degree of course if you have the time and money, nano-degrees and certificates are much less industry-valued.", i: <FaGraduationCap />},
      other: {t: "Other", d: "Other learning resources like articles & blogs", i: <MdWeb />},
    }
  },
  video2audio: {
    t: "Video→Audio",
    d: `For video resources, could you just listen to the video without watching it and still benefit?`,
    opts: {
      bad: {t: "No-Go", d: "Watch it as a video, you'll need the visuals"},
      medium: {t: "Doable", d: "Could be consumed as audio-only, but not for the feint of heart"},
      good: {t: "As Good", d: "Almost just as good to listen to this video resource audio-only. Speaker does a great job orating the visuals."},

    }
  },
  relevance: {
    t: "Relevance",
    d: `How up-to-date is this resource, in cases where it matters (eg with languages/frameworks)?`,
    opts: {
      fresh: {t: "Still Relevant", d: "An up-to-date resource, or timeless"},
      dated: {t: "Outdated", d: "A dated resource, unless it's marked 'essential', see if you can find something newer"},
    }
  },
  importance: {
    t: "Importance",
    d: `How important is this resource? This is the most important tag; it tells you what you must consume, vs what's nice to consume`,
    opts: {
      supplementary: {t: "Supplementary", d: "Nice-to-have resource. Supplementary for the deep-divers on this topic, but not your bread-and-butter", i: <FaRegStar />},
      valuable: {t: "Valuable", d: "Quite a valuable resource. If you have the extra time, do it", i: <FaStarHalfAlt />},
      essential: {t: "Essential", d: "Required. If interested in this topic, you _need_ this resource", i: <FaStar color='#007bff' />},
    }
  },
  topic: {
    t: "Topic",
    d: `What ML topic is this resource relevant to?`,
    opts: {
      fun: {t: "Fun", d: "Fun and inspirational material, like consciousness and futurology", i: <FaRegSmile />},
      basics: {t: "Basics", d: "ML basics, information, end-to-end stuff", i: <TiSortAlphabetically />},
      news_interviews: {t: "News & Interviews", d: "Latest news & interviews in ML, mostly non-technical", i: <FaNewspaper />},
      math: {t: "Math", d: "Fundamental math for ML", i: <CgMathPercent />},
      vision: {t: "CV", d: "Computer Vision", i: <FaEye />},
      nlp: {t: "NLP", d: "Natural Language Processing", i: <IoIosChatbubbles />},
      rl: {t: "RL", d: "Reinforcement Learning / AI", i: <FaRobot />},
    }
  },
  price: {
    t: "Price",
    d: "Cost of this resource (look for other links, there are sometimes free versions)",
    opts: {
      free: {t: "Free", d: "Free! Look for this on resources which have paid links (eg Amazon), sometimes professors release the PDF for free while continuing to sell elsewhere", i: <span>Free</span>},
      "$": {t: "$", d: "Cheap. Under $10", i: <span>$</span>},
      "$$": {t: "$$", d: "Medium-priced. $10-$300", i: <span>$$</span>},
      "$$$": {t: "$$$", d: "Expensive. >$300", i: <span>$$$</span>},
      [undefined]: ""
    }
  },
  updated: {
    t: "Updated At",
    d: "When did I, Tyler, update this resource link? If a long time ago, consider investigating newer alternatives.",
  }
}

export const filterKeys = [
  // Specify filter-key order (since is {} above)
  'importance',
  'format',
  'video2audio',
  'difficulty',
  'engagement',
  'topic',
  'relevance',
  // Extra keys added per resource
  // 'price',
  // 'updated',
  // or_
]

const defaults = {
  importance: "supplementary",
  format: "other",
  difficulty: "easy",
  engagement: "passive",
  topic: "basics",
  relevance: "fresh",
}


const TODO = {
  books: {
    // Math

    speech_and_nlp: `[Speech and Language Processing](http://amzn.to/2uZaNyg) \`book:hard\` comprehensive classical-NLP bible`,
    nltk: `[NLTK Book](http://www.nltk.org/book) \`book:medium\``,
    sutton_barto: `[Sutton & Barto 2nd Ed PDF](http://incompleteideas.net/book/the-book-2nd.html) \`book:hard\``,
    aima: `AI a Modern Approach. [Website](http://aima.cs.berkeley.edu/), [Book](http://amzn.to/2E02dEr) \`book:hard\``
  },
  courses: {

    cs224n: `[Stanford cs224n: Deep NLP](https://www.youtube.com/playlist?list=PL3FW7Lu3i5Jsnh1rnUwq_TcylNr7EkRe6) \`course:medium\` (replaces cs224d)`,
    cs231n: `[Stanford cs231n: Convnets](https://www.youtube.com/playlist?list=PLkt2uSq6rBVctENoVBg1TpCC7OQi31AlC) \`course:medium\``,
    cs294: `[Berkeley cs294: Deep Reinforcement Learning](http://rll.berkeley.edu/deeprlcourse/) \`course:hard\``,
    david_silver: `[RL Course by David Silver](https://www.youtube.com/playlist?list=PLzuuYNsE1EZAXYR4FJ75jcJseBmo4KQ9-) \`course|audio:hard\``
  },
  audio: {
    how_to_create_mind: `[How to Create a Mind](http://amzn.to/2tXLvUm) \`audio:easy\``,

    // Math

    cs229: `(removed CS229 - very heavy chalkboard use lends poorly to audio)`,
    speech_and_nlp: `[Stanford NLP YouTube](https://www.youtube.com/playlist?list=PL6397E4B26D00A269) \`course|audio:medium\` If offline, skip to the Deep NLP playlist (see [tweet](https://twitter.com/jurafsky/status/972726681118023680)).`,
  },
  other: {

    // nns_and_dl: `[Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) \`book:medium\` shorter online "book"`,


    kaggle: `[Kaggle.com](https://www.kaggle.com/)`,
    patreon: `[Patreon](https://www.patreon.com/machinelearningguide)`,
    rnn_articles: `Overview Articles: 
  - [Unreasonable Effectiveness of RNNs](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) \`article:easy\`
  - [Deep Learning, NLP, and Representations](http://colah.github.io/posts/2014-07-NLP-RNNs-Representations/) \`article:medium\`
  - [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/) \`article:medium\``,
    tf_tuts_rnns: `[TensorFlow Tutorials](https://www.tensorflow.org/tutorials/word2vec) \`tutorial:medium\` (start at Word2Vec + next 2 pages)`,
    project_repo: `[TForce BTC Trader](https://github.com/lefnire/tforce_btc_trader) (podcast project)`
  }
}



const podcasts = _.mapValues({
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
  ...v
}))

const fun = _.mapValues({
  singularity_is_near: {
    t: "The Singularity Is Near",
    links: [{t: "Amazon", l: "http://amzn.to/2lzCqKk", p: "$"}],
    importance: "valuable"
  },

  superintelligence: {
    t: "Superintelligence",
    d: "Doom-and-gloom favorite of Musk, Gates, Hawking.",
    links: [{t: "Amazon", l: "http://amzn.to/2lzLcrL", p: "$"}]
  },

  machines_of_loving_grace: {
    t: `Machines of Loving Grace`,
    d: "AI History",
    links: [{t: "Amazon", l: "http://amzn.to/2kRcBWq", p: "$"}]
  },

  master_algorithm: {
    t: `The Master Algorithm`,
    d: 'Semi-technical overview of ML basics & main algorithms',
    links: [{t: "Amazon", l: "http://amzn.to/2kLOQjW", p: "$"}],
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
  }


}, v => ({
  engagement: "active",
  difficulty: "hard",
  format: "course",
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
  }

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
    links: [{t: "Amazon", l: "http://amzn.to/2tWW8He", p: "$"}]
  },

  pattern_rec: {
    t: "Pattern Recognition and Machine Learning",
    links: [
      {t: "Amazon", l: "http://amzn.to/2sDIIfb", p: "$"},
      {t: "PDF", l: "https://goo.gl/aX038j", p: "free"}
    ]
  },

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
}, (v, k) => ({
  id: k,
  ...defaults,
  ...v,
}))
// resources.books.ml_with_r = `${resources.books.handson_tensorflow} (replaced R book)`;

export const eitherOr = {
  practical_ml: [
    resources.fastai,
    resources.handson_tensorflow
  ],
  linear_algebra: [
    resources.tgc_linear_algebra,
    resources.book_linear_algebra,
    resources.khan_linear_algebra,
  ],
  stats: [
    resources.tgc_stats,
    resources.book_stats,
    resources.khan_stats,
  ],
  calc: [
    resources.tgc_calc,
    resources.book_calc,
    resources.khan_calc,

  ],
}

_.each(eitherOr, (arr, k) => {
  _.each(arr, r => {r.eitherOr = k})
})