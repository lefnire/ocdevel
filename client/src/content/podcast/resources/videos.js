import _ from "lodash";

export default _.mapValues({
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
  },

  yt_aws_sagemaker: {
    t: "Amazon SageMaker Technical Deep Dive Series",
    links: [
      {t: "YouTube", l: "https://www.youtube.com/playlist?list=PLhr1KZpdzukcOr_6j_zmSrvYnLUtgqsZz", p: "free"}
    ],
    difficulty: "easy",
    topic: "tech"
  }



}, v => ({
  engagement: "passive",
  format: "video",
  video2audio: "medium",
  ...v
}))