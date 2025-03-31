import type {Product} from "../types";
import brand from './brand'

const links = {
  amazon: {
    US: "https://amzn.to/3QR0qbT"
  },
  brand: {
  }
}
const info: Product = {
  model: {
    value: "06 Mini",
    notes: () => <div>Also on that link is 06 Normal and Pro. Upgrade if your budget allows</div>
  },
  key: `${brand.key}_06mini`,
  links,
  brand,
  // description: "",
  dimensions: {
    value: [43, 20, 4], // "D x "W x "H
  },
  weight: {
    value: 40,
  },
  maxWeight: {
    value: 250,
  },
  maxSpeed: {
    value: 2.5,
  },
  horsePower: {
    value: 2.5,
  },
  age: {
    value: "2023-05-03",
  },
  rating: {
    value: [[4.2, 2688], [66,17,5,3,9]],
  },
  fakespot: {
    value: ["A", brand.fakespot],
  },
  price: {
    value: 160,
    sale: 100,
  },
  pickedBy: {
  },
  incline: {
    value: 0,
    // method: "auto"
  },
  shock: {
    value: false,
    rating: 4,
    // notes: () => <div>8-point silicone absorbers</div>
  },
  decibels: {
    value: 40,
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