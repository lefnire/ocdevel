import _ from "lodash";

export default _.mapValues({
  singularity_is_near: {
    t: "The Singularity Is Near",
    d: "Kurzweil isn't the inventor of the concept 'singularity', but he's certainly the most known name attached to it. This is the foundational book of the religion of futurology, and it's a blast whether you believe it or not. Worth reading regardless.",
    links: [{t: "Amazon", l: "http://amzn.to/2lzCqKk", p: "$"}],
    importance: "valuable",
    audioOption: true
  },

  superintelligence: {
    t: "Superintelligence",
    d: "Doom-and-gloom favorite of Musk, Gates, Hawking.",
    links: [{t: "Amazon", l: "http://amzn.to/2lzLcrL", p: "$"}],
    audioOption: true
  },

  machines_of_loving_grace: {
    t: `Machines of Loving Grace`,
    d: "AI History",
    links: [{t: "Amazon", l: "http://amzn.to/2kRcBWq", p: "$"}],
    audioOption: true
  },

  master_algorithm: {
    t: `The Master Algorithm`,
    d: 'Semi-technical overview of ML basics & main algorithms',
    links: [{t: "Amazon", l: "http://amzn.to/2kLOQjW", p: "$"}],
    difficulty: "medium",
    importance: "valuable",
    audioOption: true
  },

  feeling_of_life: {
    t: "The Feeling of Life Itself: Why Consciousness Is Widespread but Can't Be Computed",
    d: 'Discusses _Integrated Information Theory_ (IIT), very popular framework in consciousness theory.',
    links: [{t: "Amazon", l: "https://amzn.to/3au4KtQ", p: "$"}],
    difficulty: "easy",
    audioOption: true
  },

  society_of_mind: {
    t: "The Society of Mind",
    d: "About the composability and independent agency of the parts of your mind. Valuable for those interested in Panpsychism. By one of the founding fathers of AI, Marvin Minsky.",
    links: [{t: "Amazon", l: "https://amzn.to/3mC6umS", p: "$"}],
    difficulty: "medium",
    format: "book"
  }

}, v => ({
  format: "audiobook",
  topic: "fun",
  ...v
}))