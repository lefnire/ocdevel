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
  rating: 5,
}
export default info