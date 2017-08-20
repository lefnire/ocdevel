const resources = {
  books: {
    qai: `[The Quest for Artificial Intelligence](http://amzn.to/2kRd4Ie) ([Free PDF?](http://ai.stanford.edu/~nilsson/QAI/qai.pdf)) \`book:hard\` AI history`,

    // Math
    linear_algebra: `[Linear Algebra Done Right](http://amzn.to/2t28p8F) \`book:hard\``,
    stats: `[All of statistics](http://amzn.to/2t2dOwg) \`book:hard\``,
    calc: `[Calculus](http://amzn.to/2tXfXhp) \`book:hard\``,

    dl_book: `[Deep Learning Book](http://amzn.to/2tXgCiT) ([Free HTML version](http://www.deeplearningbook.org/)) \`book:hard\` comprehensive DL bible; highly mathematical`,
    python: `[Python](http://amzn.to/2mVgtJW) \`book:medium\``,
    handson_tensorflow: `[Hands-On Machine Learning with Scikit-Learn and TensorFlow](http://amzn.to/2tVdIXN) \`book:medium\``,
    ml_with_r: `[Machine Learning with R](http://amzn.to/2n5fSUF) \`book:medium\``,
    elements_of_stat_learning: `[Elements of Statistical Learning](http://amzn.to/2tWW8He) \`book:hard\``,
    pattern_rec: `[Pattern Recognition and Machine Learning](http://amzn.to/2sDIIfb) ([Free PDF?](https://goo.gl/aX038j)) \`book:hard\``,
    speech_and_nlp: `[Speech and Language Processing](http://amzn.to/2uZaNyg) \`book:hard\` comprehensive classical-NLP bible`,
    nltk: `[NLTK Book](http://www.nltk.org/book) \`book:medium\``

  },
  courses: {
    // Ng
    ng: `[Coursera](https://www.coursera.org/learn/machine-learning) \`course:hard\``,
    ng_1: `[Andrew Ng's Machine Learning Coursera course](https://www.coursera.org/learn/machine-learning) \`course:hard\` No question, the most essential, important, recommended resource in my entire series _period_. Consider it required, not optional.`,
    ng_2: `You've started [Ng's Coursera course](https://www.coursera.org/learn/machine-learning), right? Riight?`,
    ng_wk_7: `[Andrew Ng Week 7](https://www.coursera.org/learn/machine-learning/resources/Es9Qo)`,
    ng_wk_8: `[Andrew Ng Week 8](https://www.coursera.org/learn/machine-learning/resources/kGWsY)`,
    ng_wk_9: `[Andrew Ng Week 9](https://www.coursera.org/learn/machine-learning/resources/szFCa)`,

    // Math
    linear_algebra: `Either [LinAlg](https://www.khanacademy.org/math/linear-algebra) \`course:medium\` OR [Fast.ai](http://www.fast.ai/2017/07/17/num-lin-alg/) \`course:medium\``,
    stats: `[Stats](https://www.khanacademy.org/math/statistics-probability) \`course:medium\``,
    calc: `[Calc](https://www.khanacademy.org/math/calculus-home) \`course:medium\``,

    fastai: `[Fast.ai](http://course.fast.ai/) \`course:medium\` practical DL for coders`,
    cs224n: `[Stanford cs224n: Deep NLP](https://www.youtube.com/playlist?list=PL3FW7Lu3i5Jsnh1rnUwq_TcylNr7EkRe6) \`course:medium\` (replaces cs224d)`
  },
  audio: {
    machines_of_loving_grace: `[Machines of Loving Grace](http://amzn.to/2kRcBWq) \`audio:easy\` AI history`,
    singularity_is_near: `[The Singularity Is Near](http://amzn.to/2lzCqKk) \`audio:easy\``,
    ttc_consciousness: `[Philosophy of Mind: Brains, Consciousness, and Thinking Machines](http://amzn.to/2kQGgk5) \`audio:easy\``,
    how_to_create_mind: `[How to Create a Mind](http://amzn.to/2tXLvUm) \`audio:easy\``,
    consciousness_explained: `[Consciousness Explained](http://amzn.to/2tXboUz) \`audio:easy\``,
    superintelligence: `[Superintelligence](http://amzn.to/2lzLcrL) \`audio:easy\` doom-and-gloom favorite of Musk, Gates, Hawking.`,
    master_algorithm: `[The Master Algorithm](http://amzn.to/2kLOQjW) \`audio:medium\` Semi-technical overview of ML basics & main algorithms`,

    // Math
    stats: `[Statistics](https://projects.iq.harvard.edu/stat110/youtube) \`audio|course:hard\``,
    calc: `Calculus [1](https://goo.gl/fcLP3l) [2](https://goo.gl/sBpljN) [3](https://goo.gl/8Hdwuh) \`course|audio:hard\``,
    math_decision_making: `[Mathematical Decision Making](https://goo.gl/V75I49) \`audio|course:hard\` course on "Operations Research", similar to ML`,
    info_theory: `[Information Theory](http://www.thegreatcourses.com/courses/the-science-of-information-from-language-to-black-holes.html) \`course|audio:hard\``,
    video_to_audio: `Convert video to audio:
  - mp4 => mp3: \`for f in *.mp4; do ffmpeg -i "$f" "\${f%.mp4}.mp3" && rm "$f"; done\`
  - youtube => mp3: setup [youtube-dl](https://github.com/rg3/youtube-dl) and run \`youtube-dl -x youtube.com/playlist?list=<EDIT THIS>\``,
    cs229: `(removed CS229 - very heavy chalkboard use lends poorly to audio)`,
    speech_and_nlp: `[Stanford NLP YouTube](https://www.youtube.com/playlist?list=PL6397E4B26D00A269) \`course|audio:medium\``,
    dl_episode: `[Deep Learning Resources](http://ocdevel.com/podcasts/machine-learning/9)`
  },
  other: {
    wikipedia_ai: `[Wikipedia:AI](https://en.wikipedia.org/wiki/Artificial_intelligence) \`article:easy\``,
    tour_ml_algos: `[Tour of Machine Learning Algorithms](http://machinelearningmastery.com/a-tour-of-machine-learning-algorithms) \`article:easy\``,
    degrees_convos: `Discussions: [1](http://canyon289.github.io/DSGuide.html#DSGuide) [2](https://news.ycombinator.com/item?id=13654127) [3](http://cole-maclean.github.io/blog/Self%20Taught%20AI/) [4](https://news.ycombinator.com/item?id=12516441)`,
    math_primer: `See "Section Notes" of [cs229](http://cs229.stanford.edu/materials.html) \`handout:medium\``,
    dl_simplified: `[Deep Learning Simplified](https://www.youtube.com/watch?v=b99UVkWzYTQ) \`video:easy\` quick series to get a lay-of-the-land.`,
    nns_and_dl: `[Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) \`book:medium\` shorter online "book"`,
    tensorflow_tuts: `[TensorFlow Tutorials](https://www.tensorflow.org/get_started/get_started) \`tutorial:medium\``,
    which_algo_to_use: `- Which algo to use?
  - [Pros/cons table for algos](https://blog.recast.ai/machine-learning-algorithms/2/) \`picture\`
  - [Decision tree of algos](http://scikit-learn.org/stable/tutorial/machine_learning_map/) \`picture\``,
    kaggle: `[Kaggle.com](https://www.kaggle.com/)`,
    patreon: `[Patreon](https://www.patreon.com/machinelearningguide)`,
    rnn_articles: `Overview Articles: 
  - [Unreasonable Effectiveness of RNNs](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) \`article:easy\`
  - [Deep Learning, NLP, and Representations](http://colah.github.io/posts/2014-07-NLP-RNNs-Representations/) \`article:medium\`
  - [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/) \`article:medium\``,
    tf_tuts_rnns: `[TensorFlow Tutorials](https://www.tensorflow.org/tutorials/word2vec) \`tutorial:medium\` (start at Word2Vec + next 2 pages)`
  }
};

