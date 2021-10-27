import _ from "lodash";

export default _.mapValues({
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