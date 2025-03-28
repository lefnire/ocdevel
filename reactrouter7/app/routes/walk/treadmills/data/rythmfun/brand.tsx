import type {Brand} from '../types'
const links = {
  brand: {
    US: "https://rhythmfunfitness.com/",
  },
  amazon: {
    US: "https://amzn.to/4iIk0TT"
  },
}
const info: Brand = {
  key: 'rythmfun',
  name: "Rythm Fun",
  links,
  // overriden in each item
  warranty: {
  },
  fakespot: "C",
  pickedBy: {
    me: -1
  }
}
export default info