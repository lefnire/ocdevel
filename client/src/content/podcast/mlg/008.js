import {resources} from "../resources";

export default {
  title: "Math",
  episode: 8,
  date: "2017-02-23",
  guid: "a5c01d38-5242-4b63-b265-81fc53d38ad3",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-8.mp3",
    length: 24852040,
    duration: "27:23"
  },
  libsynEpisode: 5440751,
  resources: [
    [
      resources.tgc_linear_algebra,
      resources.book_linear_algebra,
      resources.khan_linear_algebra,
    ],
    [
      resources.tgc_stats,
      resources.book_stats,
      resources.khan_stats,
    ],
    [
      resources.tgc_calc,
      resources.book_calc,
      resources.khan_calc,

    ],

    resources.tgc_math_decision_making,
    resources.tgc_info_theory,
    resources.math_primer,
  ],
  teaser: "Introduction to the branches of mathematics used in machine learning. Linear algebra, statistics, calculus.",
  body: `
Come back here after you've finished Ng's course; or learn these resources in tandem with ML (say 1 day a week).

- Linear Algebra = Matrix (or "Tensor") math. Wx + b. Chopping in our analogy.
- Stats = Probability/inference, the heart of machine learning. Recipes/cookbook.
- Calculus = Learning. Moving our error dot to the bottom of the valley. Baking, the actual "cook" step.`
}