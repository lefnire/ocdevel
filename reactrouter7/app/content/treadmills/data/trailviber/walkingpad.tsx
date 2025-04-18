import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/4bYib2R"
  },
  brand: {
    US: "https://trailviber.us/collections/frontpage/products/trailviber-walking-pad-treadmill-with-12-9-level-auto-incline-under-desk-treadmill-450-lbs-capacity"
  }
}
const info: Product = {
  model: {value: "Walking Pad"},
  key: `${brand.key}_walkingpad`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [48, 21, 4.8], // "D x "W x "H
  },
  weight: {
    value: 44,
  },
  maxWeight: {
    value: 450,
  },
  maxSpeed: {
    value: 4,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-06-06",
  },
  rating: {
    value: [[4.8, 377], [91,5,3,0,1]],
  },
  fakespot: {
    value: ["F", brand.fakespot],
  },
  price: {
    value: 450,
    sale: 300,
  },
  pickedBy: {
    affiliate: [{value: 1}]
  },
  incline: {
    value: 12,
    method: "auto"
  },
  shock: {
    value: true,
    rating: 5,
    notes: () => <div>4-point silicone absorbers</div>
  },
  decibels: {
    // value: 50,
  },
  app: {
    value: false,
  },
  easyLube: {
    value: 5,
  },
  material: {
    value: "Alloy Steel"
  },

}
export default info