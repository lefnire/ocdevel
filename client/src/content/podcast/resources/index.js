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

const ocdevel = _.mapValues({
  ml_stack: {
    t: "Machine Learning Server",
    d: `Cloud hosting services for serving your machine learning model`,
    links: [{t: "Article", l: "/mlg/mla-14", p: "free"}]
  },
  frontend_stack: {
    t: "Client, Server, Database",
    d: `Tech stack and cloud services to use for your front-end (web/mobile), app server, and database. As well as some database-ish things like in-memory session management, pub/sub, and job-queues.`,
    links: [
      {t: "Article", l: "/mlg/mla-13", p: "free"}
    ]
  },

  dev_environment: {
      t: "Development Environment",
      d: `Use Windows (dev channel), WSL2, Docker, nvidia-docker for your dev environment`,
      links: [{t: "Article", l: "/mlg/24", p: "free"}]
    },

  get_job: {
    t: "Get a Job",
    d: `Advice for finding work in ML / datascience`,
    links: [{t: "Article", l: "/mlg/mla-15", p: "free"}]
  }
}, v => ({
  topic: "tech",
  ...v
}))

const cards = _.mapValues({

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
  ...cards,
  ...ocdevel
}, (v, k) => ({
  id: k,
  ...defaults,
  ...v,
}))