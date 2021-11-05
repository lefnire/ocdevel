const ep =  {
  title: "Languages & Frameworks",
  episode: 10,
  created: "2017-03-07",
  guid: "c613d746-0916-448e-8315-5ac4323389e2",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-10.mp3",
    length: 39407399,
    duration: "44:17"
  },
  libsynEpisode: 5440748,
  teaser: "Languages & frameworks comparison. Languages: Python, R, MATLAB/Octave, Julia, Java/Scala, C/C++. Frameworks: Hadoop/Spark, Deeplearning4J, Theano, Torch, TensorFlow.",
  body: `
Languages
- C/C++
  - Performance
  - GPU (CUDA/cuDNN)
- Math Langs
  - R
  - MATLAB / Octave
  - Julia
- Java / Scala
  - Data mining
  - Hadoop + Mahout / Spark + SparkML
  - Deeplearning4j
- Python
  - R => Pandas
  - MATLAB => numpy
  - C/C++/GPU => TensorFlow (or other symbolic graph)
  - Data Mining => PySpark
  - Server (Flask, Django)
- Analogy: Data => Analytics (biz intelligence, etc) => Adsense
- Other languages like Node, Go, Rust (forgot to mention) see [my answer](https://goo.gl/9d21xE) for why NOT to use them.
- Articles
  - [Best Programming Language for Machine Learning](http://machinelearningmastery.com/best-programming-language-for-machine-learning)
  - [Data Science Job Report 2017](http://r4stats.com/2017/02/28/r-passes-sas)
  
Frameworks
- ML libraries
  - Numpy, Pandas, scikit-learn
- Computational/symbolic graphs
  - Automatic differentiation
- Theano
  - Math layer
  - Blocks/Lasagne ML layer
  - Keras DL layer
- Torch
  - CNNs
  - note about RNNs
- TensorFlow
  - Perf over time
  - Mobile etc
  - Keras
- Others
  - Caffe (old-n-dying, C++)
  - CNTK (MS)
  - mxnet (Amazon)
  - DL4J
  - OpenCV (vision only)
- Articles
  - [An Overview of Python Deep Learning Frameworks](http://www.kdnuggets.com/2017/02/python-deep-learning-frameworks-overview.html)
  - [Evaluation of Deep Learning Toolkits](https://github.com/zer0n/deepframeworks/blob/master/README.md)
  - [Comparing Frameworks: Deeplearning4j, Torch, Theano, TensorFlow, Caffe, Paddle, MxNet, Keras & CNTK](https://deeplearning4j.org/compare-dl4j-torch7-pylearn) - grain of salt, it's super heavy DL4J propaganda (written by them)`
}
export default ep