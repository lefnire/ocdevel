import type {Brand} from '../types'
const links = {
  brand: {
    EU: "https://www.mobvoi.com/eu/pages/mobvoihomewalkingtreadmillplus"
  },
  amazon: {
    EU: "https://amzn.to/3DNbjsx"
  },
}
const info: Brand = {
  key: 'mobvoi',
  name: "Mobvoi",
  links,
  // overriden in each item
  warranty: {},
  fakespot: "B",
  pickedBy: {},
}
export default info