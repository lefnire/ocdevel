const episodes = [{
  title: "1. Introduction",
  date: "2017-02-01",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-1.mp3",
    length: 11886227,
    duration: "12:34"
  },
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
- Languages and Frameworks: Python vs R vs Java vs C/C++ vs MATLAB, etc; TensorFlow vs Torch vs Theano vs Spark, etc`
}, {
  title: "2. What is AI / ML",
  date: "2017-02-09",
  guid: "129d0157-fbda-4cc6-aaae-1c96745c12c9",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-2-fixed.mp3",
    length: 29646598,
    duration: "32:05",
  },
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
  - [How to Create a Mind](http://amzn.to/2l2frtN) \`audio\`
  - ☞ [Philosophy of Mind: Brains, Consciousness, and Thinking Machines](http://amzn.to/2kQGgk5) \`audio\` My absolute favorite consciousness starter. Get the audio download & listen along-side this podcast!
  - [Consciousness Explained](http://amzn.to/2kXR2WI) \`audio\`
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
    length: 24924160,
    duration: "27:28"
  },
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
- "Linear Algebra Done Right"
- "All of statistics"
- (Not sure on Calc, comment if you know a good one)

The Great Courses \`audio\` highly recommend audio supplementary material 
- [Stats](https://goo.gl/sIBOjw)
- Calc [1](https://goo.gl/fcLP3l) [2](https://goo.gl/sBpljN) [3](https://goo.gl/8Hdwuh)
- ☞ [Mathematical Decision Making](https://goo.gl/V75I49) \`recommended\` basically an ML course ("Operations Research", a very similar field)
- Relevant others: 
  - [Game Theory](https://goo.gl/yEEOG1)
  - [Discrete Math](https://goo.gl/CBKCJE)
- Conversion Script: \`for f in *.mp4; do ffmpeg -i "$f" "\${f%.mp4}.mp3" && rm "$f"; done\`
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
  episodes: episodes
};

module.exports = podcast;