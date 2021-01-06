import {resources} from '../resources'

export default {
  title: "Introduction",
  episode: 1,
  created: "2017-02-01",
  updated: "2020-12-29",
  libsynEpisode: 5440758,
  guid: "a9bf6e09-aa7e-4126-9e36-22b152419c8f",
  resources: [
    resources.tgc_ml,

    resources.twiml_and_ai,
    resources.oreilly_data_show,
    resources.talking_machines,

    resources.linear_digressions,
    resources.data_skeptic,
    resources.learning_machines_101,
  ],
  teaser: "Introduction to the Machine Learning Guide",
  body: `
- Gnothi (podcast project): [website](https://gnothiai.com), [Github](https://github.com/lefnire/gnothi)
- [Machine Learning Applied](https://www.patreon.com/machinelearningguide), [get free access](http://ocdevel.com/mlg/free-access)
- [Resources Guide](/mlg/resources)

What is this podcast? 
- "Middle" level overview (deeper than a bird's eye view of machine learning; higher than math equations)
- No math/programming experience required

Who is it for
- Anyone curious about machine learning fundamentals
- Aspiring machine learning developers

Why audio?
- Supplementary content for commute/exercise/chores will help solidify your book/course-work

What it's not
- News and Interviews: TWiML and AI, O'Reilly Data Show, Talking machines
- Misc Topics: Linear Digressions, Data Skeptic, Learning machines 101
- iTunesU issues

Planned episodes
- What is AI/ML: definition, comparison, history
- Inspiration: automation, singularity, consciousness
- ML Intuition: learning basics (infer/error/train); supervised/unsupervised/reinforcement; applications
- Math overview: linear algebra, statistics, calculus
- Linear models: supervised (regression, classification); unsupervised
- Parts: regularization, performance evaluation, dimensionality reduction, etc
- Deep models: neural networks, recurrent neural networks (RNNs), convolutional neural networks (convnets/CNNs)
- Languages and Frameworks: Python vs R vs Java vs C/C++ vs MATLAB, etc; TensorFlow vs Torch vs Theano vs Spark, etc
`
}