const episodes = [{
  title: "1. Introduction",
  date: new Date("02/01/2017"),
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-1.mp3",
    length: 11955748,
    type: "audio/mpeg",
    duration: "12:54"
  },
  teaser: "Introduction to the Machine Learning Guide",
  body:
`
Who am I: [Tyler Renelle](https://www.linkedin.com/in/lefnire)
What is this podcast? 
  - "Middle" level overview (deeper than a bird's eye view of machine learning; higher than math equations)
  - No math/programming experience required
Who is it for
  - Anyone curious about machine learning fundamentals (coming from /r/singularity, futurology, learningmachinelearning, etc)
  - Aspiring machine learning developers (perhapse transitioning from web/mobile development)
Why audio?
  - Supplementary content for commute/exercise/chores will help solidify your book/course-work
What it's not
  - News and Interviews
    - [TWiML and AI](https://twimlai.com)
    - [O'Reilly Data Show](https://www.oreilly.com/topics/oreilly-data-show-podcast)
    - [Talking machines](http://www.thetalkingmachines.com/)
  - Misc Topics
    - [Linear Digressions](http://lineardigressions.com/)
    - [Data Skeptic](https://dataskeptic.com/)
  - iTunesU issues
  - [Learning machines 101](http://www.learningmachines101.com/)
Planned episodes
  - What is AI/ML: definition, comparison, history
  - Inspiration: automation, singularity, consciousness
  - ML Intuition: learning basics (infer/error/train); supervised/unsupervised/reinforcement; applications
  - Math overview: linear algebra, statistics, calculus
  - Linear models: supervised (regression, classification); unsupervised
  - Parts: regularization, performance evaluation, dimensionality reduction, etc
  - Deep models: neural networks, recurrent neural networks (RNNs), convolutional neural networks (convnets/CNNs)
  - Languages and Frameworks: Python vs R vs Java vs C/C++ vs MATLAB, etc; TensorFlow vs Torch vs Theano vs Spark, etc
Resources
`
}];

const podcast = {
  title: "Machine Learning Guide",
  link: "http://ocdevel.com/podcasts/machine-learning",
  feed: "http://ocdevel.com/files/podcasts/machine-learning.xml",
  keywords: "machine,learning,ml,introduction,artificial,intelligence,ai",
  image: "http://www.example.com/image3000x3000.png",
  date: new Date('02/01/2017'),
  teaser: "Introduction and intuition on machine learning principles, algorithms, and math. Your 'start here' ML resource.",
  body: "",
  episodes: episodes
};

module.exports = podcast;