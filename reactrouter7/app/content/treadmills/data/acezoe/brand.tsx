import type {Brand} from '../../types'
const links = {
  brand: {
    // US: ""
  },
  amazon: {
    US: "https://amzn.to/3Ev5QGS",
    CA: "https://amzn.to/4jxBr9M",
  },
}
const info: Brand = {
  // Key for looking up the brand later
  key: 'acezoe',
  // Name of the brand
  name: "Acezoe",
  links,
  // Warranty options for this brand
  warranty: {},
  fakespot: "C",
  // Who favors this brand (me, trusted-community, review-websites, affiliate-rebels)
  pickedBy: {},
}
export default info