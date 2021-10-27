import resources from "../resources";

export default {
  title: 'Deep NLP 1',
  episode: 22,
  created: "2017-07-28",
  guid: "d9e15cfe501a8f0c6e3c075c09f7e682",
  file: {},
  libsynEpisode: 5589161,
  resources: [
    resources.rnn_articles,
    resources.cs224n,
    resources.tf_tuts_rnns
  ],
  teaser: 'Recurrent Neural Networks (RNNs) and Word2Vec.',
  body: `
See resources on [Deep Learning episode](/mlg/9).

Deep NLP pros
- Language complexity & nuances
  - Feature engineering / learning
  - Salary = degree*field, not +
  - Multiple layers: pixels => lines => objects
  - Multiple layers of language
- Once model to rule them all; E2E models

Sequence vs non-sequence
- DNN = ANN = MLP = Feed Forward
- RNNs for sequence (time series)

RNNs
- Looped hidden layers, learns nuances by combined features
- Carries info through time: language model
- Translation, sentiment, classification, POS, NER, ...
- Seq2seq, encode/decode

[Word2Vec](https://www.tensorflow.org/tutorials/word2vec)
- One-hot (sparse) doesn't help (plus sparse = compute)
- Word embeddings
  - Euclidean distance for synonyms / similar, Cosine for "projections" . king + queen - man = woman
  - t-SNE (t-distributed stochastic neighbor embedding)
- Vector Space Models (VSMs). Learn from context, predictive vs count-based
- Predictive methods (neural probabilistic language models) - Learn model parameters which predict contexts
  - Word2vec
  - CBOW / Skip-Gram (cbow predicts center from context, skip-gram context from center. Small v large datasets)
  - DNN, Softmax hypothesis fn, NCE loss (noise contrastive estimation)
- Count-based methods / Distributional Semantics - (compute the statistics of how often some word co-occurs with its neighbor words in a large text corpus, and then map these count-statistics down to a small, dense vector for each word)
  - GloVe
  - Linear algebra stuff (PCA, LSA, SVD)
  - Pros (?): faster, more accurate, incremental fitting. Cons (?): data hungry, more RAM. [More info](http://blog.aylien.com/overview-word-embeddings-history-word2vec-cbow-glove/)
- DNN for POS, NER (or RNNs)`
}