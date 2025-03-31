import type {Brand} from '../types'
const links = {
  brand: {"ALL": "https://walkolution.com"},
  amazon: {},
}
const info: Brand = {
  key: 'walkolution',
  name: "Walkolution",
  links,
  // overriden in each item
  warranty: {
    brand: 5*12,
    notes: () => <div>Historically a lifetime warranty, but Walkolution 2 specifically comes with a 5-year warranty with an paid lifetime upgrade.</div>
  },
  fakespot: "A",
  pickedBy: {},
}
export default info