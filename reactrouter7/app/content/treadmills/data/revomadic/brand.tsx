import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://revomadic.com/"
  },
  amazon: {
    US: "https://amzn.to/4il9Sj6"
  },
}
const info: Brand = {
  // Key for looking up the brand later
  key: 'revomadic',
  // Name of the brand
  name: "Revomadic",
  links,
  // Warranty options for this brand
  warranty: {},
  fakespot: "B",
  // Who favors this brand (me, trusted-community, review-websites, affiliate-rebels)
  pickedBy: {},
}
export default info