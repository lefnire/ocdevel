export default {
  title: 'Natural Language Processing 2',
  episode: 19,
  created: "2017-07-10",
  guid: "e05e640ba2f99105f52c4eef0c5cabfb",
  file: {},
  libsynEpisode: 5525243,
  teaser: 'Natural Language Processing classical/shallow algorithms.',
  body: `
- Edit distance: Levenshtein distance
- Stemming/lemmatization: Porter Stemmer
- N-grams, Tokens: regex
- Language models
  - Machine translation, spelling correction, speech recognition
- Classification / Sentiment Analysis: SVM, Navie bayes
- Information Extraction (POS, NER): Models: MaxEnt, Hidden Markov Models (HMM), Conditional Random Fields (CRF)
- Generative vs Discriminitive models
  - Generative: HMM, Bayes, LDA
  - Discriminative: SVMs, MaxEnt / LogReg, ANNs
  - Pros/Cons
    - Generative depends on fewer data (NLP tends to be few data)
    - MaxEnt vs Naive Bayes: Independence assumption of Bayes, etc ("Hong" "Kong")
- Topic Modeling and keyword extraction: Latent Dirichlet Allocation (LDA)
  - LDA ~= LSA ~= LSI: Latent diriclet allocation, latent semantic indexing, latent semantic analysis
- Search / relevance / document-similarity: Bag-of-words, TF-IDF
- Similarity: Jaccard, Cosine, Euclidean`
}