const episodes = [{
  title: "1. Introduction",
  date: "2017-02-01",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-1.mp3",
    length: 11886227,
    duration: "12:34",
  },
  libsynEpisode: 5440758,
  guid: "a9bf6e09-aa7e-4126-9e36-22b152419c8f",
  teaser: "Introduction to the Machine Learning Guide",
  body:
`Who am I: [Tyler Renelle](https://www.linkedin.com/in/lefnire)

What is this podcast? 
- "Middle" level overview (deeper than a bird's eye view of machine learning; higher than math equations)
- No math/programming experience required

Who is it for
- Anyone curious about machine learning fundamentals
- Aspiring machine learning developers (maybe transitioning from web/mobile development)

Why audio?
- Supplementary content for commute/exercise/chores will help solidify your book/course-work

What it's not
- News and Interviews
  - [TWiML and AI](https://twimlai.com)
  - [O'Reilly Data Show](https://www.oreilly.com/topics/oreilly-data-show-podcast)
  - [Talking machines](http://www.thetalkingmachines.com/)
- Misc Topics
  - [Linear Digressions](http://lineardigressions.com/)
  - [Data Skeptic](https://dataskeptic.com/)
  - [Partially Derivative](http://partiallyderivative.com/)
- iTunesU issues
- [Learning machines 101](http://www.learningmachines101.com/)

Planned episodes
- What is AI/ML: definition, comparison, history
- Inspiration: automation, singularity, consciousness
- ML Intuition: learning basics (infer/error/train); supervised/unsupervised/reinforcement; applications
- Math overview: linear algebra, statistics, calculus
- Linear models: supervised (regression, classification); unsupervised
- Parts: regularization, performance evaluation, dimensionality reduction, etc
- Deep models: neural networks, recurrent neural networks (RNNs), convolutional neural networks (convnets/CNNs)
- Languages and Frameworks: Python vs R vs Java vs C/C++ vs MATLAB, etc; TensorFlow vs Torch vs Theano vs Spark, etc
`
}, {
  title: "2. What is AI / ML",
  date: "2017-02-09",
  guid: "129d0157-fbda-4cc6-aaae-1c96745c12c9",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-2-fixed.mp3",
    length: 29646598,
    duration: "32:05",
  },
  libsynEpisode: 5440757,
  teaser: "What is artificial intelligence and machine learning? What's the difference? How about compared to statistics and data science? AI history.",
  body:
