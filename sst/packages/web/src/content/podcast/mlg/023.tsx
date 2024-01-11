const ep = {
  title: 'Deep NLP 2',
  episode: 23,
  mergeEpisode: 23,
  created: "2017-08-20",
  guid: "1346120e3e578b15c8f34b31bc21ef78",
  file: {},
  libsynEpisode: 5660423,
  teaser: 'RNN review, bi-directional RNNs, LSTM & GRU cells.',
  body: `
See resources on [Deep Learning episode](/mlg/9).

RNN Review
  - Vanilla: When words + running context is sufficient. 
    - POS, NER, stocks, weather
  - Bidirectional RNN (BiLSTM): When stuff from right helps too
  - Encoder/decoder or Seq2seq: When you should hear everything first / spin a different way
    - Classification, sentiment, translation
  - Now w/ word embeddings

Train: backprop through time
  - Vanishing/exploding gradient

[LSTMs](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)
  - ReLU vs Sigmoid vs TanH (Nonlinearities future episode)
  - Forget gate layer
  - Input gate layer: decides which values to update
  - Tanh layer: creates new candidate values
  - Output layer`
}
export default ep