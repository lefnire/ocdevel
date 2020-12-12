import resources from "../resources";

export default {
  title: "Shallow Algos 1",
  episode: 12,
  date: "2017-03-19",
  guid: "1074a375-6831-456d-9bbc-d28c8f85a557",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-12.mp3",
    length: 50030574,
    duration: "53:17"
  },
  libsynEpisode: 5440746,
  teaser: "Speed-run of some shallow algorithms: K Nearest Neighbors (KNN); K-means; Apriori; PCA; Decision Trees",
  body:
`## Resources
- ${resources.courses.ng_wk_8}
- ${resources.other.tour_ml_algos}
- ${resources.books.elements_of_stat_learning}
- ${resources.books.pattern_rec}
- ${resources.books.ml_with_r}
${resources.other.which_algo_to_use}

## Episode
KNN (supervised)

Unsupervised
- Clustering -> K-Means
- Association rule learning / Market basket -> Apriori
- Dimensionality Reduction -> PCA

Decision Trees (supervised, classify/regress)
- Random Forests
- Gradient Boost`}