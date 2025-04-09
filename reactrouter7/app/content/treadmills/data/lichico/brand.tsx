import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://lichico.com/",
    AU: "https://lichico.com.au/"
  },
  amazon: {
    US: "https://amzn.to/4bSY7yP"
  },
}
const info: Brand = {
  key: 'lichico',
  name: "Lichico",
  links,
  // overriden in each item
  warranty: {
    amazon: 2,
    // notes: () => <div></div>
  },
  fakespot: "B",
  pickedBy: {}
}
export default info