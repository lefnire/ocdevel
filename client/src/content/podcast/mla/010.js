const ep = {
  title: 'NLP packages: transformers, spaCy, Gensim, NLTK',
  episode: 10,
  mergeEpisode: 40,
  mla: true,
  created: "2020-10-27",
  guid: "6f17dd73-0ef7-4cc0-b0a4-16b95924d020",
  libsynEpisode: 16621373,
  teaser: "NLTK: swiss army knife. Gensim: LDA topic modeling, n-grams. spaCy: linguistics. transformers: high-level business NLP tasks.",
  body: `
[NLTK](https://www.nltk.org/) - swiss army knife / catch-all for anything and everything NLP.

[Gensim](https://radimrehurek.com/gensim/) - another odds-and-ends package, which I use specifically for [LDA Topic Modeling](https://radimrehurek.com/gensim/models/ldamodel.html) and [Bigrams/Trigrams](https://radimrehurek.com/gensim/models/phrases.html)

[spaCy](https://spacy.io/) - deep-learning-based linguistics tool. I use [LemmInflect](https://github.com/bjascob/LemmInflect) for inflecting part-of-speech tags, and more robust lemmatization than in-built spaCy lemmas. Also consider (forgot to mention in episode) Stanford CoreNLP, offered as a spaCy package [spacy-stanza](https://spacy.io/universe/project/spacy-stanza), which I've found more accurate for most tasks, but much slower. Depends on your needs.

[huggingface/transformers](https://huggingface.co/transformers/) - high-level NLP tasks, see their [Pipelines](https://huggingface.co/transformers/main_classes/pipelines.html) for what 10+ tasks you can perform as one-liners basically; and the sky's the limit if you're willing to get more code-y. Their [model repository](https://huggingface.co/models) is just _huge_.

[UKPLab/sentence-transformers](https://github.com/UKPLab/sentence-transformers) - embed documents into vector-space so you can math. Clustering, semantic search, etc. See their [example applications](https://github.com/UKPLab/sentence-transformers/tree/master/examples/applications).

To cover later: Approximate Nearest Neighbor (ANN). Eg, cosine similarity, but for huge corpuses like Wikipedia. Annoy, FAISS, hnswlib, etc. See [UKPLab's examples](https://github.com/UKPLab/sentence-transformers/tree/master/examples/applications) of these.

See [Analytics Steps Top 10 Libraries](https://www.analyticssteps.com/blogs/top-10-natural-processing-languages-nlp-libraries-python)
`
}
export default ep