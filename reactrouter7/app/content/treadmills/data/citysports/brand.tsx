import type {Brand} from '../../types'
const links = {
  brand: {},
  amazon: {US: "https://amzn.to/4iGEPPG"},
}
const info: Brand = {
  key: 'citysports',
  name: "CitySports",
  links,
  // overriden in each item
  warranty: {
  },
  fakespot: "C",
}
export default info