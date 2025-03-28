import type {Brand} from '../types'
const links = {
  brand: {},
  amazon: {
    US: "https://amzn.to/4hG3F0T",
    CA: "https://amzn.to/4izSwzS",

  },
}
const info: Brand = {
  key: 'brand',
  name: "Elseluck",
  links,
  // overriden in each item
  warranty: {
    amazon: 2*12,
    // notes: () => <div></div>
  },
  fakespot: "C",
  rating: 5,
  bump: {extra: -1},
}
export default info