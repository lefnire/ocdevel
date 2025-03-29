import type {Product} from "../types";
import brand from './brand'
const links = {
  amazon: {
    US: "https://amzn.to/4hzpqzs",
    CA: "https://amzn.to/4ixXL39",
    UK: "https://amzn.to/4iCSs2w", // not the same one?
  },
  brand: {
    US: "https://bifanuo.com/product/walking-pad-under-desk-treadmill-treadmills-for-home-office-portable-treadmill-walking-pad-treadmill-under-desk-with-remote-control-led-display-ideal-for-fitness-enthusiasts-2/",
  }
  // amazonPause: "brand",
}
const info: Product = {
  model: {value: "TM008"},
  key: `${brand.key}_tm008`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [46.2, 20.3, 4.3], // 47.6"D x 23.6"W x 8.7"H
  },
  weight: {
    value: 40,
  },
  maxWeight: {
    value: 265,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 2.25,
  },
  age: {
    value: "2023-10-09",
  },
  rating: {
    value: [[4.3, 1271], [70, 14, 5, 3, 8]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 100,
    sale: 90,
  },
  pickedBy: {
    websites: [{
      label: "Chicago Tribune",
      url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads",
      value: 1
    }]
  },
  incline: {
    value: 0,
  },
  shock: {
    value: true,
    rating: 5,
    notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 45,
  },
  app: {
    value: false,
  },
  easyLube: {
    value: 5,
  },

  // warranty: from brands
  // pros: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
  // cons: [
  //   {value: "", rating: 0, notes: () => <div></div>}
  // ],
}
export default info