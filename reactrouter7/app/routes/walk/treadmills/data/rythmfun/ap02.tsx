import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3FGJRgD"
  },
  brand: {
    US: "https://rhythmfunfitness.com/products/rhythm-fun-ap02-walking-pad"
  }
}
const info: Product = {
  model: {value: "AP02"},
  key: `${brand.key}_ap02`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [45, 21, 4.7], // "D x "W x "H
  },
  weight: {
    value: 39.7,
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
    value: "2024-11-18",
  },
  rating: {
    value: [[4.2, 67], [64,18,6,3,9]],
  },
  fakespot: {
    value: ["D", brand.fakespot],
  },
  price: {
    value: 120,
  },
  pickedBy: {
    websites: [
      {value: 1},
      {label: "Chicago Tribune", value: 1, url: "https://reviews.chicagotribune.com/sports-and-fitness/exercise-equipment/best-walking-pads"}
    ],
  },
  incline: {
    value: 3.5,
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