`## Resources
- ${resources.other.wikipedia_ai}
- ${resources.books.qai}
- ${resources.audio.machines_of_loving_grace}

## Episode
What is AI?
- Simulate any intellectual task
- Goals
  - Search / planning (eg chess)
  - Reasoning / knowledge representation (eg Watson on Jeopardy)
  - Perception
  - Ability to move and manipulate objects
  - Natural language processing (communication)
  - Learning
- Applications
  - Autonomous vehicles (drones, self-driving cars)
  - Medical diagnosis
  - Creating art (such as poetry)
  - Proving mathematical theorems
  - Playing games (such as Chess or Go)
  - Search engines
  - Online assistants (such as Siri)
  - Image recognition in photographs
  - Spam filtering
  - Prediction of judicial decisions
  - Targeting online advertisements 
- When a technique -> mainstream, no longer AI: "AI effect"
  - Pre-programming
  - Weak AI vs Strong / AGI

What is ML?
- Pattern / Predict / Learn
- Versus AI
  - The "whole" (robotics, planning, etc)
  - Professional: ML more interesting, subsuming other fields; ML is starter
  - Conversation
    "AI when wow-ing or colloquial, ML when being professional. Like "coding" vs "software engineering""
- Versus Stats
- Versus DataScience: professionally; ansense vs analytics

History
- Greek mythology, Golums
- First attempt: Ramon Lull, 13th century
- Davinci's walking animals
- Descartes, Leibniz
- 1700s-1800s: Statistics & Mathematical decision making
  - Thomas Bayes: reasoning about the probability of events
  - George Boole: logical reasoning / binary algebra
  - Gottlob Frege: Propositional logic 
- 1832: Charles Babbage & Ada Byron / Lovelace: designed Analytical Engine (1832), programmable mechanical calculating machines
- 1936: Universal Turing Machine
  - Computing Machinery and Intelligence - explored AI!
- 1946: John von Neumann Universal Computing Machine
- 1943: Warren McCulloch & Walter Pitts: cogsci rep of neuron; Frank Rosemblatt uses to create Perceptron (-> neural networks by way of MLP)
- 50s-70s: "AI" coined @Dartmouth workshop 1956 - goal to simulate all aspects of intelligence. John McCarthy, Marvin Minksy, Arthur Samuel, Oliver Selfridge, Ray Solomonoff, Allen Newell, Herbert Simon
  - Newell & Simon: Hueristics -> Logic Theories, General Problem Solver
  - Slefridge: Computer Vision
  - NLP
  - Stanford Research Institute: Shakey
  - Feigenbaum: Expert systems
  - GOFAI / symbolism: operations research / management science; logic-based; knowledge-based / expert systems
- 70s: Lighthill report (James Lighthill), big promises -> AI Winter
- 90s: Data, Computation, Practical Application -> AI back (90s)
  - Connectionism optimizations: Geoffrey Hinton: 2006, optimized back propagation
- Bloomberg, 2015 was whopper for AI in industry
- AlphaGo & DeepMind
`
}, {
  title: "3. Inspiration",
  date: "2017-02-10",
  guid: "a0b24583-e253-492c-addc-ee0c0aeb1765",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-3.mp3",
    length: 16382362,
    duration: "17:41",
  },
  libsynEpisode: 5440756,
  teaser: "Why should you care about AI? Inspirational topics about economic revolution, the singularity, consciousness, and fear.",
  body:
