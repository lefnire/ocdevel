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
- Anyone curious about machine learning fundamentals (coming from /r/singularity, futurology, learningmachinelearning, etc)
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
`## Episode
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
    
## Resources
- [Wikipedia:AI](https://en.wikipedia.org/wiki/Artificial_intelligence) \`article\`
- Brief history: [1](https://ai100.stanford.edu/2016-report/appendix-i-short-history-ai) [2](http://aitopics.org/misc/brief-history) \`article\`
- ☞ [The Quest for Artificial Intelligence](http://amzn.to/2kRd4Ie) \`book\` Exhaustive book on AI history. [Free PDF?](http://ai.stanford.edu/~nilsson/QAI/qai.pdf)  
- [Machines of Loving Grace](http://amzn.to/2kRcBWq) \`audio\` Shorter version if the above is too much to chew
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
`## Episode
Economics / Automation
- Mental automation (Tax prep; x-rays, surgeons; cars; law; programmers, designers, logos; music, art)
- [Is your job safe?](http://www.bbc.com/news/technology-34066941)
- Universal basic income

Singularity (AGI; Singularity; Next stage of evolution)

Consciousness (Functionalism / Computational Theory of Mind / Simulations)

The Scare
- Superintelligence by Nick Bostrom
- Bill Gates, Stephen Hawking, Elon Musk ^
  
## Resources
- [The Singularity Is Near](http://amzn.to/2lzCqKk) \`audio\`
- Consciousness
  - [How to Create a Mind](http://amzn.to/2tXLvUm) \`audio\`
  - ☞ [Philosophy of Mind: Brains, Consciousness, and Thinking Machines](http://amzn.to/2kQGgk5) \`audio\` My absolute favorite consciousness starter. Get the audio download & listen along-side this podcast!
  - [Consciousness Explained](http://amzn.to/2tXboUz) \`audio\`
- [Superintelligence](http://amzn.to/2lzLcrL) \`audio\`
  I personally think this book is BS, but the great minds (Musk, Gates, Hawking) loved it - so it's kinda "must read"
`
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
`## Episode
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
  - Planning (DQN): Games (chess, Mario); Robot movement
  
## Resources
- [Tour of Machine Learning Algorithms](http://machinelearningmastery.com/a-tour-of-machine-learning-algorithms) \`article\` 
- [The Master Algorithm](http://amzn.to/2kLOQjW) \`audio\` Semi-technical overview of ML basics & main algorithms 
`
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
`## Episode
See [Andrew Ng Week 2 Lecture Notes](https://www.coursera.org/learn/machine-learning/resources/QQx8l)

## Resources
- ☞ [Andrew Ng's Machine Learning Coursera course](https://www.coursera.org/learn/machine-learning) \`mooc\`
  No question about it, this is the most essential, important, recommended resource in my entire series _period_. Consider it required, not optional. 
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
`## Episode
Self-edify
- Coursera Specialization - flat $500
- Udacity Nanodegree - $200/m (discount if timely completion)
  - Great for self-teaching, not recognized degree
  - [Machine Learning](https://www.udacity.com/course/machine-learning-engineer-nanodegree--nd009)
  - [Self Driving Car](https://www.udacity.com/drive)
  - [Artificial Intelligence](https://www.udacity.com/ai)

[OMSCS](https://www.omscs.gatech.edu/): Great & cheap online masters degree

Portfolio: Most important for getting a job

## Resources
- Discussions: [1](http://canyon289.github.io/DSGuide.html#DSGuide) [2](https://news.ycombinator.com/item?id=13654127) [3](http://cole-maclean.github.io/blog/Self%20Taught%20AI/) [4](https://news.ycombinator.com/item?id=12516441)
`
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
`## Episode
See [Andrew Ng Week 3 Lecture Notes](https://www.coursera.org/learn/machine-learning/resources/Zi29t)

## Resources
You've started [Ng's Coursera course](https://www.coursera.org/learn/machine-learning), right? Riight?
`
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
`## Episode
- Linear Algebra = Matrix (or "Tensor") math. Wx + b. Chopping in our analogy.
- Stats = Probability/inference, the heart of machine learning. Recipes/cookbook.
- Calculus = Learning. Moving our error dot to the bottom of the valley. Baking, the actual "cook" step.

## Resources
Come back here after you've finished Ng's course; or learn these resources in tandem with ML (say 1 day a week).

☞ KhanAcademy: 
- [LinAlg](https://www.khanacademy.org/math/linear-algebra)
- [Stats](https://www.khanacademy.org/math/statistics-probability)
- [Calc](https://www.khanacademy.org/math/calculus-home)

Primers (PDFs)
- See "Section Notes" of [cs229](http://cs229.stanford.edu/materials.html)

Books
- [Linear Algebra Done Right](http://amzn.to/2t28p8F)
- [All of statistics](http://amzn.to/2t2dOwg)
- [Calculus](http://amzn.to/2tXfXhp)

The Great Courses \`audio\` highly recommend audio supplementary material 
- [Stats](https://goo.gl/sIBOjw)
- Calc [1](https://goo.gl/fcLP3l) [2](https://goo.gl/sBpljN) [3](https://goo.gl/8Hdwuh)
- ☞ [Mathematical Decision Making](https://goo.gl/V75I49) \`recommended\` basically an ML course ("Operations Research", a very similar field)
- Relevant others: 
  - [Game Theory](https://goo.gl/yEEOG1)
  - [Discrete Math](https://goo.gl/CBKCJE)
- Conversion Script: \`for f in *.mp4; do ffmpeg -i "$f" "\${f%.mp4}.mp3" && rm "$f"; done\`
`
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
`## Episode
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
  - Relu, TanH
  
## Resources
- [Deep Learning Simplified](https://www.youtube.com/watch?v=b99UVkWzYTQ) \`video\` quick series to get a lay-of-the-land. 
- ☞ [Deep Learning Book](http://amzn.to/2tXgCiT) \`book\` [Free HTML version](http://www.deeplearningbook.org/)
- You'll also see [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) recommended, but DL Book is more thorough and updated.
`
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
`## Episode
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
  - [Comparing Frameworks: Deeplearning4j, Torch, Theano, TensorFlow, Caffe, Paddle, MxNet, Keras & CNTK](https://deeplearning4j.org/compare-dl4j-torch7-pylearn) - grain of salt, it's super heavy DL4J propaganda (written by them)
  
## Resources
- [Python](http://amzn.to/2mVgtJW)
- [TensorFlow Tutorials](https://www.tensorflow.org/get_started/get_started)
`
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
`## Resources
45m/d ML
- [Coursera](https://www.coursera.org/learn/machine-learning) \`course\`
- [Deep Learning Book](http://amzn.to/2tXgCiT)\`book\` [Free HTML version](http://www.deeplearningbook.org/)
- [Python](http://amzn.to/2mVgtJW) \`book\`
- [TensorFlow](https://www.tensorflow.org/get_started/get_started) \`tutorial\`

15m/d Math (KhanAcademy)
- [LinAlg](https://www.khanacademy.org/math/linear-algebra) \`course\`
- [Stats](https://www.khanacademy.org/math/statistics-probability) \`course\`
- [Calc](https://www.khanacademy.org/math/calculus-home) \`course\`

Audio
- (Very optional) 
  - [Philosophy of Mind: Brains, Consciousness, and Thinking Machines](http://amzn.to/2kQGgk5)
  - [The Singularity Is Near](http://amzn.to/2lzCqKk)
- [The Master Algorithm](http://amzn.to/2kLOQjW)
- [Mathematical Decision Making](https://goo.gl/V75I49)
- Statistics [1](https://goo.gl/sIBOjw) [2](https://goo.gl/b15Aug)
- Calculus [1](https://goo.gl/fcLP3l) [2](https://goo.gl/sBpljN) [3](https://goo.gl/8Hdwuh)
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
`## Episode
KNN (supervised)

Unsupervised
- Clustering -> K-Means
- Association rule learning / Market basket -> Apriori
- Dimensionality Reduction -> PCA

Decision Trees (supervised, classify/regress)
- Random Forests
- Gradient Boost
  
## Resources
- [Andrew Ng Week 8](https://www.coursera.org/learn/machine-learning/resources/kGWsY)
- [Tour of ML Algos](http://machinelearningmastery.com/a-tour-of-machine-learning-algorithms/) \`article\`
- [Decision Tree of algos](http://scikit-learn.org/stable/tutorial/machine_learning_map/) \`article\`
- [Elements of Statistical Learning](http://amzn.to/2tWW8He) \`book\`
- [Pattern Recognition and Machine Learning](http://amzn.to/2sDIIfb) \`book\` [Free PDF](https://goo.gl/aX038j)
- [Machine Learning with R](http://amzn.to/2n5fSUF)
`}, {
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
`## Episode
- Support Vector Machines (SVM)
- Naive Bayes Classifier

## Resources
- [Andrew Ng Week 7](https://www.coursera.org/learn/machine-learning/resources/Es9Qo)
- [Machine Learning with R](http://amzn.to/2n5fSUF)
- [Mathematical Decision Making](https://goo.gl/V75I49)
- Which algo to use?
  - [Pros/cons table for algos](https://blog.recast.ai/machine-learning-algorithms/2/)
  - [Decision tree of algos](http://scikit-learn.org/stable/tutorial/machine_learning_map/) \`article\`
`
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
`## Episode
- Anomoly Detection algorithm
- Recommender Systems (Content Filtering, Collaborative Filtering)
- Markov Chains & Monte Carlo

## Resources
- [Andrew Ng Week 9](https://www.coursera.org/learn/machine-learning/resources/szFCa)`
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
`## Episode

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
- sans bio-plaus, functionalism; zombies; turing test; searle's chinese room

# Resources

[Philosophy of Mind: Brains, Consciousness, and Thinking Machines](http://amzn.to/2kQGgk5) \`audio\`
`}, {
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
`## Resources
45m/d ML
- [Coursera](https://www.coursera.org/learn/machine-learning) \`course\` (last time mentioning)
- [Python](http://amzn.to/2mVgtJW) \`book\`
- [TensorFlow](https://www.tensorflow.org/get_started/get_started) \`tutorial\`
- [Deep Learning Book](http://amzn.to/2tXgCiT)\`book\` [Free HTML version](http://www.deeplearningbook.org/)
- Go deeper on shallow algos
  - [Elements of Statistical Learning](http://amzn.to/2tWW8He) \`book\`
  - [Pattern Recognition and Machine Learning](http://amzn.to/2sDIIfb) \`book\` [Free PDF](https://goo.gl/aX038j)

15m/d Math (KhanAcademy) \`courses\`
- [LinAlg](https://www.khanacademy.org/math/linear-algebra)
- [Stats](https://www.khanacademy.org/math/statistics-probability)
- [Calc](https://www.khanacademy.org/math/calculus-home)

Audio
- [CS229 - Machine Learning](https://see.stanford.edu/Course/CS229)
- [The Master Algorithm](http://amzn.to/2kLOQjW)
- [Mathematical Decision Making](https://goo.gl/V75I49)
- Statistics [1](https://goo.gl/sIBOjw) [2](https://goo.gl/b15Aug)
- Calculus [1](https://goo.gl/fcLP3l) [2](https://goo.gl/sBpljN) [3](https://goo.gl/8Hdwuh)

[Kaggle.com](https://www.kaggle.com/)
`
}, {
  title: '18. Natural Language Processing 1',
  date: "2017-06-25",
  guid: "d8ebdbe6640d0d34f12778f90b91db8d",
  file: {},
  libsynEpisode: 5479957,
  teaser: 'Introduction to Natural Language Processing (NLP) topics.',
  body:
`## Errata
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
  - Speech (TTS, STT, Segmentation, Diarization)

## Resources
- [Speech and Language Processing](http://amzn.to/2uZaNyg)
- [Stanford NLP YouTube](https://www.youtube.com/playlist?list=PL6397E4B26D00A269)
  - Setup [youtube-dl](https://github.com/rg3/youtube-dl) and run \`youtube-dl -x --audio-format mp3 https://www.youtube.com/playlist?list=PL6397E4B26D00A269\`
- [NLTK Book](http://www.nltk.org/book)
`
}, {
  title: '19. Natural Language Processing 2',
  date: "2017-07-10",
  guid: "e05e640ba2f99105f52c4eef0c5cabfb",
  file: {},
  libsynEpisode: 5525243,
  teaser: 'Natural Language Processing classical/shallow algorithms.',
  body:
`## Episode

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
- Similarity: Jaccard, Cosine, Euclidean

## Resources
- [Speech and Language Processing](http://amzn.to/2uZaNyg)
- [Stanford NLP YouTube](https://www.youtube.com/playlist?list=PL6397E4B26D00A269)
  - Setup [youtube-dl](https://github.com/rg3/youtube-dl) and run \`youtube-dl -x --audio-format mp3 https://www.youtube.com/playlist?list=PL6397E4B26D00A269\`
- [NLTK Book](http://www.nltk.org/book)
`
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