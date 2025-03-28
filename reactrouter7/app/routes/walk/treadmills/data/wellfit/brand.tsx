import type {Brand} from '../types'
const links = {
  brand: {
    US: "https://wellfittreadmill.com/collections/under-desk-walking-pad?sort_by=created-descending"
  },
  amazon: {
    US: "https://amzn.to/4l0Pczy"
  },
}
const info: Brand = {
  key: 'wellfit',
  name: "Wellfit",
  links,
  // overriden in each item
  warranty: {
    amazon: 2*12,
    brand: 2*12
  },
  fakespot: "C",
  pickedBy: {
    me: -2,
    websites: [
      {value: 1},
      {label: "Reddit discussion", value: 1}
    ]
  }
}
export default info