`## Resources
- ${resources.audio.singularity_is_near}
- ${resources.audio.ttc_consciousness}
- ${resources.audio.superintelligence}

## Episode
Economics / Automation
- Mental automation (Tax prep; x-rays, surgeons; cars; law; programmers, designers, logos; music, art)
- [Is your job safe?](http://www.bbc.com/news/technology-34066941)
- Universal basic income

Singularity (AGI; Singularity; Next stage of evolution)

Consciousness (Functionalism / Computational Theory of Mind / Simulations)

The Scare
- Superintelligence by Nick Bostrom
- Bill Gates, Stephen Hawking, Elon Musk ^`
  // removed audio.consciousness_explained & audio.how_to_create_mind
}, {
  title: "4. Algorithms - Intuition",
  date: "2017-02-12",
  guid: "a7d9b86e-d3aa-4384-a854-792bfcf36e24",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-4.mp3",
    length: 20773676,
    duration: "21:54"
  },
  libsynEpisode: 5440755,
  teaser: "Overview of machine learning algorithms. Infer/predict -> error/loss -> train/learn. Supervised, unsupervised, reinforcement learning.",
  body:
`## Resources
- ${resources.other.tour_ml_algos} 
- ${resources.audio.master_algorithm} 

## Episode
Learning (ML)
- 3-step process
  - Infer / Predict
  - Error / Loss
  - Train / Learn
- First as batch from spreadsheet, then "online" going forward
  - Pre-train your "model"
  - "Examples"
  - "Weights"
- Housing cost example
  - "Features"
  - Infer cost based on num_rooms, sq_foot, etc
  - Error / Loss function 

Categories
- Supervised learning
  - Vision (CNN)
  - Speech (RNN)
- Unsupervised
  - Market segmentation
- Reinforcement & Semi-Supervised
  - Planning (DQN): Games (chess, Mario); Robot movement`
}, {
  title: "5. Linear Regression",
  date: "2017-02-16",
  guid: "2d2e66dd-d100-4e05-afba-a948de1c956d",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-5.mp3",
    length: 30769356,
    duration: "33:40"
  },
  libsynEpisode: 5440754,
  teaser: "Introduction to the first machine-learning algorithm, the 'hello world' of supervised learning - Linear Regression",
  body:
