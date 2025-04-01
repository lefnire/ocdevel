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
    amazon: 2,
    brand: 2
  },
  fakespot: "C",
  pickedBy: {
    me: -2,
    trusted: [
      {label: 'Reddit Upset', value: -1, url: "https://www.reddit.com/r/WalkingPads/s/IoKxzPV8U5"},
      {label: "Reddit Upset", value: -1, url: "https://www.reddit.com/r/WalkingPads/comments/1jifmbr/comment/mjir36a/"}
    ],
    websites: [
      {value: 1},
      {label: "Reddit discussion", value: 1}
    ]
  }
}
export default info