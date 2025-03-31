import type {Brand} from '../types'
const links = {
  brand: {US: "https://trailviber.us/collections/frontpage"},
  amazon: {US: "https://amzn.to/41V7NnM"},
}
const info: Brand = {
  key: 'trailviber',
  name: "TrailViber",
  links,
  // overriden in each item
  warranty: {},
  fakespot: "F",
  pickedBy: {}
}
export default info