`## Resources
- ${resources.courses.ng_1} 

## Episode
See [Andrew Ng Week 2 Lecture Notes](https://www.coursera.org/learn/machine-learning/resources/QQx8l)
`
}, {
  title: "6. Certificates & Degrees",
  date: "2017-02-17",
  guid: "a8bd671f-100f-42ff-a68a-cff7763298f6",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-6.mp3",
    length: 14888861,
    duration: "15:36"
  },
  libsynEpisode: 5440753,
  teaser: "Discussion on certificates and degrees from Udacity to a Masters degree.",
  body:
`## Resources
- ${resources.other.degrees_convos}

## Episode
Self-edify
- Coursera Specialization - flat $500
- Udacity Nanodegree - $200/m (discount if timely completion)
  - Great for self-teaching, not recognized degree
  - [Machine Learning](https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009)
  - [Self Driving Car](https://www.udacity.com/drive)
  - [Artificial Intelligence](https://www.udacity.com/ai)

[OMSCS](https://www.omscs.gatech.edu/): Great & cheap online masters degree

Portfolio: Most important for getting a job`
}, {
  title: "7. Logistic Regression",
  date: "2017-02-19",
  guid: "36b6133d-3018-4be0-a36c-61904aa80a1a",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-7.mp3",
    length: 30495267,
    duration: "34:19"
  },
  libsynEpisode: 5440752,
  teaser: "Your first classifier: Logistic Regression. That plus Linear Regression, and you're a 101 supervised learner!",
  body:
`## Resources
${resources.courses.ng_2}

## Episode
See [Andrew Ng Week 3 Lecture Notes](https://www.coursera.org/learn/machine-learning/resources/Zi29t)`
}, {
  title: "8. Math",
  date: "2017-02-23",
  guid: "a5c01d38-5242-4b63-b265-81fc53d38ad3",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-8.mp3",
    length: 24852040,
    duration: "27:23"
  },
  libsynEpisode: 5440751,
  teaser: "Introduction to the branches of mathematics used in machine learning. Linear algebra, statistics, calculus.",
  body:
`## Resources
Come back here after you've finished Ng's course; or learn these resources in tandem with ML (say 1 day a week).

Primers (PDFs)
- ${resources.other.math_primer}

KhanAcademy: 
- ${resources.courses.linear_algebra}
- ${resources.courses.stats}
- ${resources.courses.calc}

Books
- ${resources.books.linear_algebra}
- ${resources.books.stats}
- ${resources.books.calc}

Audio (supplementary material)
- ${resources.audio.stats} 
- ${resources.audio.calc}
- ${resources.audio.math_decision_making}
- ${resources.audio.info_theory}
- ${resources.audio.video_to_audio}

## Episode
- Linear Algebra = Matrix (or "Tensor") math. Wx + b. Chopping in our analogy.
- Stats = Probability/inference, the heart of machine learning. Recipes/cookbook.
- Calculus = Learning. Moving our error dot to the bottom of the valley. Baking, the actual "cook" step.`
}, {
  title: "9. Deep Learning",
  date: "2017-03-04",
  guid: "d842fe61-7cf2-4209-9cb3-d29be6c4d1a8",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-9.mp3",
    length: 45855231,
    duration: "51:09"
  },
  libsynEpisode: 5440749,
  teaser: "Deep learning and neural networks. How to stack our logisitic regression units into a multi-layer perceptron.",
  body:
`## Resources
- Overview: 
  - ${resources.other.dl_simplified}
- Quickstart:
  - ${resources.other.tensorflow_tuts}
- Deep-dive code (pick one):
  - ${resources.courses.fastai}
  - ${resources.books.handson_tensorflow}
- Deep-dive theory (pick one):
  - ${resources.books.dl_book}  
  - ${resources.other.nns_and_dl}

## Episode
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
}, {
  title: "10. Languages & Frameworks",
  date: "2017-03-07",
  guid: "c613d746-0916-448e-8315-5ac4323389e2",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-10.mp3",
    length: 39407399,
    duration: "44:17"
  },
  libsynEpisode: 5440748,
  teaser: "Languages & frameworks comparison. Languages: Python, R, MATLAB/Octave, Julia, Java/Scala, C/C++. Frameworks: Hadoop/Spark, Deeplearning4J, Theano, Torch, TensorFlow.",
  body:
`## Resources
- ${resources.books.python}
- ${resources.other.tensorflow_tuts}
- ${resources.books.handson_tensorflow}

