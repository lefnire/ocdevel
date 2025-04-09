import type {Brand} from '../../types'
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
  },
  fakespot: "C",
  pickedBy: {
    me: -1,
    websites: [{value: 1}]
  }
}
export default info