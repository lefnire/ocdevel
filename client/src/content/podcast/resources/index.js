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

const tgc = _.mapValues({
  tgc_ml: {
    t: "TGC Machine Learning",
    d: "Basics of ML in video (highly amenable to audio-only listening). It's pretty rapid-pace, covering a lot of ground in relatively little time, so this won't be your bread-and-butter. But it does provide a phenomenal overview, so it's a great resource to start with in the beginning of your learning journey.",
    links: [{t: "TGC", p: "$$", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=9070&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fintroduction-to-machine-learning&intsrc=PUI1_1204"}],
    topic: "basics"
  },

  tgc_consciousness: {
    t: "TGC Philosophy of Mind: Brains, Consciousness, and Thinking Machines",
    links: [
      {t: "Amazon", l: "https://amzn.to/38GHt5n", p: "$"},
      {t: "TGC", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=4278&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fphilosophy-of-mind-brains-consciousness-and-thinking-machines&intsrc=PUI1_1204", p: "$$"},
    ],
    topic: "fun",
    format: "audiobook",
    difficulty: "easy",
    importance: "valuable"
  },

  tgc_mind_body: {
    t: "TGC Mind-Body Philosophy",
    links: [
      {t: "Amazon", l: "https://amzn.to/2WWYliy", p: "$"},
      {t: "TGC", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=4932&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fmind-body-philosophy&intsrc=PUI1_1204", p: "$$"},
    ],
    topic: "fun",
    format: "audiobook",
    difficulty: "easy",
  },

  tgc_stats: {
    t: `TGC Statistics & Probability`,
    links: [
      {t: "Learning Statistics: Concepts and Applications in R", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1480&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Flearning-statistics-concepts-and-applications-in-r&intsrc=PUI1_1204", p: "$$"},
      {t: "What Are the Chances? Probability Made Clear", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1474&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fwhat-are-the-chances-probability-made-clear&intsrc=PUI1_1204", p: "$$"},
    ],
    topic: "math"
  },

  tgc_calc: {
    t: "TGC Calculus",
    links: [
      // change in motion calc made
      {t: "Calc 1 - Understanding Calculus: Problems, Solutions, and Tips", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1007&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Funderstanding-calculus-problems-solutions-and-tips&intsrc=PUI1_1204", p: "$$"},
      {t: "Calc 2 - Understanding Calculus II: Problems, Solutions, and Tips", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1018&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Funderstanding-calculus-ii-problems-solutions-and-tips&intsrc=PUI1_1204", p: "$$"},
      {t: "Calc 3 - Understanding Multivariable Calculus: Problems, Solutions, and Tips", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1023&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Funderstanding-multivariable-calculus-problems-solutions-and-tips&intsrc=PUI1_1204", p: "$$"}
    ],
    topic: "math"
  },

  tgc_math_decision_making: {
    t: "TGC Mathematical Decision Making",
    d: "Course on \"Operations Research\", similar to ML",
    links: [{t: "Mathematical Decision Making: Predictive Models and Optimization", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1342&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fmathematical-optimization-techniques&intsrc=PUI1_1204"}],
    topic: "basics"
  },

  tgc_info_theory: {
    t: "TGC Information Theory",
    links: [{t: "The Science of Information: From Language to Black Holes", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1301&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fthe-science-of-information-from-language-to-black-holes&intsrc=PUI1_1204", p: "$$"}],
    topic: "math"
  },

  tgc_linear_algebra: {
    t: "TGC - Mastering Linear Algebra: An Introduction with Applications 1056",
    links: [{t: "TGC", p: "$$", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1056&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fmastering-linear-algebra-an-introduction-to-applications&intsrc=PUI1_1204"}],
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
    d: "Kurzweil isn't the inventor of the concept 'singularity', but he's certainly the most known name attached to it. This is the foundational book of the religion of futurology, and it's a blast whether you believe it or not. Worth reading regardless.",
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
    importance: "valuable",
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
    difficulty: "medium",
    format: "book"
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

const videos = _.mapValues({
  stanford_nlp: {
    t:`Stanford NLP YouTube`,
    d: "If offline, skip to the Deep NLP playlist (see [tweet](https://twitter.com/jurafsky/status/972726681118023680)).",
    links: [{t: "YouTube", l: "https://www.youtube.com/playlist?list=PL6397E4B26D00A269", p: "free"}],
    difficulty: "medium",
    topic: "nlp",
    itunesu: true,
    audioOption: true
  },

  cs224n: {
    t:`Stanford cs224n: Deep NLP`,
    d: "replaces cs224d",
    links: [{t: "YouTube", l: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5Jsnh1rnUwq_TcylNr7EkRe6", p: "free"}],
    difficulty: "medium",
    topic: "nlp",
    itunesu: true,
    audioOption: true
  },

  cs231n: {
    t:`Stanford CS231n: Convolutional Neural Networks for Visual Recognition`,
    d: "Visit the website for the most recent YouTube playlist; they record this every semester.",
    links: [
      {t: "Website", l: "http://cs231n.stanford.edu/index.html", p: "free"},
      {t: "YouTube", l: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv", p: "free"}
    ],
    difficulty: "medium",
    topic: "cv",
    itunesu: true,
    audioOption: true
  },

  cs294: {
    t:`Berkeley cs294: Deep Reinforcement Learning`,
    links: [{t: "Website", l: "http://rll.berkeley.edu/deeprlcourse/", p: "free"}],
    difficulty: "hard",
    topic: "rl",
    itunesu: true,
    audioOption: true
  },

  david_silver: {
    t:`RL Course by David Silver`,
    links: [{t: "YouTube", l: "https://www.youtube.com/playlist?list=PLzuuYNsE1EZAXYR4FJ75jcJseBmo4KQ9-", p: "free"}],
    video2audio: "good",
    difficulty: "hard",
    topic: "rl",
    itunesu: true,
    audioOption: true
  },

  bluebrown_calc: {
    t: "3Blue1Brown - Essence of calculus",
    links: [
      {t: "YouTube - Basics", l: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", p: "free"},
      {t: "YouTube - Multivariate", l: "https://www.youtube.com/watch?v=TrcCbdWwCBc&list=PLSQl0a2vh4HC5feHa6Rc5c0wbRTx56nF7", p: "free"}
    ],
    video2audio: "good",
    difficulty: "hard",
    topic: "math",
    audioOption: true
  },

  bluebrown_linalg: {
    t: "3Blue1Brown - Essence of linear algebra",
    links: [
      {t: "YouTube", l: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", p: "free"},
    ],
    video2audio: "good",
    difficulty: "hard",
    topic: "math",
    audioOption: true
  },

  yolo_class: {
    t: "Joseph Redmond CV + YOLO class",
    links: [
      {t: "Website", l: "https://pjreddie.com/courses/computer-vision/", p: "free"}
    ],
    difficulty: "medium",
    topic: "cv"
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
    links: [{t: "Website", l: "http://machinelearningmastery.com/a-tour-of-machine-learning-algorithms", p: "free"}],
    topic: "basics",
  },

  wikipedia_ai: {
    t: `Wikipedia:AI`,
    links: [{t: "Wikipedia:AI", l: "https://en.wikipedia.org/wiki/Artificial_intelligence", p: "free"}],
    topic: "fun"
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
    topic: "dl",
    format: "video"
  },

  tensorflow_tuts: {
    t: `TensorFlow Tutorials`,
    d: "Official TensorFlow tutorials, quick-start you into some hands-on code",
    links: [{t: "Website", l: "https://www.tensorflow.org/get_started/get_started", p: "free"}],
    difficulty: "medium",
    topic: "tech"
  },

  rnn_articles: {
    t: `RNN Overview Articles`,
    links: [
      {t: "Unreasonable Effectiveness of RNNs", l: "http://karpathy.github.io/2015/05/21/rnn-effectiveness/", p: "free"},
      {t: "Deep Learning, NLP, and Representations", l: "http://colah.github.io/posts/2014-07-NLP-RNNs-Representations/", p: "free"},
      {t: "Understanding LSTM Networks", l: "http://colah.github.io/posts/2015-08-Understanding-LSTMs/", p: "free"}
    ],
    topic: "nlp",
    difficulty: "medium"
  },

  tf_tuts_rnns: {
    t: `TensorFlow RNN Tutorials`,
    d: "start at Word2Vec + next 2 pages",
    links: [{t: "Website", l: "https://www.tensorflow.org/tutorials/word2vec", p: "free"}],
    difficulty: "medium",
    topic: "tech"
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
      {t: "Amazon", l: "http://amzn.to/2kRd4Ie", p: "$"},
      {t: "PDF", l: "http://ai.stanford.edu/~nilsson/QAI/qai.pdf", p: "free"}
    ],
    topic: "fun"
  },

  mml_book: {
    t: "Mathematics for Machine Learning",
    d: "Short and sweet textbook on ML math. Somewhere between a primer and the full deal. Highly lauded in the field.",
    links: [
      {t: "Website", l: "https://mml-book.github.io/", p: "free"}
    ],
    topic: "math"
  },

  hundred_page_ml: {
    t: "The Hundred-Page Machine Learning Book",
    links: [
      {t: "Website", l: "http://themlbook.com/", p: "$"},
      {t: "Amazon", l: "https://amzn.to/3aKAbQI", p: "$"}
    ],
    importance: "essential",
    topic: "basics"
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
    d: "A phenomenal learning resource. Typically trade books like this aren't recommended as bread-n-butter for ML, as the Ng Coursera course is. But I'm not alone in giving this book a free pass - I've seen it recommended as core material elsewhere too. Teachs ML concepts along with Python programming essentials & ML library/framework usage.",
    links: [{t: "Amazon", l: "https://amzn.to/3nwGxqt", p: "$"}],
    difficulty: "medium",
    importance: "essential",
    topic: "tech"
  },

  dl_book: {
    t: `Deep Learning Book`,
    d: "Comprehensive DL bible; highly mathematical",
    links: [
      {t: "Amazon", l: "http://amzn.to/2tXgCiT", p: "$"},
      {t: "HTML", l: "http://www.deeplearningbook.org", p: "free"}
    ],
    importance: "essential",
    topic: "dl"
  },

  book_python: {
    t: `Learning Python, 5th Edition`,
    links: [{t: "Amazon", l: "http://amzn.to/2mVgtJW", p: "$"}],
    difficulty: "medium",
    topic: "tech"
  },

  python_data_analysis: {
    t: "Python for Data Analysis: Data Wrangling with Pandas, NumPy, and IPython 2nd Edition",
    links: [{t: "Amazon", l: "https://amzn.to/2IHFh2m", p: "$"}],
    difficulty: "easy",
    topic: "tech"
  },

  elements_of_stat_learning: {
    t: "Elements of Statistical Learning",
    links: [{t: "Amazon", l: "http://amzn.to/2tWW8He", p: "$"}],
    importance: "valuable",
    topic: "basics"
  },

  pattern_rec: {
    t: "Pattern Recognition and Machine Learning",
    links: [
      {t: "Amazon", l: "http://amzn.to/2sDIIfb", p: "$"},
      {t: "PDF", l: "https://goo.gl/aX038j", p: "free"}
    ],
    importance: "valuable",
    topic: "basics"
  },

  speech_and_nlp: {
    t: `Speech and Language Processing`,
    d: `comprehensive classical-NLP bible`,
    links: [{t: "Amazon", l: "http://amzn.to/2uZaNyg", p: "$"}],
    difficulty: "hard",
    importance: "essential",
    topic: "nlp"
  },

  nltk: {
    t:`NLTK Book`,
    links: [{t: "Website", l: "http://www.nltk.org/book", p: "free"}],
    difficulty: "medium",
    topic: "nlp"
  },

  sutton_barto: {
    t:`Sutton & Barto 2nd Ed`,
    links: [{t: "PDF", l: "http://incompleteideas.net/book/the-book-2nd.html", p: "free"}],
    importance: "essential",
    topic: "rl"
  },

  aima: {
    t:`AI a Modern Approach`,
    links: [
      {t: "Website", l: "http://aima.cs.berkeley.edu/", p: "free"},
      {t: "Amazon", l: "http://amzn.to/2E02dEr", p: "$"}
    ],
    importance: "essential",
    topic: "rl"
  },

  cv_algorithms_applications: {
    t: "Computer Vision: Algorithms and Applications",
    links: [
      {t: "Website", l: "https://szeliski.org/Book/", p: "$"},
      {t: "Amazon", l: "https://amzn.to/2WQ9RMQ", p: "$"}
    ],
    importance: "valuable",
    topic: "cv"
  }

}, v => ({
  format: "book",
  difficulty: "hard",
  ...v
}))

const cards = _.mapValues({
  dev_environment: {
    t: "Development Environment",
    d: `
For your local development environment, I recommend using Windows. You can't effectively use Mac because, due to their use of AMD rather than Nvidia, GPU-based ML frameworks can't optimize to Mac. You _could_ use Ubuntu Desktop, but it's not for the weak-of-heart due to various software compatibilities; and when it comes to laptops, drivers aren't as up-to-snuff as Windows drivers (especially with battery lifetime & wifi). So use Windows.
* Setup Windows Dev Channel and WSL2 with nvidia-docker support. [Instructions here](/blog/20201207-wsl2-gpu-docker)
* Odds-and-ends with WSL2 & Docker [here](/blog/20201208-wsl-docker-misc)
* I recommend using pre-fab Docker containers to save time, [I have some here](https://github.com/lefnire/ml-tools).

For desktops, build your own PC. See [PC Part Picker](https://pcpartpicker.com/) - make sure you use an Nvidia graphics card. For laptops, I like the MSI Stealth series. Buy from a reseller like [Gentech](https://www.gentechpc.com/), Xotic, HIDevolution (I prefer Gentech) - not Amazon / Newegg. This because only resellers offer thermal pasting, and that is a _must_ have for performance & longevity. Make sure to get GPU & CPU thermal pasting at checkout, I used Conductonaut on my last purchase - do your research.

[mla-012](https://www.patreon.com/posts/012-docker-43678922) for more information. 
`
  },
  client_stack: {
    t: "Client",
    d: `
There are many popular front-end frameworks (Angular, Vue, etc), but I recommend React. See [mla-013](https://www.patreon.com/posts/013-customer-45741538) for details.
* Web front-end
  * [React](https://reactjs.org/) for web client
  * [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html): quick-start React setup
  * [React Bootstrap](https://react-bootstrap.github.io/): quick-start CSS framework (explore others like Tailwind, Chakra, and MaterialUI)
  * Useful plugins: [react-router](https://reactrouter.com/), [easy-peasy](https://easy-peasy.now.sh/).
* Mobile apps
  * [React Native](https://reactnative.dev/)
`
  },
  server_stack: {
    t: "Server",
    d: `
First, get as _far_ as you possibly can with serverless frameworks, like [AWS Amplify](https://aws.amazon.com/amplify/) or [GCP Firebase](https://firebase.google.com/). Or if you prefer to use individual serverless components rather than an all-in-one package, see [AWS Serverless](https://aws.amazon.com/serverless/) (which are the components used underneath Amplify's hood). 

When you've hit the ceiling on Amplify and need custom server code, _still_ try serverless. [AWS Lambda](https://aws.amazon.com/lambda) lets you write individual routes as Node/Python functions. 

Finally, after you've hit the serverless ceiling (Amplify handling most leg-work, Cognito handling authentication, Lambda for one-off routes) and you _really_ need custom server code for edge-cases, do the following. 
1. Pick a server framework. I recommend Node.js + Express.js (JavaScript, strong concurrency & performance, super popular); or FastAPI (if you prefer to stick to Python; but it's less popular / performant). 
1. Containerize your server code in Docker. Deploy this Dockerfile to [ECR](https://aws.amazon.com/ecr/)
1. Use that container to run a [Fargate cluster](https://aws.amazon.com/fargate/). You may also need [Route53](https://aws.amazon.com/fargate/) (domains) and [ELB](https://aws.amazon.com/elasticloadbalancing/) (domain->fargate load balancing).

[mla-012](https://www.patreon.com/posts/012-docker-43678922) for more information. 
`
  },
  db_stack: {
    t: "Database, Job-Queues, Sessions",
    d: `
1. Popular databases are Postgres, MySQL, SQL Server, and MongoDB. I recommend [Postgres](https://www.postgresql.org/).
1. For in-memory session-management, and real-time pub/sub, use [Redis](https://redis.io/).
1. For job-queueing (sending work-orders to your ML server), use either [RabbitMQ](https://www.rabbitmq.com/) or [SQS](https://aws.amazon.com/sqs/); I recommend SQS. Use the wrapper library [Celery](https://docs.celeryproject.org/en/stable/getting-started/introduction.html) to interface with these technologies.

All that said, the main reason I like Postgres over its competition is it can replace 2 & 3 for you. You can run a job-queue via Postgres's \`select for update\` feature, and pub/sub via \`listen/notify\`.

[mla-012](https://www.patreon.com/posts/012-docker-43678922) for more information.
`
  },
  ml_stack: {
    t: "ML Stack",
    d: `
After you train an ML model and need to deploy it to production, you have a number of options. If your model runs rarely (1-50x / day), you can set it up as a batch job through various services. In this case it will run to completion, then take itself offline. If your model needs to always be available, via a customer-facing product with constant usage, then you'll deploy it as an endpoint through various services.

Batch models
* [AWS Batch](https://aws.amazon.com/batch/). Lets you run a model deployed as a Docker container (eg via [ECR](https://aws.amazon.com/batch/)) to completion, using price-saving features like spot instances. Much cheaper than Sagemaker, but at cost of spin-up time.

Endpoint models
* [AWS SageMaker](https://aws.amazon.com/batch/) lets you deploy trained models to a REST endpoint. Also lets you train models & view analytics and various training insights.
* [GCP Cloud ML](https://cloud.google.com/ai-platform). GCP's equivalent to SageMaker.
* [Cortex](https://www.cortex.dev/) is similar to SageMaker, with many added benefits. It's free and open source, using your AWS stack to deploy services (like SageMaker) but allowing cost-savings via spot instances, better than SageMaker's 40% EC2 added cost. Soon they'll support scale-to-0 instances, for when your ML server doesn't have traffic; a huge cost saving. 
* Other competitors include [PaperSpace Gradient](https://gradient.paperspace.com/), [FloydHub](https://www.floydhub.com/), and more. 
`
  },

  get_job: {
    t: "Get a Job",
    d: `
Increasingly, higher degrees are important: Masters at a minimum. But you _can_ get by with a Bachelors, I did, it just won't be easy. Either way, it's important to have hands-on experience or a portfolio to show. Some options:
1. Compete in a [Kaggle](https://kaggle.com) competition. This can result in prize money, and often direct employment. Those are incredible perks! But even if you don't win or get money / jobs, employers absolutely _love_ Kaggle experience on your resume. Take this very seriously.
1. Create a [Github account](https://github.com/). Start a few side projects, anything that interests you, even if they're small / one-off experiments. Going forward, try to keep all your ML playing-around on public Github repos, rather than folders on your desktop you delete months later - every ounce of code counts.
1. Contribute to an open source ML repo. If you contribute to [Gnothi](http://github.com/lefnire/gnothi), you get [free MLA access](/mlg/free-access) for life and I'll personally vouch for you as a employer reference. Benefits of contributing to high-profile repos is that your contributions are higher-profile (stand out more on your Github page); and you don't have to (a) come up with a project idea; (b) finish/maintain the project; (c) handle the details (like cloud-hosting, authentication, etc).

Finding jobs:
* [LinkedIn](https://linkedin.com) is your bread-and-butter. Make a solid profile, keep up with it.
* [Indeed](https://indeed.com)
* [My old list](/blog/0b06cd49-a9d7-4c0a-8390-950a58e8da95). Outdated, but there should be some timeless gems there. I'll update soon.   
`
  }


}, v => ({
  card: true,
  topic: "tech",
  ...v
}))

export const resources = _.mapValues({
  ...books,
  ...podcasts,
  ...tgc,
  ...fun,
  ...others,
  ...courses,
  ...videos,
  ...cards
}, (v, k) => ({
  id: k,
  ...defaults,
  ...v,
}))