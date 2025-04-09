import type {Brand} from '../../types'
const links = {
  brand: {
    US: "https://sunnyhealthfitness.com/collections/under-desk-treadpad-treadmills",
  },
  amazon: {
    US: "https://amzn.to/444QOC1",
    CA: "https://amzn.to/3XBc3HL"
  },
}
const info: Brand = {
  key: 'sunny',
  name: "Sunny Health & Fitness",
  links,
  // overriden in each item
  warranty: {},
  fakespot: "A",
  pickedBy: {
    affiliate: [{value: 1}],
    websites: [{value: 1}],
  },
  // notes: () => <div>
  //   <div><b>Choosing the latest model</b></div>
  //   <div>
  //     Often these brands don't show the latest models on their storefront. So go to their website, sort by latest, copy the modle name, paste into Amazon.
  //   </div>
  // </div>
}
export default info