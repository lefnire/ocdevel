import _ from 'lodash'
import {defaults} from './filters'
import podcasts from './podcasts'
import tgc from './tgc'
import fun from './fun'
import courses from './courses'
import videos from './videos'
import others from './others'
import books from './books'
import ocdevel from './ocdevel'

const TODO = {
  audio: {
    how_to_create_mind: `[How to Create a Mind](http://amzn.to/2tXLvUm) \`audio:easy\``,
    cs229: `(removed CS229 - very heavy chalkboard use lends poorly to audio)`,

  },
  other: {
    // nns_and_dl: `[Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) \`book:medium\` shorter online "book"`,
    kaggle: `[Kaggle.com](https://www.kaggle.com/)`,
    patreon: `[Patreon](https://www.patreon.com/machinelearningguide)`,
  }
}

const cards = _.mapValues({

}, v => ({
  card: true,
  topic: "tech",
  ...v
}))

export default _.mapValues({
  ...books,
  ...podcasts,
  ...tgc,
  ...fun,
  ...others,
  ...courses,
  ...videos,
  ...cards,
  ...ocdevel
}, (v, k) => ({
  id: k,
  ...defaults,
  ...v,
}))