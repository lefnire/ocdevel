const ep = {
  title: 'Hyperparameters 2',
  episode: 28,
  mergeEpisode: 28,
  created: "2018-02-04",
  guid: "8671d415236e9a9394a0c4aaa383e1ba",
  file: {},
  libsynEpisode: 6222761,
  teaser: 'Hyperparameters part 2: hyper-search, regularization, SGD optimizers, scaling',
  body: `
- Hyper optimization
  - GridSearch, RandomSearch
  - [Bayesian Optimization](https://thuijskens.github.io/2016/12/29/bayesian-optimisation/)
- Regularization: Dropout, L2, L1
  - DNNs = Dropout
  - L2 = most common
  - L1 = sparsity (zeros) & feature-selection (rarer circumstances)
- [Optimizers (SGD): Momentum -> Adagrad -> RMSProp -> Adam -> Nadam](http://sebastianruder.com/optimizing-gradient-descent/index.html#visualizationofalgorithms)
- Initializers: Zeros, Random Uniform, Xavier
- Scaling
  - Feature-scaling: MinMaxScaler, StandardScaler, RobustScaler
  - Features + inter-layer: Batch Normalization`
}
export default ep