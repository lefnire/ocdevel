import type {Product} from "../../types"
import brand from './brand'
const info: Product = {
  brand,
  model: {
    value: "2 in 1",
    notes: () => <div>
      My prior main, and I loved it. I upgraded to EgoFit (then again to Urevo) for the incline. If you choose GoYouth, go to their store page just to make sure there's nothing newer than the link I posted. These budget brands often release newer versions quite frequently; and newer is better with these.
      <h5>Pro: Surprisingly durable</h5>
      <div>I've used it for 2yrs, around 6hrs per day 5 days a week. I'm 220lbs and I walk 3.5mph. That's very intense usage to have lasted that long. It started develop creaks and groans, which I believe is due to damage I put on the walking pad from the usage, so I returned it under extended warranty.</div>
      <h5>Controller sucks</h5>
      <div>(At least for my older version) But can easily be replaced for free. Just deal with it. The first one will have button-presses miss-firing (as in, activating a different button's action). To fix this, buy a compatible controller battery along with the treadmill and replace the one in the controller immediately. I think they just run out while sitting in the warehouse. After 1.5yrs, I nonetheless had to do a hard replacement, which GoYouth did for free via Amazon messaging center. It was easy, came fast, and didn't phase me. This isn't a fluke; you'll see in the reviews many have experienced this scenario.</div>
    </div>
  },
  key: `${brand.key}_2in1`,
  links: {
    amazon: {
      US: "https://amzn.to/4hx38hC",
      CA: "https://amzn.to/4bXikDA",
    },
    brand: {}
  },

  dimensions: {
    value: [49, 21.6, 5.9], // 49"D x 21.6"W x 5.9"H
  },
  weight: {
    value: 50,
  },
  maxWeight: {
    value: 300,
    // notes: () => <div>Lower max weight capacity (220lbs) than many competitors which typically offer 265lbs.</div>
  },
  maxSpeed: {
    value: 3.7,
    // notes: () => <div>Higher max speed (6mph) than many competitors, allowing for faster walking or even light jogging.</div>
  },
  horsePower: {
    value: 2.25,
    notes: () => <div>2.25 HP is the minimum recommended for longevity. Treadmills lower than this won't last (heat build-up, inability to handle the walking load).</div>
  },
  age: {
    value: "2021-05-25",
    // notes: () => <div>Released May 9, 2022. There may be a newer edition from June 20, 2023.</div>
  },
  rating: {
    value: [[4.1, 1944], [61, 17, 6, 6, 10]], // [average rating, number of reviews], [5-stars, 4-stars, 3-stars, 2-stars, 1-star]
    // notes: () => <div>Good distribution with majority 5-star ratings.</div>
  },
  fakespot: {
    value: ["A", brand.fakespot], // Fakespot A for the product
    notes: () => <div>Fakespot A rating indicates highly reliable reviews.</div>
  },
  price: {
    value: 300,
    // sale: 300, // $40 Amazon coupon mentioned
    // notes: () => <div>There's currently a $40 Amazon "Apply Coupon" = $300 total. A possibly newer edition is $390 with a $120 coupon (=$270).</div>
  },
  pickedBy: {
    websites: [{value: 1}]
  },
  incline: {
    value: 0, // No incline mentioned
    notes: () => <div>No incline functionality, which is important for knee health.</div>
  },
  shock: {
    value: false, // Mentioned in Amazon description and features
    rating: 2,
  },
  decibels: {
  },
  app: {
    value: false, // Not mentioned in the data
  },
  easyLube: {
    value: 5, // Not mentioned in the data
  },
  material: {
    value: "Alloy Steel, Acrylonitrile Butadiene Styrene (ABS)"
  },
}
export default info