## Episode
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
}, {
  title: '11. Checkpoint',
  date: "2017-03-08",
  guid: "fe205bbc-b9d4-4df5-b840-c6f5b728903f",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-11.mp3",
    length: 6946229,
    duration: "7:45"
  },
  libsynEpisode: 5440747,
  teaser: "Checkpoint - start learning the material offline!",
  body:
`45m/d ML
- ${resources.courses.ng}
- ${resources.books.python}
- ${resources.audio.dl_episode}

15m/d Math (KhanAcademy)
- ${resources.courses.linear_algebra}
- ${resources.courses.stats}
- ${resources.courses.calc}

Audio
- ${resources.audio.master_algorithm}
- ${resources.audio.math_decision_making}
- ${resources.audio.stats}
- ${resources.audio.calc}
- ${resources.audio.video_to_audio}
`
}, {
  title: "12. Shallow Algos 1",
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
- Gradient Boost`}, {
  title: "13. Shallow Algos 2",
  date: "2017-04-09",
  guid: "af4c231e-c8c1-4d91-ab21-2e256669982e",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-13.mp3",
    length: 51788056,
    duration: "55:12"
  },
  libsynEpisode: 5440745,
  teaser: "Speed run of Support Vector Machines (SVMs) and Naive Bayes Classifier.",
  body:
`## Resources
- ${resources.courses.ng_wk_7}
- ${resources.books.ml_with_r}
- ${resources.audio.math_decision_making}
${resources.other.which_algo_to_use}

## Episode
- Support Vector Machines (SVM)
- Naive Bayes Classifier`
}, {
  title: "14. Shallow Algos 3",
  date: "2017-04-23",
  guid: "8ec3010c-8897-43fa-b90b-14f7e43912a8",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-14.mp3",
    length: 45705749,
    duration: "48:06"
  },
  libsynEpisode: 5440744,
  teaser: "Speed run of Anomaly Detection, Recommenders(Content Filtering vs Collaborative Filtering), and Markov Chain Monte Carlo (MCMC)",
  body:
`## Resources
- ${resources.courses.ng_wk_9}

## Episode
- Anomoly Detection algorithm
- Recommender Systems (Content Filtering, Collaborative Filtering)
- Markov Chains & Monte Carlo`
}, {
  title: "15. Performance",
  date: "2017-05-07",
  guid: "7da253aa-b035-4702-8475-55b8d3eeeebd",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-15.mp3",
    length: 37982381 ,
    duration: "41:24"
  },
  libsynEpisode: 5440743,
  teaser: "Performance evaluation & improvement",
  body:
`## Episode

Performance evaluation

- Performance measures: accuracy, precision, recall, F1/F2 score
- Cross validation: split your data into train, validation, test sets
- Training set is for training your algorithm
- Validation set is to test your algorithm's performance. It can be used to inform changing your model (ie, hyperparameters)
- Test set is used for your final score. It can't be used to inform changing your model.

Performance improvement
 
- Modify hyperpamaraters
- Data: collect more, fill in missing cells, normalize fields
- Regularize: reduce overfitting (high variance) and underfitting (high bias)
`}, {
  title: "16. Consciousness",
  date: "2017-05-21",
  guid: "c2db5df8-936b-4404-8f0f-7eb188bfe9ab",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-16.mp3",
    length: 69807705,
    duration: "01:14:57"
  },
  libsynEpisode: 5440742,
  teaser: "Can AI be conscious?",
  body:
`## Resources

${resources.audio.ttc_consciousness}

## Episode

Inspirations for AI
- economic automation
- singularity
- consciousness

Definitinitions
- cogsci: neuroscience, neuro-x(biology, physiology, computational __, etc), psychology, philosophy, AI
  - computational neuroscience => perceptron
  - frank rosenblatt, warren McCulloche, walter pitts - all brain guys (neurobiology, neurophysiology, computational neuroscience respectively)
- intelligence (computation) vs consciousness (soul); intelligence in scale (animals); brain in scale; consciousness in scale?
- perception, self-identity, memory, attention; (self reflection is just a human-special component)
- awereness (qualia / sentience / subjective experience); modified by attention? (driving, dreams, coma)
- missing: emotions; just built-in goal reinforcemer. plus we don't know how machines experience reinforcement (floor-is-lava)

Hard vs soft problem
  - soft problem = neuroscience
  - hard problem = philosophy
    - dualism: pineal gland, issue with physical->metaphysical; society of mind / connected intelligences
    - maybe definitively non-science, since subjective
    - maybe matter of time; phil is pre-science at each juncture; science turns magic => known (sickness). Either hard problem is unscientific (phil) or around the corner

Emergence (emergent property)

Computational theory of mind
- intelligence & consciousness connected / same
- think: word2vec = understanding? 
- consciousness in scale; does this mean every layer has its own consciousness? Panpsychism. I don't know - just concerned with that which does exhibit intelligence
- integrated information theory
- freewill; conscious / awareness center activated after decision made; all the information in place before whole ; westworld

Biological plausibility
- planes, brains
- sans bio-plaus, functionalism; zombies; turing test; searle's chinese room`}, {
  title: '17. Checkpoint',
  date: "2017-06-04",
  guid: "4977e285-d4fc-45cb-b3a5-aed9e97915c2",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-17.mp3",
    length: 6625180,
    duration: "6:59"
  },
  libsynEpisode: 5440741,
  teaser: "Checkpoint - learn the material offline!",
  body:
