import type {Brand} from '../types'
const links = {
  brand: {
    // US: ""
  },
  amazon: {
    // US: ""
  },
}
const info: Brand = {
  // Key for looking up the brand later
  key: 'brand',
  // Name of the brand
  name: "Brand",
  links,
  // Warranty options for this brand
  warranty: {},
  fakespot: "B",
  // Who favors this brand (me, trusted-community, review-websites, affiliate-rebels)
  pickedBy: {},
}
export default info