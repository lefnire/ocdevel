import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/41Y0kEk"
  },
  brand: {
    US: "https://rhythmfunfitness.com/products/rhythm-fun-ap01-walking-pad-with-incline"
  }
}
const info: Product = {
  model: "AP01",
  key: `${brand.key}_ap01`,
  description: "",
  links,
  brand,
  // description: "",
  dimensions: {
    value: [44.8, 21.49, 4.9], // "D x "W x "H
  },
  weight: {
    value: 48,
  },
  maxWeight: {
    value: 300,
  },
  maxSpeed: {
    value: 3.7,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2024-06-30",
  },
  rating: {
    value: [[4.2, 352], [66,14,8,5,7]],
  },
  fakespot: {
    value: ["B", brand.fakespot],
  },
  price: {
    value: 170,
    sale: 120,
  },
  pickedBy: {
    websites: [{value: 1}]
  },
  incline: {
    value: 8,
    method: "manual"
  },
  shock: {
    value: false,
    rating: 3,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 45,
  },
  app: {
    value: false,
  },
  easyLube: {
    value: 10,
  },
  material: {
    value: "Alloy Steel"
  },
}
export default info