`45m/d ML
- ${resources.courses.ng}
- ${resources.books.python}
- ${resources.audio.dl_episode}
- Go deeper on shallow algos
  - ${resources.books.elements_of_stat_learning}
  - ${resources.books.pattern_rec}

15m/d Math
- ${resources.courses.linear_algebra}
- ${resources.courses.stats}
- ${resources.courses.calc}

Audio
- ${resources.audio.cs229}
- ${resources.audio.master_algorithm}
- ${resources.audio.math_decision_making}
- ${resources.audio.stats}
- ${resources.audio.calc}
- ${resources.audio.video_to_audio}

${resources.other.kaggle}
`
}, {
  title: '18. Natural Language Processing 1',
  date: "2017-06-25",
  guid: "d8ebdbe6640d0d34f12778f90b91db8d",
  file: {},
  libsynEpisode: 5479957,
  teaser: 'Introduction to Natural Language Processing (NLP) topics.',
  body:
`## Resources
- ${resources.books.speech_and_nlp}
- ${resources.audio.speech_and_nlp}
- ${resources.books.nltk}
- ${resources.audio.video_to_audio}

## Errata
22:21 "cat & car different by one word" should be "different by one letter"

## Episode
Syntax vs Semantics

Parts
- Corpus
- Lexicon
- Morphology
  - Lemmas & Stems (reduce morphological variation; lemmatization more sophisticated)
  - Tokens
  - Stop words
  - Edit-distance
  - Word sense disambiguation

Syntax / Tasks
- Info Extraction (POS, NER, Relationship extraction)
- Parsing

Goals
- Spell check
- Classification
  - Tagging (topic modeling / keyword extraction)
  - Sentiment analysis
- Search / relevance, document similarity
- Natural language understanding
  - Question answering
  - Textual entailment
  - Machine Translation (AI-complete)
  - NLU vs NLP
- Natural language generation
  - Image captioning
  - Chatbots
  - Automatic summarization
- Won't cover
  - Optical character recognition (OCR)
  - Speech (TTS, STT, Segmentation, Diarization)`
}, {
  title: '19. Natural Language Processing 2',
  date: "2017-07-10",
  guid: "e05e640ba2f99105f52c4eef0c5cabfb",
  file: {},
  libsynEpisode: 5525243,
  teaser: 'Natural Language Processing classical/shallow algorithms.',
  body:
`## Resources
- ${resources.books.speech_and_nlp}
- ${resources.audio.speech_and_nlp}
- ${resources.books.nltk}
- ${resources.audio.video_to_audio}

## Episode

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
}, {
  title: '20. Natural Language Processing 3',
  date: "2017-07-23",
  guid: "556b3779a8f8546de9457002a19e63b2",
  file: {},
  libsynEpisode: 5566766,
  teaser: 'Natural Language Processing classical/shallow algorithms.',
  body:
`## Resources
- ${resources.books.speech_and_nlp}
- ${resources.audio.speech_and_nlp}
- ${resources.books.nltk}
- ${resources.audio.video_to_audio}

## Episode
- Parsing
  - Constituents
  - Grammar: Context Free Grammars (CFGs), Probabalistic CFGs (PCFGs), Cocke–Younger–Kasami (CYK)
  - Dependency Tree: Greedy transition-based parsing (stack/buffer)
  - SyntaxNet (English = Parsey McParseface)
- Relationship Extraction
- Question Answering / Textual Entailment (TF-IDF+Cosine Similarity; Parsing; NER)
- Automatic summarization (TF-IDF; TextRank)
- Machine Translation ([details here](https://www.youtube.com/watch?v=QuELiw8tbx8&list=PL3FW7Lu3i5Jsnh1rnUwq_TcylNr7EkRe6&index=9))`
}, {
  title: '21. Update',
  date: "2017-07-27",
  guid: "30566e73f0346fd82c174e2931a39a97",
  file: {},
  libsynEpisode: 5585790,
  teaser: 'Update on Patreon and resources.',
  body: `Keep the podcast alive, donate on [Patreon](https://www.patreon.com/machinelearningguide)`
}, {
  title: '22. Deep NLP 1',
  date: "2017-07-28",
  guid: "d9e15cfe501a8f0c6e3c075c09f7e682",
  file: {},
  libsynEpisode: 5589161,
  teaser: 'Recurrent Neural Networks (RNNs) and Word2Vec.',
  body: `## Resources
- ${resources.other.rnn_articles}
- ${resources.courses.cs224n}
- ${resources.other.tf_tuts_rnns}
- ${resources.audio.dl_episode}


## Episode

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
}, {
  title: '23. Deep NLP 2',
  date: "2017-08-20",
  guid: "1346120e3e578b15c8f34b31bc21ef78",
  file: {},
  libsynEpisode: 5660423,
  teaser: 'RNN review, bi-directional RNNs, LSTM & GRU cells.',
  body: `## Resources
- ${resources.other.rnn_articles}
- ${resources.courses.cs224n}
- ${resources.other.tf_tuts_rnns}
- The usual DL resources (pick one):
  - ${resources.books.dl_book}
  - ${resources.courses.fastai}
  - ${resources.other.nns_and_dl}


## Episode

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
}];

const podcast = {
  title: "Machine Learning Guide",
  link: "http://ocdevel.com/podcasts/machine-learning",
  feed: "http://ocdevel.com/files/podcasts/machine-learning/feed.xml",
  keywords: "machine,learning,ml,introduction,artificial,intelligence,ai",
  image: "http://ocdevel.com/files/podcasts/machine-learning/art.jpg",
  date: new Date('02/01/2017'),
  teaser: "Introduction and intuition on machine learning principles, algorithms, and math. Your 'start here' ML resource.",
  body: "This series aims to teach you the high level fundamentals of machine learning from A to Z. I'll teach you the basic intuition, algorithms, and math. We'll discuss languages and frameworks, deep learning, and more. Audio may be an inferior medium to task; but with all our exercise, commute, and chores hours of the day, not having an audio supplementary education would be a missed opportunity. And where your other resources will provide you the machine learning trees, I’ll provide the forest. Additionally, consider me your syllabus. At the end of every episode I’ll provide the best-of-the-best resources curated from around the web for you to learn each episode’s details.",
  episodes: episodes,
  useLibsynPlayer: true // false will use html5 player w/ CloudFront file URL
};

module.exports = podcast;