import _ from "lodash";

export default _.mapValues({
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