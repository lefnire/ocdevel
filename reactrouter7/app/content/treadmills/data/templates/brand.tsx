import type {Brand} from '../types'
const links = {
  brand: {US: ""},
  amazon: {US: ""},
}
const info: Brand = {
  key: 'brand',
  name: "Brand",
  links,
  // overriden in each item
  warranty: {},
  fakespot: "B",
  pickedBy: {},
  // notes: () => <div>
  //   <div><b>Choosing the latest model</b></div>
  //   <div>
  //     Often these brands don't show the latest models on their storefront. So go to their website, sort by latest, copy the modle name, paste into Amazon.
  //   </div>
  // </div>
}
export default info