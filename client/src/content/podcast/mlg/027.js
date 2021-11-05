const ep = {
  title: 'Hyperparameters 1',
  episode: 27,
  mergeEpisode: 27,
  created: "2018-01-27",
  guid: "f5a903d68c1ed04bd37a31175d456fc0",
  file: {},
  libsynEpisode: 6195814,
  teaser: 'Hyperparameters part 1: network architecture',
  body: `
- Hypers future & meta-learning
  - We're always removing hypers. DL removed feature-engineering \`
- Model selection
  - Unsupervised? K-means Clustering => DL
  - Linear? Linear regression, logistic regression
  - Simple? Naive Bayes, Decision Tree (Random Forest, Gradient Boosting)
  - Little data? Boosting
  - Lots of data, complex situation? Deep learning
- Network
  - Layer arch
    - Vision? CNN
    - Time? LSTM
    - Other? MLP
    - Trading LSTM => CNN decision
  - Layer size design (funnel, etc)
    - Face pics
    - From BTC episode
    - Don't know? Layers=1, Neurons=mean(inputs, output)
      https://stats.stackexchange.com/a/1097/107199
- Activations / nonlinearity
  https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6
  - Output
    - Sigmoid = predict probability of output, usually at output
    - Softmax = multi-class
    - Nothing = regression
  - Relu family (Leaky Relu, Elu, Selu, ...) = vanishing gradient (gradient is constant), performance, usually better
  - Tanh = classification between two classes, mean 0 important`
}
export default ep