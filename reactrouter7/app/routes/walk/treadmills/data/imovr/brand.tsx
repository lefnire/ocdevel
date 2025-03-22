import {nonBudgetNote} from "../utils";
import type {Brand} from '../types'
const info: Brand = {
  key: 'imovr',
  links: {},
  name: "iMovR / Unsit",
  rating: 5,
  warranty: {},
  notes: () => <div>{nonBudgetNote}</div>
}

export default info