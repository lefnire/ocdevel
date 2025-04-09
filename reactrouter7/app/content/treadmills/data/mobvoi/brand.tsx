import type {Brand} from '../../types'
const links = {
  brand: {
    EU: "https://www.mobvoi.com/eu/types/homegym",
    CA: "https://www.mobvoi.com/ca/types/homegym",
    UK: "https://www.mobvoi.com/uk/types/homegym",
    US: "https://www.mobvoi.com/us/types/homegym"
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
  fakespot: "C",
  pickedBy: {
    trusted: [{value:1}],
    websites: [{value:1}]
  },
}
export default info