export const filters = {
  engagement: {
    active: ["Active", "Requires engagement, like assignments or exercises"],
    passive: ["Passive", "Passive learning resource, like podcasts or videos"]
  },
  difficulty: {
    easy: ["Easy", "Very easy material"],
    medium: ["Medium", "Somewhat difficult material, be caffeinated"],
    hard: ["Hard", "Difficult material, for hard-core learning sessions"]
  },
  format: {
    audio: {
      audiobook: ["Audiobook", "Audiobook or similar learning resources"],
      podcast: ["Podcast", "Podcast"],
    },
    video: ["Video", "Video learning resource"],
    book: ["Book", "Book resource. Textbooks or tradebooks"],
    course: ["Course", "Online course. Either do-it-yourself (no grading) or graded with assignments"],
    other: ["Other", "Other learning resources like articles & blogs"]
  },
  video2audio: {
    bad: ["No-Go", "Watch it as a video, you'll need the visuals"],
    medium: ["Doable", "Could be consumed as audio-only, but not for the feint of heart"],
    good: ["As Good", "Almost just as good to listen to this video resource audio-only. Speaker does a great job orating the visuals."]
  },
  relevance: {
    fresh: ["Fresh", "An up-to-date resource, or timeless"],
    dated: ["Dated", "A dated resource, unless it's marked 'essential', see if you can find something newer"]
  },
  value: {
    supplementary: ["Supplementary", "Nice-to-have resource. Supplementary for the deep-divers on this topic, but not your bread-and-butter"],
    valuable: ["Valuable", "Quite a valuable resource. If you have the extra time, do it"],
    essential: ["Essential", "Required. If interested in this topic, you _need_ this resource"]
  },
  topic: {
    basics: ["Basics", "ML basics, information, end-to-end stuff"],
    math: ["Math", "Fundamental math for ML"],
    vision: ["Vision", "Computer vision (CV)"],
    nlp: ["Language", "Natural Language Processing (NLP)"],
  },
}


