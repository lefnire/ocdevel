import _ from "lodash";

export default _.mapValues({
  tgc_ml: {
    t: "TGC Machine Learning",
    d: "Video overview of ML basics, highly amenable to audio-only listening. It's rapid-pace, covering a lot of ground in relatively little time. I recommend this be your very first resource, since it will give you an overview of everything. It covers fresh (2020) material like GANs and RL; and material not often covered in ML-basics resources like Andrew Ng (things like Bayesian methods). Watch or listen to this before anything, don't worry if it didn't stick - it's just the overview. _Then_ begin your journey.",
    links: [{t: "TGC", p: "$$", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=9070&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fintroduction-to-machine-learning&intsrc=PUI1_1204"}],
    topic: "basics"
  },

  tgc_consciousness: {
    t: "TGC Philosophy of Mind: Brains, Consciousness, and Thinking Machines",
    links: [
      {t: "Amazon", l: "https://amzn.to/38GHt5n", p: "$"},
      {t: "TGC", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=4278&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fphilosophy-of-mind-brains-consciousness-and-thinking-machines&intsrc=PUI1_1204", p: "$$"},
    ],
    topic: "fun",
    format: "audiobook",
    difficulty: "easy",
    importance: "valuable"
  },

  tgc_mind_body: {
    t: "TGC Mind-Body Philosophy",
    links: [
      {t: "Amazon", l: "https://amzn.to/2WWYliy", p: "$"},
      {t: "TGC", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=4932&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fmind-body-philosophy&intsrc=PUI1_1204", p: "$$"},
    ],
    topic: "fun",
    format: "audiobook",
    difficulty: "easy",
  },

  tgc_stats: {
    t: `TGC Statistics & Probability`,
    links: [
      {t: "Learning Statistics: Concepts and Applications in R", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1480&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Flearning-statistics-concepts-and-applications-in-r&intsrc=PUI1_1204", p: "$$"},
      {t: "What Are the Chances? Probability Made Clear", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1474&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fwhat-are-the-chances-probability-made-clear&intsrc=PUI1_1204", p: "$$"},
    ],
    topic: "math"
  },

  tgc_calc: {
    t: "TGC Calculus",
    links: [
      // change in motion calc made
      {t: "Calc 1 - Understanding Calculus: Problems, Solutions, and Tips", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1007&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Funderstanding-calculus-problems-solutions-and-tips&intsrc=PUI1_1204", p: "$$"},
      {t: "Calc 2 - Understanding Calculus II: Problems, Solutions, and Tips", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1018&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Funderstanding-calculus-ii-problems-solutions-and-tips&intsrc=PUI1_1204", p: "$$"},
      {t: "Calc 3 - Understanding Multivariable Calculus: Problems, Solutions, and Tips", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1023&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Funderstanding-multivariable-calculus-problems-solutions-and-tips&intsrc=PUI1_1204", p: "$$"}
    ],
    topic: "math"
  },

  tgc_math_decision_making: {
    t: "TGC Mathematical Decision Making",
    d: "Course on \"Operations Research\", similar to ML",
    links: [{t: "Mathematical Decision Making: Predictive Models and Optimization", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1342&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fmathematical-optimization-techniques&intsrc=PUI1_1204"}],
    topic: "basics"
  },

  tgc_info_theory: {
    t: "TGC Information Theory",
    links: [{t: "The Science of Information: From Language to Black Holes", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1301&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fthe-science-of-information-from-language-to-black-holes&intsrc=PUI1_1204", p: "$$"}],
    topic: "math"
  },

  tgc_linear_algebra: {
    t: "TGC - Mastering Linear Algebra: An Introduction with Applications 1056",
    links: [{t: "TGC", p: "$$", l: "https://thegreatcourses.7eer.net/c/358692/167386/2997?prodsku=1056&u=https%3A%2F%2Fwww.thegreatcourses.com%2Fcourses%2Fmastering-linear-algebra-an-introduction-to-applications&intsrc=PUI1_1204"}],
    topic: "math"
  }

}, v => ({
  tgc: true,
  difficulty: "hard",
  format: "video",
  video2audio: "good",
  importance: "essential",
  audioOption: true,
  ...v
}))