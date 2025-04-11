import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://vitalseris.com/collections/all"
  },
  amazon: {
    US: "https://amzn.to/4juFJPj",
    CA: "https://amzn.to/42dG3wc"
  },
}
const info: Brand = {
  // Key for looking up the brand later
  key: 'vitalwalk',
  // Name of the brand
  name: "Vitalwalk",
  links,
  // Warranty options for this brand
  warranty: {},
  fakespot: "F",
  // Who favors this brand (me, trusted-community, review-websites, affiliate-rebels)
  pickedBy: {},
}
export default info