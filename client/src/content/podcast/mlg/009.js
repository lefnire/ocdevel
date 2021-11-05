const ep =  {
  title: "Deep Learning",
  episode: 9,
  created: "2017-03-04",
  guid: "d842fe61-7cf2-4209-9cb3-d29be6c4d1a8",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-9.mp3",
    length: 45855231,
    duration: "51:09"
  },
  libsynEpisode: 5440749,
  teaser: "Deep learning and neural networks. How to stack our logisitic regression units into a multi-layer perceptron.",
  body:`
- Value
  - Represents brain? Magic black-box
  - Feature learning (layer removed from programmer)
  - Subsumes AI
- Stacked shallow learning
  - Logistic regression = lego, Neural Network = castle
- Deep Learning => ANNs => MLPs (& RNNs, CNNs, DQNs, etc)
  - MLP: Perceptron vs LogReg / sigmoid activation
- Architecture
  - (Feed forward) Input => Hidden Layers => Hypothesis fn
  - "Feed forward" vs recursive (RNNs, later)
  - (Loss function) Cross entropy
  - (Learn) Back Propagation
- Price ~ smoking + obesity + age^2
  - 1-layer MLP
- Face? ~ pixels
  - Extra layer = hierarchical breakdown
  - Inputs => Employees => Supervisors => Boss
- Backprop / Gradient descent
  - Optimizers: adagrad, adam, ... vs gradient descent
- Silver bullet, but don't abuse
  - linear (housing market)
  - features don't combine
  - expensive: like hiring a company when the boss h(x) does all the work
- Brian comparison (dentrites, axons); early pioneers as neuroscientists / cogsci
- Different types
  - vs brain
  - RNNs
  - CNNs
- Activation fns
  - Activation units / neurons (hidden layer)
  - Relu, TanH, Sigmoid`
}
export default ep