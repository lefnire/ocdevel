import type {Product} from "../../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/426nEQu",
  },
  brand: {
    US: "https://sunnyhealthfitness.com/collections/under-desk-treadpad-treadmills/products/treadpad-100-smart-walking-treadmill-sf-t724064"
  }
}
const info: Product = {
  model: {
    value: "TreadPad 100",
    // notes: () => <div></div>
  },
  key: `${brand.key}_sft724064`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [49.2, 22, 4.3], // "D x "W x "H
  },
  weight: {
    value: 45.3,
  },
  maxWeight: {
    value: 245,
  },
  maxSpeed: {
    value: 3.7,
  },
  horsePower: {
    value: 1,
  },
  age: {
    value: "2024-11-08",
  },
  rating: {
    value: [[4.3, 9193], [67,18,7,2,6]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 288,
  },
  pickedBy: {
    // me: 1,
    // trusted: [{value: 1}],
    // websites: [{value: 1}],
  },
  incline: {
    value: 0,
    // method: "auto"
  },
  shock: {
    value: true,
    rating: 5,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    // value: 50,
  },
  app: {
    value: true,
  },
  easyLube: {
    value: 3,
  },
  material: {value: "Alloy Steel"},
}
export default info