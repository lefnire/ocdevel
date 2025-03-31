import type {Brand} from '../types'
const links = {
  brand: {},
  amazon: {
    US: "https://amzn.to/426Qu33"
  },
}
const info: Brand = {
  key: 'lysole',
  name: "Lysole",
  links,
  // overriden in each item
  warranty: {
  },
  pickedBy: {},
  fakespot: "D",
}
export default info