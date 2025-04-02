import type {Brand} from '../types'
const links = {
  brand: {"ALL": "https://walkolution.com?sca_ref=8416295.Hx5JVtdlxLpM&sca_source=blog"},
  amazon: {},
}
const info: Brand = {
  key: 'walkolution',
  name: "Walkolution",
  links,
  // overriden in each item
  warranty: {
    brand: 5,
    notes: () => <div>Historically a lifetime warranty, but Walkolution 2 specifically comes with a 5-year warranty with an paid lifetime upgrade.</div>
  },
  fakespot: "A",
  pickedBy: {},
  notes: () => <div>
    Walkolution is famous for "buy it for life", due to the mechanics (esp. being motor-less) of their manual treadmills. I'm not including their prior versions, as the Walkolution 2 is better in all regards, <em>including</em> price. Click the model for more details.
  </div>
}
export default info