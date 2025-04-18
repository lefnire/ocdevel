import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://toputure.org"
  },
  amazon: {
    US: "https://amzn.to/3En8w9D",
    CA: "https://amzn.to/44v0pCo",
  },
}
const info: Brand = {
  // Key for looking up the brand later
  key: 'toputure',
  // Name of the brand
  name: "Toputure",
  links,
  // Warranty options for this brand
  warranty: {},
  fakespot: "B",
  // Who favors this brand (me, trusted-community, review-websites, affiliate-rebels)
  pickedBy: {},
}
export default info