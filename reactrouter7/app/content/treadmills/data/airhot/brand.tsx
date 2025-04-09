import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://airhot.com/"
  },
  amazon: {
    US: "https://amzn.to/4cAcLeI",
    CA: "https://amzn.to/4llcgZI",
  },
}
const info: Brand = {
  // Key for looking up the brand later
  key: 'airhot',
  // Name of the brand
  name: "AirHot",
  links,
  // Warranty options for this brand
  warranty: {},
  fakespot: "D",
  // Who favors this brand (me, trusted-community, review-websites, affiliate-rebels)
  pickedBy: {},
}
export default info