import type {Brand} from '../types'
const links = {
  amazon: {
    US: "https://amzn.to/4hwZXXe",
    CA: "https://amzn.to/4kQqzFB",
  },
  brand: {
    "US": "https://deerruntreadmill.com/",
  }
}
const info: Brand = {
  key: 'deerrun',
  links,
  name: "DeerRun",
  fakespot: "C",
  pickedBy: {
    me: 6,
    websites: [{value: 1}]
  },
  warranty: {},
};
export default info;