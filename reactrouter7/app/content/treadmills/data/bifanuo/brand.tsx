import type {Brand} from '../types'
const links = {
  brand: {
    US: "https://bifanuo.com/product-category/treadmills/?orderby=date"
  },
  amazon: {
    US: "https://amzn.to/41LBozY"
  },
}
const info: Brand = {
  key: 'bifanuo',
  name: "Bifanuo",
  links,
  // overriden in each item
  warranty: {
    amazon: 2,
    brand: 1/12,
    // notes: () => <div></div>
  },
  fakespot: "A",
  // notes: () => <div>
  //   <div><b>Choosing the latest model</b></div>
  //   <div>
  //     Often these brands don't show the latest models on their storefront. So go to their website, sort by latest, copy the modle name, paste into Amazon.
  //   </div>
  // </div>
}
export default info