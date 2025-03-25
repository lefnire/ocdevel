import type {Brand} from '../types'
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
    amazon: 2*12,
    // notes: () => <div></div>
  },
  fakespot: "C",
  rating: 5,
}
export default info