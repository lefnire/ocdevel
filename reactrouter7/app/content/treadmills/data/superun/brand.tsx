import type {Brand} from '../types'
const links = {
  brand: {
    US: "https://superuntreadmill.com/collections/under-desk-treadmill",
    EU: "https://eu.superuntreadmill.com/collections/underdesk-treadmills",
    UK: "https://uk.superuntreadmill.com/collections/underdesk-treadmills"
  },
  amazon: {
    US: "https://amzn.to/42gmhQt",
    CA: "https://amzn.to/4j5ihYH"
  },
}
const info: Brand = {
  key: 'superun',
  name: "SupeRun",
  links,
  // overriden in each item
  warranty: {
  },
  fakespot: "C",
  pickedBy: {
    me: -1,
    websites: [{value: 1}]
  }
}
export default info