export const resources = {
qai: {
  title: "The Quest for Artificial Intelligence",
  links: ["http://amzn.to/2kRd4Ie", "[Free PDF](http://ai.stanford.edu/~nilsson/QAI/qai.pdf)"],
  engagement: filters.engagement.passive,
  difficulty: filters.difficulty.hard,
  format: filters.format.book,
  relevance: filters.format.fresh,
  value: filters.format.supplementary,
  topic: filters.topic.basics,
  price: 0
},

  books: {
    qai: `[The Quest for Artificial Intelligence](http://amzn.to/2kRd4Ie) ([Free PDF?](http://ai.stanford.edu/~nilsson/QAI/qai.pdf)) \`book:hard\` AI history`,

    // Math
    linear_algebra: `[Introduction to Linear Algebra](https://amzn.to/2wP8TWS) \`book:hard\``,
    stats: `[All of statistics](http://amzn.to/2t2dOwg) \`book:hard\``,
    calc: `[Calculus](http://amzn.to/2tXfXhp) \`book:hard\``,

    dl_book: `[Deep Learning Book](http://amzn.to/2tXgCiT) ([Free HTML version](http://www.deeplearningbook.org/)) \`book:hard\` comprehensive DL bible; highly mathematical`,
    python: `[Python](http://amzn.to/2mVgtJW) \`book:medium\``,
    python_data_analysis: `[Python for Data Analysis: Data Wrangling with Pandas, NumPy, and IPython 2nd Edition](https://amzn.to/2IHFh2m) \`book:easy\``,
    handson_tensorflow: `[Hands-On Machine Learning with Scikit-Learn and TensorFlow](http://amzn.to/2tVdIXN) \`book:medium\``,
    ml_with_r: `[Machine Learning with R](http://amzn.to/2n5fSUF) \`book:medium\``,
    elements_of_stat_learning: `[Elements of Statistical Learning](http://amzn.to/2tWW8He) \`book:hard\``,
    pattern_rec: `[Pattern Recognition and Machine Learning](http://amzn.to/2sDIIfb) ([Free PDF?](https://goo.gl/aX038j)) \`book:hard\``,
    speech_and_nlp: `[Speech and Language Processing](http://amzn.to/2uZaNyg) \`book:hard\` comprehensive classical-NLP bible`,
    nltk: `[NLTK Book](http://www.nltk.org/book) \`book:medium\``,
    sutton_barto: `[Sutton & Barto 2nd Ed PDF](http://incompleteideas.net/book/the-book-2nd.html) \`book:hard\``,
    aima: `AI a Modern Approach. [Website](http://aima.cs.berkeley.edu/), [Book](http://amzn.to/2E02dEr) \`book:hard\``
  },
  courses: {
    // Ng
    ng: `[Coursera](https://www.coursera.org/learn/machine-learning) \`course:hard\``,
    ng_1: `[Andrew Ng's Machine Learning Coursera course](https://www.coursera.org/learn/machine-learning) \`course:hard\` No question, the most essential, important, recommended resource in my entire series _period_. Consider it required, not optional.`,
    ng_2: `You've started [Ng's Coursera course](https://www.coursera.org/learn/machine-learning), right? Riight?`,
    ng_wk_7: `[Andrew Ng Week 7](https://www.coursera.org/learn/machine-learning/resources/Es9Qo)`,
    ng_wk_8: `[Andrew Ng Week 8](https://www.coursera.org/learn/machine-learning/resources/kGWsY)`,
    ng_wk_9: `[Andrew Ng Week 9](https://www.coursera.org/learn/machine-learning/resources/szFCa)`,

    // Math
    linear_algebra: `Either [LinAlg](https://www.khanacademy.org/math/linear-algebra) \`course:medium\` OR [Fast.ai](http://www.fast.ai/2017/07/17/num-lin-alg/) \`course:medium\``,
    stats: `[Stats](https://www.khanacademy.org/math/statistics-probability) \`course:medium\``,
    calc: `[Calc](https://www.khanacademy.org/math/calculus-home) \`course:medium\``,

    fastai: `[Fast.ai](http://course.fast.ai/) \`course:medium\` practical DL for coders`,
    cs224n: `[Stanford cs224n: Deep NLP](https://www.youtube.com/playlist?list=PL3FW7Lu3i5Jsnh1rnUwq_TcylNr7EkRe6) \`course:medium\` (replaces cs224d)`,
    cs231n: `[Stanford cs231n: Convnets](https://www.youtube.com/playlist?list=PLkt2uSq6rBVctENoVBg1TpCC7OQi31AlC) \`course:medium\``,
    cs294: `[Berkeley cs294: Deep Reinforcement Learning](http://rll.berkeley.edu/deeprlcourse/) \`course:hard\``,
    david_silver: `[RL Course by David Silver](https://www.youtube.com/playlist?list=PLzuuYNsE1EZAXYR4FJ75jcJseBmo4KQ9-) \`course|audio:hard\``
  },
  audio: {
    machines_of_loving_grace: `[Machines of Loving Grace](http://amzn.to/2kRcBWq) \`audio:easy\` AI history`,
    singularity_is_near: `[The Singularity Is Near](http://amzn.to/2lzCqKk) \`audio:easy\``,
    ttc_consciousness: `Philosophy of Mind: Brains, Consciousness, and Thinking Machines ([Audible](http://amzn.to/2kQGgk5), [TGC](https://goo.gl/fDteyi)) \`audio:easy\``,
    how_to_create_mind: `[How to Create a Mind](http://amzn.to/2tXLvUm) \`audio:easy\``,
    superintelligence: `[Superintelligence](http://amzn.to/2lzLcrL) \`audio:easy\` doom-and-gloom favorite of Musk, Gates, Hawking.`,
    master_algorithm: `[The Master Algorithm](http://amzn.to/2kLOQjW) \`audio:medium\` Semi-technical overview of ML basics & main algorithms`,

    // Math
    stats: `[Statistics](https://goo.gl/4vvXJs), [Probability](https://goo.gl/Q4KwZ6) \`audio|course:hard\``,
    calc: `Calculus [1](https://goo.gl/fcLP3l), [2](https://goo.gl/sBpljN), [3](https://goo.gl/8Hdwuh) \`audio|course:hard\``,
    math_decision_making: `[Mathematical Decision Making](https://goo.gl/V75I49) \`audio|course:hard\` course on "Operations Research", similar to ML`,
    info_theory: `[Information Theory](https://goo.gl/ugAi2m) \`audio|course:hard\``,
    video_to_audio: `Convert video to audio:
  - mp4 => mp3: \`for f in *.mp4; do ffmpeg -i "$f" "\${f%.mp4}.mp3" && rm "$f"; done\`
  - youtube => mp3: setup [youtube-dl](https://github.com/rg3/youtube-dl) and run \`youtube-dl -x youtube.com/playlist?list=<EDIT THIS>\``,
    cs229: `(removed CS229 - very heavy chalkboard use lends poorly to audio)`,
    speech_and_nlp: `[Stanford NLP YouTube](https://www.youtube.com/playlist?list=PL6397E4B26D00A269) \`course|audio:medium\` If offline, skip to the Deep NLP playlist (see [tweet](https://twitter.com/jurafsky/status/972726681118023680)).`,
    dl_episode: `[Deep Learning Resources](http://ocdevel.com/podcasts/machine-learning/9)`
  },
  other: {
    wikipedia_ai: `[Wikipedia:AI](https://en.wikipedia.org/wiki/Artificial_intelligence) \`article:easy\``,
    tour_ml_algos: `[Tour of Machine Learning Algorithms](http://machinelearningmastery.com/a-tour-of-machine-learning-algorithms) \`article:easy\``,
    degrees_convos: `Discussions: [1](http://canyon289.github.io/DSGuide.html#DSGuide) [2](https://news.ycombinator.com/item?id=13654127) [3](http://cole-maclean.github.io/blog/Self%20Taught%20AI/) [4](https://news.ycombinator.com/item?id=12516441)`,
    math_primer: `See "Section Notes" of [cs229](http://cs229.stanford.edu/materials.html) \`handout:medium\``,
    dl_simplified: `[Deep Learning Simplified](https://www.youtube.com/watch?v=b99UVkWzYTQ) \`video:easy\` quick series to get a lay-of-the-land.`,
    // nns_and_dl: `[Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) \`book:medium\` shorter online "book"`,
    tensorflow_tuts: `[TensorFlow Tutorials](https://www.tensorflow.org/get_started/get_started) \`tutorial:medium\``,
    which_algo_to_use: `- Which algo to use?
  - [Pros/cons table for algos](https://blog.recast.ai/machine-learning-algorithms/2/) \`picture\`
  - [Decision tree of algos](http://scikit-learn.org/stable/tutorial/machine_learning_map/) \`picture\``,
    kaggle: `[Kaggle.com](https://www.kaggle.com/)`,
    patreon: `[Patreon](https://www.patreon.com/machinelearningguide)`,
    rnn_articles: `Overview Articles: 
  - [Unreasonable Effectiveness of RNNs](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) \`article:easy\`
  - [Deep Learning, NLP, and Representations](http://colah.github.io/posts/2014-07-NLP-RNNs-Representations/) \`article:medium\`
  - [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/) \`article:medium\``,
    tf_tuts_rnns: `[TensorFlow Tutorials](https://www.tensorflow.org/tutorials/word2vec) \`tutorial:medium\` (start at Word2Vec + next 2 pages)`,
    project_repo: `[TForce BTC Trader](https://github.com/lefnire/tforce_btc_trader) (podcast project)`
  }
};
resources.books.ml_with_r = `${resources.books.handson_tensorflow} (replaced R book)`;