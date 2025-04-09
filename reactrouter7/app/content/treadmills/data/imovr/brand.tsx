import {nonBudgetNote} from "../utils";
import type {Brand} from '../../types'
const info: Brand = {
  key: 'imovr',
  links: {
    brand: {
      US: "https://www.imovr.com/collections/treadmill-desks",
    },
    amazon: {}
  },
  name: "iMovR",
  pickedBy: {},
  fakespot: "B",
  warranty: {},
  notes: () => <div>{nonBudgetNote}</div>
}

export default info