import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://theruntreadmill.com/"
  },
  amazon: {
    US: "https://amzn.to/3YkLlDy",
    CA: "https://amzn.to/3GdlJCg"
  },
}
const info: Brand = {
  // Key for looking up the brand later
  key: 'therun',
  // Name of the brand
  name: "THERUN",
  links,
  // Warranty options for this brand
  warranty: {},
  fakespot: "B",
  // Who favors this brand (me, trusted-community, review-websites, affiliate-rebels)
  pickedBy: {},
}
export default info