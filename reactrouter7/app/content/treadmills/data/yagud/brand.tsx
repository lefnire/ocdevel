import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://theyagud.com/#shop"
  },
  amazon: {
    US: "https://amzn.to/4hxIA8R",
    CA: "https://amzn.to/41SMaEG",
  },
}
const info: Brand = {
  name: "Yagud",
  key: 'yagud',
  links,
  // overriden in each item
  warranty: {
    amazon: 2,
    // notes: () => <div></div>
  },
  fakespot: "D",
  pickedBy: {}
}
export default info